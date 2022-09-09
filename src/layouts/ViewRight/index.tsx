import { ref, Transition, KeepAlive } from 'vue'
import { RouterView } from 'vue-router'
import MenuLeft from '@/layouts/MenuLeft'
import NavLeft from '../NavLeft'
import NavRight from '../NavRight'
import Welcome from '../Welcome'
import './index.scss'

const DefaultWelcome = {
  setup() {
    return () => <div class='default-welcome'>Welcome !!!</div>
  },
}

export default {
  setup() {
    const backShow = ref(false)
    const changeBack = status => {
      backShow.value = !status
    }
    return () => (
      <div class='home-view-right'>
        <div class='view-left'>
          <NavLeft />
          <div class='view-default'>
            <MenuLeft />
          </div>
        </div>
        <div class='view-right'>
          <NavRight mode='right' back={backShow.value} />
          <div class='view-default'>
            <RouterView>
              {({ Component, route }) => {
                changeBack(!Component)
                return !Component ? (
                  // <DefaultWelcome />
                  <Welcome />
                ) : route.meta?.keepAlive ? (
                  <Transition
                    name={route.meta?.transition || 'breadcrumb'}
                    appear
                    mode='out-in'
                  >
                    <KeepAlive>
                      <Component />
                    </KeepAlive>
                  </Transition>
                ) : (
                  <Transition
                    name={route.meta?.transition || 'breadcrumb'}
                    appear
                    mode='out-in'
                  >
                    <Component />
                  </Transition>
                )
              }}
            </RouterView>
          </div>
        </div>
      </div>
    )
  },
}
