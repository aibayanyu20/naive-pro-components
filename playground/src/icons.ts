import type { App } from 'vue'
import { SettingOutlined } from '@vicons/antd'
export const useIcons = (app: App) => {
  app.component(SettingOutlined.name, SettingOutlined)
}
