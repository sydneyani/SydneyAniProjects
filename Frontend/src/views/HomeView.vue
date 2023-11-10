<template>
 <!-- Display the user's name -->
    
  <div class="row">
  <h1 class="text-center">Employee Name: {{ userName }}</h1>
    <div class="text-center">
      <router-link to="/newcustomer" class="btn btn-primary btn-super-lg m-2 btn-equal-size">New Customer</router-link>
      <router-link to="/returningcustomers" class="btn btn-secondary btn-super-lg m-2 btn-equal-size">Returning Customers</router-link>
    </div>

   
  </div>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router';

// Retrieve user information from localStorage
const user = JSON.parse(localStorage.getItem('user'));
console.log(user)
// Extract the user's name
const userName = user ? user.name : 'Unautherized'; 
</script>

<style scoped>
.btn-super-lg {
  font-size: 36px;
  padding: 70px 70px;
}
.btn-equal-size {
  width: 300px;
}
.text-center {
  margin-top: 200px;
}
</style>
