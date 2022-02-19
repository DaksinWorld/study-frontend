<template>
  <div class="container">
    <AdminForm v-if="!jwtToken"/>
    <div v-else>
      <CreateBtn :url="`/admin/create`" :text="'Create New Product'"/>
      <CreateBtn :url="`/admin/create-course`" :text="'Create New Course'"/>
      <CreateBtn :url="`/admin/create-worker`" :text="'Create New Worker'"/>
      <CreateBtn :url="`/admin/create-univ`" :text="'Create New University'"/>
      <CreateBtn :url="`/admin/create-admission`" :text="'Create New Admission'"/>
      <button class="btn btn-dark" @click="pickedValue('products')">Products</button>
      <button class="btn btn-dark" @click="pickedValue('courses')">Courses</button>
      <button class="btn btn-dark" @click="pickedValue('workers')">Workers</button>
      <button class="btn btn-dark" @click="pickedValue('univ')">Universities</button>
      <button class="btn btn-dark" @click="pickedValue('admission')">Admissions</button>
      <button class="btn btn-dark" @click="pickedValue('request')">Requests</button>
      <button class="btn btn-dark" @click="pickedValue('application')">Applications</button>
      <div v-if="picked === 'products'">
        <h2>Products</h2>
        <TableProduct/>
      </div>
      <div v-else-if="picked === 'courses'">
        <h2>Courses</h2>
        <TableCourses/>
      </div>
      <div v-else-if="picked === 'workers'">
        <h2>Workers</h2>
        <TableWorkers/>
      </div>
      <div v-else-if="picked === 'univ'">
        <h2>University</h2>
        <TableUniv/>
      </div>
      <div v-else-if="picked === 'admission'">
        <h2>Admission</h2>
        <TableAdmission/>
      </div>
      <div v-else-if="picked === 'request'">
        <h2>Requests</h2>
        <TableRequests/>
      </div>
      <div v-else>
        <h2>Applications</h2>
        <TableApplication/>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  layout: 'admin',
  data: () => {
    return {
      jwtToken: '',
      data: [],
      picked: 'products',
      searchValue: '',
      error: ''
    }
  },
  async mounted(){
    this.jwtToken = localStorage.getItem('jwt')
    try {
      await this.$store.dispatch('requests/checkJwt')
    } catch (e) {
      console.log(e)
     }
  },
  methods: {
    pickedValue(val){
      this.picked = val
    }
  }
}
</script>

<style scoped>

</style>
