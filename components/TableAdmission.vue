<template>
  <div>
    <input class="form-control my-2" type="search" v-model="searchValue">
    <table class="table b-1" v-if="sortedData">
      <thead class="thead-dark">
      <tr>
        <th @click="pickedBy('name')" :class="{active: picked === 'name'}">Name</th>
        <th @click="pickedBy('description')" :class="{active: picked === 'description'}">Description</th>
        <th @click="pickedBy('color')" :class="{active: picked === 'color'}">Color</th>
        <th>Edit</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(d, i) in sortedData" :key="i">
        <td v-if="d.name">
          <h4>{{d.name}}</h4>
        </td>
        <td v-if="d.description">
          <h4>{{d.description}}</h4>
        </td>
        <td v-if="d.color">
          <h4>{{d.color}}</h4>
        </td>
        <td>
          <EditButton :url="`edit/admission/${d._id}`"/>
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
    try {
      if (this.jwtToken){
        await this.$store.dispatch('requests/checkJwt')
      }
      this.data = await this.$store.dispatch('requests/getAll', 'admission')
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
      await this.$axios.$delete('/api/admission/' + id)
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
            return e.description.includes(this.searchValue)
          }
          return e
        })
    }
  }
}
</script>

<style scoped>

</style>
