import { computed, watch } from 'vue'
import useStoreSetting from '@/store/modules/settings'
import useStoreSettingList from '@/store/modules/settingList'
import { t } from '@/i18n'
import './index.scss'

export default {
  setup() {
    const settingStore = useStoreSetting()
    const listStore = useStoreSettingList()

    const languageList = computed(() => listStore.getLanguages)
    const themes = computed(() => listStore.getThemes)

    const currentSetting = computed(() => settingStore.getSetting)
    const theme = computed(() => settingStore.getThemeClass)

    function handleThemeChange(val) {
      settingStore.THEME_ID(val)
    }

    const getAssetsFile = (url: string) => {
      return new URL(`../../../assets/imgs/${url}.jpg`, import.meta.url).href
    }

    watch(
      currentSetting,
      e => {
        console.log('设置变动 >>> ', e)
        settingStore.SET_SETTING(e || undefined)
      },
      { deep: true },
    )
    return () => (
      <div class='view-settings'>
        <div ref='dom_setting' class='setting'>
          <dl ref='dom_setting_list'>
            <dt id='basic'>主题设置</dt>
            <dd>
              <h3 id='basic_theme'>当前: {theme.value}</h3>
              <div>
                <ul class='theme'>
                  {themes.value.map(t => {
                    return (
                      <li
                        onClick={() => handleThemeChange(t.id)}
                        class={[
                          { active: theme.value === t.class },
                          'theme-li',
                        ]}
                      >
                        <span class={[t.class, 'w-20 h-20']}>
                          <img
                            alt={t.class}
                            class='w-18 h-12 rounded-lg opacity-80'
                            src={getAssetsFile(t.class)}
                          />
                        </span>
                        <label
                          class={[
                            t.class + '-label',
                            theme == t.class ? 'active' : '',
                            'inline-block w-20 text-center p-1',
                          ]}
                        >
                          {t.name}
                        </label>
                      </li>
                    )
                  })}
                </ul>
              </div>
            </dd>
          </dl>
        </div>
      </div>
    )
  },
}
