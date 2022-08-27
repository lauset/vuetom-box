import { onMounted } from 'vue'

export default {
  setup() {
    onMounted(() => {})
    return () => (
      <div class='app-navbar h-8 w-full px-10 mt-8 absolute'>Navbar</div>
    )
  },
}
