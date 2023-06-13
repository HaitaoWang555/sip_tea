import path from 'path'
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'
const pathSrc = path.resolve(__dirname, 'src')
const beSrc = path.resolve(__dirname, '../be/src')
import mockPlugin from './plugins/mock'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const isBuild = command === 'build'
  const env = loadEnv(mode, process.cwd())
  const devPlugins = []

  if (!isBuild) {
    devPlugins.push()
  }

  return {
    resolve: {
      alias: {
        '@': pathSrc,
        be: beSrc,
      },
    },
    define: {
      __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
      __BUILD_DATE__: JSON.stringify(new Date().toLocaleString()),
    },
    plugins: [react(), mockPlugin(command), ...devPlugins],
    server: {
      proxy: {
        [env.VITE_APP_BASE_API]: {
          target: env.VITE_APP_BASE_TARGET_GATWAY,
          changeOrigin: true,
          rewrite: (path) => path.replace(env.VITE_APP_BASE_API, '/'),
        },
      },
    },
    build: {
      cssCodeSplit: false,
      minify: 'terser',
      /** 在 build 代码时移除 console.log、debugger 和 注释 */
      terserOptions: {
        compress: {
          drop_console: false,
          drop_debugger: true,
          pure_funcs: ['console.log'],
        },
        output: {
          comments: false,
        },
      },
      rollupOptions: {
        plugins: [],
        output: {
          manualChunks(id) {
            if (
              id.includes('/node_modules/dayjs') ||
              id.includes('/node_modules/lodash') ||
              id.includes('/node_modules/axios')
            ) {
              return 'lib'
            } else if (id.includes('/node_modules/@faker-js/faker')) {
              return 'faker'
            } else if (id.includes('/node_modules/antd')) {
              return 'antd'
            }
          },
        },
      },
    },
  }
})
