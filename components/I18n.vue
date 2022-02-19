<template>
  <div>
    <nuxt-link :to="switchLocalePath('en')">En</nuxt-link>
    <nuxt-link :to="switchLocalePath('sp')">Sp</nuxt-link>
  </div>
</template>

<script>
export default {
name: "I18n"
}
</script>

<style scoped>

</style>
