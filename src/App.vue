<template lang="pug">
  #app
    transition(mode="out-in" name="anim")
      component(v-bind:is="currentComp")
</template>

<script>
import Entry from './components/Entry'
import Game from './components/Game'
import Results from './components/Results'
export default {
  components: {
    Entry,
    Game,
    Results
  },
  name: 'app',
  data () {
    return {

    }
  },
  computed: {
    currentComp() {
      return this.$store.getters.getCurrentComp
    }
  }
}
</script>

<style lang="stylus">
body
  letter-spacing 1.3px
  padding 0
  margin 0
  font-family sans-serif
#app
  height 100vh
  width 100%
  display flex
  background-color #000003
.anim-enter-active, .anim-leave-active
  transition opacity .5s ease
.anim-enter, .anim-leave-to
  opacity 0
</style>
