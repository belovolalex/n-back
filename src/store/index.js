import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
export const store = new Vuex.Store({
  state: {
    currentComp: 'entry',
    numFieldsRows: 3,
    widthGame: '',
    numSteps: null,
    showField: true,
    step: 2000,
    colors: ['crimson', 'greenyellow', 'white', 'indigo', 'darkslategrey'],
    activeColor: '',
    randIntegers: {
      integerRow: null,
      integerField: null
    },
    level: Number(1),
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
    disabledBtnPosition: true,
    valEfficiency: null,
    arrStatistics: []
  },
  getters: {
    getValEfficiency(state) {
      return state.valEfficiency
    },
    getTrueColor(state) {
      if(state.simileValues.color.length >= 1) {
        return state.simileValues.color.length
      } else {
        return 0
      }
    },
    getTruePosition(state) {
      if(state.simileValues.position.length >= 1) {
        return state.simileValues.position.length
      } else {
        return 0
      }
    },
    getArrAnswers(state) {
      let arr = []
      for(let key in state.playerAnswers) {
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
    showStatistic(state) {
      return state.arrStatistics
    }
  },
  mutations: {
    setActiveLevel(state) {
      if(state.simileValues.position.length || state.simileValues.color.length) {
        if(!state.valEfficiency) {
          state.valEfficiency = 0
        }
        let newStatistic = state.level + '/' + state.valEfficiency
        state.arrStatistics.push(newStatistic)
        let str = JSON.stringify(state.arrStatistics)
        localStorage.setItem('statistic', str)
        if(state.valEfficiency < 40) {
          if(state.level <=1) {
            state.level = 1
            localStorage.level = parseInt(state.level)
          } else {
            state.level = parseInt(state.level) - 1
            localStorage.level = state.level
          }
        }
        if(state.valEfficiency >= 80) {
          state.level = parseInt(state.level) + 1
          localStorage.level = state.level
        }
      }
    },
    valEfficiency(state) {
      let trueAnswer = state.playerAnswers.truePosition + state.playerAnswers.trueColor
      let countAllAnswer = state.playerAnswers.truePosition + state.playerAnswers.falsePosition + state.playerAnswers.trueColor + state.playerAnswers.falseColor
      if(trueAnswer) {
        let efficiency = Math.ceil(trueAnswer/countAllAnswer * 100)
        state.valEfficiency = efficiency
      } else {
        state.efficiency = 0
      }
    },
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
    setCurrentCompEntry(state) {
      state.currentComp = 'entry'
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
      state.numSteps = 22 + state.level * 2
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
    countWrongs(state) {
      let wrongPosition = state.simileValues.position.length - state.playerAnswers.truePosition
      state.playerAnswers.falsePosition += wrongPosition
      let wrongColor = state.simileValues.color.length - state.playerAnswers.trueColor
      state.playerAnswers.falseColor += wrongColor
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
      state.colorsArr = []
      state.numSteps = null
      state.valEfficiency = null
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
    },
    initialization(state) {
      // localStorage.clear()
      let date = new Date()
      let today = date.getFullYear() + '.' + date.getMonth() + '.' + date.getDay()
      if(!localStorage.date || localStorage.date != today) {
          state.arrStatistics = []
          localStorage.date = today
          localStorage.level = 1
          state.level = localStorage.level
      } else {
        state.level = localStorage.level
      }
      let statisticFromStorage =  JSON.parse(localStorage.getItem('statistic'))
      if(statisticFromStorage) {
        state.arrStatistics = statisticFromStorage
      }
    },
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
              store.commit('countWrongs')
              store.commit('valEfficiency')
              store.commit('setActiveLevel')
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