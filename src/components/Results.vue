<template lang="pug">
  .results
    p.results__title Results
    .results-block
      p.results__subtitle right answers:
      p color - {{ answers.trueColor }}
      p position - {{ answers.truePosition }}
    .results-block
      p.results__subtitle wrong answers:
      p color - {{ answers.falseColor }}
      p position - {{ answers.falsePosition }}
</template>

<script>
export default {
  computed: {
    answers() {
      return this.$store.getters.getPlayerAnswers
    }
  }
}
</script>

<style lang="stylus">
  .results
    width 100%
  p
    // text-align center
    color #939fab
    margin-left 15%
  .results__title
    margin-left 10%
    margin-bottom 30px
  .results__subtitle
    margin-left 10%
  .results-block
    margin-bottom 25px
</style>
