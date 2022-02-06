<template>
  <article class="card" :style="{backgroundColor: data.color}">
    <nuxt-link :to="`/admission${data.path}?type=${data.title}`">
      <img class="card-image" :src="data.image" :alt="data.name">
      <div class="card-body">
        <div v-html="data.svg" class="svg"></div>
        <h3 class="title">{{data.title}}</h3>
        <h4 class="desc">{{data.description}}</h4>
      </div>
    </nuxt-link>
  </article>
</template>

<script>
export default {
  props: ['data']
}
</script>

<style scoped>

.card {
  height: 550px;
  border-radius: var(--standard_border_radius);
  padding: 0;
  border: 0;
  margin: 40px 80px 40px 0;
  transition: all .1s linear;
}

.card:hover {
  transform: translateY(-30px);
  transition: all .1s linear;
  box-shadow: 0 0 30px rgba(0,0,0,.5);
}

.card-image {
  border-radius: var(--standard_border_radius) var(--standard_border_radius) 0 0;
  height: 55%;
  object-fit: cover;
  border: 0;
  width: 100%;
}

.card-body {
  padding: 10px;
}

.title {
  font-weight: 700;
  font-family: Montserrat,serif;
  font-size: 32px;
  color: white;
}

.desc {
  width: 70%;
  font-size: 18px;
  font-family: 'Source Sans Pro';
  font-weight: 400;
  color: white;
}

.card-badge__icon-svg{
  fill: var(--white_hex);
}

.svg {
  width: 60px;
  height: 60px;
  background: rgba(var(--white), 0.7);
  border-radius: 50%;
}

@media screen and (max-width: 768px){
   .card {
     height: auto;
     margin: 10px;
   }
}

</style>
