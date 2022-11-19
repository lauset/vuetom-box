import { appWindow } from '@tauri-apps/api/window'
import { t, setLanguage, locales } from '@/i18n'
import { info } from '@/common/notify'
import { askDialog, confirmDialog, messageDialog } from '@/common/dialog'
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
    const askTest = async (type?: 'info' | 'error' | 'warning') => {
      const res = await askDialog({
        title: '提示',
        text: '确定要继续操作么?',
        type,
      })
      console.log(1, res)
    }
    const confirmTest = async (type?: 'info' | 'error' | 'warning') => {
      const res = await confirmDialog({
        title: '提示',
        text: '确定要继续操作么?',
        type,
      })
      console.log(2, res)
    }
    const messageTest = async (type?: 'info' | 'error' | 'warning') => {
      const res = await messageDialog({
        title: '提示',
        text: '确定要继续操作么?',
        type,
      })
      console.log(3, res)
    }
    const langs = locales()
    return () => (
      <div class='app-board'>
        <dl class='settings-list'>
          <dt class='basic-title'>窗口操作</dt>
          <dd>
            <h3 class='basic-text'>最小化、最大化、关闭</h3>
            <div>
              <form-button onClick={() => min()}>
                {t('toolbar.min')}
              </form-button>
              <form-button onClick={() => max()}>
                {t('toolbar.max')}
              </form-button>
              <form-button onClick={() => close()}>
                {t('toolbar.close')}
              </form-button>
            </div>
          </dd>
          <dt class='basic-title'>Notification</dt>
          <dd>
            <h3 class='basic-text'>弹窗、消息测试</h3>
            <div>
              <form-button onClick={() => notifyTest()}>
                Notify Test
              </form-button>
              <form-button onClick={() => askTest('info')}>
                Ask Dialog
              </form-button>
              <form-button onClick={() => confirmTest('warning')}>
                confirm Dialog
              </form-button>
              <form-button onClick={() => messageTest('error')}>
                message Dialog
              </form-button>
            </div>
          </dd>
          <dt class='basic-title'>Languages</dt>
          <dd>
            <h3 class='basic-text'>语言测试</h3>
            <div>
              {langs.map(lang => {
                return (
                  <form-button onClick={() => changeLang(lang)}>
                    {t(`lang.${lang}`)}
                  </form-button>
                )
              })}
            </div>
          </dd>
        </dl>
        <div class='h-80'></div>
        <div class='h-80'></div>
        <div class='h-80'></div>
      </div>
    )
  },
}
