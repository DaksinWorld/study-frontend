<template>
  <div class="wrapper">
    <h1 class="title">About Us</h1>
    <h3 class="description m-0 p-0 w-33">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem debitis deleniti dignissimos distinctio dolor dolore error expedita fugiat fugit labore minus mollitia non, numquam pariatur quaerat, quam sapiente sequi similique!
    </h3>
    <h2 class="subtitle my-2">Our Team</h2>
    <div class="d-flex flex-wrap flex-row">
      <div class="w-33" v-for="worker in workers" :key="worker.name">
        <WorkerCard :data="worker"/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'light',
  data: () => {
    return {
      workers: []
    }
  },
  async mounted() {
    this.workers = await this.$axios.$get(`/api/workers`)
  }
}
</script>

<style scoped>
.wrapper {
  margin-top: 100px;
}

.title {
  font-size: 50px;
  color: rgb(var(--color_primary));
  font-weight: 700;
  font-family: Montserrat;
  text-transform: uppercase;
  padding: 0;
  margin: 0;
}

.subtitle {
  font-family: Montserrat;
  font-weight: 700;
  color: #afb5d5;
  text-transform: uppercase;
}

.description {
  font-weight: 600;
  color: rgb(var(--color_primary));
  font-size: 20px;
}

.subtitle {

}
</style>
