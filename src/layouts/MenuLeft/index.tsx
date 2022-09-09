import { ref, computed } from 'vue'
import router from '@/routes'
import Menu from '@/components/Menu'
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
          {menuRoutes.map((m, idx) => {
            return (
              <div onClick={() => to(m.path)}>
                <Menu data-index={idx} path={curPath.value} item={m} />
              </div>
            )
          })}
        </div>
      </div>
    )
  },
}
