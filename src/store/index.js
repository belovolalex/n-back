import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
export const store = new Vuex.Store({
  state: {
    currentComp: 'entry',
    numFieldsRows: 1,
    widthGame: '',
    numSteps: '',
    showField: true,
    step: 2000,
    // colors: ['crimson', 'greenyellow', 'mediumvioletred', 'coral', 'orange', 'khaki', 'indigo', 'navy', 'darkslategrey'],
    colors: ['crimson', 'greenyellow'],
    activeColor: '',
    randIntegers: {
      integerRow: null,
      integerField: null
    },
    level: 2,
    activePosition: '',
    colorsArr: [],
    positionsArr: [],
    prevValues: {
      position: [],
      color: []
    },
    simileValues: {
      position: [],
      color: []
    },
    playerAnswers: {
      truePosition: 0,
      falsePosition: 0,
      trueColor: 0,
      falseColor: 0 
    },
    disabledBtnColor: true,
    disabledBtnPosition: true
  },
  getters: {
    getTrueColor(state) {
      if(state.simileValues.color.length >= 1) {
        return state.simileValues.color.length
      } else {
        return 'w'
      }
    },
    getTruePosition(state) {
      if(state.simileValues.position.length >= 1) {
        return state.simileValues.position.length
      } else {
        return 'k'
      }
    },
    getArrAnswers(state) {
      let arr = []
      for(var key in state.playerAnswers) {
        arr.push(state.playerAnswers[key])
      }
      return arr
    },
    getPlayerAnswers(state) {
      return state.playerAnswers
    },
    getDisabledBtnColor(state) {
      return state.disabledBtnColor
    },
    getDisabledBtnPosition(state) {
      return state.disabledBtnPosition
    },
    getCurrentComp(state) {
      return state.currentComp
    },
    getNumFieldsRows(state) {
      return state.numFieldsRows
    },
    getFieldHeight(state) {
      return state.widthGame / state.numFieldsRows
    },
    getActiveColor(state) {
      return state.activeColor
    },
    getStep(state) {
      return state.step
    },
    getLevel(state) {
      return state.level
    },
    getNumStep(state) {
      return state.numSteps
    },
    showField(state) {
      return state.showField
    },
    activeRow(state) {
      return state.randIntegers.integerRow
    },
    activeField(state) {
      return state.randIntegers.integerField
    },
  },
  mutations: {
    disabledBtnColor(state) {
      state.disabledBtnColor = false
    },
    disabledBtnPosition(state) {
      state.disabledBtnPosition = false
    },
    freezeBtnColor(state) {
      state.disabledBtnColor = true
    },
    freezeBtnPosition(state) {
      state.disabledBtnPosition = true
    },
    setCurrentCompGame(state) {
      state.currentComp = 'game'
    },
    setCurrentCompResults(state) {
      state.currentComp = 'results'
    },
    changeShowField(state) {
      state.showField = !state.showField
    },
    setWidthGame (state, ref) {
      state.widthGame = ref.offsetWidth
    },
    activeColor(state) {
      state.activeColor = state.colors[Math.floor(Math.random() * (state.colors.length))]
      state.colorsArr.push(state.activeColor)
    },
    randomNums(state) {
      let randRow = 1 + Math.random() * (state.numFieldsRows + 1 - 1)
      let randField = 1 + Math.random() * (state.numFieldsRows + 1 - 1)
      state.randIntegers.integerRow = Math.floor(randRow)
      state.randIntegers.integerField = Math.floor(randField)
      state.positionsArr.push(String(state.randIntegers.integerField)+String(state.randIntegers.integerRow))
    },
    simile(state) {
      if (state.activePosition == state.prevValues.position) {
        state.simileValues.position.push(state.activePosition)
      }
      if (state.activeColor == state.prevValues.color) {
        state.simileValues.color.push(state.activeColor)
      }

    },
    countSteps (state) {
      // return state.numSteps = state.numFieldsRows * 6
      state.numSteps = 4
    },
    iteration(state, val) {
      if(state.numSteps <= 2) {
        clearInterval(val)
      }
      return state.numSteps--
    },
    activePosition(state) {
      state.activePosition = String(state.randIntegers.integerField) + String(state.randIntegers.integerRow)
    },
    setPrevValues(state) {
      // state.prevValues.position = state.positionsArr[state.positionsArr.length - state.level -1]
      state.prevValues.position = state.positionsArr[state.positionsArr.length -1 - state.level]
      state.prevValues.color = state.colorsArr[state.colorsArr.length -1 - state.level]
    },
    checkPlayerColor(state) {
      if(state.activeColor == state.prevValues.color) {
        state.playerAnswers.trueColor += 1
      } else {
        state.playerAnswers.falseColor += 1
      }
    },
    checkPlayerPosition(state) {
      if(state.activePosition == state.prevValues.position) {
        state.playerAnswers.truePosition += 1
      } else {
        state.playerAnswers.falsePosition += 1
      }
    },
    checkClickBtn(state) {
      window.addEventListener("keydown", function(e) {
        if(e.keyCode == 37) {
          if(!state.disabledBtnPosition) {
            store.commit('checkPlayerPosition')
          }
          state.disabledBtnPosition = true
        }
        if(e.keyCode == 39) {
          if(!state.disabledBtnColor){
            store.commit('checkPlayerColor')
          }
          state.disabledBtnColor = true
        }
      })
    },
    newSession(state) {
      state.activeColor = ''
      state.activePosition = ''
      state.disabledBtnColor = true
      state.disabledBtnPosition = true
      state.currentComp = 'game'
      state.numSteps = null
      state.playerAnswers = {
        truePosition: 0,
        falsePosition: 0,
        trueColor: 0,
        falseColor: 0
      }
      state.positionsArr = []
      state.prevValues = {
        position: [],
        color: []
      }
      state.randIntegers = {
        integerField: null,
        integerRow: null
      }
      state.simileValues = {
        color: [],
        position: []
      }
    }
  },
  actions: {
    startGame(store) {
        setTimeout(()=> {
          store.commit('disabledBtnColor')
          store.commit('disabledBtnPosition')
          store.commit('randomNums')
          store.commit('countSteps')
          store.commit('activeColor')
          store.commit('activePosition')
          store.commit('setPrevValues')
          store.commit('simile')
          
          let interval = setInterval(()=> {
            store.commit('checkClickBtn')
            store.commit('disabledBtnColor')
            store.commit('disabledBtnPosition')
            store.commit('randomNums')
            store.commit('activeColor')
            store.commit('changeShowField')
            store.commit('activePosition')
            store.commit('iteration', interval)
            store.commit('setPrevValues')
            store.commit('simile')
            if(store.getters.getNumStep == 1) {
              setTimeout(()=> {
                store.commit('setCurrentCompResults')
              },2000)
            }
            setTimeout(()=> {
              store.commit('changeShowField')
            })
          }, store.getters.getStep)
        },2000)    
    },

  }
})