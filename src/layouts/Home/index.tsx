import ViewLeft from '../ViewLeft'
import ViewRight from '../ViewRight'

export default {
  setup() {
    return () => (
      <div class='app-home h-full'>
        <div class='home-box-1 h-full sm:block md:hidden'>
          <ViewLeft />
        </div>
        <div class='home-box-2 h-full sm:hidden md:block hidden'>
          <ViewRight />
        </div>
      </div>
    )
  },
}
