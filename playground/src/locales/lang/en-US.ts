import { dateEnUS, enUS } from 'naive-ui'
import global from './global/en-US'
import pages from './pages/en-US'
import routes from './routes/en-US'
import settingDrawer from '~/comps/setting-drawer/locales/en-US'

export default {
  naive: {
    locale: enUS,
    dateLocale: dateEnUS,
  },
  ...global,
  ...pages,
  ...routes,
  ...settingDrawer,
}
