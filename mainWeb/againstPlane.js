/**
 * Created by Tedeed on 2019/5/23.
 */

var oW = new Worker('playerCalculator.js');
var nearestPlayerTwoPlanes = ["-1", "-1"]
var planeNo = 1
var totalSmallPlaneNumbers = 7
var totalFlashPlaneNumbers = 22
var totalBigPlaneNumbers = 2
var playerLifeCaculater = new Object();
var smallPlaneOccurInterval = null
var screenHeight = document.documentElement.clientHeight;
var screenWidth = document.documentElement.clientWidth;
var planeOccurSpaceTime = 0
var againstPlanesList = new Array()
var againstPlanesBulletsGroupIndex = new Array()
var againstPlanesBulletsTagPosLeft = new Array()
var againstPlanesBulletsTagPosRight = new Array()
var needShowBulletBubble = [true, 0, 0]
function startOccurPlane() {
  var animateTime = 0
  var planeOccurSpaceTime = 600
  var tempTime = new Date().getTime()

  function occurPlane() {
    requestAnimationFrame(function () {
      if (new Date().getTime() - tempTime >= planeOccurSpaceTime) {
        if (planeNo <= totalSmallPlaneNumbers) {
          var planeOccurObj = new Object();
          planeOccurObj.tag = 'occurPlane'

          var targetTop = Math.random() * 200
          var targetLeft = Math.random() * 300
          planeOccurObj.originLeft = 0
          planeOccurObj.originTop = -144
          planeOccurObj.targetLeft = targetLeft
          planeOccurObj.targetTop = targetTop
          planeOccurObj.planeNumbers = planeNo
          planeOccurObj.planeWidth = 72
          planeOccurObj.planeHeight = 36
          planeOccurObj.planeImg = '../img/red_plane.png'
          planeOccurObj.againstPlaneLife = 12
          planeOccurObj.bulletAnimateTime = 1500
          planeOccurObj.planeAnimateTime = 2000
          planeOccurObj.bulletWidth = 10.8
          planeOccurObj.bulletHeight = 10.8
          planeOccurSpaceTime = 600
          planeOccurObj.planeBulletOccurSpaceTime = 200
          // planeOccurObj.speed = Math.sqrt(Math.pow(Math.abs(planeOccurObj.originLeft-planeOccurObj.targetLeft),2)+Math.pow(Math.abs(planeOccurObj.originTop-planeOccurObj.targetTop),2))/planeOccurObj.planeAnimateTime
          againstPlaneOccur(planeOccurObj, 1)
          planeNo++
          if (planeNo > totalSmallPlaneNumbers + totalFlashPlaneNumbers / 2) {
            planeOccurSpaceTime = 2000
          }
        } else if (planeNo <= totalSmallPlaneNumbers + totalFlashPlaneNumbers / 2) {
          var flag = true
          for (var i = 0; i <= totalSmallPlaneNumbers; i++) {
            if ($("." + "smallPlane" + i).length > 0) {
              flag = false
            }
          }
          if (flag) {

            var planeOccurObj = new Object();
            planeOccurObj.tag = 'occurPlane'
            planeOccurObj.originLeft = -100
            planeOccurObj.originTop = 0
            planeOccurObj.targetTop = screenHeight / 3
            planeOccurObj.targetLeft = screenWidth + 100
            planeOccurObj.planeWidth = 72
            planeOccurObj.planeHeight = 36
            planeOccurObj.planeNumbers = planeNo
            planeOccurObj.planeImg = '../img/white_red_plane.png'
            planeOccurObj.againstPlaneLife = 3
            planeOccurObj.bulletAnimateTime = 1500
            planeOccurObj.planeAnimateTime = 2000
            planeOccurObj.bulletWidth = 10.8
            planeOccurObj.bulletHeight = 10.8
            planeOccurSpaceTime = 300
            planeOccurObj.planeBulletOccurSpaceTime = 200
            planeOccurObj.startTime = new Date().getTime()
            planeOccurObj.planeSpeedLeft = Math.abs(planeOccurObj.originLeft - planeOccurObj.targetLeft) / planeOccurObj.bulletAnimateTime
            planeOccurObj.planeSpeedTop = Math.abs(planeOccurObj.originTop - planeOccurObj.targetTop) / planeOccurObj.bulletAnimateTime
            // planeOccurObj.speed = Math.sqrt(Math.pow(Math.abs(planeOccurObj.originLeft-planeOccurObj.targetLeft),2)+Math.pow(Math.abs(planeOccurObj.originTop-planeOccurObj.targetTop),2))/planeOccurObj.planeAnimateTime
            againstPlaneOccur(planeOccurObj, 2)
            planeNo++

          }
          if (planeNo > totalSmallPlaneNumbers + totalFlashPlaneNumbers / 2) {
            planeOccurSpaceTime = 1000
          }
        } else if (planeNo <= totalSmallPlaneNumbers + totalFlashPlaneNumbers) {
          var flag = true
          for (var i = 0; i <= totalSmallPlaneNumbers; i++) {
            if ($("." + "smallPlane" + i).length > 0) {
              flag = false
            }
          }
          if (flag) {

            var planeOccurObj = new Object();
            planeOccurObj.tag = 'occurPlane'

            planeOccurObj.originLeft = screenWidth + 100
            planeOccurObj.originTop = 0
            planeOccurObj.targetTop = screenHeight / 3
            planeOccurObj.targetLeft = -100
            planeOccurObj.planeWidth = 72
            planeOccurObj.planeHeight = 36
            planeOccurObj.planeNumbers = planeNo
            planeOccurObj.planeImg = '../img/white_red_plane.png'
            planeOccurObj.againstPlaneLife = 3
            planeOccurObj.bulletAnimateTime = 1500
            planeOccurObj.planeAnimateTime = 2000
            planeOccurObj.bulletWidth = 10.8
            planeOccurObj.bulletHeight = 10.8
            planeOccurSpaceTime = 300
            planeOccurObj.planeBulletOccurSpaceTime = 200
            planeOccurObj.startTime = new Date().getTime()

            // planeOccurObj.speed = Math.sqrt(Math.pow(Math.abs(planeOccurObj.originLeft-planeOccurObj.targetLeft),2)+Math.pow(Math.abs(planeOccurObj.originTop-planeOccurObj.targetTop),2))/planeOccurObj.planeAnimateTime
            planeOccurObj.planeSpeedLeft = Math.abs(planeOccurObj.originLeft - planeOccurObj.targetLeft) / planeOccurObj.bulletAnimateTime
            planeOccurObj.planeSpeedTop = Math.abs(planeOccurObj.originTop - planeOccurObj.targetTop) / planeOccurObj.bulletAnimateTime
            againstPlaneOccur(planeOccurObj, 2)
            planeNo++
            if (planeNo > totalSmallPlaneNumbers + totalFlashPlaneNumbers) {
              planeOccurSpaceTime = 3000
            }
          }
        } else if (planeNo <= totalSmallPlaneNumbers + totalFlashPlaneNumbers + totalBigPlaneNumbers) {

          var planeOccurObj = new Object();
          planeOccurObj.tag = 'occurPlane'
          if (planeNo == totalSmallPlaneNumbers + totalFlashPlaneNumbers + totalBigPlaneNumbers - 1) {
            planeOccurObj.originLeft = -screenWidth / 3
            planeOccurObj.targetLeft = (screenWidth - screenWidth / 3 * 2) / 3
          } else {
            planeOccurObj.originLeft = screenWidth
            planeOccurObj.targetLeft = screenWidth - screenWidth / 3 - (screenWidth - screenWidth / 3 * 2) / 3
          }
          planeOccurObj.targetTop = screenWidth / 2 / 3//飞机高度的三分之一
          planeOccurObj.originTop = 0
          planeOccurObj.planeWidth = screenWidth / 3
          planeOccurObj.planeHeight = screenWidth / 3 / 2
          planeOccurObj.planeNumbers = planeNo
          planeOccurObj.planeImg = '../img/against_boss_plane.png'
          planeOccurObj.againstPlaneLife = 300
          planeOccurObj.bulletAnimateTime = 2500
          planeOccurObj.planeAnimateTime = 2000
          planeOccurObj.bulletWidth = 15
          planeOccurObj.bulletHeight = 15
          planeOccurSpaceTime = 300
          planeOccurObj.planeBulletOccurSpaceTime = 200
          planeOccurObj.startTime = new Date().getTime()

          // planeOccurObj.speed = Math.sqrt(Math.pow(Math.abs(planeOccurObj.originLeft-planeOccurObj.targetLeft),2)+Math.pow(Math.abs(planeOccurObj.originTop-planeOccurObj.targetTop),2))/planeOccurObj.planeAnimateTime
          planeOccurObj.planeSpeedLeft = Math.abs(planeOccurObj.originLeft - planeOccurObj.targetLeft) / planeOccurObj.bulletAnimateTime
          planeOccurObj.planeSpeedTop = Math.abs(planeOccurObj.originTop - planeOccurObj.targetTop) / planeOccurObj.bulletAnimateTime
          againstPlaneOccur(planeOccurObj, 3)
          planeNo++
        }
        tempTime = new Date().getTime()
      }
      occurPlane()
    })
  }

  occurPlane()
}

