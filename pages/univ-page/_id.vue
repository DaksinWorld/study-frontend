<template>
  <div>
    <div class="wrapper" v-if="data">
      <div class="d-flex flex-row flex-wrap justify-content-center">
        <img class="img" v-if="data.images" :src="imageUrl + data.images[0].url" alt="univ-image">
        <div class="content m-0">
          <h3 class="description">
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
        <h2 class="mx-2">Programs</h2>
        <div class=" d-flex flex-row flex-wrap" v-for="program in programs" :key="program.name">
          <ProgramCard class="m-2" :data="program"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {imageUrl} from "../../assets/data";

export default {
  layout: 'href',
  data: () => {
    return {
      data: [],
      programs: [],
      imageUrl: imageUrl
    }
  },
  async mounted() {
    document.querySelector('body').style.backgroundColor = 'rgb(61, 39, 156)'
    this.data = await this.$axios.$get('/api/univ/find/' + this.$route.query.id)
    if(this.data.name) {
      this.programs = await this.$axios.$post('/api/courses/findPrograms', {category: this.data.name})
    }
  }
}
</script>

<style scoped>
.body {
  background-color: rgb(var(--color_primary)) !important;
}
.description {
  color: var(--light_yellow);
  font-family: Montserrat;
  font-weight: 700;
}

.wrapper {
  padding-top: 100px;
}

.img {
  border-radius: 50%;
  width: 450px;
  height: 450px;
  object-fit: cover;
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

li span {
  color: rgb(var(--green_light));
  font-weight: 700;
}

.content {
  padding: 20px;
  margin-left: 20px;
  background-color: #2b3990;
  width: 100%;
  border-radius: var(--standard_border_radius);
}

.programs {
  margin-top: 15px;
}

.programs h2 {
  color: var(--light_yellow);
  font-weight: 700;
  font-family: Montserrat;
}


@media screen and (max-width: 768px){
  .img {
    width: 330px;
    height: 330px;
    margin: 10px;
  }
}

</style>
