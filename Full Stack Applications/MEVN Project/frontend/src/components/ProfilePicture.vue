<template>
  <div class="profile-picture">
    <!-- Image preview or placeholder -->
    <div class="image-container">
      <img v-if="imagePreview" :src="imagePreview" alt="Profile Picture Preview" class="rounded-full" />
      <div v-else class="image-placeholder"></div>
    </div>
    
<!-- Upload button -->
<div class="file-upload">
  <button @click="$refs.imageInput.click()" class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded">
    Upload Image
  </button>
  <input 
    ref="imageInput"
    id="imageInput"
    type="file"
    @change="handleFileUpload"
    accept="image/*"
    class="hidden"
  />
</div>


    <!-- Delete button -->
    <div v-if="imagePreview" class="clear-button">
      <button class="bg-red-700 text-white rounded" @click="confirmClearImage">
        Delete
      </button>
    </div>

<!-- Save Image Changes button -->
<div class="relative mr-20 mt-5">
  <button type="button" class="go-back-button absolute right-0 top-0 mt-[-20px] mr-[10px] border border-red-700 bg-white text-red-700 rounded" @click="fetchImage">
    Save Image Changes
  </button>
</div>



    <!-- Confirmation Dialog -->
    <confirmation-dialog 
      :show="showImageClearConfirmation" 
      :message="clearImageConfirmationMessage" 
      :on-confirm="clearImage" 
      :on-cancel="cancelClearImageConfirmation" 
    />
  </div>
</template>


<script>
// Import the API functions
import { uploadProfilePicture, deleteProfilePicture, getClientDetails } from '../api/api'; // Adjust the path as necessary
import ConfirmationDialog from "./ConfirmationDialog.vue";

export default {
  components: {
    ConfirmationDialog,
  },
  props: {
    value: {
      type: String,
      default: null
    },
    clientId: {
      type: [String, Number],
      required: true
    },
    // Assuming you are passing the filename or URL of the profile picture from the parent
    profilePic: {
      type: String,
      default: null
    }
  },
  
  data() {
    return {
      selectedFile: null,
      imagePreview: this.value || null,
      showImageClearConfirmation: false, 
      clearImageConfirmationMessage: "Are you sure you want to delete this image?",
      // filename is now redundant if you are passing profilePic as prop
      // filename: null,
    };
  },

  mounted() {
    if (this.profilePic) {
      // Initialize the image preview with the profilePic prop
      this.imagePreview = `http://localhost:3000/uploads/${this.profilePic}`;
    } else {
      this.fetchClientDetails();
    }
  },

  watch: {
    clientId(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.getClientDetails();
      }
    },
    profilePic(newVal) {
      if (newVal) {
        this.imagePreview = `http://localhost:3000/uploads/${newVal}`;
      }
    }
  },
  methods: {

    async fetchImage() {
      try {
        // Assuming `filename` is a variable in your component that holds the actual filename
        const filename = this.filename;
        const response = await fetch(`/uploads/${filename}`);
        
        if (response.ok) {
          const data = await response.blob();
          // Handle the response data, e.g., display the image or download it

          // Redirect to /findclient page
          this.$router.push('/findclient');
        } else {
          console.error('Error fetching the image:', response.statusText);
          // Optionally, redirect even if there's an error
          this.$router.push('/findclient');
        }
      } catch (error) {
        console.error('Error:', error);
        // Optionally, redirect even if there's an error
        this.$router.push('/findclient');
      }
    },
  

    handleFileUpload(event) {
      const file = event.target.files[0];
      if (file) {
        this.selectedFile = file;
        this.generatePreview();
        this.uploadImage();
      }
    },
    generatePreview() {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imagePreview = e.target.result;
      };
      reader.readAsDataURL(this.selectedFile);
    },
    async uploadImage() {
  if (!this.selectedFile) {
    console.error('No file selected');
    return;
  }

  try {
    const response = await uploadProfilePicture(this.clientId, this.selectedFile);
    if (response.data.profilePic) {
      const profilePicUrl = response.data.profilePic;
      // Assuming the profilePicUrl is the relative path returned from the server
      const filename = profilePicUrl.split('/').pop(); // Extract the filename from the URL
      this.filename = filename; // Store the filename
      this.imagePreview = `http://localhost:3000/${profilePicUrl}`;
      this.$emit('input', this.imagePreview);
    }
  } catch (error) {
    console.error('Error uploading the image', error);
  }
},

