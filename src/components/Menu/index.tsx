import router from '@/routes'
import { ref } from 'vue'
import { t } from '@/i18n'
import { menuRoutes } from '@/routes/routerStatic'
import './index.scss'

export default {
  setup() {
    const curRoute = router.currentRoute.value
    const curPath = ref(curRoute.path)

    const to = (path: string) => {
      curPath.value = path
      router.push(path)
    }

    return () => (
      <div class='app-menu'>
        <div class='menu-box'>
          {menuRoutes.map(menu => {
            return !menu.meta.isHide ? (
              <div
                class={['menu', { active: curPath.value === menu.path }]}
                onClick={() => to(menu.path)}
              >
                {t(menu.meta.text)}
              </div>
            ) : null
          })}
        </div>
      </div>
    )
  },
}
