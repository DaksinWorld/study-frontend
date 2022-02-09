<template>
  <div class="wrapper">
    <form @submit.prevent="SubmitHandler">
      <label>Name</label>
      <input v-model="name" class="form-control" type="text" placeholder="Name">
      <label>Description</label>
      <input v-model="description" class="form-control" type="text" placeholder="Description">
      <label>Html Text</label>
      <client-only placeholder="loading...">
        <ckeditor-nuxt v-model="vhtml"  />
      </client-only>
      <label>Color</label>
      <input v-model="color" class="form-control" type="color" placeholder="Description">
      <label>Icon Svg</label>
      <input v-model="iconUrl" class="form-control" type="text" placeholder="Description">
      <label>Image</label>
      <label>Image</label>
      <label for="file-upload" class="custom-file-upload">
        Upload Image
      </label>
      <input id="file-upload" @change="getFile" class="form-control" type="file" ref="file">
      <button class="btn btn-primary mt-5 w-100" type="submit">Submit</button>
    </form>
    <button class="btn btn-danger my-5" @click="deleteProduct">Delete</button>
  </div>
</template>

<script>

import {imageUrl} from "../../../../assets/data";

export default {
  layout: 'admin',
  components: {
    'ckeditor-nuxt': () => { if (process.client) { return import('@blowstack/ckeditor-nuxt') } },
  },
  data: () => {
    return {
      data: [],
      description: '',
      name: '',
      file: '',
      color: '',
      vhtml: '',
      iconUrl: '',
      imageUrl: imageUrl
    }
  },
  async mounted() {
    this.data = await this.$axios.$get('/api/admission/find/' + this.$route.params.id)
    const data = this.data
    this.description = data.description
    this.name = data.name
    this.vhtml = data.htmlText
    this.color = data.color
    this.iconUrl = data.iconUrl
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
        formData.append('htmlText', this.vhtml)
        formData.append('description', this.description)
        formData.append('color', this.color)
        formData.append('iconUrl', this.iconUrl)

        await this.$axios.$patch('/api/admission/' + this.$route.params.id, formData, {headers: {
            Authorization: `Bearer ` + localStorage.getItem('jwt'),
            "Content-Type": 'multipart/form-data'
          }})
        this.$store.dispatch('setMessage', {
          value: 'Admission updated',
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
        await this.$axios.$delete('/api/admission/'+this.$route.params.id, {headers: {
            Authorization: `Bearer ` + localStorage.getItem('jwt'),
          }})
        this.$store.dispatch('setMessage', {
          value: 'Admission deleted',
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
