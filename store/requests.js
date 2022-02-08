
export function state() {
  return {
    request: [],
  }
}

export const actions = {
  async getAll({commit}, payload) {
    try {
      const res = await this.$axios.$get('/api/' + payload, {
        "Access-Control-Allow-Origin": "http://80.87.111.180:3000"
      })
      return res
    } catch (e) {
      console.log(e)
    }
  },

  async checkJwt() {
    try {
      await this.$axios.$get('/api/product/checkJwt', {headers: {
          Authorization: `Bearer ` + localStorage.getItem('jwt'),
        }})
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
