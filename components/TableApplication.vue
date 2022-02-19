<template>
  <div>
    <input class="form-control my-2" type="search" v-model="searchValue">
    <table class="table b-1" v-if="sortedData">
      <thead class="thead-dark">
      <tr>
        <th @click="pickedBy('firstName')" :class="{active: picked === 'firstName'}">First Name</th>
        <th @click="pickedBy('secondName')" :class="{active: picked === 'secondName'}">Second Name</th>
        <th @click="pickedBy('email')" :class="{active: picked === 'Email'}">Email</th>
        <th @click="pickedBy('phone')" :class="{active: picked === 'Phone'}">Phone</th>
        <th @click="pickedBy('gender')" :class="{active: picked === 'gender'}">Gender</th>
        <th @click="pickedBy('year')" :class="{active: picked === 'year'}">Year</th>
        <th>Action</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(d, i) in sortedData" :key="i">
        <td v-if="d.firstName">
          <h4>{{d.firstName}}</h4>
        </td>
        <td v-if="d.secondName">
          <h4>{{d.secondName}}</h4>
        </td>
        <td v-if="d.email">
          <h4>{{d.email}}</h4>
        </td>
        <td v-if="d.phone">
          <h4>{{d.phone}}</h4>
        </td>
        <td v-if="d.gender">
          <h4>{{d.gender}}</h4>
        </td>
        <td v-if="d.year">
          <h4>{{d.year}}</h4>
        </td>
        <td>
          <button class="btn btn-primary">
            <nuxt-link class="text-white" :to="`/admin/application/${d._id}`">
              To the page
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
      searchValue: '',
      inputVal: '',
      imageUrl: imageUrl
    }
  },
  async mounted(){
    this.jwtToken = localStorage.getItem('jwt')
    try {
      if (this.jwtToken){
        await this.$store.dispatch('requests/checkJwt')
      }
      this.data = await this.$store.dispatch('requests/getAll', 'application')
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
          if(this.searchValue && e.firstName){
            return e.firstName.includes(this.searchValue)
          }
          return e
        })
    },
  }
}
</script>

<style scoped>

</style>
