import {
  defineComponent,
  ref,
  reactive,
  markRaw,
  defineAsyncComponent,
  h,
  resolveComponent,
} from 'vue'
import { t } from '@/i18n'
import VTArrowRight from '@/components/Icons/VTArrowRight.vue'
import MenuIconBoard from '@/components/Icons/menus/MenuIconBoard.vue'
import MenuIconList from '@/components/Icons/menus/MenuIconList.vue'
import MenuIconSettings from '@/components/Icons/menus/MenuIconSettings.vue'
import './index.scss'

interface Props {
  path: string
  item: any
}

export default defineComponent({
  props: ['path', 'item'],
  components: {
    MenuIconBoard,
    MenuIconList,
    MenuIconSettings,
  },
  setup(props: Props, { slots }) {
    // const cs = reactive({
    //   MenuIconList: markRaw(defineAsyncComponent(() => import('@/components/Icons/menus/MenuIconList.vue'))),
    // })
    return () => (
      <div>
        {!props.item.meta.isHide ? (
          <div class={['menu', { active: props.path === props.item.path }]}>
            <div class='menu-left'>
              <div class='menu-icon'>
                {/* <i class={['iconfont', `icon-${props.item.meta.icon}`]}></i> */}
                {props.item.meta.icon
                  ? h(resolveComponent(props.item.meta.icon))
                  : h(resolveComponent('MenuIconList'))}
              </div>
              <div class='menu-text'>{t(props.item.meta.text)}</div>
            </div>
            <VTArrowRight class='menu-right' />
          </div>
        ) : null}
      </div>
    )
  },
})
