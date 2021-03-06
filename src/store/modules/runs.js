// Import axios so that we can use it in this module
import axios from 'axios'

const state = {
  runs: []
}

const getters = {
  runs () {
    return state.runs
  }
}

const actions = {
  // Async call to API
  async FETCH_DATA ({commit}, params) {
    try {
      console.log('runs: ' + JSON.stringify(params.params))

      const response = await axios.get(
        'http://localhost:3000/runs/'
      )
      // Send data to mutations to write/give(mutate) data to state
      commit('RECEIVE_DATA', {data: response.data})
    } catch (error) {
      console.log(error)
    }
  }
}

const mutations = {
  RECEIVE_DATA (state, {data}) {
    // Loop through objects in response data
    for (let run of data) {
      // Push objects with custom keys to state
      console.log(JSON.stringify(run))

      let runObject = {
        time: run.run.meta.time,
        title: run.runId,
        runId: run.run.runId,
        id: run.run.data.message,
        status: _getStatusForLoglevel(run.run.meta.logLevel), 
        data: {
          stepCount: run.run.data.stepCount,
          testCaseCount: run.run.data.stepCount
        }
      }

      state.runs.push(runObject)
      // console.log(runObject)
    }
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}

function _getStatusForLoglevel (logeLevel) {
  console.log(logeLevel)
  if (logeLevel === 'error') {
    return 'FAILED'
  } else if (logeLevel === 'warning') {
    return 'FAILED'
  } else if (logeLevel === 'fatal') {
    return 'FAILED'
  }
  return 'OK'
}
