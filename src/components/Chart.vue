<script>
import VueCharts from 'vue-chartjs'
import { Doughnut } from 'vue-chartjs'

export default {
  extends: Doughnut,
  mounted () {
    this.renderChart({
      labels: ['hit positions', 'miss positions', 'hit colors', 'miss colors'],
      datasets: [
        {
          label: 'Results',
          backgroundColor: ['#17c0eb','#ff3838', '#67e6dc', '#fb6969'],
          data: this.$store.getters.getArrAnswers
        }
      ]
    }, {responsive: true, maintainAspectRatio: false})
  }
}
</script>

<style>

</style>
