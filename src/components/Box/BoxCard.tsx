import './BoxCard.scss'

interface Props {
  title?: string
  type?: string
}

export default defineComponent({
  props: ['title', 'type'],
  setup(props: Props, { slots }) {
    return () => (
      <div class='box-card'>
        {/* {props.icon} */}
        <div class={'card-outter'}>
          <h3 class={'card-title'}>{props.title}</h3>
          <div class={['card-body']}>
            <div class='card-content'>
              {slots.default ? slots.default() : null}
            </div>
          </div>
        </div>
      </div>
    )
  },
})
