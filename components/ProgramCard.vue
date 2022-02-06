<template>
  <div>
    <a :href="`/Programs?field=${data.fieldOfCourse}&univ=${data.universities}`">
      <div class="card">
        <span>{{data.name}}</span>
        <span>{{data.fieldOfCourse}}</span>
      </div>
    </a>
  </div>
</template>

<script>
export default {
  props: ['data']
}
</script>

<style scoped>
.card {
  background-color: rgb(var(--middle_lavender));
  height: 130px;
  width: 176px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px;
}

span {
  color: white;
  font-weight: 600;
}
</style>
