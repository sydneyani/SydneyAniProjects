<!-- This view allows a user to update a specific service's information. -->
<!-- CHAT GPT was used for the creation of the template portion of this service details-->
<!--By using AI I was able to understand how to properly connect my update and delete buttons through the code. Initially
the services details page  would not let me type in the service name box after pressing the update box. The main prompt I used was how do I get
my update button to work and then I would say if I had tried that or not and give additional details regarding what the code is sourcing 
after pasting this fill in.  -->
<template>
  <main>
    <!--The header is midway in the left side of the screen after the horizontal menu bar-->
    <h1 class="font-bold text-4xl text-red-700 tracking-widest text-center mt-10">
      Service Details
    </h1>
    <div class="px-10 py-20"> <!--Formatting is similar to findservice.vue but just change to details for update portion-->
        <!-- grid container -->
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
          <h2 class="text-2xl font-bold">Service Details</h2>
          <!-- Service Name input field -->
          <div class="flex flex-col">
            <label class="block">
              <span class="text-gray-700">Service Name</span> <!---->
              <span style="color: #ff0000">*</span>
              <input type="text"
                class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                v-model="service.name" />
            </label>
            <span v-if="v$.service.name.$error" class="text-red-500"> <!--Requires sure the user inputs a Name and will provide error if not-->
              Service Name is required
            </span> <!--The text above will pop up if nothing is entered for Name-->
          </div>

          <!-- Description input field -->
          <div class="flex flex-col">
            <label>
              <span class="text-gray-700">Description:</span>
              <textarea
                class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                v-model="service.description"></textarea> <!--This field is not required so no v-if is necessary-->
            </label>
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
          <div></div>
          <!-- form field: update service description -->
          <div class="flex flex-col">
            <label class="block">
              <span class="text-gray-700">Service Status</span>
              <span style="color: #ff0000">*</span>
              <div class="mt-1">
                <label class="inline-flex items-center">
                  <input type="radio" class="form-radio" value="Active" v-model="service.status">
                  <span class="ml-2">Active</span> <!--When creating new service it will automatically be Active unless Unactive radio button clicked-->
                </label>
                <label class="inline-flex items-center ml-6">
                  <input type="radio" class="form-radio" value="Inactive" v-model="service.status"> <!--Both radio buttons use service.status so its either/or never both -->
                  <span class="ml-2">Inactive</span> 
                </label>
              </div>
            </label>
          </div>
        </div>

        <!-- grid container -->
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
          <div></div>
          <!-- Update Service button -->
          <div class="flex justify-between mt-10 mr-20">
            <div class="flex justify-between mt-10 mr-25"> 
              <button @click="submitServiceUpdate" type="submit" class="bg-green-700 disabled:opacity-50 text-white rounded" 
                :disabled="user.role === 'viewer'"> <!-- Submit button to update the name, description, and status in script-->
                Update Service
              </button>
            </div>
          </div>
             <!-- Delete Service button -->
