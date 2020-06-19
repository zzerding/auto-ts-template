//数据库驱动 数据持久化
importClass('android.database.sqlite.SQLiteDatabase')
importClass('android.content.ContentValues')
importClass('android.content.Context')
importClass('android.database.Cursor')
export default class SqlQuery {
  name: string
  path: string
  db: any
  tableName: string | null
  /**
   * 
   * @param fileName 数据库文件名
   */
  constructor (fileName: string = 'data.db') {
    this.name = fileName
    // this.path = files.path(this.name)
    this.path = '/sdcard/db/' + this.name
    console.info('数据库地址',this.path)
    if (!files.exists(this.path)) {
      files.createWithDirs(this.path)
    }
    this.db = null
    this.tableName = null
  }
  /**
   * 
   * @param tableName 创建数据表
   */
  creat (tableName: string) {
    this.open()
    this.tableName = tableName
    let sqlStr = `CREATE TABLE IF NOT EXISTS '${tableName}' (
    'id' INTEGER PRIMARY KEY AUTOINCREMENT, 
    'name' TEXT NOT NULL)`
    this.db.execSQL(sqlStr)
  }
  /**
   * 
   * @param param object{列名：数据} {name:name}
   */
  insert (param:{[prop:string]:any}):number {
    this.open()
    let cv = new ContentValues()
    for (const key in param) {
      if (param.hasOwnProperty(key)) {
        cv.put(key, param[key])
      }
      
    }
    // 插入数据
    let num = this.db.insert(this.tableName, null, cv)
    this.close()
    return num
  }
  open (): any {
    if (this.db) return null
    this.db = SQLiteDatabase.openOrCreateDatabase(this.path, null)
    return this.db
  }
  /**
   * 查询指定数据
   * @param columName 列名
   * @param value     数据
   */
  query(columName:string, value:string):string[]{
    this.open()
    let sqlStr = `SELECT * from  ${this.tableName} WHERE ${columName}='${value}'`
    let cursor = this.db.rawQuery(sqlStr, null)
    let result = []
    if (cursor.getCount()) {
      cursor.moveToFirst()
      do {
          result.push(cursor.getString(0))
          continue
      } while (cursor.moveToNext())
    }
    cursor.close()
    this.close()
    return result
  }
  /**
   * 
   * @param colum 查询指定列，如果为*为示为所有列
   */
  queryColum (colum = 'name'): Array<any> {
    this.open()
    let sqlStr = `SELECT ${colum} from  ${this.tableName}`
    let cursor = this.db.rawQuery(sqlStr, null)
    let result = []
    // toastLog('共有' + cursor.getCount() + '条记录')
    if (cursor.getCount()) {
      cursor.moveToFirst()
      do {
        if (cursor.getColumnCount() == 1) {
          result.push(cursor.getString(0))
          continue
        }
        let tmp = []
        for (let index = 0; index < cursor.getColumnCount(); index++) {
          tmp.push(cursor.getString(index))
        }
        result.push(tmp)
      } while (cursor.moveToNext())
    }
    cursor.close()
    this.close()
    return result
  }
  // 删除指定数据
  remove (columName,value:string):boolean {
    this.open()
    let result = this.db.delete(this.tableName,`${columName}="${value}"`,null)
    this.close()
    return result
  }
  clear():boolean{
    this.open()
    let result = this.db.delete(this.tableName,null,null)
    this.close()
    return result
  }
  close (): void {
    this.db.close()
    this.db = null
  }
}
