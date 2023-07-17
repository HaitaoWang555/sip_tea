import type { ServerResponse, IncomingMessage } from 'http'
import url from 'url'
import type { Plugin } from 'vite'
const injectCode = `
import { mocks } from '../../mock/index'
`

function parseJson(req: IncomingMessage): Promise<Record<string, unknown> | null> {
  return new Promise((resolve) => {
    let body = ''
    let jsonStr = null
    req.on('data', function (chunk) {
      body += chunk
    })
    req.on('end', function () {
      try {
        jsonStr = JSON.parse(body)
      } catch (err) {
        jsonStr = null
      }
      resolve(jsonStr)
    })
  })
}

type iParams = {
  query?: Record<string, unknown>
  body?: Record<string, unknown> | null
}

function requestMiddleware() {
  const middleware = async (req: IncomingMessage, res: ServerResponse, next: () => void) => {
    const { mocks } = await import('../mock/index')
    const Url = url.parse(req.url || '', true)
    const params: iParams = {}
    type MockItem = {
      url: string
      type: string
      response: (params: iParams) => void
    }
    const mock = mocks.find((i: MockItem) => i.url === Url.pathname && i.type === req.method?.toLocaleLowerCase())

    if (mock) {
      console.log('request invoke:' + req.url)
      params.query = Url.query
      params.body = await parseJson(req)

      res.setHeader('content-type', 'application/json; charset=utf-8')
      const timer = setTimeout(() => {
        res.end(JSON.stringify(mock.response(Object.assign({}, params.query, params.body))))
        clearTimeout(timer)
      }, 1000)
      return
    }
    next()
  }
  return middleware
}

export default function myPlugin(command: 'build' | 'serve', isNeedMock: boolean): Plugin {
  return {
    name: 'vite-plugin-mock',
    configureServer: async ({ middlewares }) => {
      const middleware = await requestMiddleware()
      middlewares.use(middleware)
    },
    // 在其他钩子中使用存储的配置
    transform(code, id) {
      if (command === 'build' && id.endsWith('/src/utils/prodMock.ts')) {
        // build: 由 Rollup 调用的插件
        return {
          code: isNeedMock ? `${injectCode}\n${code}` : code,
        }
      } else {
        return null
      }
    },
  }
}
