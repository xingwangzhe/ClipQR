<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { languages, setLocale, type Locale } from '../i18n'
const { locale } = useI18n(); const isOpen = ref(false)
function selectLocale(next: Locale) { setLocale(next); isOpen.value = false }
function handleClickOutside(event: MouseEvent) { if (!(event.target as HTMLElement).closest('.language-switcher')) isOpen.value = false }
function handleKeydown(event: KeyboardEvent) { if (event.key === 'Escape') isOpen.value = false }
onMounted(() => { document.addEventListener('click', handleClickOutside); document.addEventListener('keydown', handleKeydown) })
onUnmounted(() => { document.removeEventListener('click', handleClickOutside); document.removeEventListener('keydown', handleKeydown) })
</script>
<template>
  <div class="language-switcher">
    <button class="switcher-btn" aria-label="Choose language" :aria-expanded="isOpen" @click.stop="isOpen = !isOpen"><span class="language-glyph">文A</span></button>
    <div v-if="isOpen" class="dropdown-menu" role="menu">
      <button v-for="language in languages" :key="language.code" class="dropdown-item" :class="{ active: locale === language.code }" role="menuitem" @click="selectLocale(language.code)"><span>{{ language.nativeName }}</span><small>{{ language.englishName }}</small><b v-if="locale === language.code">✓</b></button>
    </div>
  </div>
</template>
<style scoped>
.language-switcher{position:relative}.switcher-btn{display:grid;place-items:center;width:38px;height:34px;padding:0;border:1px solid #2d4b43;border-radius:10px;color:#d7eee6;background:#142822;cursor:pointer}.language-glyph{font-weight:750;letter-spacing:-.12em}.dropdown-menu{position:absolute;top:42px;right:0;z-index:20;width:230px;max-height:min(60vh,420px);overflow-y:auto;padding:6px;border:1px solid #2d4b43;border-radius:14px;background:#11221ef7;box-shadow:0 22px 60px #0008;backdrop-filter:blur(16px)}.dropdown-item{display:grid;grid-template-columns:1fr auto;gap:2px 10px;width:100%;padding:10px 11px;border:0;border-radius:9px;color:#b8cec5;background:transparent;text-align:left;cursor:pointer}.dropdown-item:hover,.dropdown-item.active{color:#fff;background:#76f2bd14}.dropdown-item small{color:#78958b;font-size:10px}.dropdown-item b{grid-row:1 / span 2;grid-column:2;align-self:center;color:#76f2bd}@media(max-width:520px){.dropdown-menu{position:fixed;top:68px;left:16px;right:16px;width:auto}}
</style>
