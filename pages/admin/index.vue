<template>
  <div class="container">
    <AdminForm v-if="!jwtToken"/>
    <div v-else>
      <button class="btn btn-warning my-2">
        <nuxt-link to="/admin/create" class="text-white not-underlined">Create New Product</nuxt-link>
      </button>
      <button class="btn btn-warning my-2">
        <nuxt-link to="/admin/create-course" class="text-white not-underlined">Create New Course</nuxt-link>
      </button>
      <input type="search" class="form-control my-1" placeholder="search" v-model="searchValue">
      <button class="btn btn-dark" @click="pickedValue('products')">Products</button>
      <button class="btn btn-dark" @click="pickedValue('courses')">Courses</button>
      <div v-if="picked === 'products'">
        <h2>Products</h2>
        <TableProduct/>
      </div>
      <div v-else>
        <h2>Courses</h2>
        <TableCourses/>
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
      searchValue: ''
    }
  },
  async mounted(){
    this.jwtToken = localStorage.getItem('jwt')
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
