import Menu from './Menu'
import Right from './Right'

export default {
  setup() {
    return () => (
      <div class='app-home grid grid-cols-4 gap-0 h-full'>
        <div class='app-home-left col-span-1 h-full py-6 pl-6'>
          <Menu />
        </div>
        <div class='app-home-right col-span-3 h-full p-6'>
          <Right />
        </div>
      </div>
    )
  },
}
