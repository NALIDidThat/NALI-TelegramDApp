import { Telegram } from '@twa-dev/types'

declare global {
  interface Window {
    Telegram?: {
      WebApp: Telegram.WebApp & {
        bg_color?: string
        text_color?: string
        hint_color?: string
        button_color?: string
        button_text_color?: string
      }
    }
  }
}

export {} 