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
  </div>
</template>

<script>

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
      color: '',
      vhtml: '',
      iconUrl: '',
    }
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
        formData.append('iconUrl', this.iconUrl)
        formData.append('color', this.color)

        await this.$axios.$post('/api/admission', formData, {headers: {
            Authorization: `Bearer ` + localStorage.getItem('jwt'),
            "Content-Type": 'multipart/form-data'
          }})
        this.$store.dispatch('setMessage', {
          value: 'Admission created',
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
