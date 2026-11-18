const files = [...new Bun.Glob('src/locales/*.ts').scanSync('.')].sort()
const translations: Record<string, Record<string, string>> = {}

function flatten(value: unknown, prefix = '', output: Record<string, string> = {}) {
  if (!value || typeof value !== 'object') return output
  for (const [key, child] of Object.entries(value)) {
    const path = prefix ? `${prefix}.${key}` : key
    if (child && typeof child === 'object') flatten(child, path, output)
    else if (typeof child === 'string') output[path] = child
  }
  return output
}

for (const file of files) {
  const locale = file.split('/').at(-1)!.replace(/\.ts$/, '')
  const source = (await import(`../${file}`)).default
  for (const [key, value] of Object.entries(flatten(source))) {
    translations[key] ??= {}
    translations[key][locale] = value
  }
}

await Bun.write('locales/clipqr.json', `${JSON.stringify({ _version: 2, ...translations }, null, 2)}\n`)
console.log(`Wrote ${Object.keys(translations).length} translation keys for ${files.length} locales`)
