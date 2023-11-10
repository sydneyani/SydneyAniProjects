<template>
    <div class="container">
      <form class="col-md-8" @submit.prevent="submitForm">
        <div>
          <h2 class="header">Customer Information</h2>
          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="firstName">First Name</label>
              <input v-model="customer.firstname" type="text" class="form-control" id="firstName" placeholder="First Name">
            </div>
            <div class="form-group col-md-6">
              <label for="lastName">Last Name</label>
              <input v-model="customer.lastname" type="text" class="form-control" id="lastName" placeholder="Last Name">
            </div>
          </div>
          <div class="form-group col-md-6">
            <label for="phoneNumber">Phone Number</label>
            <input v-model="customer.phonenumber" type="tel" class="form-control" id="phoneNumber" placeholder="Phone Number">
          </div>
          <div class="form-group col-md-6">
            <label for="email">Email</label>
            <input v-model="customer.email" type="email" class="form-control" id="email" placeholder="Email">
          </div>
          <div class="form-group col-md-6">
            <label for="birthdate">Birthdate</label>
            <input v-model="customer.birthdate" type="date" class="form-control" id="birthdate" placeholder="MM/DD/YYYY">
          </div>
        </div>
  
        <div>
          <h2 class="header">Product Information</h2>
          <div v-for="(product, index) in products" :key="index">
            <div id="checks" class="form-group" >
              <label for="checks">Type</label>
              <div class="form-check">
                <input v-model="product.type" class="form-check-input"  type="radio" value="Glasses" id="checkboxGlasses">
                <label class="form-check-label" for="checkboxGlasses">
                  Glasses
                </label>
              </div>
              <div class="form-check">
                <input v-model="product.type" class="form-check-input" type="radio" value="Contacts" id="checkboxContacts">
                <label class="form-check-label" for="checkboxContacts">
                  Contacts
                </label>
              </div>
              <div class="form-check">
                <input v-model="product.type" class="form-check-input" type="radio" value="Accessories" id="checkboxAccessories">
                <label class="form-check-label" for="checkboxAccessories">
                  Accessories
                </label>
              </div>

              <div v-if="product.type.includes('Glasses')" class="form-group col-md-6">
                <label for="glassesBrand">Glasses Brand</label>
                <select class="form-control" id="glassesBrand" v-model="glassesBrand">
                  <option value="Generic">Generic</option>
                  <option value="TomFord">Tom Ford</option>
                  <option value="Gucci">Gucci</option>
                  <option value="Burberry">Burberry</option>
                  <option value="Versace">Versace</option>
                  <option value="Oakley">Oakley</option>
                  <option value="Ferragamo">Ferragamo</option>
                  <option value="LilyFrames">Lily Frames</option>
                  <option value="DavidBeckham">David Beckham</option>
                  <option value="Polo">Polo</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div v-if="product.type.includes('Contacts')" class="form-group col-md-6">
                <label for="contactsBrand">Contacts</label>
                <select class="form-control" id="contactsBrand" v-model="contactsBrand">
                  <option value="Generic">Scleral</option>
                  <option value="RGP">RGP</option>
                  <option value="Hybrid">Hybrid</option>
                  <option value="Orthokeratology">Orthokeratology</option>
                  <option value="Other2">Other</option>
                </select>
              </div>

              <div v-if="product.type.includes('Accessories')" class="form-group">
                <label for="accessoryType">Accessory Type</label>
                
                <div class="form-check">
                  <input id="accessoryType" v-model="accessoryType" class="form-check-input" type="checkbox" value="antiCoating">Anti-reflective Coating Standard
                </div>
                <div class="form-check">
                  <input id="accessoryType" v-model="accessoryType" class="form-check-input" type="checkbox" value="lvl2AR">Level 2 AR
                </div>
                <div class="form-check">
                  <input id="accessoryType" v-model="accessoryType" class="form-check-input" type="checkbox" value="lvl3AR">Level 3 AR
                </div>
                <div class="form-check">
                  <input id="accessoryType" v-model="accessoryType" class="form-check-input" type="checkbox" value="premiumAR">Premium AR
                </div>
                <div class="form-check">
                  <input id="accessoryType" v-model="accessoryType" class="form-check-input" type="checkbox" value="transitions">Transitions
                </div>
                <div class="form-check">
                  <input id="accessoryType" v-model="accessoryType" class="form-check-input" type="checkbox" value="progressivelvl1">Progressive Level 1
                </div>
                <div class="form-check">
                  <input id="accessoryType" v-model="accessoryType" class="form-check-input" type="checkbox" value="progressivelvl2">Progressive Level 2
                </div>
                <div class="form-check">
                  <input id="accessoryType" v-model="accessoryType" class="form-check-input" type="checkbox" value="progressivelvl3">Progressive Level 3
                </div>
                <div class="form-check">
                  <input id="accessoryType" v-model="accessoryType" class="form-check-input" type="checkbox" value="progressivelvl4">Progressive Level 4
                </div>
                <div class="form-check">
                  <input id="accessoryType" v-model="accessoryType" class="form-check-input" type="checkbox" value="Other3">Other
                </div>


              </div>

              

            </div>

            <div class="form-group col-md-3">
              <label for="price">Price</label>
              <input v-model="product.itemPrice" type="number" min="0.01" step="0.01" class="form-control" id="itemPrice">
            </div>

            <div class="form-group col-md-2">
              <label for="quantity">Quantity</label>
              <input v-model="product.quantity" type="number" min="0" class="form-control" id="quantity">
            </div>

            <div class="form-group col-md-6">
              <label for="description">Description (Optional)</label>
              <textarea v-model="product.description" type="textarea" class="form-control" id="description"></textarea>
            </div>
  


            
            <input type="button" @click="removeProduct(index)" v-if="shouldShowRemoveButton(index)" class="btn btn-danger form-group" value="Remove Product">
            <input type="button" @click="addProduct" class="btn btn-success form-group" value="Add Product">
  
            <div class="form-group">
              <p>Total Price: ${{ totalPrice.toFixed(2) }}</p>
            </div>
          </div>
        </div>
  
        <div class="form-group">
          <input type="submit" class="btn btn-primary submitButton">
          <button @click="deleteCustomer" class="btn btn-danger deleteButton">Delete Customer</button>

        </div>

      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios'; // Import Axios for making HTTP requests

  export default {
    data() {
      return {
        customer: {
          id: null,
          firstname: null,
          lastname: null,
          phonenumber: null,
          email: null,
          birthdate: null,
        },
        products: [
          {
            itemname: null,
            description: null,
            itemPrice: null,
            quantity: null,
            type: [],
            glassesBrand: null,
            contactsBrand: null,
            accessoryType: [],
          },
        ],
      };
    },
    methods: {
        deleteCustomer() {
      // Send an HTTP DELETE request to the backend to delete the customer
     // const customerId = this.customer.id; // Replace with the actual ID of the customer to be deleted
     // axios
        //.delete(`/api/customers/${customerId}`) // Replace with your API endpoint
        //.then(response => {
          // Handle successful deletion
        //  console.log('Customer deleted successfully:', response.data);
          
          // Use Vue Router to navigate to the 'returningcustomer.vue' page
          this.$router.push('/returningcustomers');
       // })
       // .catch(error => {
          // Handle errors
        //  console.error('Error deleting customer:', error);
       // });
    },
      addProduct() {
        this.products.push({
          itemname: null,
          description: null,
          quantity: null,
          type: [],
          glassesBrand: null,
          contactsBrand: null,
          accessoryType: [],
        });
      },
      removeProduct(index) {
        this.products.splice(index, 1);
      },
      shouldShowRemoveButton(index) {
        // Only show "Remove Product" button if there are more than one products
        return this.products.length > 1 && index !== 0;
      },
      async submitForm() {
        // Handle form submission here
        console.log(this.customer, this.products);
  
        try {
          // Use this.$router to navigate to another route
          // For updating the customer and products, you'll need to make an API call to your backend
          // to send the updated data and handle the update operation
          this.$router.push('/returningcustomers');
        } catch (error) {
          console.error(error);
        }
      },
    },
    computed: {
      totalPrice() {
        return this.products.reduce((total, product) => total + parseFloat(product.itemPrice || 0), 0);
      },
    },
  };
  </script>
  
  <style scoped>
  .header {
    margin-top: 50px;
  }
  .form-group {
    margin-top: 10px;
    margin-right: 10px;
  }
  
  .submitButton {
    margin-top: 30px;
    margin-bottom: 20px;
  }

  .deleteButton {
    margin-top: 30px;
    margin-bottom: 20px;
    margin-left: 50px;
  }
  </style>
  
