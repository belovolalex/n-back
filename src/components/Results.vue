<template lang="pug">
  .results(v-if="showChart")
    line-chart
    //- p.results__title Результат
    //- .results-block
    //-   p.results__subtitle позиция: {{ answers.truePosition }} из {{ truePosition }} 
    //- .results-block
    //-   p.results__subtitle цвет: {{ answers.trueColor }} из {{ trueColor }}
    .results-block
      p.results__subtitle Эффективность: {{ efficiency }} %
    .results-block
      button(@click="startGame") продолжить
  .results(v-else)
    p В этой игре не было совпадений
    p Попробуйте еще раз
    button.start-game(@click="startGame") играть
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
    margin-left 15%
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
    transition 0.2s
    background-color #0c2d4d
    color #c1d8f0
    border none
    padding 10px 80px
    letter-spacing 1.3px
    cursor pointer
    outline none
    margin-left 10%
    border-radius 5px
  button:hover
    transition 0.2s
    background-color #15497b
  .start-game
    margin-left 15%

</style>
