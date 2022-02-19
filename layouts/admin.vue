<template>
  <div>
    <nav>
      <div class="wrapper">
        <nuxt-link to="/admin">Admin</nuxt-link>
        <nuxt-link to="/">Site</nuxt-link>
        <button @click="logout" class="btn">
          logout
        </button>
      </div>
    </nav>
    <Nuxt/>
    <Message/>
  </div>
</template>

<script>
export default {
  layout: 'admin',
  methods: {
    logout(){
      localStorage.removeItem('jwt')
      location.reload()
    }
  }
}
</script>

<style scoped>
a {
  margin: 0 10px;
}

nav {
  position: static;
}
</style>
