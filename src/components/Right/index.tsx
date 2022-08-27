import './index.scss'

export default {
  setup() {
    return () => (
      <div class='app-right-view '>
        <router-view />
      </div>
    )
  },
}
