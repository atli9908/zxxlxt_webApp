<template>
    <div class="wrap">
        <van-loading type="spinner" size="32px" class="load" color="#1989fa"/>
    </div>
</template>

<style scoped>
.wrap{
    display: flex;
    justify-content: center;
}
.load{
    position: absolute;
    top: 150px;
    z-index: 1001;
}
</style>