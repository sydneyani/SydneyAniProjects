<template>
  <div class="container">
    <form class="col-md-8" @submit.prevent="handleSubmit">
      <div>
        <h2 class="header">New Customer Information</h2>
        <div class="form-row">
          <div class="form-group col-md-6">
            <label for="name">Name</label>
            <input
              v-model="customer.name"
              type="text"
              class="form-control"
              id="name"
              placeholder="First Name"
            />
          </div>
        </div>
        <div class="form-group col-md-6">
          <label for="phoneNumber">Phone Number</label>
          <input
            v-model="customer.phoneNumber"
            type="tel"
            class="form-control"
            id="phoneNumber"
            placeholder="Phone Number"
          />
        </div>
        <div class="form-group col-md-6">
          <label for="email">Email</label>
          <input
            v-model="customer.email"
            type="email"
            class="form-control"
            id="email"
            placeholder="Email"
          />
        </div>
        <div class="form-group col-md-6">
          <label for="birthdate">Birthdate</label>
          <input
            v-model="customer.birthday"
            type="date"
            class="form-control"
            id="birthdate"
            placeholder="MM/DD/YYYY"
          />
        </div>
      </div>

      <div>
        <h2 class="header">Product Information</h2>
        <div v-for="(product, index) in products" :key="index">
          <div id="checks" class="form-group">
            <label for="checks">Type</label>
            <div class="form-check">
              <input
                v-model="product.type"
                class="form-check-input"
                type="radio"
                value="Glasses"
                id="checkboxGlasses"
              />
              <label class="form-check-label" for="checkboxGlasses">
                Glasses
              </label>
            </div>
            <div class="form-check">
              <input
                v-model="product.type"
                class="form-check-input"
                type="radio"
                value="Contacts"
                id="checkboxContacts"
              />
              <label class="form-check-label" for="checkboxContacts">
                Contacts
              </label>
            </div>
            <div class="form-check">
              <input
                v-model="product.type"
                class="form-check-input"
                type="radio"
                value="Accessories"
                id="checkboxAccessories"
              />
              <label class="form-check-label" for="checkboxAccessories">
                Accessories
              </label>
            </div>

            <div
              v-if="product.type.includes('Glasses')"
              class="form-group col-md-6"
            >
              <label for="glassesBrand">Glasses Brand</label>
              <select
                class="form-control"
                id="glassesBrand"
                v-model="product.glassesBrand"
              >
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

            <div
              v-if="product.type.includes('Contacts')"
              class="form-group col-md-6"
            >
              <label for="contactsBrand">Contacts</label>
              <select
                class="form-control"
                id="contactsBrand"
                v-model="product.contactsBrand"
              >
                <option value="Generic">Scleral</option>
                <option value="RGP">RGP</option>
                <option value="Hybrid">Hybrid</option>
                <option value="Orthokeratology">Orthokeratology</option>
                <option value="Other2">Other</option>
              </select>
            </div>

            <div v-if="product.type.includes('Accessories')" class="form-group">
              <label for="contactsBrand">Select SubType </label>
              <div class="form-check">
                <input
                  v-model="product.subType"
                  @change="
                    () => {
                      product.accessoryType = []
                    }
                  "
                  class="form-check-input"
                  type="radio"
                  value="Reflective"
                />
                <label class="form-check-label" for="checkboxGlasses">
                  Reflective
                </label>
              </div>
              <div class="form-check">
                <input
                  v-model="product.subType"
                  class="form-check-input"
                  @change="
                    () => {
                      product.accessoryType = []
                    }
                  "
                  type="radio"
                  value="Non-Reflective"
                />
                <label class="form-check-label" for="Accessories">
                  Non Reflective
                </label>
              </div>
              

              <div v-if="product.subType === 'Reflective'">
                <label for="accessoryType">Accessory Type</label>
                <div class="form-check">
                  <input
                    id="accessoryType"
                    v-model="product.accessoryType"
                    class="form-check-input"
                    type="checkbox"
                    value="lvl2AR"
                  />Level 2 AR
                </div>
                <div class="form-check">
                  <input
                    id="accessoryType"
                    v-model="product.accessoryType"
                    class="form-check-input"
                    type="checkbox"
                    value="lvl3AR"
                  />Level 3 AR
                </div>
                <div class="form-check">
                  <input
                    id="accessoryType"
                    v-model="product.accessoryType"
                    class="form-check-input"
                    type="checkbox"
                    value="premiumAR"
                  />Premium AR
                </div>
                <div class="form-check">
                  <input
                    id="accessoryType"
                    v-model="product.accessoryType"
                    class="form-check-input"
                    type="checkbox"
                    value="transitions"
                  />Transitions
                </div>
                <div class="form-check">
                  <input
                    id="accessoryType"
                    v-model="product.accessoryType"
                    class="form-check-input"
                    type="checkbox"
                    value="progressivelvl1"
                  />Progressive Level 1
                </div>
                <div class="form-check">
                  <input
                    id="accessoryType"
                    v-model="product.accessoryType"
                    class="form-check-input"
                    type="checkbox"
                    value="progressivelvl2"
                  />Progressive Level 2
                </div>
                <div class="form-check">
                  <input
                    id="accessoryType"
                    v-model="product.accessoryType"
                    class="form-check-input"
                    type="checkbox"
                    value="progressivelvl3"
                  />Progressive Level 3
                </div>
                <div class="form-check">
                  <input
                    id="accessoryType"
                    v-model="product.accessoryType"
                    class="form-check-input"
                    type="checkbox"
                    value="progressivelvl4"
                  />Progressive Level 4
                </div>
                <div class="form-check">
                  <input
                    id="accessoryType"
                    v-model="product.accessoryType"
                    class="form-check-input"
                    type="checkbox"
                    value="Other3"
                  />Other
                </div>
              </div>

              <div v-if="product.subType === 'Non-Reflective'">
                <label for="accessoryType">Accessory Type</label>
                <div class="form-check">
                  <input
                    id="accessoryType"
                    v-model="product.accessoryType"
                    class="form-check-input"
                    type="checkbox"
                    value="antiCoating"
                  />Anti-reflective Coating Standard
                </div>
              </div>
            </div>
          </div>

          <div class="form-group col-md-3">
            <label for="price">Price</label>
            <input
              v-model="product.price"
              type="number"
              min="0.01"
              step="0.01"
              class="form-control"
              id="itemPrice"
            />
          </div>

          <div class="form-group col-md-2">
            <label for="quantity">Quantity</label>
            <input
              v-model="product.quantity"
              type="number"
              min="0"
              class="form-control"
              id="quantity"
            />
          </div>

          <div class="form-group col-md-6">
            <label for="description">Description (Optional)</label>
            <textarea
              v-model="product.description"
              type="textarea"
              class="form-control"
              id="description"
            ></textarea>
          </div>

          <input
            type="button"
            @click="removeProduct(index)"
            v-if="shouldShowRemoveButton(index)"
            class="btn btn-danger form-group"
            value="Remove Product"
          />
          <input
            type="button"
            @click="addProduct"
            class="btn btn-success form-group"
            value="Add Product"
          />

          <div class="form-group">
            <p>Total Price: ${{ totalPrice.toFixed(2) }}</p>
          </div>
        </div>
      </div>

      <div class="form-group">
        <input type="submit" class="btn btn-primary submitButton" />
      </div>
    </form>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
