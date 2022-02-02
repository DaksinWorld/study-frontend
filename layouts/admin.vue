<template>
  <div>
    <nav>
      <div class="wrapper">
        <nuxt-link to="/admin">Admin</nuxt-link>
        <nuxt-link to="/">Site</nuxt-link>
      </div>
    </nav>
    <Nuxt/>
    <Message/>
  </div>
</template>

<script>
export default {
  layout: 'admin'
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
