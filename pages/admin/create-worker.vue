<template>
  <div class="container">
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
      <label for="file-upload" class="custom-file-upload w-100">
        Upload Image
      </label>
      <span v-if="file.name">{{file.name}}</span>
      <input id="file-upload" @change="getFile" class="form-control" type="file" ref="file">
      <button class="btn btn-primary mt-5 w-100" type="submit">Submit</button>
    </form>
  </div>
</template>

<script>
import {
  PRODUCT_CREATED, WORKER_CREATED,
} from "../../assets/data";

export default {
  layout: 'admin',
  data: () => {
    return {
      response: '',
      description: '',
      firstName: '',
      secondName: '',
      subtitle: '',
      file: ''
    }
  },
  methods: {
    async SubmitHandler(e) {
      e.preventDefault()
      try {
        const formData = new FormData()

        formData.append('file', this.file)
        formData.append('firstName', this.firstName)
        formData.append('subtitle', this.subtitle)
        formData.append('secondName', this.secondName)
        formData.append('description', this.description)


        await this.$axios.$post('/api/workers', formData, {
          headers: {
            Authorization: `Bearer ` + localStorage.getItem('jwt'),
            "Content-Type": 'multipart/form-data'
          }})

        this.$store.dispatch('setMessage', {
          value: WORKER_CREATED,
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
  }
}
</script>

<style scoped>

</style>
