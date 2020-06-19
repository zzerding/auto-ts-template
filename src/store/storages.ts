import config from '@/config'
let myLocal: any = storages.create(config.packageName)

/**
 * 
 * @param name 名字
 * @param value 可转为json的数据
 */
export function put(name:string,value:any):boolean{
    try{
        myLocal.put(name,value)
        return true
    }catch (err) {
        log(err)
        return false
    }
 

}
export function get(name:string):any{
   return myLocal && myLocal.get && myLocal.get(name)
}
export function clear(){
    myLocal.clear()
}