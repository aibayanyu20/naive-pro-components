import { dateZhCN, zhCN } from 'naive-ui'
import global from './global/zh-CN'
import pages from './pages/zh-CN'
import routes from './routes/zh-CN'
import settingDrawer from '~/comps/setting-drawer/locales/zh-CN'

export default {
  naive: {
    locale: zhCN,
    dateLocale: dateZhCN,
  },
  ...global,
  ...pages,
  ...routes,
  ...settingDrawer,
}
