import { appWindow } from '@tauri-apps/api/window'
import { t, setLanguage, locales } from '@/i18n'
import { info } from '@/common/notify'
import './Board.scss'

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
      info({title: 'Info', body: 'Nothing'})
    }
    const langs = locales()
    return () => (
      <div class='app-board'>
        <button onClick={() => min()}>{t('toolbar.min')}</button>
        <button onClick={() => max()}>{t('toolbar.max')}</button>
        <button onClick={() => close()}>{t('toolbar.close')}</button>
        <br />
        {langs.map(lang => {
          return <button onClick={() => changeLang(lang)}>{t(`lang.${lang}`)}</button>
        })}
        <br />
        <button onClick={() => notifyTest()}>Notify Test</button>
      </div>
    )
  },
}