import axios from "axios";

export default {
  data() {
    return {
      customer: {
        id: null,
        name: null,
        phoneNumber: null,
        email: null,
        birthday: null,
      },
      products: [
        {
          description: null,
          price: null,
          quantity: null,
          type: [],
          glassesBrand: null,
          contactsBrand: null,
          accessoryType: [],
          subType: null,
        },
      ],
    };
  },
  mounted() {
    if (this.$route.params.id) {
      this.fetchData(this.$route.params.id);
    }
  },
  methods: {
    addProduct() {
      this.products.push({
        description: null,
        price: null,
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
    getDate(inputDate) {
      if (!inputDate) return "";
      const date = new Date(inputDate);
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const day = date.getDate().toString().padStart(2, "0");
      return `${year}-${month}-${day}`;
    },
    fetchData(id) {
      axios
        .get(import.meta.env.VITE_ROOT_API + "/customers/" + id)
        .then((response) => {
          this.customer = {
            ...response.data,
            birthday: this.getDate(response.data.birthday),
          };
          this.products = response.data.products;
        })
        .catch((error) => {
          console.error("Error fetching data from API:", error);
        });
    },
    async createData() {
      const { id, name, phoneNumber, email, birthday } = this.customer;
      let user = localStorage.getItem("user");
      user = !!user && typeof user === "string" ? JSON.parse(user) : null;
      const data = {
        name,
        email,
        phoneNumber: phoneNumber,
        birthday: birthday,
        employee_id: user.id,
        products: this.products,
      };

      try {
        const response = await axios.post(
          import.meta.env.VITE_ROOT_API + "/customers",
          data
        );
        if (response?.data) {
          this.$router.push("/returningcustomers");
        }
      } catch (error) {
        console.log(error.message);
      }
    },
    handleSubmit() {
      if (this.$route.params.id) {
        this.updateData(this.$route.params.id);
      } else {
        this.createData();
      }
    },
    async updateData(productId) {
      const { name, phoneNumber, email, birthday } = this.customer;

      const data = {
        name,
        email,
        phoneNumber: phoneNumber,
        birthday: birthday,
        products: this.products,
      };

      try {
        const response = await axios.put(
          import.meta.env.VITE_ROOT_API + `/customers/${productId}`,
          data
        );
        if (response?.data) {
          this.$router.push("/returningcustomers");
        }
      } catch (error) {
        console.log(error.message);
      }
    },
  },
  computed: {
    totalPrice() {
      return this.products.reduce(
        (total, product) => total + parseFloat(product.price || 0),
        0
      );
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
  margin-bottom: 30px;
}
</style>
