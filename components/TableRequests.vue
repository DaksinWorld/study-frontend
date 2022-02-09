<template>
  <div>
    <input class="form-control my-2" type="search" v-model="searchValue">
    <table class="table b-1" v-if="sortedData">
      <thead class="thead-dark">
      <tr>
        <th @click="pickedBy('name')" :class="{active: picked === 'name'}">Name</th>
        <th @click="pickedBy('Email')" :class="{active: picked === 'Email'}">Email</th>
        <th @click="pickedBy('Phone')" :class="{active: picked === 'Phone'}">Phone</th>
        <th>Action</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(d, i) in sortedData" :key="i">
        <td v-if="d.name">
          <h4>{{d.name}}</h4>
        </td>
        <td v-if="d.email">
          <h4>{{d.email}}</h4>
        </td>
        <td v-if="d.phone">
          <h4>{{d.phone}}</h4>
        </td>
        <td>
          <button @click="HandleDelete(d._id)" class="btn btn-danger">Delete</button>
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
      this.data = await this.$store.dispatch('requests/getAll', 'request')
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
    },
    async HandleDelete(id) {
      try {
        await this.$axios.$delete('/api/request/' + id, {headers: {
            Authorization: `Bearer ${this.jwtToken}`
          }})
        this.$store.commit('setMessage', {
          value: "Request was successfully deleted",
          type: "primary"
        })
      } catch (e) {
        this.$store.commit('setMessage', {
          value: e,
          type: "danger"
        })
      }
    }
  },
  computed: {
    sortedData() {
      return [...this.data]
        .sort((a,b) => {
          return a[this.picked] > b[this.picked] ? 1 : -1
        })
        .filter((e) => {
          if(this.searchValue){
            return e.email.includes(this.searchValue)
          }
          return e
        })
    },
  }
}
</script>

<style scoped>

</style>
