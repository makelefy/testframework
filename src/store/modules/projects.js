const state = {
  projects: [
    {
      title: 'Projekt RI-Kern',
      projectId: '1a2sc32',
      type: 'project',
      status: 'OK',
      data: {
        'test cases': 45,
        runs: 2,
        tables: 0
      }
    }
  ]
}

const getters = {
  projects () {
    return state.projects
  }
}
const actions = {}

const mutations = {

}
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
