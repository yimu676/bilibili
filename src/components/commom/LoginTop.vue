<template>
  <div>
    <div class="LoginTop">
      <div></div>
      <div>{{middleTop}}</div>
      <div>
        <slot name="right" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['middleTop']
}
</script>
<style  lang="less">
.LoginTop {
  height: 45px;
  background-color: white !important;
  display: flex;
  div {
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;
    font-size: 4.444vw;
  }
}
</style>
