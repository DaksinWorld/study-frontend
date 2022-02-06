<template>
  <div v-if="data">
    <div class="card m-2">
      <img :src="`${imageUrl}${data.images[0].url}`" class="card-img-top" alt="worker-photo">
      <div class="card-body">
        <h3 class="card-title">{{data.firstName}} {{data.secondName}}</h3>
        <h4 class="cart-speciality">{{data.subtitle}}</h4>
        <p class="card-text">{{data.description }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import {imageUrl} from "../assets/data";

export default {
  props: ['data'],
  data: () => {
    return {
      imageUrl: imageUrl
    }
  }
}
</script>

<style scoped>
.card {
  border: 0;
  background-color: #dedfff;
  border-radius: var(--standard_border_radius);
}

.card-img-top {
  border-radius: var(--standard_border_radius)  var(--standard_border_radius) 0 0;
  width: 100%;
  height: 130px;
  object-fit: cover;
}

h3 {
  color: white;
  font-family: Montserrat;
  font-weight: 700;
}
</style>
