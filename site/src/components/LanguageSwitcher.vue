<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { setLocale, supportedLocales, type Locale } from '../i18n'

const { locale } = useI18n()
const isOpen = ref(false)

const localeNames: Record<Locale, string> = {
  'zh-CN': '中文',
  'en-US': 'English'
}

function toggleMenu() {
  isOpen.value = !isOpen.value
}

function selectLocale(loc: Locale) {
  setLocale(loc)
  isOpen.value = false
}

function handleClickOutside(event: MouseEvent) {
  const target = event.target as HTMLElement
  if (!target.closest('.language-switcher')) {
    isOpen.value = false
  }
}

if (typeof window !== 'undefined') {
  document.addEventListener('click', handleClickOutside)
}
</script>

<template>
  <div class="language-switcher">
    <button class="switcher-btn" @click.stop="toggleMenu">
      🌐 {{ localeNames[locale as Locale] }}
      <span class="arrow" :class="{ open: isOpen }">▼</span>
    </button>
    <div v-if="isOpen" class="dropdown-menu">
      <button
        v-for="loc in supportedLocales"
        :key="loc"
        class="dropdown-item"
        :class="{ active: locale === loc }"
        @click="selectLocale(loc)"
      >
        {{ localeNames[loc] }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.language-switcher {
  position: relative;
}

.switcher-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: #1a1a1a;
  color: #fff;
  border: 1px solid #2d2d2d;
  border-radius: 6px;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  cursor: pointer;
  transition: background 0.2s;
}

.switcher-btn:hover {
  background: #2d2d2d;
}

.arrow {
  font-size: 0.625rem;
  transition: transform 0.2s;
}

.arrow.open {
  transform: rotate(180deg);
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 0.5rem;
  background: #1a1a1a;
  border: 1px solid #2d2d2d;
  border-radius: 8px;
  overflow: hidden;
  min-width: 120px;
  z-index: 100;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
}

.dropdown-item {
  display: block;
  width: 100%;
  padding: 0.75rem 1rem;
  background: none;
  border: none;
  color: #a0aec0;
  text-align: left;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
}

.dropdown-item:hover {
  background: #2d2d2d;
  color: #fff;
}

.dropdown-item.active {
  color: #3b82f6;
  background: rgba(59, 130, 246, 0.1);
}
</style>
