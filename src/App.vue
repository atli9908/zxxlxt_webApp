<template>
  <div id="app">
    <header-nav></header-nav>
    <router-view />
  </div>
</template>

<script>
//字体适应
(function(doc, win) {
  let docEle = doc.documentElement,
    resizeEvt = "orientationchange" in window ? "orientationchange" : "resize",
    recalc = function() {
      var clientWidth = docEle.getBoundingClientRect().width;
      if (!clientWidth) return;
      docEle.style.fontSize = clientWidth / 3.75 + "px";
    };

  if (!doc.addEventListener) return;
  win.addEventListener(resizeEvt, recalc, false);
  doc.addEventListener("DOMContentLoaded", recalc, false);
})(document, window);

// 禁止用户缩放浏览器
// window.onload = function() {
//   document.body.addEventListener('touchmove', function(event) {
//     if (event.touches.length > 1) {
//       event.preventDefault();
//     }
//   }, false); 
//   document.addEventListener('touchstart', function(event) {
//     event.preventDefault();
//   }, false);
//   document.addEventListener('gesturestart', function(event) {
//     event.preventDefault();
//   }, false);
// }

export default {
  name: "App",
  components: {}
};
</script>

<style>
* {
  font-family: "Microsoft YaHei", Arial, "Helvetica Neue", Helvetica, sans-serif;
  /* touch-action: none; */
}
html,
body {
  height: 100%;
  width: 100%;
  background: rgb(245, 245, 245);
  padding: 0;
  margin: 0;
}
p {
  padding: 0;
  margin: 0;
}
/* 表单自动填充样式 */
input:-webkit-autofill {
  -webkit-box-shadow: 0 0 0px 1000px white inset;
}
</style>


