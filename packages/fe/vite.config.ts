import path from 'path'
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'
const pathSrc = path.resolve(__dirname, 'src')
const beSrc = path.resolve(__dirname, '../be/src')
import mockPlugin from './plugins/mock'
import { visualizer } from 'rollup-plugin-visualizer'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const isBuild = command === 'build'
  const env = loadEnv(mode, process.cwd())
  const devPlugins = []
  const isNeedMock = env.VITE_APP_NEED_MOCK === 'true'

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
    optimizeDeps: {
      include: ['lib'],
    },
    define: {
      __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
      __BUILD_DATE__: JSON.stringify(new Date().toLocaleString()),
    },
    plugins: [react(), mockPlugin(command, isNeedMock), ...devPlugins],
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
        plugins:
          env.VITE_APP_NEED_VISUALIZER === 'true'
            ? [
                visualizer(() => {
                  return {
                    filename: path.join('dist', 'stats.html'),
                    gzipSize: true,
                  }
                }),
              ]
            : [],
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
