import { createI18n } from 'vue-i18n'
import cn from './language/cn.json'
import en from './language/en.json'

type Language = Record<'cn' | 'en', Record<string, Record<string, string>>>

const initFontFamily = () => {
  if (!localStorage.getItem('locale') || localStorage.getItem('locale') === 'cn') {
    document.body.classList.remove('lang-en')
    document.body.classList.add('lang-cn')
  } else {
    document.body.classList.remove('lang-cn')
    document.body.classList.add('lang-en')
  }
}
initFontFamily()

export const loadlanguage = (): Language => {
  const cn_language = JSON.parse(JSON.stringify(cn))
  const en_language = JSON.parse(JSON.stringify(en))
  return Object.keys(cn).reduce(
    (message: Language, key) => {
      message['cn'][key] = cn_language[key]
      message['en'][key] = en_language[key]
      return message
    },
    {
      cn: {},
      en: {}
    }
  )
}

export const i18n = createI18n({
  legacy: false,
  locale: localStorage.getItem('locale') ? String(localStorage.getItem('locale')) : 'cn',
  fallbackLocale: localStorage.getItem('locale') ? String(localStorage.getItem('locale')) : 'cn',
  messages: loadlanguage()
})
