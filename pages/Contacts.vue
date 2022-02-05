<template>
  <div class="wrapper">
    <h1>Contact Us | hi@univente.me</h1>
    <div class="social-networks">
      <h2>Social <br> Networks</h2>
      <a href="https://www.instagram.com/univenteme/" target="_blank">
        <img width="50" height="50" src="/instagram.svg" alt="instagram">
      </a>
      <a href="https://facebook.com/degreesoverseas" target="_blank">
        <img width="50" height="50" src="/facebook.svg" alt="facebook">
      </a>
    </div>
    <div class="social-networks primary">
      <h2>Messengers</h2>
      <a href="https://api.whatsapp.com/send?phone=89313544407" target="_blank">
        <img width="50" height="50" src="/whatsapp.svg" alt="whatsapp">
      </a>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'light'
}
</script>

<style scoped>
.wrapper {
  margin-top: 100px;
}

h1 {
  font-family: "Source Sans Pro";
  font-weight: 600;
  color: rgb(var(--color_primary));
}

h2, h3 {
  font-family: 'Montserrat';
  font-weight: 600;
  color: white;
}

h3 {
  color: rgb(var(--color_primary));
}


.social-networks {
  width: 300px;
  text-align: center;
  background-color: rgb(var(--green_light));
  padding: 30px;
  border-radius: 30px;
}

a {
  margin: 2px 7px;
}

.primary {
  background-color: rgb(var(--color_primary));
  margin-top: 20px;
}

@media screen and (max-width: 1024px) {

  .social-networks {
    width: 100%;
  }

  h1 {
    font-size: 28px;
  }

}
</style>
