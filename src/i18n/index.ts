import { createI18n } from 'vue-i18n'
import { LANG_ID } from '@/common/enum'
import type { App } from 'vue'

export function loadLanguages() {
  const context = import.meta.glob('./languages/*.ts', { eager: true })

  const languages = {}

  const langs = Object.keys(context)
  for (const key of langs) {
    if (key === './index.ts') return
    const lang = context[key].lang
    const name = key.replace(/(\.\/languages\/|\.ts)/g, '')
    languages[name] = lang
  }

  return languages
}

export function t(key: string) {
  return i18n.global.t(key)
}

export const i18n = createI18n({
  locale: localStorage.getItem(LANG_ID) || 'en',
  fallbackLocale: 'en',
  messages: loadLanguages(),
})

export function setLanguage(locale: string) {
  i18n.global.locale = locale
  localStorage.setItem(LANG_ID, locale)
}

export function locales() {
  return i18n.global.availableLocales
}

export function setupLang(app: App<Element>) {
  app.use(i18n)
}
