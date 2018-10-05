<template lang="pug">
  .wrapper-entry(ref="wrapperEntry")
    .entry
      p.btn-start(
        ref="btnStart"
        @click="startGame"
      ) играть
    modal(
      name="regulations"
      :adaptive="true"
      :max-width="1000"
      :max-height="500"
      width="90%"
      height="80%"
      transition="nice-modal-fade"
    )
      span.close-popup(@click="hideRules") &#x274C;
      regulations
    modal(
      name="statistics"
      :adaptive="true"
      :max-width="1000"
      :max-height="500"
      width="90%"
      height="80%"
      transition="nice-modal-fade"
    )
      span.close-popup(@click="hideStatistics") &#x274C;
      statistics
    .rules
      p(@click="showRules") правила
      p(@click="showStatistics") статистика
</template>

<script>
import {TweenMax, CSSRulePlugin} from 'gsap/TweenMax'
import Regulations from './Regulations'
import Statistics from './Statistics'
export default {
  components: {
    Regulations,
    Statistics
  },
  data() {
    return {
      showModal: false
    }
  },
  mounted() {
    let wrapperEntry = this.$refs.wrapperEntry
    let btnStart = this.$refs.btnStart
    TweenMax.to(wrapperEntry, 1.5, {backgroundColor:"#000003",
    ease:Linear.easeNone, repeat: 0, onComplete: this.showStart})
    TweenMax.to(btnStart, 1, {backgroundColor:"#0c2d4d",
    ease:Linear.easeNone, repeat: 0, delay: 1, onComplete: this.pulsationBtn})
  },
  methods: {
    showRules() {
      this.$modal.show('regulations')
    },
    hideRules(){
      this.$modal.hide('regulations')
    },
    showStatistics() {
      this.$modal.show('statistics')
    },
    hideStatistics() {
      this.$modal.hide('statistics')
    },
    pulsationBtn() {
      let btnStart = this.$refs.btnStart
      TweenMax.to(btnStart, 1, {backgroundColor:"#1c5a96",
      ease:Linear.easeNone, repeat: -1, yoyo: true})
    },
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
        onComplete: this.setCompGame,
      })
    },
    setCompGame() {
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
  color #000003
.btn-start
  background-color transparent
  color #939fab
  cursor pointer
  width 60px
  height 60px
  text-align center
  line-height 60px
  border-radius 50%
  padding 12px
.rules p:hover
  color #c3d1df
  transition 0.2s
.rules p
  transition 0.2s
  margin 10px
.rules
  color #939fab
  position absolute
  right 10px
  top 5px
  cursor pointer
.v--modal-overlay .v--modal-box
  overflow auto
.v--modal-overlay
  background rgba(0, 0, 0, 0.6)
.close-popup:hover
  color #fc2b05
  transition 0.2s
.close-popup
  transition 0.2s
  position absolute
  color tomato
  padding 4px
  right 0
  top 0
  font-size 14px
  cursor pointer
.v--modal-box.v--modal
  padding 10px
  box-shadow none
  background-color #eaeef1
</style>
