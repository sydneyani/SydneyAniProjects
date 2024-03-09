<template>
  <div class="flex items-center justify-center h-screen bg-black-800">
    <div class="w-full max-w-md">
      <h1 class="mb-8 text-4xl font-bold text-center text-purple-700">Tag Along!</h1>
      <form @submit.prevent="signup" novalidate="true" class="px-8 pt-6 pb-8 mb-4 bg-gray-700 rounded shadow-md">
        <div class="mb-4">
          <label class="block mb-2 text-sm font-bold text-gray-300" for="username">
            Username<span style="color: #ff0000">*</span>
          </label>
          <input id="username" type="text" v-model="username"
            class="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            placeholder="Username" />
        </div>
        <div class="mb-6">
          <label class="block mb-2 text-sm font-bold text-gray-300" for="password">
            Password<span style="color: #ff0000">*</span>
          </label>
          <input id="password" type="password" v-model="password"
            class="w-full px-3 py-2 mb-3 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            placeholder="Password" />
        </div>
        <div class="flex justify-center mt-10">
    <div class="form-button-container">
      <button class="button bg-purple-700 text-white rounded" type="submit">Sign Up</button>
    </div>
  </div>
      </form>
    </div>
  </div>
</template>

<script>
import { useLoggedInUserStore } from "../store/loggedInUser";
import jwt_decode from 'jwt-decode';
import { signupUser } from "../api/api";

export default {
data() {
  return {
    username: "",
    password: "",
  };
},
methods: {
  async signup() {
    try {
      const token = await signupUser(this.username, this.password);
      localStorage.setItem('token', token); // or use cookies or other secure storage
      
      // Decode the token if you need the user's details
      const decodedToken = jwt_decode(token);
      this.store.$patch({
        isLoggedIn: true,
        role: decodedToken.role,
        name: decodedToken.name
      });

      // Redirect to the login page
      this.$router.push('/login');
      toast.success("Sign up successful, please log in!");
    } catch (error) {
      toast.error("Sign up failed: " + error.message);
    }
  }
},
setup() {
  const store = useLoggedInUserStore();
  return { store };
},
};
</script>

<style scoped>
/* Centering the button */
.form-button-container {
  display: flex;
  justify-content: center; /* This will center the button in the flex container */
  margin-top: 20px; /* Adjust the margin as needed */
}

.button {
  padding: 10px 20px;
  background-color: rgb(132, 0, 194); /* Discord blue */
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.button:hover {
  opacity: 0.8;
}
</style>