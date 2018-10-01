<template lang="pug">
  .wrapper-info
    p level: {{ level }}
    p step: {{ step }}
</template>

<script>
export default {
  computed: {
    level() {
      return this.$store.getters.getLevel
    },
    step() {
      return this.$store.getters.getNumStep
    }
  }
}
</script>

<style lang="stylus" scoped>
p
  color #939fab
.wrapper-info
  padding 0 1.3%
</style>
