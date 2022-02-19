<template>
  <footer class="footer">
    <div class="container">
      <h3 class="footer-title">Contacts</h3>
      <div class="footer-text">
        Our adress: St. Petersburg, st. Millionnaya, 19, letter I
        <br>
        Univenter LLC
        <br>
        Phone number: +7 931 354 44 07
        <a href="https://api.whatsapp.com/send?phone=+79313544407" target="_blank">
          <img width="50" height="50" src="/whatsapp.svg" alt="whatsapp">
        </a>
      </div>
      <div class="footer-text">hi@univente.me</div>
      <hr>
      <h3 class="footer-title mb-1">Social Media</h3>
      <div class="social-media">
        <a class="mr-2" href="https://www.instagram.com/univenteme/" target="_blank">
          <img width="50" height="50" src="/instagram.svg" alt="instagram">
        </a>
        <a href="https://facebook.com/degreesoverseas" target="_blank">
          <img width="50" height="50" src="/facebook.svg" alt="facebook">
        </a>
      </div>
      <nuxt-link class="text-white my-2" to="/privacy-policy">
        Privacy Policy
      </nuxt-link>
    </div>
  </footer>
</template>

<script>
export default {
}
</script>

<style scoped>
.footer {
  background-color: #2c3a92;
  width: 100%;
  margin-top: 20px;
  padding: 30px 0.5rem;
}

.footer-title {
  color: white;
  font-weight: 600;
  margin: 0;
}

.container {
  font-family: "Source Sans Pro";
  font-weight: 600;
  font-size: 18px;
}
.footer-text {
  display: flex;
  align-items: center;
  color: var(--gray_light);
}

</style>