function listenPlayerLife(fireType, speed, currentAcrossTime1, bulletLeft1, bulletTop1, clazz, screenHeight) {

  var currentBulletTop1 = speed * (new Date().getTime() - currentAcrossTime1)

  var newBulletTop1 = parseFloat(watchPlayerLife(bulletLeft1, parseFloat($(".player").css('left')), parseFloat($(".player").css('top'))))

  if (fireType == 1||fireType==3) {
    if (parseFloat($(".player").css('top')) + parseFloat($(".player").css('height')) > bulletTop1 + currentBulletTop1) {
      //-15是微调，降低难度
      if (currentBulletTop1 + bulletTop1 > newBulletTop1 && newBulletTop1 != -1) {
        $("." + clazz).remove()
        if(fireType==3) {
          console.log("fireType 3 remove")
        }
        // $("." + smallPlaneBulletClass01).remove();
        return true
      }
    }
  } else if (fireType == 2) {
    if (parseFloat($(".player").css('top')) + parseFloat($(".player").css('height')) > parseFloat($("." + clazz).css('top'))) {
      if (parseFloat($("." + clazz).css('top')) > newBulletTop1 && newBulletTop1 != -1) {
        $("." + clazz).remove()
        // $("." + smallPlaneBulletClass01).remove();
        return true
      }
    }
  }
  if (currentBulletTop1 + bulletTop1 > screenHeight) {
    $("." + clazz).remove()
    return true
  }
  return false
}
function againstPlaneOccur(planeObj, fireType) {
  var isAgainstPlaneDestroy = false

  var againstPlane1Life = planeObj.againstPlaneLife
  var playerLife = 100
  var clazz = "smallPlane" + planeNo;
  $("#againstPlaneContainer").append("<img class='" + clazz + "' src='" + planeObj.planeImg + "'>")
  $("." + clazz).css({
    "width": planeObj.planeWidth,
    "height": planeObj.planeHeight,
    "position": "absolute",
    "left": planeObj.originLeft + "px",
    "top": planeObj.originTop + "px"
  })


  $("." + clazz).velocity({
    "left": planeObj.targetLeft + "px",
    "top": planeObj.targetTop + "px"
  }, {
    duration: planeObj.planeAnimateTime,
    easing: 'linear',
    complete: function () {
      $("." + clazz).css({
        "left": planeObj.targetLeft + "px",
        "top": planeObj.targetTop + "px"
      })
      if (fireType == 2) {
        isAgainstPlaneDestroy = true
        $("." + clazz).remove()
      } else {
        againstPlaneFire(clazz, fireType, planeObj)
      }
    }
  })
  var outerWatcherInterval = setInterval(function () {
    if ($("." + clazz).length > 0) {
      watchPlaneLife(clazz, 0)
      watchPlaneLife(clazz, 1)
    } else {
      watchPlaneLife(clazz, 0)
      watchPlaneLife(clazz, 1)
      clearInterval(outerWatcherInterval)
    }


  }, 80)
  if (fireType == 2) {
    againstPlaneFire(clazz, fireType, planeObj)
  }
  function againstPlaneFire(clazz, fireType, planeObj) {
    var flashPlaneBulletOnOff = true
    var bulletEnabled = true
    var index = 0
    var animateTimes = 0
    var top = parseFloat($("." + clazz).css("top"))
    var left = parseFloat($("." + clazz).css("left"))
    var width = parseFloat($("." + clazz).css("width"))
    var height = parseFloat($("." + clazz).css("height"))
    var tempIndex = 0
    var screenHeight = document.documentElement.clientHeight;
    var indexList = new Array()
    var checkingIndex = 0
    var pauseShootingInterval = setInterval(function () {
      if (!bulletEnabled && fireType != 2) {
        tempIndex = index
        bulletEnabled = true
      }
    }, 5000)

    var againstPlaneBullet = function (bulletLeft, bulletTop) {
      if (bulletEnabled) {

        index++
        var smallPlaneBulletClass01 = clazz + "01smallPlaneBullet" + index
        var smallPlaneBulletClass02 = clazz + "02smallPlaneBullet" + index
        var bulletLeft1
        var bulletTop1
        var bulletLeft2
        var bulletTop2
        var bulletTargetTop1 = screenHeight
        var bulletTargetTop2 = screenHeight
        var animateTime = planeObj.bulletAnimateTime
        var totalOffset = screenHeight - (top + height)
        var speed = totalOffset / animateTime
        if (index - tempIndex > 7) {
          bulletEnabled = false
        }


        $(".againstBulletContainer").append("<div class='" + smallPlaneBulletClass01 + "'></div><div class='" + smallPlaneBulletClass02 + "'></div>")

        if (fireType == 1) {
          bulletLeft1 = planeObj.targetLeft + planeObj.planeWidth / 4
          bulletTop1 = planeObj.targetTop + planeObj.planeHeight
          bulletLeft2 = planeObj.targetLeft + planeObj.planeWidth / 4 * 2.3
          bulletTop2 = planeObj.targetTop + planeObj.planeHeight

          //动画
          $("." + smallPlaneBulletClass01).css({
            left: bulletLeft1 + "px",
            top: bulletTop1 + "px",
            transition_duration: 0.01,
            transition_property: "all",
            transition_timing_function: "linear",
            height: planeObj.bulletHeight,
            width: planeObj.bulletWidth,
            "background-color": "#FFFF00",
            position: "absolute",
            "border-radius": "5.4px",
          })
          $("." + smallPlaneBulletClass02).css({
            left: bulletLeft2 + "px",
            top: bulletTop2 + "px",
            transition_duration: 0.01,
            transition_property: "all",
            height: planeObj.bulletHeight,
            width: planeObj.bulletWidth,
            "background-color": "#FFFF00",
            position: "absolute",
            "border-radius": "5.4px",

          })
          $("." + smallPlaneBulletClass01)
            .velocity({
              "top": bulletTargetTop1
            }, animateTime, function () {
              $("." + smallPlaneBulletClass01).remove();
            })
          $("." + smallPlaneBulletClass02)
            .velocity({
              "top": bulletTargetTop2
            }, animateTime, function () {
              $("." + smallPlaneBulletClass02).remove();
            })
        } else if (fireType == 2) {
          bulletLeft1 = bulletLeft
          bulletTop1 = bulletTop
          speed = planeObj.planeSpeedTop
          //动画
          // $("." + smallPlaneBulletClass01).css({
          //   left: bulletLeft,
          //   top: bulletTop,
          //   transition_duration: 0.01,
          //   transition_property: "all",
          //   transition_timing_function: "linear",
          //   height: planeObj.bulletHeight,
          //   width: planeObj.bulletWidth,
          //   "background-color": "#FFFF00",
          //   position: "absolute",
          //   "border-radius": "5.4px",
          // })
          flashPlaneBulletAnimate()
          // $("." + smallPlaneBulletClass01)
          //   .velocity({
          //     "top": bulletTargetTop1
          //   },{
          //     easing:'linear',
          //     duration:planeObj.bulletAnimateTime,
          //     complete:function () {
          //       $("." + smallPlaneBulletClass01).remove();
          //     }
          //   })
        } else if (fireType == 3) {
          // $("." + smallPlaneBulletClass01).remove()
          // $("." + smallPlaneBulletClass02).remove()
          //  smallPlaneBulletClass01 = clazz + "01bigPlaneBullet" + index
          //  smallPlaneBulletClass02 = clazz + "02bigPlaneBullet" + index
          // $(".againstBulletContainer").append("<div class='" + smallPlaneBulletClass01 + "'><img class = 'against_dart' src='../img/against_dart.png'></div><div class='" + smallPlaneBulletClass02 + "'><img class = 'against_dart' src='../img/against_dart.png'></div>")
          bulletLeft1 = planeObj.targetLeft + planeObj.planeWidth / 4
          bulletTop1 = planeObj.targetTop + planeObj.planeHeight
          bulletLeft2 = planeObj.targetLeft + planeObj.planeWidth / 4 * 2.3
          bulletTop2 = planeObj.targetTop + planeObj.planeHeight
          // speed = planeObj.planeSpeedTop
          speed = ( bulletTargetTop1-bulletTop1)/animateTime
          // bigPlaneBulletAnimate()

          bigPlaneBulletAnimate()
          rotate()
        }
        var angle = 0
        function rotate() {
          requestAnimationFrame(function () {
            $("." + smallPlaneBulletClass01).css({
              transform:"rotate("+(deg+=15)+"deg)"
            })
            $("." + smallPlaneBulletClass02).css({
              transform:"rotate("+(deg+=15)+"deg)"
            })
            rotate()
          })
        }
        function bigPlaneBulletAnimate() {

          $(".against_dart").css({
            height: planeObj.bulletHeight,
            width: planeObj.bulletWidth
          })
          //动画
          $("." + smallPlaneBulletClass01).css({
            left: bulletLeft1 + "px",
            top: bulletTop1 + "px",
            transition_duration: 0.01,
            transition_property: "all",
            transition_timing_function: "linear",
            height: planeObj.bulletHeight,
            width: planeObj.bulletWidth,
            position: "absolute",
            "background-color":"red",
            "border-radius": "8px",
          })
          $("." + smallPlaneBulletClass02).css({
            left: bulletLeft2 + "px",
            top: bulletTop2 + "px",
            height: planeObj.bulletHeight,
            transition_duration: 0.01,
            transition_property: "all",
            width: planeObj.bulletWidth,
            position: "absolute",
            "background-color":"red",
            "border-radius": "8px",
          })
          var deg = 0

          // rotate()
          // requestAnimationFrame(function () {
          //   var currentTop = parseFloat( $("." + smallPlaneBulletClass01).css('top'))
          //   if(currentTop>=bulletTargetTop1){
          //     $("." + smallPlaneBulletClass01).remove()
          //   }else{
          //     rotateTranslateDart(smallPlaneBulletClass01)
          //   }
          // })
          // requestAnimationFrame(function () {
          //   rotateTranslateDart(smallPlaneBulletClass02)
          // })

          $("." + smallPlaneBulletClass01)
            .velocity({
              "top": bulletTargetTop1
            }, {
              duration:animateTime,
              easing:'linear',
              complete:function () {
                $("." + smallPlaneBulletClass01).remove();
              }
            })
          $("." + smallPlaneBulletClass02)
            .velocity({
              "top": bulletTargetTop2
            },{
              duration:animateTime,
              easing:'linear',
              complete:function () {
                $("." + smallPlaneBulletClass02).remove();
              }
            })
        }



        function flashPlaneBulletAnimate() {
          var time = new Date().getTime()
          requestAnimationFrame(function () {
            $("." + smallPlaneBulletClass01).css({
              left: bulletLeft1,
              //微调50
              top: bulletTop1 - 50 + (time - planeObj.startTime) * speed,
              transition_duration: 0.01,
              transition_property: "all",
              transition_timing_function: "linear",
              height: planeObj.bulletHeight,
              width: planeObj.bulletWidth,
              "background-color": "#FFFF00",
              position: "absolute",
              "border-radius": "5.4px",
            })
            if (parseFloat($("." + smallPlaneBulletClass01).css('top')) < bulletTargetTop1) {
              flashPlaneBulletAnimate()
            } else {
              $("." + smallPlaneBulletClass01).remove()
            }
          })
        }

        var currentAcrossTime1 = new Date().getTime()
        var currentAcrossTime2 = new Date().getTime()


        // var listenAgainstBulletsInterval1 = setInterval(function () {
        //   var a = listenPlayerLife(speed, currentAcrossTime1, bulletLeft1, bulletTop1, smallPlaneBulletClass01, listenAgainstBulletsInterval1, screenHeight);
        //   if (a) {
        //     return listenAgainstBulletsInterval1
        //   }
        // }, 10)
        //
        // var listenAgainstBulletsInterval2 = setInterval(function () {
        //   var b = listenPlayerLife(speed, currentAcrossTime2, bulletLeft2, bulletTop2, smallPlaneBulletClass02, listenAgainstBulletsInterval2, screenHeight);
        //   if(b) {
        //     return listenAgainstBulletsInterval2
        //   }
        // }, 10)

        var bulletMovingOldTime1 = new Date().getTime()

        function bulletCheckingInterval1() {
          requestAnimationFrame(function () {
            var a
            var currentTime = new Date().getTime()
            // if (currentTime - bulletMovingOldTime1 >= 5) {
            //
            // }
            if (fireType == 2) {
              currentAcrossTime1 = planeObj.startTime
            }
            if (fireType == 2) {
              a = listenPlayerLife(fireType, speed, currentAcrossTime1, bulletLeft1, bulletTop1 - parseFloat($(".player").css('height')) / 2 * 3, smallPlaneBulletClass01, screenHeight);
            } else {
              a = listenPlayerLife(fireType, speed, currentAcrossTime1, bulletLeft1, bulletTop1, smallPlaneBulletClass01, screenHeight);
            }

            bulletMovingOldTime1 = currentTime
            if (!a) {
              bulletCheckingInterval1()
            }
          })
        }

        var bulletMovingOldTime2 = new Date().getTime()

        function bulletCheckingInterval2() {
          requestAnimationFrame(function () {
            var b
            var currentTime = new Date().getTime()
            // if (currentTime - bulletMovingOldTime2 >= 5) {
            //
            // }
            b = listenPlayerLife(fireType, speed, currentAcrossTime2, bulletLeft2, bulletTop2, smallPlaneBulletClass02, screenHeight);
            bulletMovingOldTime2 = currentTime
            if (!b) {
              bulletCheckingInterval2()
            }
          })
        }

        //定时检查清除敌方子弹
        bulletCheckingInterval1()
        if (fireType != 2)
          bulletCheckingInterval2()


      }


    }
    var oldTime = new Date().getTime()

    function bulletInterval() {
      requestAnimationFrame(function () {
        if (!isAgainstPlaneDestroy) {
          var currentTime = new Date().getTime()
          if (fireType != 2) {
            if (currentTime - oldTime >= planeObj.planeBulletOccurSpaceTime) {
              againstPlaneBullet(null, null)
              oldTime = currentTime
            }
            bulletInterval()
          } else if (fireType == 2) {
            if (currentTime - oldTime >= 10) {
              var planeOffsetLeft = planeObj.planeSpeedLeft * (new Date().getTime() - planeObj.startTime)
              var planeOffsetTop = planeObj.planeSpeedTop * (new Date().getTime() - planeObj.startTime)
              var planeWidth = planeObj.planeWidth
              var playerWidth = parseFloat($(".player").css('width'))
              var playerLeft = parseFloat($(".player").css('left'))
              var planeLeft;
              if (planeObj.targetLeft > planeObj.originLeft) {
                planeLeft = planeObj.originLeft + planeOffsetLeft
              } else {
                planeLeft = planeObj.originLeft - planeOffsetLeft
              }
              if (planeLeft <= playerLeft) {
                if (Math.abs(planeLeft - playerLeft) < playerWidth) {
                  againstPlaneBullet(planeLeft + planeWidth / 2, planeObj.originTop + planeOffsetTop)
                } else {
                  bulletInterval()
                }
              } else if (planeLeft >= playerLeft) {
                if (Math.abs(planeLeft + planeWidth / 2 - playerLeft) < playerWidth) {
                  againstPlaneBullet(planeLeft + planeWidth / 2, planeObj.originTop + planeOffsetTop)
                } else {
                  bulletInterval()
                }
              }
            }
            oldTime = currentTime

          }
        }
      })

    }

    //定时射出子弹
    bulletInterval()
    // var againstPlaneBulletInterval = setTimeout(againstPlaneBullet,100)

    // setTimeout(watchPlayer,1)
  }

  function watchPlaneLife(clazz, index) {
    var playerBulletWidth
    var playerBulletCenterLeft
    var playerBulletCenterRight
    var playerPlaneTop
    var playerBulletHeight
    var playerPlaneLeft
    var playerBulletsLeft = [0.0, 0.0, 0.0, 0.0, 0.0, 0.0]
    var againstPlaneWidth
    var againstPlaneHeight
    var againstPlaneLeft
    var againstPlaneTop
    var playerLeftBulletSpace;
    playerPlaneTop = parseFloat($(".player").css('top'))
    playerPlaneLeft = parseFloat($(".player").css('left'))
    playerBulletWidth = parseFloat($("#playerBullet").css('width'))
    playerBulletHeight = parseFloat($("#playerBullet").css('height'))
    playerBulletsLeft[0] = playerBulletCenterLeft = parseFloat($(".player").css('left')) + (parseFloat($(".player").css('width')) / 2 - playerBulletWidth / 2) - 10;
    playerBulletsLeft[1] = playerBulletCenterRight = parseFloat($(".player").css('left')) + (parseFloat($(".player").css('width')) / 2 - playerBulletWidth / 2) + 10;
    againstPlaneWidth = parseFloat($("." + clazz).css('width'))
    againstPlaneHeight = parseFloat($("." + clazz).css('height'))
    againstPlaneLeft = parseFloat($("." + clazz).css('left'))
    againstPlaneTop = parseFloat($("." + clazz).css('top'))
    if ("true" == $("." + clazz).attr("data-missile-shot")) {
      againstPlane1Life--
      $("." + clazz).attr("data-missile-shot", "false")
      if (againstPlane1Life <= 0) {
        if (!isAgainstPlaneDestroy) {
          isAgainstPlaneDestroy = true
          destroyAnimate();
        }
      }
    }
    //前提，原有数组元素没有当前元素。
    //1.数组第一个元素不可用，入第一个；2.数组第二个元素为不可用，入第二个;3.数组原有两个元素为可用，则判断。
    if (playerBulletsTop[playerBulletsTop.length - 2] > 0) {
      if (clazz != nearestPlayerTwoPlanes[0] && clazz != nearestPlayerTwoPlanes[1]) {
        if ($("." + nearestPlayerTwoPlanes[0]).length <= 0) {
          nearestPlayerTwoPlanes[0] = clazz
        } else if ($("." + nearestPlayerTwoPlanes[1]).length <= 0) {
          nearestPlayerTwoPlanes[1] = clazz
        } else if ($("." + nearestPlayerTwoPlanes[0]).length > 0 || $("." + nearestPlayerTwoPlanes[1]).length > 0) {
          var betweenPlayerSpace = Math.sqrt(Math.pow(Math.abs(playerPlaneLeft - againstPlaneLeft), 2) + Math.pow(Math.abs(playerPlaneTop - againstPlaneTop), 2))
          var firstNearestPlaneLeft = parseFloat($("." + nearestPlayerTwoPlanes[0]).css('left'))
          var firstNearestPlaneTop = parseFloat($("." + nearestPlayerTwoPlanes[0]).css('top'))
          var secondNearestPlaneLeft = parseFloat($("." + nearestPlayerTwoPlanes[1]).css('left'))
          var secondNearestPlaneTop = parseFloat($("." + nearestPlayerTwoPlanes[1]).css('top'))
          var firstNearestPlaneSpace = Math.sqrt(Math.pow(Math.abs(playerPlaneLeft - firstNearestPlaneLeft), 2) + Math.pow(Math.abs(playerPlaneTop - firstNearestPlaneTop), 2))
          var secondNearestPlaneSpace = Math.sqrt(Math.pow(Math.abs(playerPlaneLeft - secondNearestPlaneLeft), 2) + Math.pow(Math.abs(playerPlaneTop - secondNearestPlaneTop), 2))
          if (betweenPlayerSpace < firstNearestPlaneSpace) {
            nearestPlayerTwoPlanes[0] = clazz
          } else if (betweenPlayerSpace < secondNearestPlaneSpace) {
            nearestPlayerTwoPlanes[1] = clazz
          }
        }
      }
    }
    if (playerBulletsLeft[index] < againstPlaneLeft && Math.abs(playerBulletsLeft[index] - againstPlaneLeft) < playerBulletWidth && playerPlaneTop > againstPlaneTop) {

      var playerBulletTopPos1 = toBeAttack(playerBulletsLeft[index], index, index)
      if (playerBulletTopPos1 != -1) {
        againstPlane1Life--
        if (againstPlane1Life <= 0) {
          if (!isAgainstPlaneDestroy) {
            isAgainstPlaneDestroy = true
            destroyAnimate();
          }
        }
      }
    } else if (playerBulletsLeft[index] >= againstPlaneLeft && Math.abs(playerBulletsLeft[index] - againstPlaneLeft) < againstPlaneWidth && playerPlaneTop > againstPlaneTop) {
      var playerBulletTopPos2 = toBeAttack(playerBulletsLeft[index], index, index)
      if (playerBulletTopPos2 != -1) {
        againstPlane1Life--
        if (againstPlane1Life <= 0) {
          if (!isAgainstPlaneDestroy) {
            isAgainstPlaneDestroy = true
            destroyAnimate();
          }
        }
      }
    } else {
      if (beingAttackAgainstSmallPlanes[index] == clazz) {
        playerBulletsTop[index] = -parseFloat($(".player").css('height'))
        beingAttackAgainstSmallPlanes[index] = ''
      }
    }
    var level2LeftBulletIndex, level2RightBulletIndex

    if (playerBulletsTop[playerBulletsTop.length - 1] == 2) {
      var level2LeftBulletPos
      var level2RightBulletPos
      if (index == 0) {
        level2RightBulletPos = playerPlaneLeft + (parseFloat($(".player").css('width')) - parseFloat($("#playerBullet").css('width'))) / 2 - 20 - (playerPlaneTop - againstPlaneTop) * Math.tan(20 / 180 * Math.PI)
        level2LeftBulletPos = playerPlaneLeft + (parseFloat($(".player").css('width')) - parseFloat($("#playerBullet").css('width'))) / 2 - 30 - (playerPlaneTop - againstPlaneTop) * Math.tan(20 / 180 * Math.PI)
        level2LeftBulletIndex = 2
        level2RightBulletIndex = 3
      } else if (index == 1) {
        level2LeftBulletPos = playerPlaneLeft + (parseFloat($(".player").css('width')) - parseFloat($("#playerBullet").css('width'))) / 2 + parseFloat($("#playerBullet").css('width')) + 20 + (playerPlaneTop - againstPlaneTop) * Math.tan(20 / 180 * Math.PI)
        level2RightBulletPos = playerPlaneLeft + (parseFloat($(".player").css('width')) - parseFloat($("#playerBullet").css('width'))) / 2 + parseFloat($("#playerBullet").css('width')) + 30 + (playerPlaneTop - againstPlaneTop) * Math.tan(20 / 180 * Math.PI)
        level2LeftBulletIndex = 4
        level2RightBulletIndex = 5
      }

      if (againstPlaneLeft <= level2LeftBulletPos && level2LeftBulletPos - againstPlaneLeft < againstPlaneWidth && playerPlaneTop > againstPlaneTop) {
        var playerBulletTopPos3 = toBeAttack(level2LeftBulletPos, index, level2LeftBulletIndex)
        if (playerBulletTopPos3 != -1) {
          againstPlane1Life--
          if (againstPlane1Life <= 0) {
            if (!isAgainstPlaneDestroy) {
              isAgainstPlaneDestroy = true
              destroyAnimate();
            }
          }
        }
      } else if (againstPlaneLeft > level2LeftBulletPos && againstPlaneLeft - level2LeftBulletPos < playerBulletWidth && playerPlaneTop > againstPlaneTop) {
        var playerBulletTopPos4 = toBeAttack(level2LeftBulletPos, index, level2LeftBulletIndex)
        if (playerBulletTopPos4 != -1) {
          againstPlane1Life--
          if (againstPlane1Life <= 0) {
            if (!isAgainstPlaneDestroy) {
              isAgainstPlaneDestroy = true
              destroyAnimate();

            }

          }
        }
      } else {
        if (beingAttackAgainstSmallPlanes[level2LeftBulletIndex] == clazz) {
          playerBulletsTop[level2LeftBulletIndex] = -parseFloat($(".player").css('height'))
          beingAttackAgainstSmallPlanes[level2LeftBulletIndex] = ''
        }
      }

      if (againstPlaneLeft <= level2RightBulletPos && level2RightBulletPos - againstPlaneLeft < againstPlaneWidth && playerPlaneTop > againstPlaneTop) {
        var playerBulletTopPos5 = toBeAttack(level2RightBulletPos, index, level2RightBulletIndex)
        if (playerBulletTopPos5 != -1) {
          againstPlane1Life--
          if (againstPlane1Life <= 0) {
            if (!isAgainstPlaneDestroy) {
              isAgainstPlaneDestroy = true
              destroyAnimate();
            }
          }
        }
      } else if (againstPlaneLeft > level2RightBulletPos && againstPlaneLeft - level2RightBulletPos < playerBulletWidth && playerPlaneTop > againstPlaneTop) {
        var playerBulletTopPos6 = toBeAttack(level2RightBulletPos, index, level2RightBulletIndex)
        if (playerBulletTopPos6 != -1) {
          againstPlane1Life--
          if (againstPlane1Life <= 0) {
            if (!isAgainstPlaneDestroy) {
              isAgainstPlaneDestroy = true
              destroyAnimate();
            }
          }
        }
      } else {
        if (beingAttackAgainstSmallPlanes[level2RightBulletIndex] == clazz) {
          playerBulletsTop[level2RightBulletIndex] = -parseFloat($(".player").css('height'))
          beingAttackAgainstSmallPlanes[level2RightBulletIndex] = ''
        }
      }
    }
    function toBeAttack(leftValue, index, playerBulletIndex) {
      if (beingAttackAgainstSmallPlanes[playerBulletIndex] == '') {
        //第一次重合，修改玩家子弹Y轴坐标，将飞机标记为即将被打
        beingAttackAgainstSmallPlanes[playerBulletIndex] = clazz
        playerBulletsTop[playerBulletIndex] = againstPlaneTop + againstPlaneHeight - 10;
        return 1
      } else {
        if (beingAttackAgainstSmallPlanes[playerBulletIndex] != clazz) {
          var lastPlaneWidth = parseFloat($("." + beingAttackAgainstSmallPlanes[playerBulletIndex]).css('width'))
          var lastPlaneHeight = parseFloat($("." + beingAttackAgainstSmallPlanes[playerBulletIndex]).css('height'))
          var lastPlaneLeft = parseFloat($("." + beingAttackAgainstSmallPlanes[playerBulletIndex]).css('left'))
          var lastPlaneTop = parseFloat($("." + beingAttackAgainstSmallPlanes[playerBulletIndex]).css('top'))
          //上架飞机飞得低，可能被揍
          if (lastPlaneTop >= againstPlaneTop) {

            //上架飞机被揍中
            if (leftValue < lastPlaneLeft && Math.abs(leftValue - lastPlaneLeft) < playerBulletWidth && playerPlaneTop > lastPlaneTop) {

              //上架飞机被揍中
            } else if (leftValue >= lastPlaneLeft && leftValue - lastPlaneLeft < lastPlaneWidth && playerPlaneTop > lastPlaneTop) {

              //上架飞机没挨打,则这架飞机能被揍
            } else {
              beingAttackAgainstSmallPlanes[playerBulletIndex] = clazz
              playerBulletsTop[playerBulletIndex] = againstPlaneTop + againstPlaneHeight - 10;
              return 1
            }
            //这架飞机飞得低，则这架飞机能被揍
          } else {
            beingAttackAgainstSmallPlanes[playerBulletIndex] = clazz
            playerBulletsTop[playerBulletIndex] = againstPlaneTop + againstPlaneHeight - 10;
            return 1
          }
          //这架飞机能继续被揍
        } else {
          return 1
        }
      }
      return -1
    }

    function destroyAnimate() {
      if (clazz == "smallPlane" + 7) {
        showBulletReward(againstPlaneLeft, againstPlaneTop, "bulletBubbleContainer")
      } else if (clazz == 'smallPlane' + 28) {
        showBulletReward(againstPlaneLeft, againstPlaneTop, "missileBubbleContainer")

      }
      var bombWidth = againstPlaneWidth / 2 * 3
      var bombHeight = againstPlaneWidth / 2 * 3
      var bombLeft = againstPlaneLeft + againstPlaneWidth / 2 - bombWidth / 2
      var bombTop = againstPlaneTop + againstPlaneHeight / 2 - bombHeight / 2
      $(".againstBulletContainer").append("<img class='bomb_" + clazz + " ' src='../img/bomb.gif' '>")
      var oldTime = new Date().getTime()
      $(".bomb_" + clazz).css({
        position: "absolute",
        top: bombTop,
        left: bombLeft,
        width: bombWidth,
        height: bombHeight,
        z_index: 2
      })
      function removeBomb() {
        requestAnimationFrame(function () {
          if (new Date().getTime() - oldTime >= 700) {
            $(".bomb_" + clazz).remove()
          } else {
            removeBomb()
          }
        })
      }

      removeBomb()
      $("." + clazz).remove()
      // $("." + clazz).velocity({
      //   opacity: 0
      // }, 400, function () {
      //   $("." + clazz).remove()
      // })

      // playerBulletTopPos[0] = 0
      // playerBulletTopPos[1] = 1
      isAgainstPlaneDestroy = true
    }
  }
}

