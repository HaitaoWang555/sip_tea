import { constantRoutesPath } from '@/routes'

export function findPathByKey(tree: any, key: any, path: any): any {
  // 第一层把 path 定为 []
  if (!path) {
    path = []
  }
  // 对 传入的 tree 进行循环
  for (let index = 0; index < tree.length; index++) {
    const element = tree[index]
    // 存储已经找到的路径
    const tempPath = [...path]
    tempPath.push(element.key)
    // 在循环中找到与传入ID相同的 便 返回已经记录的 路径
    if (element.key === key) {
      return tempPath
    }
    // 如果 此节点下有 子节点 便进行递归查找
    if (element.children && element.children.length > 0) {
      const result = findPathByKey(element.children, key, tempPath)
      if (result) return result
    }
  }
}

export function findItemInTree(tree: any[], key: any, urls: any[]): any {
  for (let index = 0; index < tree.length; index++) {
    const element = tree[index]
    if (key === element.path && hasPermission(urls, element)) {
      return element
    }
    if (element.children && element.children.length > 0) {
      const result = findItemInTree(element.children, key, urls)
      if (result) return result
    }
  }
}

export function hasPermission(urls: (string | undefined)[], route: any) {
  return constantRoutesPath.includes(route.path || '') || urls.includes(route.path || '')
}

export function flatTree(tree: any[], result: any[]) {
  for (let index = 0; index < tree.length; index++) {
    const element = tree[index]
    result.push(element)
    if (element.children && element.children.length > 0) {
      flatTree(element.children, result)
    }
  }
}
