<template>
  <div class="wrapper">
    <h1 class="title">Universities</h1>
    <div class="catalog">
      <div class="w-100" v-for="d in data" :key="d.name" >
        <UnivCard class="m-2" :data="d"/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'light',
  data:() => {
    return {
      data: []
    }
  },
  async mounted() {
    this.data = await this.$store.dispatch('requests/getAll', 'univ')
  }
}
</script>

<style scoped>
.wrapper {
  padding: 100px 0;
}

.title {
  color: rgb(var(--color_primary));
  font-weight: 700;
  font-family: 'Source Sans Pro';
}

.catalog {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}

@media screen and (max-width: 1200px){
  .catalog {
    grid-template-columns: 1fr 1fr;
  }
}

@media screen and (max-width: 1024px){
  .catalog {
    grid-template-columns: 1fr;
  }
}

</style>
