<template>
  <div class="flex items-center justify-center h-screen bg-black-800">
    <div class="w-full max-w-md">
      <h1 class="mb-8 text-4xl font-bold text-center text-purple-700">Welcome</h1>
      <form @submit.prevent="store.login(username, password)" novalidate="true" class="px-8 pt-6 pb-8 mb-4 bg-gray-700 rounded shadow-md">
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
            <button class="button bg-purple-700 text-white rounded" type="submit">Login</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  import { useLoggedInUserStore } from "../store/loggedInUser";

  export default {
    data() {
      return {
        username: "",
        password: "",
      }
    },
    setup() {
      const store = useLoggedInUserStore();
      return {
        store
      }
    }
  }
</script>

