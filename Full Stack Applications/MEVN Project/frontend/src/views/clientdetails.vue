<!-- This view allows a user to view/update a specific client's information. -->
<!-- CHAT GPT was used for the creation of the majortity of this client details view-->
<!--By using AI I was able to understand how to properly get the profile 
  picture to display if the client wants to update upon pressing on an existing client. Additionally, 
  another big issue that Chat GPT was able to solve being able to delete existing clients and connecting it with the confirmation box.
 There were times the confirmation box wouldnt show up when the delete button was pressed so it would just automatically delete. The prompt that
I used to help get my desired results were first pasting my code then saying why am I getting errors in the confirmation box if I am referencing the component
 correctly, and from there throuh process of elimination I kept adding to the prompt and told chat to not give me X solution til it gave me the necessary corrections-->
<template>
  <main>
    <!--Header red and center in the page-->
    <h1 class="font-bold text-4xl text-red-700 tracking-widest text-center mt-10">
      Client Details
    </h1>
    
    <!-- Profile Picture Component -->
    <ProfilePicture :client-id="$route.params.id" v-model="client.profilePic" />



 
    <div class="px-10 py-20">
      <!-- grid container -->
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
        <h2 class="text-2xl font-bold">Personal Details</h2>
     
        <!-- First Name input field -->
        <div class="flex flex-col">
          <label class="block">
            <span class="text-gray-700">First Name</span>
            <span style="color: #ff0000">*</span>
            <input type="text"
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder v-model="client.firstName" />
          </label>
   
          <!-- Validation error messages -->
          <span v-if="v$.client.firstName.$error" class="text-red-500">
            First Name is required
          </span> <!--error ensures the first name is requireed and sends message is submit button is hit and its empty-->
        </div>
 
        <!-- Middle name input field -->
        <div class="flex flex-col">
          <label class="block">
            <span class="text-gray-700">Middle Name</span>
            <input type="text"
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder v-model="client.middleName" />
          </label>
        </div>
 
        <!-- Last Name input field -->
        <div class="flex flex-col">
          <label class="block">
            <span class="text-gray-700">Last Name</span>
            <span style="color: #ff0000">*</span>
            <input type="text"
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder v-model="client.lastName" />
          </label>
          <!-- Validation error messages -->
          <span v-if="v$.client.lastName.$error" class="text-red-500">
            Last Name is required
          </span> <!--error ensures the last name is requireed and sends message is submit button is hit and its empty-->
        </div>
        <div></div>
        <!-- Email input field -->
        <div class="flex flex-col">
          <label class="block">
            <span class="text-gray-700">Email</span>
            <input type="email"
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              v-model="client.email" />
          </label>
          <!-- Validation error messages -->
          <span v-if="v$.client.email.$error" class="text-red-500">
            Valid Email is required
          </span> <!--error ensures both email not being empty and that email has an @ symbol with characters following it -->
        </div>
        <!-- Phone number input field -->
        <div class="flex flex-col">
          <label class="block">
            <span class="text-gray-700">Phone Number</span>
            <span style="color: #ff0000">*</span>
            <input type="text"
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              pattern="^[0-9]{3}[0-9]{3}[0-9]{4}$" v-model="client.phoneNumber.primary" />
          </label>
          <!-- Validation error messages -->
          <span v-if="v$.client.phoneNumber.primary.$error" class="text-red-500">
            <span v-if="v$.client.phoneNumber.primary.required.$invalid">Phone Number is required</span> <!-- Requires the user to not leave phone # empty-->
            <span
              v-else-if="!v$.client.phoneNumber.primary.required.$invalid && v$.client.phoneNumber.primary.numeric.$invalid">
              Phone Number must contain only digits
            </span> <!--Could give the error if additional symbols/characters (not #'s) in this form field-->
            <span
              v-else-if="!v$.client.phoneNumber.primary.required.$invalid && !v$.client.phoneNumber.primary.numeric.$invalid && (v$.client.phoneNumber.primary.minLength.$invalid || v$.client.phoneNumber.primary.maxLength.$invalid)">
              Phone Number must be exactly 10 digits
            </span> <!--Cannot be more than 10 (no international extensions allowed)-->
          </span>
        </div>
        <!-- Alternative phone number input field -->
        <div class="flex flex-col">
          <label class="block">
            <span class="text-gray-700">Alternative Phone Number</span>
            <input type="text"
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              pattern="[0-9]{3}[0-9]{3}[0-9]{4}" v-model="client.phoneNumber.alternate" />
          </label>
        </div>
      </div>
 
      <!-- grid container -->
      <div class="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
        <h2 class="text-2xl font-bold">Address Details</h2>
        <!-- Address 1 input field -->
        <div class="flex flex-col">
          <label class="block">
            <span class="text-gray-700">Address Line 1</span>
            <input type="text"
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              v-model="client.address.line1" />
          </label>
        </div>
        <!-- Address 2 input field -->
        <div class="flex flex-col">
          <label class="block">
            <span class="text-gray-700">Address Line 2</span>
            <input type="text"
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              v-model="client.address.line2" />
          </label>
        </div>
        <!-- City input field -->
        <div class="flex flex-col">
          <label class="block">
            <span class="text-gray-700">City</span>
            <span style="color: #ff0000">*</span>
            <input type="text"
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              v-model="client.address.city" />
          </label>
          <!-- Validation error messages -->
          <span v-if="v$.client.address.city.$error" class="text-red-500">
            City is required
          </span> <!--Requires the user's city if the submit button is hit and its empty-->
        </div>
        <div></div>
        <!-- County input field -->
        <div class="flex flex-col">
          <label class="block">
            <span class="text-gray-700">County</span>
            <input type="text"
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              v-model="client.address.county" />
          </label>
        </div>
        <!-- Zip code input field -->
        <div class="flex flex-col">
          <label class="block">
            <span class="text-gray-700">Zip Code</span>
            <input type="text"
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              v-model="client.address.zip" />
          </label>
        </div>
        <div></div>
      </div>
 
      <!-- grid container -->
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
        <div class="flex justify-between mt-10 mr-20"></div>
 
         <!--Update Client submit button-->
         <div class="flex justify-between mt-10 mr-20">
          <button @click="submitUpdateClient" type="submit" class="bg-green-700 disabled:opacity-50 text-white rounded"
            :disabled="user.role === 'viewer'">
            Update Client
          </button> <!--If any required stuff is empty when update is pressed then it doesnt complete the action-->
        </div>
           <!-- Delete Event button -->
<div class="flex justify-between mt-10 mr-20">
  <button @click="submitDeleteClientbyId" type="button" class="bg-red-700 disabled:opacity-50 text-white rounded" :disabled="user.role === 'viewer'">
  Delete Client
</button> <!--Upon delete button being pressed the conf dialog box compoenent is called below-->
 
         
        </div>
         <!-- Use the ConfirmationDialog component with dynamic props -->
         <!--Gives option to proceed with deletion (Are you sure?) or cancel and proceed with any updates if necessary-->
  <confirmation-dialog :show="showDeleteConfirmation" :message="deleteConfirmationMessage" :on-confirm="submitdeleteClientbyId" :on-cancel="canceldeleteClientbyId" />
 
<!-- Go back button -->
<div class="flex justify-between mt-10 mr-20">
  <button type="reset" class="border border-red-700 bg-white text-red-700 rounded" @click="this.$router.back()">
    Go Back
  </button> <!--Returns to find client view page-->
  </div>




      </div>
      </div>

 
    <hr class="mt-10 mb-10" />
 
    <!-- Client Event Information -->
    <!--At the very bottom of the page is divided from client info with a gray line initializing a different div-->
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10 mr-10">
      <div class="ml-10">
        <h2 class="text-2xl font-bold">Events for Client</h2>
        <h3 class="italic">Click table row to view event details</h3>
      </div>
      <div class="flex flex-col col-span-2">
        <table class="min-w-full shadow-md rounded">
          <thead class="bg-gray-50 text-xl">
            <tr>
              <th class="p-4 text-left">Event Name</th>
              <th class="p-4 text-left">Date</th>
              <th class="p-4"></th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-300">
            <!-- Iterate through the events array and create a table row for each event if the client has previously signed up for it-->
            <tr @click="$router.push({ name: 'eventdetails', params: { id: event._id } })"
            v-for="event in clientEvents" :key="event._id" class="cursor-pointer"
              :class="{ 'hoverRow': hoverId === event._id }" @mouseenter="hoverId = event._id" @mouseleave="hoverId = null"> <!--If user hovers over a event, it turns red to help see where the cursor is-->
              <td class="p-2 text-left">{{ event.name }}</td> <!-- the loop gets event.name and date back to the user to display-->
              <td class="p-2 text-left">{{ formatDate(event.date) }}</td> <!-- However the date has been seen to display as NaaN/NaaN/NaaN, unclear if this needs to be solved-->
              <td class="p-2 text-right">
                <span class="remove-btn-wrapper">
                  <span class="remove-btn text-gray-400 cursor-pointer"
                    @click.stop="removeClientFromEvent(client._id, event._id)" v-if="hoverId === event._id">X</span>
                </span> <!-- An 'X' is seen on the right hand side of the event box that if clicked allows user to deregister from an event-->
              </td>
            </tr>
          </tbody>
        </table>
      </div>
 
      <div class="flex flex-col">
        <!--MultiSelect package used to add client to events-->
        <VueMultiselect
          class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 cursor-pointer"
          v-model="eventsSelected" :options="eventsFiltered" :custom-label="nameWithDate" :multiple="true"
          :close-on-select="true" placeholder="Select Events to be added" label="date" track-by="name" />
        <div class="flex justify-between">
          <!--button to add client to events-->
          <button @click="addClientToEvent" type="submit" class="mt-5 bg-red-700 disabled:opacity-50 text-white rounded"
            :disabled="eventsSelected.length === 0 || user.role === 'viewer'">
            Add Client to Selected Events
          </button>
        </div>
      </div>
 
    </div>
  </main>
</template>
 
<script>
//Import statments to get necessary packages, components, and api calls
import useVuelidate from '@vuelidate/core'
import { required, email, numeric, minLength, maxLength } from '@vuelidate/validators'
import VueMultiselect from 'vue-multiselect'
import { useLoggedInUserStore } from "../store/loggedInUser";
import { registerAttendee, deregisterAttendee, updateClient, deleteClientbyId, getClientDetails} from '../api/api'
import { useToast } from 'vue-toastification'
import ConfirmationDialog from '../components/ConfirmationDialog.vue';
import ProfilePicture from '../components/ProfilePicture.vue';
 
 
//Notifications
const toast = useToast()
 
export default {
  
  // register components -> retrive the conf box component
  components: {
    VueMultiselect,
    ProfilePicture,
    'confirmation-dialog': ConfirmationDialog,
  },
  setup() {
    // register Vuelidate and loggedIn store
    const v$ = useVuelidate();
    const user = useLoggedInUserStore();
    return { v$, user };
  },
  data() {
    return {
   
    
      showProfilePictureDeleteConfirmation: false,
    deleteProfilePictureConfirmationMessage: "Are you sure you want to delete the profile picture?",
      showDeleteConfirmation: false,
      deleteConfirmationMessage: "Are you sure you want to delete this client?",
      // events that the client is not registered in - to be shown in the multiselect
      eventsFiltered: [],
      // events that user selects from multiselect list
      eventsSelected: [],
      //variable to hold the events that the selected client is associated with
      clientEvents: [],
      //variable to hold client information  
      client: {
        firstName: null,
        middleName: null,
        lastName: null,
        email: null,
        profilePic: null,
        phoneNumber: {
          primary: null,
          alternate: null
        },
        address: {
          line1: null,
          line2: null,
          city: null,
          county: null,
          zip: null
        }
      },
      // variable stores the ID of the row that the mouse is currently hovering over (to highlight the row red)
      hoverId: null
    }
  },
  validations() {
    // validations
    return {
      client: {
        firstName: { required },
        lastName: { required },
        email: { required, email },
        profilePic: { 
          isString(value) {
        // If the value is not provided, consider it valid
        if (value === null || value === '') {
          return true;
        }
        // Check if the value is a string
        return typeof value === 'string';
      },
    },
        phoneNumber: {
          primary: {
            required,
            numeric,
            minLength: minLength(10),
            maxLength: maxLength(10),
          },
        },
        address: {
          city: { required },
        },
      },
    };
  },
  async mounted() {
  try {
    const response = await getClientDetails(this.$route.params.id);
    this.client = response.client;
    this.clientEvents = response.clientEvents;
    this.eventsFiltered = response.nonClientEvents;
    
    // Set the filename for the profile picture component
    // This assumes that the profilePic field is directly the filename or path
    this.filename = this.client.profilePic;
  } catch (error) {
    toast.error('Error loading data:', error);
  }
},


  methods: {
 
    formatDate(date) {
    if (!date) return '';
    // Example formatting, can be adjusted as needed.
    const d = new Date(date);
    return d.toLocaleDateString(undefined, {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  },

    //custom label for multiselect
    nameWithDate({ name, date }) {
      return `${name} (${this.formatDate(date)})`
    },
 
    // method called to remove client from event
    async removeClientFromEvent(clientId, eventId) {
      // remove client ID from the "attendees" array for that event
      try {
        const response = await deregisterAttendee(eventId, clientId);
        toast.success(response)
      } catch (error) {
        toast.error(error);
      }
      // update events for which client is registered, and events for which client is not registered
      try {
        this.clientEvents = await getClientDetails(this.$route.params.id);
        this.eventsFiltered = await getClientDetails(this.$route.params.id);
      } catch (error) {
        toast.error(error);
      }
    },
 
    // method called to add client to an event
    async addClientToEvent() {
  const client = this.client._id;
  const events = this.eventsSelected.map((event) => event._id);
  const promises = events.map(eventId => registerAttendee(eventId, client));

  try {
    await Promise.all(promises);
    this.clientEvents = await getClientDetails(this.$route.params.id);
    this.eventsFiltered = await getClientDetails(this.$route.params.id);
    this.eventsSelected = [];
  } catch (error) {
    toast.error(error);
  }
},
 
   // update client information
   async submitUpdateClient() {
      // Trigger validation
      this.v$.$validate();
 
      if (this.v$.$error) {
        // Form is invalid, do not proceed
        return;
      }
 
      try {
        const response = await updateClient(this.$route.params.id, this.client);
        this.$router.push('/findclient')
        toast.success(response)
      } catch (error) {
        toast.error(error)
      }
    },
 
    async submitDeleteClientbyId() {
  // Display a confirmation dialog before deleting the client
  this.showDeleteConfirmation = true;
 
 
  if (confirmDelete) {
    this.submitdeleteClientbyId();
  }
},
async canceldeleteClientbyId() {
  // Hide the confirmation dialog
  this.showDeleteConfirmation = false;
},
  async submitdeleteClientbyId() {
    try {
      const response = await deleteClientbyId(this.$route.params.id);
      toast.success(response);
      this.$router.push('/findclient');
    } catch (error) {
      toast.error(error);
    }
  }
},
 
  }
 
</script>
 
<!--Style for multiselect-->
<style src="vue-multiselect/dist/vue-multiselect.css"></style>
 
<style scoped>
.remove-btn-wrapper {
  display: inline-block;
  position: relative;
}
 
.remove-btn:hover {
  color: black;
}
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
.profile-picture {
  display: flex;
  justify-content: flex-start; /* Shifts content to the left */
  margin-left: 5rem;
}
 
/* Style for the edit and delete buttons */
.edit-delete-buttons {
  display: flex;
  gap: 1rem; /* Adjust the gap between buttons as needed */
  align-items: center; /* Vertically align buttons */
}
 
.edit-button {
  background-color: #4caf50; /* Green color for the Edit button */
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-left: 1rem;
}
 
.delete-button {
  background-color: #f44336; /* Red color for the Delete button */
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-left: 3rem;
  padding: 10px 20px;
}
 
/* Style for the file input */
.file-input {
  display: none; /* Hide the file input */
}
 
/* Style for the container div for the profile picture */

/* Style for the uploaded profile picture */
.profile-picture {
  width: 100%; /* Make the image width 100% of its container */
  height: 100%; /* Make the image height 100% of its container */
  object-fit: cover; /* Ensure the image covers the entire container */
}
</style>
 