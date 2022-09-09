import type { App } from 'vue'
import FormButton from './Form/FormButton'

const Components: Record<string, any> = {
  FormButton
}

export function setupComs(app: App<Element>) {
  for (let key in Components) {
    app.component(key, Components[key])
   }
}

export default { }
