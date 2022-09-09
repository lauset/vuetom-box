import { appWindow } from '@tauri-apps/api/window'
import { t, setLanguage, locales } from '@/i18n'
import { info } from '@/common/notify'
import './index.scss'

export default {
  setup() {
    const min = () => {
      appWindow.minimize()
    }
    const max = () => {
      appWindow.toggleMaximize()
    }
    const close = () => {
      appWindow.close()
    }
    const changeLang = (lang: string) => {
      setLanguage(lang)
    }
    const notifyTest = () => {
      info({ title: 'Info', body: 'Nothing' })
    }
    const langs = locales()
    return () => (
      <div class='app-board'>
        <form-button onClick={() => min()}>{t('toolbar.min')}</form-button>
        <form-button onClick={() => max()}>{t('toolbar.max')}</form-button>
        <form-button onClick={() => close()}>{t('toolbar.close')}</form-button>
        <br />
        {langs.map(lang => {
          return (
            <form-button onClick={() => changeLang(lang)}>
              {t(`lang.${lang}`)}
            </form-button>
          )
        })}
        <br />
        <form-button onClick={() => notifyTest()}>Notify Test</form-button>
        <div class='h-80'></div>
        <div class='h-80'></div>
        <div class='h-80'></div>
      </div>
    )
  },
}
