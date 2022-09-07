import { computed, watch } from 'vue'
import useStoreSetting from '@/store/modules/settings'
import useStoreSettingList from '@/store/modules/settingList'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { ChevronDownIcon } from '@heroicons/vue/20/solid'
import { t } from '@/i18n'

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
            <dt id='basic'>基本设置</dt>
            <dd>
              <h3 id='basic_theme'>主题</h3>
              <div>
                <ul class='theme'>
                  {themes.value.map(t => {
                    return (
                      <li onClick={() => handleThemeChange(t.id)}>
                        <span class={[t.class]}></span>
                        <label
                          class={[
                            t.class + '-label',
                            theme == t.class ? 'active' : '',
                          ]}
                        >
                          {t.class}
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
