<template lang="pug">
  .results
    line-chart
    p.results__title Results
    .results-block
      p.results__subtitle position: {{ truePosition }}
      .results-block-results
        span.span hit: {{ answers.truePosition }}
        span.span miss: {{ answers.falsePosition }}
    .results-block
      p.results__subtitle color: {{ trueColor }}
      .results-block-results
        span.span hit: {{ answers.trueColor }}
        span.span miss: {{ answers.falseColor }}
    .results-block
      p.results__subtitle persentage
    .results-block
      button(@click="startGame") continue
    .results-block
      p session
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
    answers() {
      return this.$store.getters.getPlayerAnswers
    },
    trueColor() {
      return this.$store.getters.getTrueColor
    },
    truePosition() {
      return this.$store.getters.getTruePosition
    }
  },
  methods: {
    startGame() {
      this.$store.commit('newSession')
    }
  }
  
}
</script>

<style lang="stylus">
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
    background-color #056e88
    color #c1d8f0
    border none
    padding 10px 80px
    letter-spacing 1.3px
</style>
