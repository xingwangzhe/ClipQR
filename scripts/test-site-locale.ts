import assert from 'node:assert/strict'
import { resolveLocale, resolvePreferredLocale } from '../site/src/i18n/catalog'

assert.equal(resolveLocale('zh-Hans-CN'), 'zh-CN')
assert.equal(resolveLocale('zh-Hant-HK'), 'zh-TW')
assert.equal(resolveLocale('pt'), 'pt-BR')
assert.equal(resolveLocale('fr-CA'), 'fr-FR')
assert.equal(resolvePreferredLocale(['xx-ZZ', 'zh-Hans-CN', 'fr-CA']), 'zh-CN')
assert.equal(resolvePreferredLocale(['xx-ZZ', 'it']), 'it-IT')
assert.equal(resolvePreferredLocale(['xx-ZZ']), 'en-US')

console.log('✓ system language preference and regional locale mapping')
