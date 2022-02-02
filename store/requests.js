
export function state() {
  return {
    request: [],
  }
}

export const actions = {
  async getAll({commit}, payload) {
    try {
      const res = await this.$axios.$get('/api/' + payload)
      return res
    } catch (e) {
      console.log(e)
    }
  }
}

export const mutations = {
  setRequests(state, requests) {
    state.requests = requests
  },
  addRequest(state, request) {
    state.requests.push(request)
  }
}

export const getters = {
  requests(state) {
    return state.requests
  }
}
