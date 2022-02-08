<template>
  <div class="planb d-flex flex-row">
    <form @submit.prevent="OnSubmitHandler" class="form">
      <label for="name">Name</label>
      <input v-model="name" id="name" type="text" class="form-control" placeholder="Name">
      <label for="email">Email</label>
      <input v-model="email" id="email" type="email" class="form-control" placeholder="Email">
      <label for="name">Phone</label>
      <input v-model="phone" id="phone" type="number" class="form-control" placeholder="phone">
      <button class="btn plan-b-submit" type="submit">Send!</button>
    </form>
    <img height="282" width="451" src="/plan-b-gb.png" alt="bg">
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      name: '',
      email: '',
      phone: ''
    }
  },
  methods: {
    async OnSubmitHandler() {
      try {
        await this.$axios.$post('/api/request/', {
          name: this.name,
          email: this.email,
          phone: this.phone,
        })
        this.$store.commit('setMessage', {
          value: "You have successfully sent your message!",
          type: 'primary'
        })
        setTimeout(() => {
          location.reload()
        },1000 * 1)
      } catch(e) {

      }
    }
  }
}
</script>

<style scoped>
input {
  border-radius: 7px;
  border: 3px solid rgb(var(--color_primary));
}

.planb {
  background-color: white;
  width: 40%;
  border-radius: 25px;
  padding: 20px;
  height: 340px;
}

label {
  font-family: Montserrat;
  font-size: 24px;
  color: rgb(var(--color_primary));
  font-weight: 700;
}

.plan-b-submit {
  background-color: rgb(var(--color_primary));
  margin: 10px 0;
  color: white;
  font-family: Montserrat;
  font-weight: 700;
}
</style>
