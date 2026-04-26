import { useI18n } from 'vue-i18n'
import { watch } from 'vue'

export function useMeta() {
  const { t, locale } = useI18n()

  function updateMeta() {
    document.title = t('meta.title')

    const metaDesc = document.querySelector('meta[name="description"]')
    if (metaDesc) {
      metaDesc.setAttribute('content', t('meta.description'))
    }
  }

  watch(locale, updateMeta, { immediate: true })

  return { updateMeta }
}
