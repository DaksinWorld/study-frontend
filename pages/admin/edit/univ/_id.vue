<template>
  <div class="wrapper">
    <form @submit.prevent="SubmitHandler">
      <label>Name</label>
      <input v-model="name" class="form-control" type="text" placeholder="First Name">
      <label>Location</label>
      <input v-model="location" class="form-control" type="text" placeholder="Second Name">
      <label>Description</label>
      <input v-model="description" class="form-control" type="text" placeholder="Description">
      <label>Int'l Students</label>
      <input v-model="intStudents" class="form-control" type="text" placeholder="Description">
      <label>Founded</label>
      <input v-model="founded" class="form-control" type="text" placeholder="Description">
      <label>Faculty</label>
      <input v-model="faculty" class="form-control" type="text" placeholder="Description">
      <label>Total Students</label>
      <input v-model="totalStudents" class="form-control" type="text" placeholder="Subtitle">
      <label>Image</label>
      <label>Image</label>
      <label for="file-upload" class="custom-file-upload">
        Upload Image
      </label>
      <input id="file-upload" @change="getFile" class="form-control" type="file" ref="file">
      <img v-if="data.images" width="100" height="130" :src="`/images${data.images[1].url}`" alt="image">
      <button class="btn btn-primary mt-5 w-100" type="submit">Submit</button>
    </form>
    <button class="btn btn-danger my-5" @click="deleteProduct">Delete</button>
  </div>
</template>

<script>
import {city, fieldOfCourses, PRODUCT_UPDATED, universityData} from "@/assets/data";
import {WORKER_DELETED, WORKER_UPDATED} from "../../../../assets/data";

export default {
  layout: 'admin',
  data: () => {
    return {
      data: [],
      description: '',
      name: '',
      location: '',
      totalStudents: '',
      intStudents: '',
      founded: '',
      file: '',
      faculty: ''
    }
  },
  async mounted() {
    this.data = await this.$axios.$get('/api/univ/find/' + this.$route.params.id)
    const data = this.data
    this.description = data.description
    this.name = data.name
    this.location = data.location
    this.faculty = data.faculty
    this.totalStudents = data.totalStudents
    this.intStudents = data.intStudents
    this.founded = data.founded
  },
  methods: {
    async SubmitHandler(e) {
      e.preventDefault()
      try {
        const formData = new FormData()

        if(this.file !== '') {
          formData.append('file', this.file)
        }

        formData.append('name', this.name)
        formData.append('location', this.location)
        formData.append('description', this.description)
        formData.append('founded', this.founded)
        formData.append('intStudents', this.intStudents)
        formData.append('faculty', this.faculty)
        formData.append('totalStudents', this.totalStudents)

        await this.$axios.$patch('/api/univ/' + this.$route.params.id, formData, {headers: {
            Authorization: `Bearer ` + localStorage.getItem('jwt'),
            "Content-Type": 'multipart/form-data'
          }})
        this.$store.dispatch('setMessage', {
          value: 'Univ updated',
          type: 'primary'
        })
      } catch(e) {
        await this.$store.dispatch('setMessage', {
          value: e,
          type: 'danger'
        })
      }
    },
    getFile(){
      this.file = this.$refs.file.files[0]
    },
    async deleteProduct() {
      try {
        await this.$axios.$delete('/api/univ/'+this.$route.params.id, {headers: {
            Authorization: `Bearer ` + localStorage.getItem('jwt'),
          }})
        this.$store.dispatch('setMessage', {
          value: 'Univ deleted',
          type: 'primary'
        })
        this.$router.push('/admin')
      } catch(e) {
        this.$store.dispatch('setMessage', {
          value: e,
          type: 'danger'
        })
      }
    }
  }
}
</script>

<style scoped>
.custom-file-upload {
  border: 1px solid #ccc;
  display: inline-block;
  padding: 6px 12px;
  cursor: pointer;
  width: 100%;
}

input[type=file] {
  display: none;
}
</style>
