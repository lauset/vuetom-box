import { ref, Transition, KeepAlive } from 'vue'
import { RouterView } from 'vue-router'
import './index.scss'

export default {
  setup() {
    return () => (
      <div class='app-right-view'>
        <RouterView>
          {({ Component, route }) => {
            return route.meta?.keepAlive ? (
              <Transition name={route.meta?.transition || 'breadcrumb'} appear mode='out-in'>
                <KeepAlive>
                  <Component />
                </KeepAlive>
              </Transition>
            ) : (
              <Transition name={route.meta?.transition || 'breadcrumb'} appear mode='out-in'>
                <Component />
              </Transition>
            )
          }}
        </RouterView>
      </div>
    )
  },
}
