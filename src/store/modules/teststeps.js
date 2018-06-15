// Import axios so that we can use it in this module
import axios from 'axios'

const state = {
  teststeps: []
}

const getters = {
  teststeps () {
    return state.teststeps
  }
}

const actions = {
  // Async call to API
  async FETCH_DATA ({commit}, params) {
    try {
      console.log('teststeps: ' + JSON.stringify(params.params))

      const response = await axios.get(
        'http://localhost:3000/teststeps/' + params.params.testcaseId
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
    for (let teststeps of data) {
      // Push objects with custom keys to state
      console.log('teststeps: ' + JSON.stringify(teststeps.meta))

      state.teststeps.push({
        time: teststeps.meta.time,
        title: teststeps.meta.step.name,
        id: teststeps.meta.step.id,
        status: _getStatusForLoglevel(teststeps.logLevel), 
        data: {
          teststeps
        }
      })
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
