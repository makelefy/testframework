import axios from 'axios'

const state = {
  runs: [],
}

const getters = {
  runs() {
    return state.runs
  },
}
const actions = {
  async FETCH_RUNS({ commit }) {
    try {
      const response = await axios.get(
        'http://localhost:8529/_db/log/testframework/runStats/3f2376db-1e68-4a16-a280-f346317ed46f'
      )
      commit('RECEIVE_RUNS', { data: response.data })
    } catch (error) {
      console.log(error)
    }
  },
}

const mutations = {
  // eslint-disable-next-line
  RECEIVE_RUNS(state, { data }) {
    this.state.runs = data
  },
}
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
