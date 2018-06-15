// Import axios so that we can use it in this module
import axios from 'axios'

const state = {
  testcases: []
}

const getters = {
  testcases () {
    return state.testcases
  }
}

const actions = {
  // Async call to API
  async FETCH_DATA ({commit}, params) {
    try {
      
      console.log('testcases: ' + JSON.stringify(params.params))

      const response = await axios.get(
        'http://localhost:3000/testcases/' + params.params.runId
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
    for (let testcase of data) {
      // Push objects with custom keys to state
      console.log('testcase: ' + JSON.stringify(testcase.meta))

      state.testcases.push({
        time: testcase.meta.time,
        title: testcase.meta.tc.name,
        id: testcase.meta.tc.id,
        status: _getStatusForLoglevel(testcase.meta.logLevel), 
        data: {
          tc: testcase.tc

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
