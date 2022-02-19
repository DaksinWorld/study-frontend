<template>
  <div class="wrapper" v-if="data">
    <h2>Programs: </h2>
    <div v-for="(d,i) in data.program" :key="i">
      {{d.description}} <br>
      {{d.programs}}
      {{d.fieldOfCourse}}
      {{d.name}} <br>
    </div>
    <hr>
    <h2>Contact details:</h2>
    First Name: {{data.firstName}} <br>
    Second Name: {{data.secondName}} <br>
    {{data.email}} <br>
    {{data.phone}} <br>
    {{data.gender}} <br>
    <hr>
    <h3>Date of birth</h3>
    {{data.day}} / {{data.month}} / {{data.year}}
    <hr>
    <div v-for="(d,i) in data.package" :key="i">
      {{ d.text }}
      {{ d.checked }}
      <h4>package:price{{ d.price }}$</h4>
    </div>
    <h3>Total Price: {{data.totalPrice}}$</h3>
    <button @click="HandleDelete(data._id)" class="btn btn-danger">Delete</button>
  </div>
</template>

<script>
export default {
  layout: 'admin',
  data:() => ({
    data: [],
    jwtToken: ''
  }),
  async mounted() {
    this.jwtToken = localStorage.getItem('jwt')
    try {
      this.data = await this.$axios.$get('/api/application/'+ this.$route.params.id)
    } catch (e) {

    }
  },
  methods: {
    async HandleDelete(id) {
      try {
        await this.$axios.$delete('/api/application/' + id, {headers: {
            Authorization: `Bearer ${this.jwtToken}`
          }})
        this.$store.commit('setMessage', {
          value: "Application was successfully deleted",
          type: "primary"
        })
      } catch (e) {
        this.$store.commit('setMessage', {
          value: e,
          type: "danger"
        })
      }
    }
  }
}
</script>

<style scoped>

</style>
