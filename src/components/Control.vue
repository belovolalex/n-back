<template lang="pug">
  .wrapper-control
    button(@click="checkPosition"
          :disabled="disabledBtnPosition"
          :class="{'active-btn': disabledBtnPosition}"
          ) position
    button(@click="checkColor"
          :class="{'active-btn': disabledBtnColor}"
          :disabled="disabledBtnColor") color
</template>

<script>
export default {
  computed: {
    disabledBtnColor() {
      return this.$store.getters.getDisabledBtnColor
    },
    disabledBtnPosition() {
      return this.$store.getters.getDisabledBtnPosition
    }
  },
  methods: {
    checkColor() {
     this.$store.commit('checkPlayerColor')
     this.$store.commit('freezeBtnColor')
    },
    checkPosition() {
     this.$store.commit('checkPlayerPosition')
     this.$store.commit('freezeBtnPosition')
    }
  }
}
</script>

<style lang="stylus">
.active-btn
  // background-color #0f3962
  transition 0.2s
  background-color #0c2d4d !important
.wrapper-control
  display flex
  justify-content space-between
  margin 0 auto
  width calc(100% - 3%)
.wrapper-control
  @media (min-width 992px)
    button:hover
      background-color #0d3d6c
      transition background-color 0.1s
      color #57aafc
  button
    font-weight bold
    cursor pointer
    width 48%
    border none
    outline none
    padding 15px 0
    background-color #1a6cba
    // background-color blue
    transition background-color 0.2s
    color #a4c8eb
    letter-spacing 1.3px
</style>