<div class="flex justify-between mt-10 mr-20">
  <button @click="confirmDeleteService" type="button" class="bg-red-700 disabled:opacity-50 text-white rounded mt-9"
    :disabled="user.role === 'viewer'">
    Delete Service
  </button> <!-- Submit button to delete the name, description, and status in script-->
          
        </div>
           <!-- References the ConfDialogBox vue and shows it as a pop up -->
           <!--Gives two options confirm or cancel for deletion (Are you sure?)-->
  <confirmation-dialog :show="showDeleteConfirmation" :message="deleteConfirmationMessage" :on-confirm="submitDeleteService" :on-cancel="cancelDeleteService" />

          <!--Button Takes user back to Find Services (inital page)-->
          <div class="flex justify-between mt-20 mr-20">
            <button type="reset" class="border border-red-700 bg-white text-red-700 rounded" @click="this.$router.back()">
              Go back
            </button>
          </div>
        </div>
    </div>

    <hr class="mt-10 mb-10" />
    <!-- Display Found Data -->
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
      <!--List of Events table-->
      <div class="ml-10">
        <h2 class="text-2xl font-bold">List of Events</h2>
        <h3 class="italic">Click table row to view event details</h3>
      </div>
      <div class="flex flex-col col-span-2">
        <table class="min-w-full shadow-md rounded">
          <thead class="bg-gray-50 text-xl">
            <tr>
              <th class="p-4 text-left">Event Name</th>
              <th class="p-4 text-left">Event Date</th>
              <th class="p-4 text-left">Event Address</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-300">
          <!-- Iterate through the events array and create a table row for each event -->
            <tr @click="$router.push({name: 'eventdetails', params: { id: event._id } })" 
            v-for="event in events" :key="event._id" class="cursor-pointer"
              :class="{ 'hoverRow': hoverId === event._id }" @mouseenter="hoverId = event._id"
              @mouseleave="hoverId = null"> <!-- when mouse is over an event it highlights and changes color-->
              <!-- Display the name of the event in a table cell -->
              <td class="p-2 text-left">{{ event.name }}</td>
              <!-- Format and display the date of the event in a table cell -->
              <td class="p-2 text-left">{{ formatDate(event.date) }}</td>
              <!-- Display the address line 1 of the event in a table cell -->
              <td class="p-2 text-left">{{ event.address.line1 }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </main>
</template>

<script>
//Import statments to get necessary packages, components, and api calls
import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import { useLoggedInUserStore } from "../store/loggedInUser";
import { getServiceById, getEventsByServiceId, updateService, deleteService } from '../api/api'
import { useToast } from 'vue-toastification'
import ConfirmationDialog from '../components/ConfirmationDialog.vue';

//Notifications
const toast = useToast()

export default {
  components: {
    'confirmation-dialog': ConfirmationDialog,
  },
  data() {
    return {
      showDeleteConfirmation: false,
      deleteConfirmationMessage: "Are you sure you want to delete this service?",
      //variable to store service information
      service: {
        name: null,
        description: null,
        status: null
      },
      // all events that host the service
      events: [],
      // variable stores the ID of the row that the mouse is currently hovering over (to highlight the row red)
      hoverId: null,
    }
  },
  setup() {
    // register Vuelidate and loggedIn store
    const v$ = useVuelidate();
    const user = useLoggedInUserStore();
    return { v$, user };
  },
  validations() {
    // validations      
    return {
      service: {
        name: { required },
      },
    };
  },
  async mounted() {
    // when component is mounted, data is loaded
    try {
      const [serviceResponse, eventsResponse] = await Promise.all([
        getServiceById(this.$route.params.id),
        getEventsByServiceId(this.$route.params.id),
      ]);

      this.service = serviceResponse;
      this.events = eventsResponse;

    } catch (error) {
      toast.error(error);
    }
  },
  methods: {
    // method to format the event dates
    formatDate(date) {
      const isoDate = new Date(date);
      const year = isoDate.getUTCFullYear();
      const month = String(isoDate.getUTCMonth() + 1).padStart(2, '0');
      const day = String(isoDate.getUTCDate()).padStart(2, '0');
      return `${month}/${day}/${year}`;
    },

    // method called when user attempts to update the service
    async submitServiceUpdate() {
      // Trigger validation
      this.v$.$validate();

      if (this.v$.$error) {
        // Form is invalid, do not proceed
        return;
      }

      try {
        const response = await updateService(this.$route.params.id, this.service);
        this.$router.push('/findservice')
        toast.success(response)
      } catch (error) {
        toast.error('error updating service', error)
      }
    },

    // method to display a confirmation dialog before deleting the service
async confirmDeleteService() {
  // Display a confirmation dialog before deleting the service
  this.showDeleteConfirmation = true;

  if (confirmDelete) {
    this.submitDeleteService();
  }
},
async cancelDeleteService() {
  // Hide the confirmation dialog
  this.showDeleteConfirmation = false;
},
// method to make the API call to delete the service - can only be deleted if the service is not used in any event
async submitDeleteService() {
  try {
    if (this.events.length !== 0) {
      toast.info('Service cannot be deleted since it is being used by events.');
      return;
    }
    const response = await deleteService(this.$route.params.id);
    toast.success(response);
    this.$router.push('/findservice');
  } catch (error) {
    toast.error(error);
  }
},

  }
}
</script>
<style>
/* Center the custom confirm dialog */
.custom-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999; /* Ensure it's on top of other content */
}

.custom-modal-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  text-align: center;
}

.custom-modal button {
  padding: 10px 20px;
  margin: 0 10px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
}

.custom-modal button.bg-red-700 {
  background-color: #0000FF; /* Customize the background color for the "Confirm" button */
  color: #fff;
}

.custom-modal button.bg-gray-400 {
  background-color: #ccc; /* Customize the background color for the "Cancel" button */
  color: #333;
}

</style>