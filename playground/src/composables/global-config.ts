import type { useDialog, useLoadingBar, useMessage, useNotification } from 'naive-ui'
export interface GlobalConfig{
  dialog?: ReturnType<typeof useDialog>
  loadingBar?: ReturnType<typeof useLoadingBar>
  message?: ReturnType<typeof useMessage>
  notification?: ReturnType<typeof useNotification>
}
const globalConfig = reactive<GlobalConfig>({})

export const useInjectGlobalConfig = (config: GlobalConfig) => {
  Object.assign(globalConfig, config)
}
export const useGlobalConfig = () => {
  return globalConfig
}
