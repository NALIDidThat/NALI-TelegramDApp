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
        theme_params?: {
          bg_color?: string
          text_color?: string
          hint_color?: string
          link_color?: string
          button_color?: string
          button_text_color?: string
        }
        initData?: string
        initDataUnsafe?: {
          query_id?: string
          user?: {
            id: number
            first_name: string
            last_name?: string
            username?: string
            language_code?: string
          }
          auth_date: number
          hash: string
        }
        version?: string
        platform?: string
        colorScheme?: 'light' | 'dark'
        isExpanded?: boolean
        viewportHeight?: number
        viewportStableHeight?: number
        MainButton?: {
          text: string
          color: string
          textColor: string
          isVisible: boolean
          isActive: boolean
          setText: (text: string) => void
          onClick: (callback: () => void) => void
          offClick: (callback: () => void) => void
          show: () => void
          hide: () => void
          enable: () => void
          disable: () => void
        }
        BackButton?: {
          isVisible: boolean
          onClick: (callback: () => void) => void
          offClick: (callback: () => void) => void
          show: () => void
          hide: () => void
        }
      }
    }
  }
}

export {} 