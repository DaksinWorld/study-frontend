<template>
  <div class="container">
    <form @submit.prevent="SubmitHandler">
      <div class="form-group">
        <label for="exampleInputEmail1">Email address</label>
        <input v-model="email" type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
        <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">Password</label>
        <input v-model="password" type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    async SubmitHandler() {
      try {
        const response = await this.$axios.$post('/api/auth/login', {login: this.email, password: this.password})
        localStorage.setItem('jwt', response.access_token)
        location.reload()
      } catch (e) {
        this.$store.dispatch('setMessage', {
          value: e.message,
          type: 'warning'
        })
      }
    }
  }
}
</script>

<style scoped>

</style>

