<template>
  <div>
    <input type="search" class="form-control my-2" v-model="searchValueName" placeholder="Name">
    <input type="search" class="form-control my-2" v-model="searchValueProgram" placeholder="Program">
    <table class="table b-1" v-if="sortedData">
      <thead class="thead-dark">
      <tr>
        <th @click="pickedBy('name')" :class="{active: picked === 'name'}">Name</th>
        <th @click="pickedBy('speciality')" :class="{active: picked === 'speciality'}">Speciality</th>
        <th @click="pickedBy('programs')" :class="{active: picked === 'programs'}">Program</th>
        <th @click="pickedBy('location')" :class="{active: picked === 'location'}">Location</th>
        <th @click="pickedBy('language')" :class="{active: picked === 'language'}">Language</th>
        <th @click="pickedBy('price')" :class="{active: picked === 'price'}">Price</th>
        <th>Edit</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(d, i) in sortedData" :key="i">
        <td v-if="d.nameEn">
          <h4>{{d.nameEn}}</h4>
        </td>
        <td v-if="d.fieldOfStudyEn">
          <h4>{{d.fieldOfStudyEn}}</h4>
        </td>
        <td v-if="d.programsEn">
          <h4>{{d.programsEn}}</h4>
        </td>
        <td v-if="d.location">
          <h4>{{d.location}}</h4>
        </td>
        <td v-if="d.language">
          <h4>{{d.language}}</h4>
        </td>
        <td v-if="d.price">
          <h4>{{d.price}}</h4>
        </td>
        <td>
          <button class="btn btn-primary">
            <nuxt-link class="text-white" :to="`/admin/${d._id}`">
              Edit
            </nuxt-link>
          </button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import {imageUrl} from "../assets/data";

export default {
  data: () => {
    return {
      jwtToken: '',
      data: [],
      picked: '',
      searchValueName: '',
      searchValueProgram: '',
      imageUrl: imageUrl
    }
  },
  async mounted(){
    try {
      if (this.jwtToken){
        await this.$store.dispatch('requests/checkJwt')
      }
      this.data = await this.$store.dispatch('requests/getAll', 'product')
    } catch (e) {
      this.$store.dispatch('setMessage', {
        value: e.message,
        type: 'warning'
      })
      localStorage.removeItem('jwt')
    }
  },
  methods: {
    pickedBy(text){
      this.picked = text
    }
  },
  computed: {
    sortedData() {
      return [...this.data]
        .sort((a,b) => {
          return a[this.picked] > b[this.picked] ? 1 : -1
        })
        .filter((e) => {
          if(this.searchValueName){
            return e.nameEn.includes(this.searchValueName)
          }
          return e
        })
        .filter((e) => {
          if(this.searchValueProgram){
            return e.programsEn.includes(this.searchValueProgram)
          }
          return e
        })

    }
  }
}
</script>

<style scoped>

</style>
