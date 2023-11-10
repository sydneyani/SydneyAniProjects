<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { ref } from 'vue';
</script>

<template>
  <div>
    <nav class="navbar navbar-expand navbar-light bg-light">
      <div class="container">
        <router-link to="/"><img src="@/assets/Todays_Vision_Logo.png" alt="..." height="70"></router-link>
        <div v-if="$route.name !== 'login'">
          <ul class="nav navbar-nav mr-auto">
            <li class="nav-item" v-if="shouldShowNewCustomerLink">
              <router-link class="nav-link" to="/newcustomer">New Customer</router-link>
            </li>
            <li class="nav-item" v-if="shouldShowReturningCustomersLink">
              <router-link class="nav-link" to="/returningcustomers">Returning Customers</router-link>
            </li>
            <li class="nav-item" v-if="shouldShowChartLink">
              <router-link class="nav-link" to="/chart">Chart</router-link>
            </li>
            <li class="nav-item">
              <router-link @click="logout" class="nav-link btn1" to="/login">Logout</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';

export default {
  data() {
    return {
      userRole: localStorage.getItem('userRole')
    };
  },
  computed: {
    shouldShowNewCustomerLink() {
      return this.shouldShowLink('employee', 'newcustomer');
    },
    shouldShowReturningCustomersLink() {
      return this.shouldShowLink('employee', 'returningcustomers');
    },
    shouldShowChartLink() {
      return this.shouldShowLink('admin', 'chart');
    }
  },
  methods: {
    shouldShowLink(role, routeName) {
      return this.userRole === role && this.$route.name !== 'login' && this.$route.name !== routeName;
    },
    async logout() {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('userRole');
      console.log('User logged out');
      this.$router.push("/login");
    }
  },
  watch: {
    $route(to, from) {
      // Update userRole when route changes
      this.userRole = localStorage.getItem('userRole');
    }
  }
};
</script>

<style>
.btn1 {
  font-weight: 700;
}
</style>
