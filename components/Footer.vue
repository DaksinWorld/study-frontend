<template>
  <footer class="footer">
    <div class="container">
      <h3 class="footer-title">Contacts</h3>
      <div class="footer-text">
        Phone number: 89889330452
        <a href="https://api.whatsapp.com/send?phone=89313544407" target="_blank">
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
    </div>
  </footer>
</template>

<script>
export default {
}
</script>

<style scoped>
.footer {
  background-color: #EEEFF6;
  width: 100%;
  margin-top: 20px;
  padding: 30px 0.5rem;
}

.footer-title {
  color: rgb(var(--middle_lavender));
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
}

</style>
