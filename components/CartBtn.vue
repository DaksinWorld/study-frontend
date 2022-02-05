<template>
  <nuxt-link to="/cart">
    <button v-if="theme === 'light'" class="btn-cart btnCartLight">
      Cart
    </button>
    <button v-else class="btn-cart btnCartDark">
      Cart
    </button>
  </nuxt-link>
</template>

<script>
export default {
  props: ['theme']
}
</script>

<style scoped>

.btnCartLight {
  color: rgb(var(--color_primary));
  border: 3px solid rgb(var(--color_primary));
}

.btnCartDark {
  color: rgb(var(--white));
  border: 3px solid rgb(var(--white));
}

.btn-cart {
  border-radius: 5px;
  font-size: 16px;
  padding: 1px 5px 3px 5px;
  background: none;
  font-family: 'Source Sans Pro',serif;
  font-weight: 600;
  transition: color .2s linear, background-color .2s linear;
}

.btn-cart:hover {
  background: white;
  color: rgb(var(--color_primary));
  transition: color .2s linear, background-color .2s linear;
}

</style>
