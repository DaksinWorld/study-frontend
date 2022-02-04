<template>
  <div class="wrapper">
    <form @submit.prevent="SubmitHandler">
      <label>First Name</label>
      <input v-model="firstName" class="form-control" type="text" placeholder="First Name">
      <label>Second Name</label>
      <input v-model="secondName" class="form-control" type="text" placeholder="Second Name">
      <label>Description</label>
      <input v-model="description" class="form-control" type="text" placeholder="Description">
      <label>Subtitle</label>
      <input v-model="subtitle" class="form-control" type="text" placeholder="Subtitle">
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
      firstName: '',
      secondName: '',
      subtitle: '',
      file: ''
    }
  },
  async mounted() {
    this.data = await this.$axios.$get('/api/workers/find/' + this.$route.params.id)
    const data = this.data
    this.description = data.description
    this.firstName = data.firstName
    this.secondName = data.secondName
    this.subtitle = data.subtitle
  },
  methods: {
    async SubmitHandler(e) {
      e.preventDefault()
      try {
        const formData = new FormData()

        if(this.file !== '') {
          formData.append('file', this.file)
        }

        formData.append('firstName', this.firstName)
        formData.append('subtitle', this.subtitle)
        formData.append('secondName', this.secondName)
        formData.append('description', this.description)

        await this.$axios.$patch('/api/workers/' + this.$route.params.id, formData, {headers: {
            Authorization: `Bearer ` + localStorage.getItem('jwt'),
            "Content-Type": 'multipart/form-data'
          }})
        this.$store.dispatch('setMessage', {
          value: WORKER_UPDATED,
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
        await this.$axios.$delete('/api/workers/'+this.$route.params.id, {headers: {
            Authorization: `Bearer ` + localStorage.getItem('jwt'),
          }})
        this.$store.dispatch('setMessage', {
          value: WORKER_DELETED,
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
