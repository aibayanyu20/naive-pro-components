import { fileURLToPath } from 'url'
import { resolve } from 'path'
import type { ConfigEnv } from 'vite'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import Unocss from 'unocss/vite'
const packageDir = fileURLToPath(new URL('../packages', import.meta.url))

export default ({ mode }: ConfigEnv) => {
  const env = loadEnv(mode, process.cwd())
  return defineConfig({
    resolve: {
      alias: {
        '@naive-vue/pro-table': resolve(packageDir, 'table/src'),
        '@naive-vue/pro-field': resolve(packageDir, 'field/src'),
        '@naive-vue/pro-form': resolve(packageDir, 'form/src'),
        '~@': fileURLToPath(new URL('src', import.meta.url)),
        '~': fileURLToPath(new URL('src', import.meta.url)),
        'vue-i18n': `vue-i18n/dist/${mode === 'development' ? 'vue-i18n.esm-browser.js' : 'vue-i18n.esm-browser.prod.js'}`,
      },
    },
    plugins: [
      vue({
        reactivityTransform: true,
      }),
      vueJsx(),
      AutoImport({
        imports: [
          'vue',
          'vue/macros',
          'vue-router',
          'vue-i18n',
          '@vueuse/core',
          'pinia',
        ],
        dts: 'types/auto-imports.d.ts',
        dirs: [
          'src/stores',
          'src/composables',
        ],
        vueTemplate: true,
      }),
      Components({
        resolvers: [
          NaiveUiResolver(),
        ],
        extensions: ['vue'],
        dts: 'types/components.d.ts',
        include: [/\.vue$/, /\.vue\?vue/],
      }),
      Unocss(),
    ],
    server: {
      proxy: {
        [env.VITE_APP_BASE_API]: {
          target: env.VITE_APP_BASE_URL,
          changeOrigin: true,
          ws: false,
          rewrite: path => path.replace(new RegExp(`^${env.VITE_APP_BASE_API}`), ''),
        },
      },
    },
  })
}
