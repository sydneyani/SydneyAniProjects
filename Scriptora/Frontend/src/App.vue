<!-- This is the main frontend file. It displays a navigation bar and rendered components. -->

<template>
  <main class="flex flex-row">
    <div id="_container" class="min-h-screen">
      <header class="w-full">
        <button @click="toggleSidebar" class="hamburger-button">
  <span class="material-icons">menu</span> <!-- Hamburger icon -->
</button>
<aside :class="['sidebar', { 'collapsed': !isSidebarOpen }]">
        <section class="text-center">
          <!-- Use the component's tag in the template -->
          <ProfilePicture v-if="user.isLoggedIn" />
        </section>
        <!--Navigation bar-->
        <nav class="mt-10">
          <ul class="flex flex-col gap-4">
            <!-- Dashboard link -->
            <li>
              <router-link to="/">
                <span style="position: relative; top: 6px" class="material-icons">dashboard</span>
                Dashboard
              </router-link>
            </li>
            <!--Login link - Link only shows is user is logged out-->
            <li v-if="!user.isLoggedIn">
              <router-link to="/signup">
                <span style="position:relative; top: 6px" class="material-icons">lock</span>
                Sign Up!
              </router-link>
            </li>
            <!-- Sign up - only shows if user is logged out-->
            <li v-if="!user.isLoggedIn">
              <router-link to="/login">
                <span style="position:relative; top: 6px" class="material-icons">login</span>
                Login
              </router-link>
            </li>
            <!--Logout link - Link only shows is user is logged in-->
            <li v-if="user.isLoggedIn" @click.prevent="user.logout" style="cursor: pointer;">
              <span style="position:relative; top: 6px" class="material-icons">logout</span>
              Logout
            </li>
           
            <!--Find Client link - only shows if user is logged in-->
            <li v-if="user.isLoggedIn">
              <router-link to="/thecode">
                <span style="position: relative; top: 6px" class="material-icons">code</span>
                The Code
              </router-link>
            </li>
            <!--Find Event link - only shows if user is logged in-->
            <li v-if="user.isLoggedIn">
              <router-link to="/voicechat">
                <span style="position: relative; top: 6px" class="material-icons">voice_chat</span>
                Voice Chats
              </router-link>
            </li>
            <!--Find Service link - only shows if user is logged in-->
            <li v-if="user.isLoggedIn">
              <router-link to="/addfriends">
                <span style="position: relative; top: 6px" class="material-icons">people</span>
                Add Friends
              </router-link>
            </li>
          </ul>
        </nav>
        </aside> 
      </header>
    </div>
    <div class="grow w-4/5">
    <!-- Organization Name Header -->
    <!-- Check if the current path is not the home page -->
    <section v-if="currentRoutePath !== '/'" class="items-center justify-end flex"
      style="background: linear-gradient(250deg, #181818 40%, #41125c 50.6%)">
      <img src="/scriptora123.png" alt="Logo" class="h-20 mr-10" />
</section>


      <!--Page Content-->
      <div>
        <router-view></router-view>
      </div>
    </div>
  </main>
</template>

<script>
import { useLoggedInUserStore } from './store/loggedInUser'
import { getOrgName } from './api/api'
import { useToast } from 'vue-toastification'
import ProfilePicture from './components/ProfilePicture.vue'
import { useRouter } from 'vue-router';
import { computed } from 'vue';


//Notifications
const toast = useToast()

export default {
  components: {
    // Register the component
    ProfilePicture
  },
  setup() {
    const user = useLoggedInUserStore();
    const router = useRouter();
    const currentRoutePath = computed(() => router.currentRoute.value.path);
    return { user, router, currentRoutePath };
    
  },
  data() {
    return {
      orgName: "Scriptora",
      isSidebarOpen: false, // Control the visibility of the sidebar
    };
  },
  async created() {
    try {
      this.orgName = await getOrgName();
    } catch {
      throw (error)
    }
  },
  methods: {
    logout() {
      try {
        this.$store.dispatch('clearSessionData');
        this.$router.push('/')
      } catch (error) {
        toast.error('logout error', error)
      }
    },
    toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  },
  }
}
</script>

<style scoped>
#_container {
  background-color: #181818;
  color: rgb(255, 255, 255);
  padding: 18px;
}
.sidebar {
  width: 150px; /* Default width */
  transition: width 0.2s; /* Smooth transition for collapsing and expanding */
}

.sidebar.collapsed {
  width: 0px; /* Collapsed state */
  overflow: hidden; /* Hide content when collapsed */
}
.hamburger-button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 10px;
  font-size: 24px; /* Adjust size as needed */
  color: white; /* Adjust color as needed */
}
</style>
