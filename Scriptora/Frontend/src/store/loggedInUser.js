// This pinia store contains state with respect to whether a user is logged in 
import { defineStore } from 'pinia'
import { useToast } from 'vue-toastification'
import { loginUser, logoutUser } from '../api/api' // import API calls
import jwt_decode from 'jwt-decode'; // import JSON Web Token decoder to decode the token into the user's information
import { signupUser } from '../api/api' // Make sure to create this function in your api.js

//Notifications
const toast = useToast()

// Defining a store
export const useLoggedInUserStore = defineStore({
  id: 'loggedInUser',
  state: () => {
    return {
      name: "",
      role: "",
      isLoggedIn: false
    }
  },
  actions: {
    async login(username, password) {
      try {
        const token = await loginUser(username, password);
        // Get the user's name and role from the JWT token
        const decodedToken = jwt_decode(token);
        this.$patch({
          isLoggedIn: true,
          role: decodedToken.role,
          name: decodedToken.name
        });
        this.$router.push("/");
        toast.success("Login Sucessful!")

      } catch ( error ) {
        toast.error(error.message)
      }
    },
    async signup(username, password) {
      try {
        // Call the API function to sign up the user
        const token = await signupUser(username, password);
        // If signup is successful, the backend should return a token
        // Decode the token to get user details
        const decodedToken = jwt_decode(token);
        // Update the store state to reflect that user is logged in
        this.$patch({
          isLoggedIn: true,
          role: decodedToken.role,
          name: decodedToken.name
        });
        // Redirect the user to the dashboard or home page
        this.$router.push("/");
        toast.success("Signup Successful!")
      } catch (error) {
        // Handle errors, such as username already taken, invalid data, etc.
        toast.error(error.response.data.message || "Signup failed!")
      }
    },
    logout() {
      logoutUser();
      // Reset value after user log out
      this.$patch({
        name: "",
        role: "",
        isLoggedIn: false
      });
      this.$router.push("/");
      toast.info("You have been logged out!")
    }
  },
});
