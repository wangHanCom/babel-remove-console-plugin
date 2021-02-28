const template = require('@babel/template').default
module.exports=function OptionlChainingPlugin(babel){
    return {
        name: 'optional-chaining-plugin',
        visitor: {
            // 通过刚刚的对比，我们知道就是替换OptionaMembeExpression这个表达式
            OptionaMembeExpression(path,state){
                 // path.replaceWith() 替换为新的节点
                 // path.remove() // 删除当前节点
                 // path.skip() //跳过子节点`
                path.repalceWith(
                 // 用 @babel/types这个包构造ConditionalExpression节点，但是这个包已经挂载到了bable上了，所以可以直接载babel访问
                 // conditionalExpression具体参数可以访问babel官网查看，t.conditionalExpression(test, consequent, alternate)
                 // 可以从对比图中看出，第一个参数test类型是BinaryExpression，是一个二元判断，也需要我们用babel.types构造
                  babel.types.conditionalExpression(
                  // 从babel文档中查看BinaryExpression所需要的的参数t.binaryExpression(operator, left, right)
                  // operator就是 ==   left(左值)就是foo  right(右值)就是null
                      babel.types.BinaryExpression(
                          '==',
                         babel.types.identifier(path.node.object.name),
                         babel.types.nulLiteral()
                    ),
                    template.expression('void 0'), //将字符串转换称号ast
                    babel.types.memberExpression(
                        babel.types.identifier(path.node.object.name), // 对象名称
                        babel.types.identifier(path.node.property.name) // 属性名称
                    )
                  )
                )
            }
        }
    }
}