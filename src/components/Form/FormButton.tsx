import {
  defineComponent,
  ref,
  reactive,
  markRaw,
  defineAsyncComponent,
  h,
  resolveComponent,
} from 'vue'
import './FormButton.scss'

interface Props {
  icon?: string
  type?: string
}

export default defineComponent({
  props: ['icon', 'type'],
  setup(props: Props, { slots }) {
    return () => (
      <div class='form-button'>
        {/* {props.icon} */}
        <div class={['button-box', props.type || 'light']}>
          <div class='button-icon'></div>
          <div class='button-text'>
            {slots.default ? slots.default() : null}
          </div>
        </div>
      </div>
    )
  },
})
