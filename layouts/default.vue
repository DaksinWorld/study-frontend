<template>
  <div>
    <Nav v-if="pageY < 800"/>
    <NavLight v-else/>
    <Nuxt/>
    <Message/>
  </div>
</template>
<script>
  export default  {
    data: () => {
      return {
        pageY: null,
      }
    },
    mounted() {
      window.addEventListener('scroll', () => {
        this.pageY = window.pageYOffset
      })
    }
  }
</script>
