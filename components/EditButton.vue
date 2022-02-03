<template>
  <button class="btn btn-primary">
    <nuxt-link class="text-white" :to="`/admin/${url}`">
      Edit
    </nuxt-link>
  </button>
</template>

<script>
export default {
  props: ['url']
}
</script>

<style scoped>

</style>
