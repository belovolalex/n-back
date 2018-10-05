<template lang="pug">
  .results(v-if="showChart")
    line-chart(
      :width="300"
      :height="300"
    )
    .results-block
      p.results__subtitle Эффективность: {{ efficiency }} %
    .results-block
      button(@click="startGame") продолжить
    .results-block
      button(@click="goToEntry") на гавную
  .results(v-else)
    p В этой игре не было совпадений
    p Попробуйте еще раз
    button.btn(@click="startGame") играть
    button.btn(@click="goToEntry") на гавную

</template>

<script>
import LineChart from './Chart'
export default {
  components: {
    LineChart
  },
  data() {
    return {
      
    }
  },
  computed: {
    showChart() {
      if(this.$store.getters.getTruePosition || this.$store.getters.getTrueColor) {
        return true
      }
    },
    answers() {
      return this.$store.getters.getPlayerAnswers
    },
    trueColor() {
      return this.$store.getters.getTrueColor
    },
    truePosition() {
      return this.$store.getters.getTruePosition
    },
    efficiency() {
      if(this.$store.getters.getValEfficiency > 0) {
        return this.$store.getters.getValEfficiency
      } else {
        return 0
      }
    }
  },
  methods: {
    startGame() {
      this.$store.commit('newSession')
    },
    goToEntry() {
      this.$store.commit('newSession')
      this.$store.commit('setCurrentCompEntry')

    }
  }
  
}
</script>

<style lang="stylus" scoped>
  .results
    width 100%
    padding-top 50px
  p
    color #939fab
    margin-left 10%
  .results__title
    margin-left 10%
    margin-bottom 25px
  .results__subtitle
    margin-left 10%
    margin-bottom 10px
  .results-block
    margin-bottom 25px
  .span
    color #939fab
    width 150px
  .results-block-results
    display flex
    margin-left 15%
  button
    @media(max-width 400px)
      margin-left auto
      margin-right auto
      width 90%
    margin-bottom 20px
    display block
    width 300px
    margin-left 10%
    transition 0.2s
    background-color #0c2d4d
    color #c1d8f0
    border none
    padding 10px
    letter-spacing 1.3px
    outline none
    border-radius 5px
    cursor pointer
  button:hover
    transition 0.2s
    background-color #15497b
</style>