function showBulletReward(left, top, bubbleClass) {
  $("." + bubbleClass).css({
    "z-index": 1,
    "left": left,
    "top": top,
    "transition-property": "all"
  })
  bulletBubbleFloat(bubbleClass)
  // $(document.body).append("<div class=\"bulletBubbleContainer\"><img src=\"../img/improveBullet.png\" class = 'improveBullet'> <img class=\"bulletBubble\" src=\"../img/bubble.png\"></div>");
}
function bulletBubbleFloat(bubbleClass) {
  var bulletBubbleWidth = parseFloat($("." + bubbleClass).css('width'))
  var bulletBubbleHeight = parseFloat($("." + bubbleClass).css('height'))
  // var timePerOffsetX = 3000/screenWidth
  // var timePerOffsetY = 3000/screenHeight
  var speedX = (screenWidth - bulletBubbleWidth) / 5000
  createRandomMoving(bubbleClass)
}
var angle = Math.random() * 270 - 45
var offset = screenWidth / 4
var time = 1000
var speed = offset / time

var leftOffset = offset * Math.cos(angle)
var topOffset = offset * Math.sin(angle)
var speedX = leftOffset / 1000
var speedY = topOffset / 1000
var originleft = parseFloat($(".bulletBubbleContainer").css('left'))
var originTop = parseFloat($(".bulletBubbleContainer").css('top'))
var bulletBubbleWidth = parseFloat($(".bulletBubbleContainer").css('width'))
var bulletBubbleOldTime = new Date().getTime()
var offsetTime = new Date().getTime()
var bulletBubbleOnOff = true
var bulletBubbleDelay
function createRandomMoving(bubbleClass) {
  var type = Math.random() * 4 + 1
  if (parseInt(type) == 1) {
    moveBulletBubble(1.5, -1.5, bubbleClass)
  } else if (parseInt(type) == 2, bubbleClass) {
    moveBulletBubble(-1.5, -1.5, bubbleClass)
  } else if (parseInt(type == 3)) {
    moveBulletBubble(-1.5, 1.5, bubbleClass)
  } else if (parseInt(type == 4)) {
    moveBulletBubble(1.5, 1.5, bubbleClass)
  } else {
    createRandomMoving(bubbleClass)
  }
}
function moveBulletBubble(offsetLeft, offsetTop, bubbleClass) {
  var flag = hideBubbleIfEaten(bubbleClass)
  requestAnimationFrame(function () {
    if (!flag) {
      var left = parseFloat($("." + bubbleClass).css('left'))
      var top = parseFloat($("." + bubbleClass).css('top'))
      var r = parseFloat($("." + bubbleClass).css('width'))
      left += offsetLeft
      top += offsetTop
      $("." + bubbleClass).css({
        left: left,
        top: top
      })
      if (left <= 1 || left >= screenWidth - r || top <= 1 || top >= screenHeight - r) {
        if (left <= 1 && top <= 1) {
          moveBulletBubble(Math.abs(offsetLeft), Math.abs(offsetTop), bubbleClass);
        } else if (left <= 1 && top >= screenHeight - r) {
          moveBulletBubble(Math.abs(offsetLeft), -Math.abs(offsetTop), bubbleClass)
        } else if (left >= screenWidth - r && top <= 1) {
          moveBulletBubble(-Math.abs(offsetLeft), Math.abs(offsetTop), bubbleClass)
        } else if (left >= screenWidth - r && top >= screenHeight - r) {
          moveBulletBubble(-Math.abs(offsetLeft), -Math.abs(offsetTop), bubbleClass)
        } else if (left <= 1) {
          moveBulletBubble(Math.abs(offsetLeft), offsetTop, bubbleClass)
        } else if (left >= screenWidth - r) {
          moveBulletBubble(-Math.abs(offsetLeft), offsetTop, bubbleClass)
        } else if (top <= 1) {
          moveBulletBubble(offsetLeft, Math.abs(offsetTop), bubbleClass)
        } else if (top >= screenHeight - r) {
          moveBulletBubble(offsetLeft, -Math.abs(offsetTop), bubbleClass)
        }
      } else {
        moveBulletBubble(offsetLeft, offsetTop, bubbleClass)
      }
    }
  })
}
function hideBubbleIfEaten(bubbleClassName) {
  var bulletBubbleWidth = parseFloat($("." + bubbleClassName).css('width'))
  var bulletBubbleLeft = parseFloat($("." + bubbleClassName).css('left'))
  var bulletBubbleTop = parseFloat($("." + bubbleClassName).css('top'))
  var playerWidth = parseFloat($(".player").css('width'))
  var playerHeight = parseFloat($(".player").css('height'))
  var playerLeft = parseFloat($(".player").css('left'))
  var playerTop = parseFloat($(".player").css('top'))
  var xCompare1, xCompare2, yCompare1, yCompare2
  if (playerLeft <= bulletBubbleLeft) {
    xCompare1 = playerLeft
    xCompare2 = bulletBubbleLeft + bulletBubbleWidth
  } else {
    xCompare1 = playerLeft + playerWidth
    xCompare2 = bulletBubbleLeft
  }
  if (playerTop <= bulletBubbleTop) {
    yCompare1 = playerTop
    yCompare2 = bulletBubbleTop + bulletBubbleWidth
  } else {
    yCompare1 = bulletBubbleTop
    yCompare2 = playerTop + playerHeight
  }
  if (Math.abs(xCompare1 - xCompare2) < Math.abs(bulletBubbleWidth + playerWidth) && Math.abs(yCompare1 - yCompare2) < Math.abs(bulletBubbleWidth + playerHeight)) {

    $("." + bubbleClassName).css({
      "z-index": -1,
      "left": -bulletBubbleWidth,
      "top": -bulletBubbleWidth,
      "transition-property": "all"
    })
    if (bubbleClassName == "bulletBubbleContainer") {
      playerBulletsTop[playerBulletsTop.length - 1] = ++playerBulletsTop[playerBulletsTop.length - 1]
    } else if (bubbleClassName == "missileBubbleContainer") {
      playerBulletsTop[playerBulletsTop.length - 2] = ++playerBulletsTop[playerBulletsTop.length - 2]
    }
    return true
  } else {
    return false
  }
}
function watchPlayerLife(againstBulletLeft, playerPlaneLeft, playerPlaneTop) {
  var playerPlaneWidth = 72
  var againstBulletWidth = 10.8
  if (againstBulletLeft < playerPlaneLeft) {
    //playerPlaneLeft-n是为了减少游戏难度
    if (Math.abs(againstBulletLeft - (playerPlaneLeft + 15 )) < againstBulletWidth) {
      return playerPlaneTop
    }
  } else if (againstBulletLeft > playerPlaneLeft) {
    if (Math.abs(againstBulletLeft - (playerPlaneLeft - 15)) < playerPlaneWidth) {
      return playerPlaneTop
    }
  } else {
    return playerPlaneTop
  }
  return -1
}

