import { languages } from '../src/i18n/catalog'
import { languages as siteLanguages } from '../site/src/i18n/catalog'

const expected = languages.map(({ code }) => code)
const actual = siteLanguages.map(({ code }) => code)
if (JSON.stringify(expected) !== JSON.stringify(actual)) throw new Error('App and website locale catalogs differ')
if (new Set(expected).size !== 21) throw new Error(`Expected 21 locales, found ${expected.length}`)
for (const language of languages) {
  if (!language.nativeName || !language.englishName || !language.base) throw new Error(`Incomplete metadata: ${language.code}`)
  if (!['ltr', 'rtl'].includes(language.dir)) throw new Error(`Invalid direction: ${language.code}`)
}
if (languages.filter(({ dir }) => dir === 'rtl').map(({ code }) => code).join(',') !== 'ar,ur-PK') throw new Error('Unexpected RTL locale set')
console.log(`✓ ${expected.length} locales, matching catalogs, metadata and RTL directions`)
