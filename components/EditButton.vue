<template>
  <button class="btn btn-primary">
    <a class="text-white" :href="`/admin/${url}`">
      Edit
    </a>
  </button>
</template>

<script>
export default {
  props: ['url']
}
</script>

<style scoped>

</style>
