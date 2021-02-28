/**
 * 根据babel的配置文件替换表达式的名称
 */
module.exports=function({type:babelTypes}){
return {
    name:'demo',
    visitor:{
        Identifier(path,state){
            let name = path.node.name;
            if(state.opts[name]){//如果当前声明的名称命中配置中的名称
                path.node.name = state.opts[name];//替换为配置中的名称
            }
        }
    }
}
}