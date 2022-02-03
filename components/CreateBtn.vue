<template>
  <button class="btn btn-warning my-2">
    <nuxt-link :to="url" class="text-white not-underlined">{{ text }}</nuxt-link>
  </button>
</template>

<script>
export default {
  props: ['url', 'text']
}
</script>

<style scoped>

</style>
