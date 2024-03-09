<template>
  <div class="profile-picture">
    <!-- Clickable image preview or placeholder -->
    <div @click="$refs.imageInput.click()" class="image-container cursor-pointer">
      <img v-if="imagePreview" :src="imagePreview" alt="Profile Picture Preview" class="image-preview rounded-full" />
      <div v-else class="image-placeholder rounded-full bg-gray-300 flex justify-center items-center">
        Try me!
      </div>
    </div>
    
    <!-- Hidden file input for uploading images -->
    <input 
      ref="imageInput"
      id="imageInput"
      type="file"
      @change="handleFileUpload"
      accept="image/*"
      class="hidden"
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
          this.$router.push('/thecode');
        } else {
          console.error('Error fetching the image:', response.statusText);
          // Optionally, redirect even if there's an error
          this.$router.push('/thecode');
        }
      } catch (error) {
        console.error('Error:', error);
        // Optionally, redirect even if there's an error
        this.$router.push('/thecode');
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
  align-items: center; /* Center the image container */
  margin: 1rem; /* Center the image container */
}

.image-container {
  width: 100px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%; /* Make it round */
}

.image-placeholder, .image-preview {
  width: 100%;
  height: 100%;
  border-radius: 50%; /* Make it round */
}

.image-preview {
  object-fit: cover; /* Cover the area without stretching */
}

.cursor-pointer {
  cursor: pointer; /* Change cursor to indicate it's clickable */
}
.image-placeholder {
    width: 100%;
    height: 100%;
    border-radius: 50%; /* Make it round */
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold; /* Optional: if you want the text to be bold */
    color: #000; /* Optional: change the color of the text if needed */
  }
/* Add any additional styles as needed */
</style>
