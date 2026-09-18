type FlatMessages = Record<string, unknown>

const flatten = (value: unknown, prefix = '', output: FlatMessages = {}): FlatMessages => {
  if (!value || typeof value !== 'object') return output
  for (const [key, child] of Object.entries(value)) {
    const path = prefix ? `${prefix}.${key}` : key
    if (child && typeof child === 'object') flatten(child, path, output)
    else output[path] = child
  }
  return output
}

const localeKeys = async (pattern: string) => {
  const files = [...new Bun.Glob(pattern).scanSync('.')].sort()
  const modules = await Promise.all(files.map(async (file) => [file, (await import(`../${file}`)).default] as const))
  return { files, modules, base: flatten(modules.find(([file]) => file.endsWith('/en-US.ts'))?.[1]) }
}

const calledKeys = async (files: string[]) => {
  const found = new Set<string>()
  for (const file of files) {
    const source = await Bun.file(file).text()
    for (const match of source.matchAll(/(?:\bt|\$t)\(\s*['"]([^'"]+)['"]/g)) found.add(match[1])
  }
  return found
}

const app = await localeKeys('src/locales/*.ts')
const site = await localeKeys('site/src/i18n/locales/*.ts')
const appSource = [...new Bun.Glob('src/**/*.{ts,vue}').scanSync('.')]
const siteSource = [...new Bun.Glob('site/src/**/*.{ts,vue}').scanSync('.')]
const errors: string[] = []

async function validate(name: string, data: Awaited<ReturnType<typeof localeKeys>>, sourceFiles: string[], required: string[]) {
  const expected = new Set(Object.keys(data.base))
  const used = await calledKeys(sourceFiles)
  for (const [file, messages] of data.modules) {
    const actual = new Set(Object.keys(flatten(messages)))
    const missing = [...expected].filter((key) => !actual.has(key))
    const extra = [...actual].filter((key) => !expected.has(key))
    if (missing.length) errors.push(`${name} ${file}: missing ${missing.join(', ')}`)
    if (extra.length) errors.push(`${name} ${file}: extra ${extra.join(', ')}`)
  }
  const missingCalls = [...used].filter((key) => !expected.has(key))
  if (missingCalls.length) errors.push(`${name} source: called keys missing from en-US: ${missingCalls.join(', ')}`)
  const unused = [...expected].filter((key) => !used.has(key))
  if (unused.length) console.warn(`⚠ ${name}: locale keys not referenced by source: ${unused.join(', ')}`)
  for (const key of required) if (!expected.has(key)) errors.push(`${name}: required key missing from en-US: ${key}`)
}

await validate('app', app, appSource, ['app.chooseLanguage', 'app.github', 'app.languageMenu', 'app.externalLink', 'app.dropIndicator', 'app.copyShortcut'])
await validate('site', site, siteSource, ['nav.chooseLanguage', 'nav.github', 'nav.mitLicense', 'hero.eyebrow', 'hero.titleSuffix', 'hero.visualLabel', 'hero.visualCaption', 'demo.title', 'demo.description', 'sections.featuresNumber', 'sections.demoNumber', 'sections.downloadNumber'])

if (errors.length) {
  console.error(errors.map((error) => `✗ ${error}`).join('\n'))
  process.exit(1)
}

console.log(`✓ ${app.modules.length} app locales and ${site.modules.length} site locales have complete key trees and source calls`)
