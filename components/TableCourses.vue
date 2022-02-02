<template>
  <table class="table b-1" v-if="sortedData">
    <thead class="thead-dark">
    <tr>
      <th @click="pickedBy('image')" :class="{active: picked === 'image'}">Image</th>
      <th @click="pickedBy('name')" :class="{active: picked === 'name'}">Name</th>
      <th @click="pickedBy('fieldOfCourse')" :class="{active: picked === 'fieldOfCourse'}">FieldOfCourse</th>
      <th @click="pickedBy('location')" :class="{active: picked === 'location'}">Location</th>
      <th @click="pickedBy('universities')" :class="{active: picked === 'universities'}">University</th>
      <th @click="pickedBy('price')" :class="{active: picked === 'price'}">Price</th>
      <th>Edit</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="(d, i) in sortedData" :key="i">
      <td v-if="d.images[1].url">
        <img height="50" width="50" :src='"/images/" + d.images[1].url' alt="image">
      </td>
      <td v-if="d.name">
        <h4>{{d.name}}</h4>
      </td>
      <td v-if="d.fieldOfCourse">
        <h4>{{d.fieldOfCourse}}</h4>
      </td>
      <td v-if="d.location">
        <h4>{{d.location}}</h4>
      </td>
      <td v-if="d.universities">
        <h4>{{d.universities}}</h4>
      </td>
      <td v-if="d.price">
        <h4>{{d.price}}</h4>
      </td>
      <td>
        <button class="btn btn-primary">
          <nuxt-link class="text-white" :to="`/admin/edit/${d._id}`">
            Edit
          </nuxt-link>
        </button>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  data: () => {
    return {
      jwtToken: '',
      data: [],
      picked: '',
      searchValue: ''
    }
  },
  async mounted(){
    try {
      if (this.jwtToken){
        await this.$axios.$get('/api/product/checkJwt', {headers: {
            Authorization: `Bearer ` + localStorage.getItem('jwt'),
          }})
      }
      this.data = await this.$store.dispatch('requests/getAll', 'courses')
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
