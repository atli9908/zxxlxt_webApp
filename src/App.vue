<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>

//字体适应
(function(doc, win){
  let docEle = doc.documentElement,
      resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
      recalc = function () {
          var clientWidth = docEle.getBoundingClientRect().width;
          if (!clientWidth) return;
          docEle.style.fontSize = clientWidth / 3.75 + 'px';
      };

      if (!doc.addEventListener) return;
      win.addEventListener(resizeEvt, recalc, false);
      doc.addEventListener('DOMContentLoaded', recalc, false);

})(document, window);

// 禁止用户缩放浏览器
window.onload = function() {
  document.body.addEventListener('touchmove', function(event) {
    if (event.touches.length > 1) {
      event.preventDefault();
    }
  }, {passive: false}); 
  document.addEventListener('touchstart', function(event) {
    event.preventDefault();
  }, {passive: false});
  document.addEventListener('gesturestart', function(event) {
    event.preventDefault();
  }, {passive: false});
}

export default {
  name: 'App',
  components: {
    
  }
}
</script>

<style>
*{
  font-family: "Microsoft YaHei",Arial, "Helvetica Neue", Helvetica, sans-serif;
}
html,body{
  height: 100%;
  width: 100%;
  padding: 0;
  margin: 0;
}
p{
  padding: 0;
  margin: 0;
}
</style>


