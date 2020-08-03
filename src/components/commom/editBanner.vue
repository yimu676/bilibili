<template>
  <div @click="bannerClick">
      <div class="editbanner">
      <span>{{left}}</span>
      <span><slot name="right" /></span>
      </div>
  </div>
</template>

<script>
export default {
  props: ['left'],
  methods: {
    bannerClick () {
      this.$emit('bannerClick')
    }
  }
}
</script>

<style>
.editbanner{
    background-color: white;
    padding: 4.167vw 3.333vw;
    color: #333;
    font-size: 3.889vw;
    border-bottom: 0.278vw solid #eee;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
</style>
