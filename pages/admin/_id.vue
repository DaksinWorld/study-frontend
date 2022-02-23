<template>
  <div class="container" v-if="data">
    <form @submit.prevent="SubmitHandler">
      <label>Name English</label>
      <select v-model="nameEn" class="form-control">
        <option v-for="(name,i) in universityDataEn" :value="name" :key="i">{{name}}</option>
      </select>
      <label>Name Spanish</label>
      <select v-model="nameSp" class="form-control">
        <option v-for="(name,i) in universityDataSp" :value="name" :key="i">{{name}}</option>
      </select>

      <label>Degree English</label>
      <select v-model="degreeEn" class="form-control">
        <option v-for="(name,i) in degreeDataEn" :value="name" :key="i">{{name}}</option>
      </select>

      <label>Degree Spanish</label>
      <select v-model="degreeSp" class="form-control">
        <option v-for="(name,i) in degreeDataSp" :value="name" :key="i">{{name}}</option>
      </select>

      <label>Field Of Study English</label>
      <select v-model="fieldOfStudyEn" class="form-control">
        <option v-for="(name,i) in fieldOfStudyDataEn" :value="name" :key="i">{{ name }}</option>
      </select>

      <label>Field Of Study Spanish</label>
      <select v-model="fieldOfStudySp" class="form-control">
        <option v-for="(name,i) in fieldOfStudyDataSp" :value="name" :key="i">{{ name }}</option>
      </select>

      <label>Programs English</label>
      <select v-model="programsEn" class="form-control">
        <option v-for="(name,i) in programsDataEn" :value="name" :key="i">{{ name }}</option>
      </select>

      <label>Programs Spanish</label>
      <select v-model="programsSp" class="form-control">
        <option v-for="(name,i) in programsDataSp" :value="name" :key="i">{{ name }}</option>
      </select>

      <label>Price</label>
      <input v-model="price" class="form-control" type="text" :placeholder="data.price">
      <label>Language</label>
      <select v-model="language" class="form-control">
        <option value="Russian">Russian</option>
        <option value="English">English</option>
      </select>
      <label>Additional Language</label>
      <select v-model="additionalLanguage" class="form-control">
        <option value="Russian">Russian</option>
        <option value="English">English</option>
      </select>
      <label>Location</label>
      <input v-model="location" class="form-control" type="text" :placeholder="data.location">
      <label>Duration</label>
      <input v-model="duration" class="form-control" type="text" :placeholder="data.duration">
      <button class="btn btn-primary mt-5 w-100" type="submit">Submit</button>
    </form>
    <button class="btn btn-danger my-5" @click="deleteProduct">Delete</button>
  </div>
</template>

<script>
import {
  degree,
  degreeSp,
  fieldOfStudy, fieldOfStudySp,
  PRODUCT_DELETED,
  PRODUCT_UPDATED,
  programs, programsEn, programsSp, universityData,
  universityDataEn
} from "../../assets/data";

export default {
  layout: 'admin',
  data: () => {
    return {
      data: [],
      response: '',

      nameEn: '',
      nameSp: '',

      degreeEn: '',
      degreeSp: '',

      programsEn: '',
      programsSp: '',

      additionalLanguage: '',

      fieldOfStudyEn: '',
      fieldOfStudySp: '',

      price: '',
      language: '',
      location: '',
      duration: '',
      form: [],

      degreeDataEn: degree,
      degreeDataSp: degreeSp,

      fieldOfStudyDataEn: fieldOfStudy,
      fieldOfStudyDataSp: fieldOfStudySp,

      programsDataEn: programsEn,
      programsDataSp: programsSp,

      universityDataEn: universityDataEn,
      universityDataSp: universityData
    }
  },
  async mounted() {
    this.data = await this.$axios.$get('/api/product/find/' + this.$route.params.id)
    this.nameEn = this.data.nameEn
    this.nameSp = this.data.nameSp

    this.fieldOfStudyEn = this.data.fieldOfStudyEn
    this.fieldOfStudySp = this.data.fieldOfStudySp

    this.programsEn = this.data.programsEn
    this.programsSp = this.data.programsSp

    this.degreeEn = this.data.degreeEn
    this.degreeSp = this.data.degreeSp

    this.price = this.data.price
    this.language = this.data.language
    this.additionalLanguage = this.data.additionalLanguage
    this.location = this.data.location
    this.duration = this.data.duration
  },
  methods: {
    async SubmitHandler(e) {
      e.preventDefault()
      try {
        const obj = {
          programsEn: this.programsEn,
          programsSp: this.programsSp,
          degreeEn: this.degreeEn,
          degreeSp: this.degreeSp,
          location: this.location,
          fieldOfStudyEn: this.fieldOfStudyEn,
          fieldOfStudySp: this.fieldOfStudySp,
          nameEn: this.nameEn,
          nameSp: this.nameSp,
          language: this.language,
          additionalLanguage: this.additionalLanguage,
          price: this.price,
          duration: this.duration,
          createdAt: Date.now().toString()
        }

        await this.$axios.$patch('/api/product/' + this.$route.params.id, obj, {headers: {
            Authorization: `Bearer ` + localStorage.getItem('jwt'),
          }})
        this.$store.dispatch('setMessage', {
          value: PRODUCT_UPDATED,
          type: 'primary'
        })
      } catch(e) {
        await this.$store.dispatch('setMessage', {
          value: e,
          type: 'danger'
        })
      }
    },
    async deleteProduct() {
      try {
        await this.$axios.$delete('/api/product/'+this.$route.params.id, {headers: {
            Authorization: `Bearer ` + localStorage.getItem('jwt'),
          }})
        this.$store.dispatch('setMessage', {
          value: PRODUCT_DELETED,
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
