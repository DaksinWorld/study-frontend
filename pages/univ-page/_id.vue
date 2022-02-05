<template>
  <div class="body">
    <div class="wrapper d-flex flex-row" v-if="data">
      <img class="img" v-if="data.images" :src="imageUrl + data.images[0].url" alt="univ-image">
      <div class="content">
        <h3>
          {{data.description}}
        </h3>
        <ul>
          <li>
            City
            <span>{{data.location}}</span>
          </li>
          <li>
            Founded
            <span>{{data.founded}}</span>
          </li>
          <li>
            Int'l Students
            <span>{{data.intStudents}}</span>
          </li>
          <li>
            Faculty
            <span>{{data.faculty}}</span>
          </li>
          <li>
            Total Students
            <span>{{data.totalStudents}}</span>
          </li>
          <li>
            Established By
            <span>{{data.name}}</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="programs">

    </div>
  </div>
</template>

<script>
import {imageUrl} from "../../assets/data";

export default {
  data: () => {
    return {
      data: [],
      imageUrl: imageUrl
    }
  },
  async mounted() {
    this.data = await this.$axios.$get('/api/univ/find/' + this.$route.query.id)
  }
}
</script>

<style scoped>
.body {
  background-color: rgb(var(--color_primary)) !important;
}

.wrapper {
  padding-top: 100px;
}

.img {
  border-radius: var(--standard_border_radius);
  border: 1px solid black;
}

ul {

  padding: 2px;
}

li {
  display: flex;
  flex-direction: column;
  color: var(--gray_light);
  font-family: 'Source Sans Pro',serif;
  font-weight: 600;
  padding: 5px;
}

</style>
