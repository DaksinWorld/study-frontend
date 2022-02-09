<template>
  <div class="wrapper">
    <div class="html-container">
      <div v-html="data.htmlText"></div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'light',
  data: () => {
    return {
      id: '',
      data: ''
    }
  },
  async mounted() {
    this.id = this.$route.query.id;
    try {
      this.data = await this.$axios.$get('/api/admission/find/' + this.id)
    } catch (e) {

    }
  },
}
</script>

<style scoped>
.wrapper {
  margin-top: 100px;
  grid-template-columns: 80% 20%;
}

.html-container {
  padding: 10px;
  border: 1px solid black;
  border-radius: 15px;
}
</style>
