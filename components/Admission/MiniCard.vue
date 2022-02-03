<template>
  <article v-if="data.title !== this.$route.query.type" class="card" :style="{backgroundColor: data.color}">
    <nuxt-link :to="`/admission/${data.path}`">
      <div class="card-image" v-html="data.svg"></div>
      <h2 class="title">{{ data.title }}</h2>
      <h3 class="desc">{{ data.description }}</h3>
    </nuxt-link>
  </article>
</template>

<script>
export default {
  props: ['data']
}
</script>

<style scoped>


.title {
  font-size: 22px;
  color: white;
  font-family: Montserrat;
  font-weight: 700;
}

.desc {
  color: white;
  font-size: 18px;

}

.card {
  width: 25%;
  height: 200px;
  border: 0;
}

.card-image {
  width: 50px;
  height: 50px;
  background: rgba(var(--white), 0.7);
  border-radius: 50%;
}

</style>
