<template>
  <div>
    <van-nav-bar :title="$route.meta.title" class="nav-bar">
      <template #left>
        <i class="iconfont icon-cha" style="font-size:.25rem"></i>
      </template>
    </van-nav-bar>
  </div>
</template>

<style lang="less" scoped>
.nav-bar {
  height: 0.43rem;
}
/deep/.van-nav-bar__content {
  height: 0.43rem;
}
/deep/.van-nav-bar__title {
  font-size: 0.17rem;
  width: 13.7rem;
  font-weight: 400;
  color: #000000;
}
.nav-icon {
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 1px;
}
</style>