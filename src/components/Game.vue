<template lang="pug">
  .game(ref="game")
    .rows
      loading
      .wrapper-row(
        v-for="index in getNumFieldsRows"
        :style="{height: getFieldHeight + 'px' }"
      )
        .wrapper-field(
          v-for="idx in getNumFieldsRows"
        )
          transition(name="fade" mode="out-in")
            .field(
              v-if="showField"
              :style= "[activeRow == index && activeField == idx ? {background: getActiveColor } : '']"
            )
    control
    info
</template>

<script>
import {mapGetters} from 'vuex'
import Info from './Info'
import Control from './Control'
import Loading from './Loading'

export default {
  data() {
    return {
      windowWidth: null
    }
  },
  components: {
    Control,
    Loading,
    Info,
  },
  computed: {
    ...mapGetters ([
      'getNumFieldsRows',
      'getFieldHeight',
      'getActiveColor',
      'activeRow',
      'activeField',
      'showField',

    ]),
  },
  mounted() {
    let game = this.$refs.game
    this.$store.commit('setWidthGame', game)
    window.addEventListener('resize', () => this.$store.commit('setWidthGame', game))
  }
}
</script>

<style lang="stylus">
.rows
  display flex
  flex-direction column
  margin-bottom 20px
  position relative
.wrapper-row:not(:last-child):before
  position:absolute
  bottom -1px
  left 1.7%
  width:96.5%
  height 1px
  background-color grey
  content:""
.wrapper-row:not(:last-child)
  position relative
.wrapper-row
  display flex

.wrapper-field
  position relative
.wrapper-row:first-child
  .wrapper-field:not(:last-child):before
    position absolute
    width 1px
    height 95%
    content ''
    background-color grey
    right 0px
    top 5.5%
.wrapper-row:not(:first-child)
  .wrapper-field:not(:last-child):before
    position absolute
    width 1px
    height 100%
    content ''
    background-color grey
    right 0px
    top 5%
.wrapper-row:last-child
  .wrapper-field:not(:last-child):before
    position absolute
    width 1px
    height 95%
    content ''
    background-color grey
    right 0px
    top 0%  
.wrapper-field:not(:last-child)
  position relative
.wrapper-field
  width 100%
  display flex
.field
  width 90%
  height 90%
  margin auto

.fade-enter-active, .fade-leave-active
  transition opacity .6s ease
.fade-enter, .fade-leave-to
  opacity 0
.game
  width 100%
  max-width 400px
  margin auto
  background-color #000003
</style>
