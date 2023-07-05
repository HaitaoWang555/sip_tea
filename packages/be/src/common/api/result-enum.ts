enum ResultCode {
  SUCCESS = 200,
  FAILED = 500,
  LOGIN_FAILED = 500,
  VALIDATE_FAILED = 412,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
  METHOD_BOT_ALLOWED = 405,
  INTERNAL_SERVER_ERROR = 500,
}

enum ResultMessage {
  SUCCESS = '操作成功',
  FAILED = '操作失败',
  LOGIN_FAILED = '登录失败',
  VALIDATE_FAILED = '参数检验失败',
  UNAUTHORIZED = '暂未登录或登录已经过期',
  FORBIDDEN = '没有相关权限',
  BAD_REQUEST = 'Bad Request',
  NOT_FOUND = 'Not Found',
  METHOD_BOT_ALLOWED = 'Method Not Allowed',
  INTERNAL_SERVER_ERROR = 'Internal Server Error',
}

enum Page {
  PAGE_NUM = 1,
  PAGE_SIZE = 20,
}

export { ResultCode, ResultMessage, Page };
