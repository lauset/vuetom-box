import NavRight from '../NavRight'
import './index.scss'

export default {
  setup() {
    return () => (
      <div class='home-view-left'>
        <div class='view-left'>
          <NavRight mode='left' />
          <div class='view-default'>
            <router-view name='left' />
            <router-view />
          </div>
        </div>
      </div>
    )
  },
}
