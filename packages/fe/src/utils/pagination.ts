export class Pagination {
  constructor(pageNum = 1, pageSize = 10) {
    this.pageNum = pageNum
    this.pageSize = pageSize
  }

  pageNum: number
  pageSize: number
}
