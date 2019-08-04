/**
 * Created by Tedeed on 2019/5/23.
 */
var onmessage=function(data){            //通过这个函数名 接受主线程传输的数据   （只能是这个函数名）
  data="";　　　　　　　　　　　　//  在次将数据赋值为 你好，世界
  setInterval(function () {
    postMessage(data);
  },300)
  　　　　　　　　　　 //　　通过postMessage()这个函数 向主线程传输数据
}
function playerFire() {
  var oW = new Worker('playerPlaneFire.js');
  oW.postMessage(0);
  oW.onmessage = function(ev){
    playerBulletIndex++
    var playerPlaneTop = $(".player").offset().top;
    var playerPlaneLeft = $(".player").offset().left;
    var playerPlaneHeight = parseFloat($(".player").css('height'))
    var playerPlaneWidth = parseFloat($(".player").css('width'))
    var playerBulletCenterLeft1Pos
    var playerBulletCenterLeft2Pos
    var playerBulletNegative20LeftPos, playerBulletNegative20RightPos, playerBulletPositive20LeftPos, playerBulletPositive20RightPos;
    var playerMissileCenterLeft = "playerMissileCenterLeft"+playerBulletIndex
    var playerMissileCenterRight = "playerMissileCenterRight"+playerBulletIndex
    var playerBulletCenterLeft = "playerBulletCenterLeft" + playerBulletIndex
    var playerBulletCenterRight = "playerBulletCenterRight" + playerBulletIndex
    var playerBulletNegative20Left = "playerBulletNegative30Left"+playerBulletIndex
    var playerBulletNegative20Right = "playerBulletNegative30Right"+playerBulletIndex
    var playerBulletPositive20Left =  "playerBulletPositive30Left"+playerBulletIndex
    var playerBulletPositive20Right = "playerBulletPositive30Right"+playerBulletIndex
//      $("#playerBulletContainer").append("<div id='playerBullet' class =\"" + clazz + "\"><img src='img/bullet1.png'><img src='img/bullet1.png'></div>")
    $("#playerBulletContainer").append("<img id='playerBullet' src='../img/bullet1.png' class =\"" + playerBulletCenterLeft + "\">")
    $("#playerBulletContainer").append("<img id='playerBullet' src='../img/bullet1.png' class =\"" + playerBulletCenterRight + "\">")
    playerBulletCenterLeft1Pos = playerPlaneLeft + (parseFloat($(".player").css('width')) - parseFloat($("#playerBullet").css('width'))) / 2-10
    playerBulletCenterLeft2Pos = playerPlaneLeft + (parseFloat($(".player").css('width')) - parseFloat($("#playerBullet").css('width'))) / 2+10
    $("." + playerBulletCenterLeft).css({
      "transition-property":"all",
      left:playerBulletCenterLeft1Pos,
      top: playerPlaneTop - parseFloat($(".player").css('height')) / 2
    })
    $("." + playerBulletCenterRight).css({
      "transition-property":"all",
      left:playerBulletCenterLeft2Pos,
      top: playerPlaneTop - parseFloat($(".player").css('height')) / 2
    })
    if(playerBulletsTop[playerBulletsTop.length-2]>0) {
      $("#playerBulletContainer").append("<img id='playerBullet' src='../img/improveMissile.png' class =\"" + playerMissileCenterLeft + "\">")
      $("#playerBulletContainer").append("<img id='playerBullet' src='../img/improveMissile.png' class =\"" + playerMissileCenterRight + "\">")
      var centerLeftMissileXPos = playerPlaneLeft-23
      var centerRightMissileXPos = playerPlaneLeft+playerPlaneWidth
      var centerLeftMissileYPos = playerPlaneTop
      var centerRightMissileYPos = playerPlaneTop
      $("." +playerMissileCenterLeft).css({
        "width":23,
        "transform":"rotate(45deg)",
        left:centerLeftMissileXPos ,
        top: centerLeftMissileYPos
      })
      $("." + playerMissileCenterRight).css({
        "width":23,
        "transform":"rotate(45deg)",
        left:centerRightMissileXPos,
        top:centerRightMissileYPos
      })
      if($("."+nearestPlayerTwoPlanes[0]).length>0&&$("."+nearestPlayerTwoPlanes[1]).length>0){
        missileOffsetAnimate(nearestPlayerTwoPlanes[0],centerLeftMissileXPos,"centerLeftMissile",playerMissileCenterLeft)
        missileOffsetAnimate(nearestPlayerTwoPlanes[1],centerRightMissileXPos,"centerRightMissile",playerMissileCenterRight)
      }else if($("."+nearestPlayerTwoPlanes[0]).length>0){
        missileOffsetAnimate(nearestPlayerTwoPlanes[0],centerLeftMissileXPos,"centerLeftMissile",playerMissileCenterLeft)
        missileOffsetAnimate(nearestPlayerTwoPlanes[0],centerRightMissileXPos,"centerRightMissile",playerMissileCenterRight)
      }else if($("."+nearestPlayerTwoPlanes[1]).length>0){
        missileOffsetAnimate(nearestPlayerTwoPlanes[1],centerLeftMissileXPos,"centerLeftMissile",playerMissileCenterLeft)
        missileOffsetAnimate(nearestPlayerTwoPlanes[1],centerRightMissileXPos,"centerRightMissile",playerMissileCenterRight)
      }else{
        missileOffsetAnimate("",centerLeftMissileXPos,"centerLeftMissile",playerMissileCenterLeft)
        missileOffsetAnimate("",centerRightMissileXPos,"centerRightMissile",playerMissileCenterRight)
      }

    }
    if(playerBulletsTop[playerBulletsTop.length-1]==2) {
      $("#playerBulletContainer").append("<img id='playerBullet' src='../img/bullet1.png' class =\"" + playerBulletNegative20Left + "\">")
      $("#playerBulletContainer").append("<img id='playerBullet' src='../img/bullet1.png' class =\"" + playerBulletNegative20Right + "\">")
      $("#playerBulletContainer").append("<img id='playerBullet' src='../img/bullet1.png' class =\"" + playerBulletPositive20Left + "\">")
      $("#playerBulletContainer").append("<img id='playerBullet' src='../img/bullet1.png' class =\"" + playerBulletPositive20Right + "\">")
      playerBulletNegative20LeftPos = playerPlaneLeft + (parseFloat($(".player").css('width')) - parseFloat($("#playerBullet").css('width'))) / 2-30
      playerBulletNegative20RightPos = playerPlaneLeft + (parseFloat($(".player").css('width')) - parseFloat($("#playerBullet").css('width'))) / 2-20
      playerBulletPositive20LeftPos = playerPlaneLeft + (parseFloat($(".player").css('width')) - parseFloat($("#playerBullet").css('width'))) / 2+parseFloat($("#playerBullet").css('width'))+20
      playerBulletPositive20RightPos = playerPlaneLeft + (parseFloat($(".player").css('width')) - parseFloat($("#playerBullet").css('width'))) / 2+parseFloat($("#playerBullet").css('width'))+30
      $("." + playerBulletNegative20Left).css({
        "transition-property":"all",
        left:playerBulletNegative20LeftPos,
        top: playerPlaneTop - parseFloat($(".player").css('height')) / 2,
        transform:"rotate(-20deg)"
      })
      $("." + playerBulletNegative20Right).css({
        "transition-property":"all",
        left:playerBulletNegative20RightPos,

        top: playerPlaneTop - parseFloat($(".player").css('height')) / 2,
        transform:"rotate(-20deg)"
      })
      $("." + playerBulletPositive20Left).css({
        "transition-property":"all",
        left:playerBulletPositive20LeftPos,
        top: playerPlaneTop - parseFloat($(".player").css('height')) / 2,
        transform:"rotate(20deg)"
      })
      $("." +playerBulletPositive20Right).css({
        "transition-property":"all",
        left:playerBulletPositive20RightPos,
        top: playerPlaneTop - parseFloat($(".player").css('height')) / 2,
        transform:"rotate(20deg)"
      })
    }
    // $("." + playerBulletCenterLeft).animate({
    //   top: playerBulletsTop[0]
    // }, 300, "linear", function () {
    //   $("." + playerBulletCenterLeft).remove();
    //   if (playerBulletIndex > 26) {
    //     playerBulletIndex = 0
    //   }
    // })
    // $("." + playerBulletCenterRight).animate({
    //   top: playerBulletsTop[1]
    // }, 300, "linear", function () {
    //   $("." + playerBulletCenterRight).remove();
    //   if (playerBulletIndex > 26) {
    //     playerBulletIndex = 0
    //   }
    // })
    function missileOffsetAnimate(againstPlaneClass, missileLeftValue,tag,missileClass) {
      var targetPlaneLeft = parseFloat($("."+againstPlaneClass).css('left'))+parseFloat($("."+againstPlaneClass).css('width'))/2-parseFloat($("."+missileClass).css('width'))/2
      var targetPlaneTop = parseFloat($("."+againstPlaneClass).css('top'))+parseFloat($("."+againstPlaneClass).css('height'))-3
      var missileEnabled = false
      if(againstPlaneClass==""){
        if(tag=="centerLeftMissile"){
          targetPlaneLeft = missileLeftValue-40
          targetPlaneTop = playerPlaneTop-screenHeight
        }else if(tag=="centerRightMissile"){
          targetPlaneLeft = missileLeftValue+40
          targetPlaneTop = playerPlaneTop-screenHeight
        }
        missileEnabled = true
      }else if(againstPlaneClass!=""){
        if(parseFloat($(".player").css('top'))-parseFloat($(".player").css('height'))<=targetPlaneTop){
          if(tag=="centerLeftMissile"){
            targetPlaneLeft = missileLeftValue-40
            targetPlaneTop = playerPlaneTop-screenHeight
          }else if(tag=="centerRightMissile"){
            targetPlaneLeft = missileLeftValue+40
            targetPlaneTop = playerPlaneTop-screenHeight
          }
        }
        missileEnabled = true

      }
      if(missileEnabled) {
        if(tag=="centerLeftMissile"){
          $("."+missileClass).velocity({
            top:parseFloat($(".player").css('top'))-parseFloat($(".player").css('height')),
            left:missileLeftValue-20
          },200,function () {
            $("."+missileClass).velocity({
              left:targetPlaneLeft,
              top:targetPlaneTop
            },600,function () {
              $("."+againstPlaneClass).attr('data-missile-shot',"true")
              $("."+missileClass).remove()
            })
          })
        }else if(tag=="centerRightMissile"){
          $("."+missileClass).velocity({
            top:parseFloat($(".player").css('top'))-parseFloat($(".player").css('height')),
            left:missileLeftValue+20
          },200,function () {
            $("."+missileClass).velocity({
              left:targetPlaneLeft,
              top:targetPlaneTop
            },600,function () {
              $("."+againstPlaneClass).attr('data-missile-shot',"true")
              $("."+missileClass).remove()
            })
          })
        }
      }

    }
    function bulletsOffsetAnimate(clazz,deg,bulletLeft,bulletTypeIndex) {
      $("."+clazz)
        .velocity({
          top:playerBulletsTop[bulletTypeIndex],
          left:bulletLeft+Math.abs(parseFloat($(".player").css('top'))-playerBulletsTop[bulletTypeIndex])*Math.tan(deg/180*Math.PI)
        },{
          duration:500,
          easing:'linear',
          complete:function () {
            $("." + clazz).remove();
            if (playerBulletIndex > 26) {
              playerBulletIndex = 0
            }
          }
        })
      // requestAnimationFrame(function () {
      //   var bulletLeft = parseFloat($("."+clazz).css('left'))
      //   var bulletTop = parseFloat($("."+clazz).css('top'))
      //   if(bulletTop>playerBulletsTop[bulletTypeIndex]){
      //     $("."+clazz).css({
      //       top:bulletTop+topOffset,
      //       left:bulletLeft+Math.abs(topOffset)*Math.tan(deg/180*Math.PI)
      //     })
      //     bulletsOffsetAnimate(clazz,deg,topOffset,bulletTypeIndex)
      //   }else{
      //     $("." + clazz).remove();
      //     if (playerBulletIndex > 26) {
      //       playerBulletIndex = 0
      //     }
      //   }
      //
      //
      // })
      // $("."+clazz)
      // .velocity({
      //   left:playerBulletCenterLeft1Pos,
      //   top: playerPlaneTop - parseFloat($(".player").css('height')) / 2
      // })
      //   .velocity({
      //     top: playerBulletsTop[0]
      //   },500,function () {
      //     $("." + playerBulletCenterLeft).remove();
      //     if (playerBulletIndex > 26) {
      //       playerBulletIndex = 0
      //     }
      //   })
    }
    bulletsOffsetAnimate(playerBulletCenterLeft,0,playerBulletCenterLeft1Pos,0)
    // $("."+playerBulletCenterLeft)
      // .velocity({
      //   left:playerBulletCenterLeft1Pos,
      //   top: playerPlaneTop - parseFloat($(".player").css('height')) / 2
      // })
      // .velocity({
      //   top: playerBulletsTop[0]
      // },500,function () {
      //   $("." + playerBulletCenterLeft).remove();
      //   if (playerBulletIndex > 26) {
      //     playerBulletIndex = 0
      //   }
      // })
    bulletsOffsetAnimate(playerBulletCenterRight,0,playerBulletCenterLeft2Pos,1)
    // $("."+playerBulletCenterRight)
      // .velocity({
      //   left:playerBulletCenterLeft2Pos,
      //   top: playerPlaneTop - parseFloat($(".player").css('height')) / 2
      // })
      // .velocity({
      //   top: playerBulletsTop[1]
      // },500,function () {
      //   $("." + playerBulletCenterRight).remove();
      //   if (playerBulletIndex > 26) {
      //     playerBulletIndex = 0
      //   }
      // })
      if(playerBulletsTop[playerBulletsTop.length-1]==2) {
        var bulletVerticalOffset = parseFloat($(".player").css('top'))
        var playerBulletNegative20RightTarget = playerBulletCenterLeft1Pos-bulletVerticalOffset*Math.tan(20/180*Math.PI)
        var playerBulletNegative20LeftTarget = playerBulletNegative20RightTarget-(20/Math.cos(10/180*Math.PI))
        var playerBulletPositive20LeftTarget = playerBulletCenterLeft2Pos+bulletVerticalOffset*Math.tan(20/180*Math.PI)
        var playerBulletPositive20RightTarget = playerBulletPositive20LeftTarget+(20/Math.cos(10/180*Math.PI))
        // var playerBulletNegative20Left
        // var playerBulletNegative20Right
        // var playerBulletPositive20Left
        // var playerBulletPositive20Right
        // $("."+playerBulletNegative20Left)
        //   .velocity({
        //     top: playerBulletsTop[2],
        //     left:playerBulletNegative20LeftTarget
        //   },500,function () {
        //     $("." + playerBulletNegative20Left).remove();
        //     if (playerBulletIndex > 26) {
        //       playerBulletIndex = 0
        //     }
        //   })
        bulletsOffsetAnimate(playerBulletNegative20Left,-20,playerBulletNegative20LeftPos,2)
        // $("."+playerBulletNegative20Right)
        //   .velocity({
        //     top: playerBulletsTop[3],
        //     left:playerBulletNegative20RightTarget
        //   },500,function () {
        //     $("." + playerBulletNegative20Right).remove();
        //     if (playerBulletIndex > 26) {
        //       playerBulletIndex = 0
        //     }
        //   })
        bulletsOffsetAnimate(playerBulletNegative20Right,-20,playerBulletNegative20RightPos,3)
        // $("."+playerBulletPositive20Left)
        //   .velocity({
        //     top: playerBulletsTop[4],
        //     left:playerBulletPositive20LeftTarget
        //   },500,function () {
        //     $("." + playerBulletPositive20Left).remove();
        //     if (playerBulletIndex > 26) {
        //       playerBulletIndex = 0
        //     }
        //   })
        bulletsOffsetAnimate(playerBulletPositive20Left,20,playerBulletPositive20LeftPos,4)
        // $("."+playerBulletPositive20Right)
        //   .velocity({
        //     top: playerBulletsTop[5],
        //     left:playerBulletPositive20RightTarget
        //   },500,function () {
        //     $("." +playerBulletPositive20Right).remove();
        //     if (playerBulletIndex > 26) {
        //       playerBulletIndex = 0
        //     }
        //   })
        bulletsOffsetAnimate(playerBulletPositive20Right,20,playerBulletPositive20RightPos,5)
      }
  };


}

