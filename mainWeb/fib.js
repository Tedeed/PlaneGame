/**
 * Created by Tedeed on 2019/5/23.
 */
var onmessage=function(data){            //通过这个函数名 接受主线程传输的数据   （只能是这个函数名）
  a(data)　　　　　　　　　 //　　通过postMessage()这个函数 向主线程传输数据
}
function  a(data) {
  console.log(data.data);     　　　　　//  打印出 hello world
  data="你好，世界";　　　　　　　　　　　　//  在次将数据赋值为 你好，世界
  postMessage(data);
}
