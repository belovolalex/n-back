<template lang="pug">
  .wrapper-entry(ref="wrapperEntry")
    .entry
      p.btn-start(ref="btnStart"
                  @click="startGame"
                  ) play
</template>

<script>
import {TweenMax, CSSRulePlugin} from 'gsap/TweenMax'
export default {
  data() {
    return {
    }
  },
  mounted() {
    let wrapperEntry = this.$refs.wrapperEntry
    let btnStart = this.$refs.btnStart
    TweenMax.to(wrapperEntry, 1.5, {backgroundColor:"#000003",
    ease:Linear.easeNone, repeat: 0, onComplete: this.showStart})
    TweenMax.to(btnStart, 1, {backgroundColor:"#07134a",
    ease:Linear.easeNone, repeat: 0, delay: 1})
  },
  methods: {
    startGame() {
      let btnStart = this.$refs.btnStart
      TweenMax.to(btnStart, 1.5,{
        css:{
          scale: 0,
        },
        ease: Power1.easeIn, repeat: 0
      })
      TweenMax.to(btnStart, 1,{
        css:{
          display:'none'
        },
        onComplete: this.callCompGame,
      })
    },
    callCompGame() {
      this.$store.commit('setCurrentCompGame')
    }
  }
}
</script>

<style lang="stylus">
.wrapper-entry
  width 100%
  height 100vh
  background-color white
  display flex
.entry
  margin auto
.btn-start:hover
  background-color #3093f1 !important
.btn-start
  background-color transparent
  color white
  cursor pointer
  width 60px
  height 60px
  text-align center
  line-height 60px
  border-radius 50%
  padding 12px
</style>
