/**
 * Created by Tedeed on 2019/5/25.
 */
// var playerParams = [0,0]
var onmessage=function(data){            //通过这个函数名 接受主线程传输的数据   （只能是这个函数名）
var screenHeight = 650
  // postMessage(data);　　　　　　　　　　 //　　通过postMessage()这个函数 向主线程传输数据
  var playerLifeCalculator = data.data

  // var tag = playerLifeCalculator.tag
  // if (tag=="planeBulletsParams") {
  // }else if (tag=="playerParams"){
  //
  // }
  if (playerLifeCalculator.tag=="planeBulletsParams"){
    // var bullletsParams = smallPlaneBulletClass01+" "+bulletTop1+" "+currentAcrossTime1+" "+smallPlaneBulletClass02+" "+bulletTop2+" "+currentAcrossTime2+" "+speed+" "+bulletLeft1+" "+bulletLeft2
    var params = playerLifeCalculator.bulletsParams
    var datas = params.split(" ")
      var smallPlaneBulletClass01 = datas[0]
      var bulletTop1 = parseFloat(datas[1])
      var currentAcrossTime1 = parseFloat(datas[2])
      var smallPlaneBulletClass02 = datas[3]
      var bulletTop2 = parseFloat(datas[4])
      var currentAcrossTime2 = parseFloat(datas[5])
      var speed = parseFloat(datas[6])
      var bulletLeft1 = parseFloat(datas[7])
      var bulletLeft2 = parseFloat(datas[8])
 
    var listenAgainstBulletsInterval1 =  setInterval(function () {
      var currentBulletTop1 = speed*(new Date().getTime()-currentAcrossTime1)
      var newBulletTop1 = parseFloat(watchPlayerLife(bulletLeft1,playerParams[0],playerParams[1]))

      if (playerParams[1]>bulletTop1-36) {


        if (currentBulletTop1+bulletTop1 > newBulletTop1 && newBulletTop1 != -1) {
          data = smallPlaneBulletClass01
          postMessage(data)
          // $("." + smallPlaneBulletClass01).remove();
          clearInterval(listenAgainstBulletsInterval1)
        }


      }

      if(currentBulletTop1+bulletTop1>screenHeight) {

        clearInterval(listenAgainstBulletsInterval1)
      }
    },50)

    var listenAgainstBulletsInterval2 = setInterval(function () {
      var currentBulletTop2 = speed*(new Date().getTime()-currentAcrossTime2)
      var newBulletTop2 = parseFloat(watchPlayerLife(bulletLeft2,playerParams[0],playerParams[1]));

      if (playerParams[1]>bulletTop1-36) {


        if (currentBulletTop2+bulletTop2 > newBulletTop2 && newBulletTop2 != -1) {
          data = smallPlaneBulletClass02
          postMessage(data)
          // $("." + smallPlaneBulletClass02).remove();
          clearInterval(listenAgainstBulletsInterval2)
        }

      }
      if(currentBulletTop2+bulletTop2>screenHeight) {
        clearInterval(listenAgainstBulletsInterval2)
      }
    },50)


  }else if(playerLifeCalculator.tag=="playerParams"){
     playerParams = playerLifeCalculator.playerParams

  }





}


function watchPlayerLife(againstBulletLeft,playerPlaneLeft,playerPlaneTop) {

  var playerPlaneWidth = 72
  var againstBulletWidth = 10.8
  if (againstBulletLeft<playerPlaneLeft) {
    if (Math.abs(againstBulletLeft-playerPlaneLeft)<againstBulletWidth) {
      return playerPlaneTop
    }
  }else if(againstBulletLeft>playerPlaneLeft) {
    if (Math.abs(againstBulletLeft-playerPlaneLeft)<playerPlaneWidth) {
      return playerPlaneTop
    }
  }else {
    return playerPlaneTop
  }
  return -1
}
