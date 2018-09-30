<template lang="pug">
  .wrapper-control
    button position
    button color
</template>

<script>
export default {
  
}
</script>

<style lang="stylus">
.wrapper-control
  display flex
  justify-content space-between
  margin 0 auto
  width calc(100% - 3%)
.wrapper-control
  button:hover
    background-color #0d3d6c
    transition background-color 0.3s
    color #57aafc
  button
    font-weight bold
    cursor pointer
    width 48%
    border none
    outline none
    padding 15px 0
    background-color #1a6cba
    transition background-color 0.3s
    color #a4c8eb
</style>
