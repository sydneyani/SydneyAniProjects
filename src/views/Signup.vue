<template>
    <div class="container">
        <div class="row justify-content-center align-items-center">
            <div class="col-md-4">
                <form @submit.prevent="signUp">
                    <h2 class="text-center">Create New Account</h2>
                    <div class="form-group">
                        <label for="email">Name</label>
                        <input type="text" v-model="name" class="form-control" id="email" placeholder="Enter Name">
                    </div>
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input type="text" v-model="email" class="form-control" id="email" placeholder="Enter Email">
                    </div>
                    <div class="form-group">
                        <label for="password">Password</label>
                        <input type="password" v-model="password" class="form-control" id="password" placeholder="Enter password">
                    </div>
                    <div>
                        <label for="exampleSelect">User Role</label>
                        <select class="form-select" id="exampleSelect" v-model="selectedOption">
                  <option v-for="option in options" :value="option.value" :key="option.value">
                    {{ option.text }}
                  </option>
                </select>
                    </div>
                    <button type="submit" class="btn btn-primary btn-block custom-margin-top">Signup</button>
                    <p id="status_display">{{this.error}}</p>
                </form>
            </div>
        </div>
    </div>
</template>


<script>
import axios from 'axios';

export default {
    data() {
        return {
            email: '',
            password: '',
            name: '',
            selectedOption: null,
            options: [
                { value: 'admin', text: 'Admin' },
                { value: 'employee', text: 'Employee' },
            ],
            error: ""
        };
    },
    methods: {
        async signUp() {
            try {
                const response = await axios.post(
                    import.meta.env.VITE_ROOT_API + '/users', {
                        email: this.email,
                        password: this.password,
                        role: this.selectedOption,
                        name: this.name
                    });

                if (response?.data)
                    this.$router.push('/login');
            

            } catch (error) {
                // Handle login error
                console.error('Login failed:', error?.response?.data);
                this.error= error?.response?.data?.error || "something went wrong";
            }
        },
    },
};
</script>


<style scoped>
.container {
    padding-top: 150px;
}

.form-group {
    margin-bottom: 20px;
}

.custom-margin-top {
    margin-top: 20px;
    /* Adjust the margin value as needed */
}
</style>
