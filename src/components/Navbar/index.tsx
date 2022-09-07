import { onMounted, ref } from 'vue'
import VPSwitchAppearance from '../Switch/VPSwitchAppearance.vue'
import router from '@/routes'
import './index.scss'

export default {
  setup() {
    onMounted(() => {})
    return () => (
      <div class='app-navbar'>
        <div class='navbar-box'>
          <div>Vuetom Box</div>
          <VPSwitchAppearance />
        </div>
      </div>
    )
  },
}
