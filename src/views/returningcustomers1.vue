<template>
  <div class="container">
    <div>
      <h1>Customer Search List</h1>

      <!-- Search bar -->
      <div class="input-group mb-3">
        <input v-model="searchQuery" type="text" class="form-control" placeholder="Search by name, email, phone, or birthdate">
        <div class="input-group-append">
          <button class="btn btn-primary" @click="search">Search</button>
        </div>
      </div>

      <!-- Table for customer list -->
      <table class="table table-striped">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Address</th>
            <th>Products</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="customer in filteredCustomers" :key="customer._id">
            <td>{{ customer.name }}</td>
            <td>{{ customer.lastname }}</td>
            <td>{{ customer.email }}</td>
            <td>{{ customer.phoneNumber }}</td>
            <td>{{ customer.address }}</td>
            <td>
              <!-- Button for showing/hiding products -->
              <button class="btn btn-link" @click="toggleProducts(customer)">
                {{ customer.isProductsVisible ? 'Hide Products' : 'Show Products' }}
              </button>
              <ul v-if="customer.isProductsVisible" class="list-group">
                <li class="list-group-item" v-for="order in customer.orders" :key="order._id">
                  <strong>Order Date: {{ order.datetime }}</strong>
                  <p>Status: {{ order.status ? 'Completed' : 'Pending' }}</p>
                  <ul>
                    <li v-for="product in order.products" :key="product._id">
                      <strong>{{ product.name }}</strong>
                      <p>Item Name: {{ product.itemname }}</p>
                      <p>Price: ${{ product.price.toFixed(2) }}</p>
                      <p>Description: {{ product.description }}</p>
                    </li>
                  </ul>
                </li>
              </ul>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
const apiURL = import.meta.env.VITE_ROOT_API

export default {
  data() {
    return {
      searchQuery: '',
      customers: [],
    };
  },
  computed: {
    filteredCustomers() {
      const query = this.searchQuery.toLowerCase();
      return this.customers.filter((customer) =>
        customer.name.toLowerCase().includes(query) ||
        //customer.lastname.toLowerCase().includes(query) ||
        customer.email.toLowerCase().includes(query) ||
        customer.phoneNumber.includes(query) ||
        customer.address.toLowerCase().includes(query)
      );
    },
  },
  methods: {
    search() {
      axios.get(`${apiURL}/customers`)
        .then((response) => {
          this.customers = response.data;
          // Assuming the response contains an array of customers
          this.customers.forEach((customer) => {
            customer.isProductsVisible = false; // Initialize the visibility property
          });
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    },
    toggleProducts(customer) {
      customer.isProductsVisible = !customer.isProductsVisible;
    },
  },
  created() {
    // Automatically load data when the component is created
    this.search();
  },
};
</script>

  