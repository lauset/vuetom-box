import { ask, confirm, message } from '@tauri-apps/api/dialog'

type dialogOptions = {
  title: string
  text: string
  type: 'info' | 'warning' | 'error'
}

const askDialog = ({
  title = 'Tauri',
  text = 'Ask?',
  type = 'info',
}: dialogOptions) => {
  return ask(text, { title, type })
}

const confirmDialog = ({
  title = 'Tauri',
  text = 'Confirm?',
  type = 'warning',
}: dialogOptions) => {
  return confirm(text, { title, type })
}

const messageDialog = ({
  title = 'Tauri',
  text = 'Message',
  type = 'error',
}: dialogOptions) => {
  return message(text, { title, type })
}

export { askDialog, confirmDialog, messageDialog }
