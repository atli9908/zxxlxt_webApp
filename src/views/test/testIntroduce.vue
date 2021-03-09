<template>
    <div style="height:100%;">
        <div class="warp">
            <div class="header">
                <span  class="title">Achenbach儿童行为量表</span>
            </div>
            <div class="content">
                <p>
                《Achenbach儿童行为量表》由美国心理学博士Achenbach和他的同道们在儿童精神科临床实践中研制而成。出版于60年代，后于70、80年代二次进行修订。该量表不仅在美国国内被广泛用作儿童行为与心里筛查工具，并在荷兰、泰国、香港、台湾、日本等国家中，引进应用，成为目前世界上较著名的儿童行为筛查量表。
                《Achenbach儿童行为量表》由美国心理学博士Achenbach和他的同道们在儿童精神科临床实践中研制而成。出版于60年代，后于70、80年代二次进行修订。该量表不仅在美国国内被广泛用作儿童行为与心里筛查工具，并在荷兰、泰国、香港、台湾、日本等国家中，引进应用，成为目前世界上较著名的儿童行为筛查量表。
                </p>
            </div>
            <div class="bottomBtn">
                开始测评
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {

        }
    }
}
</script>

<style scoped lang='less'>
.warp{
    margin-top: .1rem;
    background-color:#fff;
    // position: absolute;
    // top: 0.5rem;
    // bottom: 0;
}
.header{
    display: flex;
    justify-content: center;
}
.title{
    font-size: .17rem;
    font-family: Microsoft YaHei;
    font-weight: bold;
    color: #333333;
    margin: .2rem 0;
}
.content{
    padding: 0 30px;
    padding-bottom: 70px;
    p{
        padding-top:15px;
        border-top: 1px solid #ddd;
        font-size: .16rem;
        word-wrap:break-word;
        text-indent: 2em;
        line-height: 28px;
    }
}
.bottomBtn{
    position: fixed;
    bottom: 0;
    font-size: .14rem;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 69px;
    background: #0AA7F4;
}
</style>