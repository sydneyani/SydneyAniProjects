<template>
    <div class="custom-modal" v-if="show">
      <div class="custom-modal-content">
        <p>{{ message }}</p>
        <button @click="confirmAction" class="bg-red-700 text-white rounded">
          Confirm
        </button>
        <button @click="cancelAction" class="bg-gray-400 text-gray-800 rounded">
          Cancel
        </button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      show: Boolean,
      message: String,
      onConfirm: Function,
      onsubmit: Function,
      onCancel: Function,
    },
    methods: {
      confirmAction() {
        this.onConfirm();
      },
      cancelAction() {
        this.onCancel();
      },
    },
  };
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
  