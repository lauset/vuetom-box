import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'
import ViewLeft from '../ViewLeft'
import ViewRight from '../ViewRight'

export default {
  setup() {
    const breakpoints = useBreakpoints(breakpointsTailwind)
    const mdAndLarger = breakpoints.greaterOrEqual('md')
    return () => (
      <div class='app-home h-full'>
        {/* <div class='home-box-1 h-full sm:block md:hidden'>
          <ViewLeft />
        </div> */}
        {mdAndLarger.value ? (
          <div class='home-box-1 h-full hidden'></div>
        ) : (
          <div class='home-box-1 h-full block'>
            <ViewLeft />
          </div>
        )}
        {/* <div class='home-box-2 h-full sm:hidden md:block hidden'>
          {mdAndLarger.value}
          <ViewRight />
        </div> */}
        {mdAndLarger.value ? (
          <div class='home-box-2 h-full block'>
            <ViewRight />
          </div>
        ) : (
          <div class='home-box-2 h-full hidden'></div>
        )}
      </div>
    )
  },
}
