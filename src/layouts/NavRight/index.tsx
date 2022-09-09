import { computed } from 'vue'
import VPSwitchAppearance from '@/components/Switch/VPSwitchAppearance.vue'
import NavbarBack from '@/components/Icons/NavbarBack.vue'
import router from '@/routes'
import './index.scss'

export default {
  props: ['back', 'mode'],
  setup(props: { back: boolean; mode: string }) {
    const gotoMenu = () => router.push('/menu')
    const curPath = computed(() => router.currentRoute.value.path)
    return () => (
      <div class='nav-right'>
        <div class='nav-right-box'>
          <div class='nav-back' onClick={gotoMenu}>
            {props.back ||
            (props.mode === 'left' && curPath.value !== '/menu') ? (
              <>
                <NavbarBack class='nav-back-icon' />
                <span class='nav-back-text'>Back</span>
              </>
            ) : (
              ''
            )}
            {/* <router-link class='nav-back-text' to={'/menu'}>back</router-link> */}
          </div>
          <VPSwitchAppearance />
        </div>
      </div>
    )
  },
}
