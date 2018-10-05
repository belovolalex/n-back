<template lang="pug">
  .wrap-statistics
    p(v-if="localArr.length") Статистка за день
    p(v-for="(item, i) in showStatistic") {{ i+1 + '.' }} уровень {{ item[0] }} эффективность {{ item[1] }}
    p(v-if="!localArr.length") За сегодня нет статистики
</template>

<script>
export default {
  data() {
    return {
      localArr: []
    }
  },
  computed: {
    showStatistic() {
      let arr = []
      this.$store.getters.showStatistic.forEach(el => arr.push(el.split('/')))
      this.localArr = arr
      return arr
    }
  }
}
</script>
<style lang="stylus">
p
  color #586f86
</style>