async fetchClientDetails() {
  console.log('Hello');
    // Fetch client data from the server
    // This should include the profilePic or filename if it exists
    const clientId = this.clientId; // or however you access the client's ID
    try {
      const response = await getClientDetails(clientId); // Implement this method
      console.log(response);
      if (response.client && response.client.profilePic) {
        console.log('Proficle pic');
        // this.profilePic = response.client.profilePic; // Set the filename from the client's data
        const profilePicUrl = response.client.profilePic;
        // Assuming the profilePicUrl is the relative path returned from the server
        const filename = profilePicUrl.split('/').pop(); // Extract the filename from the URL
        this.filename = filename; // Store the filename
        this.imagePreview = `http://localhost:3000/uploads/${filename}`;
        console.log(this.imagePreview);
        this.$emit('input', this.imagePreview);
        // this.fetchProfilePicture();
      }
    } catch (error) {
      console.error('Error fetching the client data', error);
    }
  },

  async fetchProfilePicture() {
  if (!this.profilePic) {
    console.error('No filename is set for fetching the profile picture.');
    return;
  }

  // try {
  //   const response = await getProfilePicture(this.profilePic);
  //   if (response.data) {
  //     this.imagePreview = `http://localhost:3000${this.profilePic.slice(2)}`;
  //     //this.imagePreview = response.data;
  //     console.log(this.imagePreview);

  //     console.log(response.data);
  //     this.$emit('input', this.imagePreview);
  //   }
  // } catch (error) {
  //   console.error('Error fetching the profile picture', error);
  // }
},
    
    confirmClearImage() {
      this.showImageClearConfirmation = true;
    },
    async clearImage() {
      if (!this.filename) {
        console.error('No file to delete');
        return;
      }

      try {
        // Call the delete API
        await deleteProfilePicture(this.clientId);
        console.log('Image deleted successfully');
        // Clear the local state
        this.selectedFile = null;
        this.imagePreview = null;
        this.filename = null;
        this.$emit('input', null);
      } catch (error) {
        console.error('Error deleting the image:', error);
      }
      this.showImageClearConfirmation = false;
    },
    cancelClearImageConfirmation() {
      this.showImageClearConfirmation = false;
    }
  },
};
</script>




<style scoped>
.profile-picture {
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* This ensures the contents are left-aligned */
  margin-left: 1rem; /* Adjust this value to give space after the red bar */
}

.image-container {
  width: 100px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.image-placeholder {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: #eee; /* Light grey color for placeholder */
}

.image-preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.file-upload {
  margin-top: 10px;
  margin-left: -4rem;
}

.clear-button {
  margin-top: -41px;
  margin-left: 5rem;

}
.relative {
  position: relative;
  /* Adjusted for clarity - you can remove comments if not needed */
}

/* Adjusted styles for the Go Back button to change color to light blue */
.go-back-button {
  position: absolute; 
  margin-top: -64px; /* Adjusted to move the button up */
  margin-right: -350px; /* Adjusted to move the button right */
  background-color: #add8e6; /* Light blue background */
  color: #ffffff; /* White text for contrast */
  border: 1px solid #87CEEB; /* Light blue border */
  cursor: pointer;
  padding: 10px 20px; /* Padding around the text */
  border-radius: 5px; /* Rounded corners for the button */
  font-size: 16px; /* Font size for the button text */
}

/* Add a hover effect for the button to change when the user hovers over it */
.go-back-button:hover {
  background-color: #87CEEB; /* Slightly darker blue on hover for feedback */
}

</style>
