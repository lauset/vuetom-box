import { onMounted } from 'vue'
import { appWindow } from '@tauri-apps/api/window'

import ToolbarMin from '@/components/Icons/ToolbarMin.vue'
import ToolbarMax from '@/components/Icons/ToolbarMax.vue'
import ToolbarClose from '@/components/Icons/ToolbarClose.vue'

import './index.scss'

export default {
  setup() {
    const setToolbarEvents = () => {
      document
        .getElementById('titlebar-minimize')!
        .addEventListener('click', () => appWindow.minimize())
      document
        .getElementById('titlebar-maximize')!
        .addEventListener('click', () => appWindow.toggleMaximize())
      document
        .getElementById('titlebar-close')!
        .addEventListener('click', () => appWindow.close())
    }

    onMounted(() => {
      setToolbarEvents()
    })
    return () => (
      <div data-tauri-drag-region class='app-toolbar'>
        <div class='titlebar-button' id='titlebar-minimize'>
          <ToolbarMin />
        </div>
        <div class='titlebar-button' id='titlebar-maximize'>
          <ToolbarMax />
        </div>
        <div class='titlebar-button' id='titlebar-close'>
          <ToolbarClose />
        </div>
      </div>
    )
  },
}
