// 数据库操作实例
import DB from '@/components/DB'
import config from '@/config'
let name = config.dbName
let db = new DB(name)
db.creat('aj_user')
/**
 * 插入数据库
 * @param name 插入名字
 */
export function insert (name: string) {
  return db.insert({ name: name })
}
/**
 * 查询数据为库
 * @param columName 查询的列名
 * @param value 查询的数据
 */
export function query (columName, value):string[] {
  return db.query(columName, value)
}

export function queryAll () {
  return db.queryColum('*')
}
export function queryAllName () {
  return db.queryColum('name')
}
export function remove (name) {
  return db.remove('name', name)
}
export function clear () {
  return db.clear()
}
