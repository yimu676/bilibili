<template>
  <div>
    <van-field v-model="text" :label="label" :type="type" :placeholder="placeholder" :rule="rule"></van-field>
  </div>
</template>

<script>
export default {
  props: ['label']
}
</script>

<style>
</style>
