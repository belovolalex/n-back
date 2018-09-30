<template lang="pug">
  .wrapper-loading(ref="wrapperStart")
    p loading 
      span(ref="dots") . . .
</template>

<script>
import {TextPlugin} from 'gsap/TextPlugin'
import {TweenMax, CSSRulePlugin} from 'gsap/TweenMax'
export default {
  mounted () {
    let wrapperStart = this.$refs.wrapperStart
    TweenMax.to(wrapperStart, 1.7,
    {opacity: 1,
    delay: 0.5,
    ease: Power1.easeNone, repeat: 0, onComplete: this.loading})
  },
  methods: {
    loading() {
      let dots = this.$refs.dots
      TweenMax.to(dots, 2, {
        text: {
          value: ". . .",
          oldClass:"dots-blue",
          newClass:"dots-light"
        },
        delay: 0.5,
        ease:Linear.easeNone,
        repeat: 0,
        repeatDelay: 1,
        onComplete: this.hideLoading
      })
    },
    hideLoading() {
      let wrapperStart = this.$refs.wrapperStart
      TweenMax.to(wrapperStart, 1,
      {
        opacity: 0,
        delay: 1.5,
        display: 'none',
        ease: Power2.easeIn, repeat: 0,
        onComplete: this.startGame
      })
    },
    startGame(){
      this.$store.dispatch('startGame')
    }
  }
}
</script>

<style lang="stylus">
.dots-light
  color #3093f1
.dots-blue
  color #01050b
.wrapper-loading
  color #3093f1
  letter-spacing 1.3px
  text-align center
  padding 10px 50px
  position absolute
  top 50%
  left 50%
  transform translateX(-50%) translateY(-50%)
  background-color rgba(26, 108, 186, 0.09)
  cursor pointer
  opacity 0
  white-space nowrap
</style>
