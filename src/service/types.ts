// 做返回类型限制
export interface IDataType<T = any> {
  code: number
  data: T
  message?: string
}
