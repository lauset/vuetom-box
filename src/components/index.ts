import FormButton from './Form/FormButton'
import BoxCard from './Box/BoxCard'
import type { App } from 'vue'

const Components: Record<string, any> = {
  FormButton,
  BoxCard,
}

export function setupComs(app: App<Element>) {
  for (const key in Components) {
    app.component(key, Components[key])
  }
}

export default {}
