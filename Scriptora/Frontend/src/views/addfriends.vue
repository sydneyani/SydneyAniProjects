<template>
  <div class="app-container">
     <!-- Sidebar for navigation -->
  <aside class="sidebar">
  <div class="sidebar-item" @click="changeSection('Friends')" :class="{ active: currentTab === 'Friends' }">Friends</div>
  <div class="sidebar-item" @click="changeSection('Message Requests')" :class="{ active: currentTab === 'Message Requests' }">Message Requests</div>
  <div class="sidebar-item" @click="changeSection('Shop')" :class="{ active: currentTab === 'Shop' }">Shop</div>
</aside>
    <!-- Top Navbar -->
<nav class="top-navbar">
  <!-- Dynamically render navbar content based on the active sidebar item -->
  <span class="nav-item current-tab">{{ currentTabName }}</span>
  <template v-for="item in currentTabs" :key="item.name">
    <div 
      class="nav-item" 
      @click="changeSubSection(item.name)" 
      :class="{ active: currentSubTab === item.name }">
      {{ item.title }}
    </div>
  </template>
</nav>

 
    <!-- Main Content -->
    <main class="main-content">
      <div v-if="currentSubTab === 'addFriend'" class="add-friend-section">
        <h1>ADD FRIEND</h1>
        <p>You can add friends with their Scriptora username.</p>
        <input type="text" placeholder="Enter a Scriptora username..." v-model="username" />
        <button @click="sendFriendRequest">Send Friend Request</button>
        <div class="success-message" v-if="successMessage">{{ successMessage }}</div>
      </div>
      <!-- Placeholder divs for other sections -->
    <!-- Content for the 'Online' tab -->
<div v-if="currentSubTab === 'online'" class="online-section add-friend-section">
  <h1 class="online-header">FRIENDS ONLINE</h1>
  
  <!-- Check if there are any friends added -->
  <div v-if="friends && friends.length" class="friends-list">
    <p class="online-friends-intro add-friend-section p">Your friends that are currently online:</p>
    <ul class="online-friends-list">
      <li v-for="friend in friends" :key="friend.name" class="online-friend-item">
        {{ friend.name }}
      </li>
    </ul>
  </div>
  
  <!-- Message to show if no friends are added -->
  <div v-else class="no-friends-message add-friend-section">
    <p class="add-friend-section p">You have no friends added yet.</p>
    <p class="add-friend-section p">Add friends with their Scriptora username.</p>
    <input type="text" placeholder="Enter a Scriptora username..." v-model="username" class="add-friend-section input" />
    <button @click="sendFriendRequest">Send Friend Request</button>
    <div class="success-message" v-if="successMessage">{{ successMessage }}</div>
  </div>
</div>
      <!-- Content for the 'All' tab -->
<div v-if="currentSubTab === 'all'" class="all-section add-friend-section">
  <h1 class="all-header">ALL FRIENDS</h1>
  
  <!-- Check if there are any friends added -->
  <div v-if="friends && friends.length" class="friends-list">
    <p class="all-friends-intro add-friend-section p">Your list of friends:</p>
    <ul class="all-friends-list">
      <li v-for="friend in friends" :key="friend.name" class="all-friend-item">
        {{ friend.name }}
      </li>
    </ul>
  </div>
  
  <!-- Message to show if no friends are added -->
  <div v-else class="no-friends-message add-friend-section">
    <p class="add-friend-section p">You have no friends added yet.</p>
    <p class="add-friend-section p">Add friends with their Scriptora username.</p>
    <input type="text" placeholder="Enter a Scriptora username..." v-model="username" class="add-friend-section input" />
    <button @click="sendFriendRequest">Send Friend Request</button>
    <div class="success-message" v-if="successMessage">{{ successMessage }}</div>
  </div>
</div>
      <!-- Content for the 'Pending' tab -->
<div v-if="currentSubTab === 'pending'" class="all-section add-friend-section">
  <h1 class="pending-header">PENDING</h1>

  <div class="pending-categories">
    <!-- Incoming friend requests -->
    <div class="incoming-requests">
      <h2>Incoming Requests</h2>
      <div v-if="incomingFriends && incomingFriends.length" class="friends-list">
        <ul class="incoming-friends-list">
          <li v-for="request in incomingFriends" :key="request.name" class="friend-item">
            {{ request.name }}
            <!-- Include accept and decline buttons -->
            <button @click="acceptRequest(request)">Accept</button>
            <button @click="declineRequest(request)">Decline</button>
          </li>
        </ul>
      </div>
      <div v-else class="no-requests-message">
        <p>You have no incoming friend requests.</p>
      </div>
    </div>
    
    <!-- Outgoing friend requests -->
    <div class="outgoing-requests">
      <h2>Outgoing Requests</h2>
      <div v-if="outgoingFriends && outgoingFriends.length" class="friends-list">
        <ul class="outgoing-friends-list">
          <li v-for="request in outgoingFriends" :key="request.name" class="friend-item">
            {{ request.name }}
            <!-- Include cancel button -->
            <button @click="cancelRequest(request)">Cancel</button>
          </li>
        </ul>
      </div>
      <div v-else class="no-requests-message">
        <p>You have no outgoing friend requests.</p>
      </div>
    </div>
  </div>
</div>
<!-- Content for the 'Blocked' tab -->
<div v-if="currentSubTab === 'blocked'" class="blocked-section add-friend-section">
  <h1 class="blocked-header">BLOCKED</h1>

  <!-- Message if no users are blocked -->
  <div v-if="!(blockedFriends && blockedFriends.length)" class="no-blocked-users-message add-friend-section">
    <p class="add-friend-section p">You have not blocked any users.</p>
  </div>
  
  <!-- Search for a user to unblock -->
  <div class="search-unblock">
    <input type="text" placeholder="Enter a Scriptora username..." v-model="searchUsername" class="add-friend-section input" />
    <button @click="searchUser">Search User</button>
  </div>
  
  <!-- List of blocked users -->
  <div v-if="blockedFriends && blockedFriends.length" class="blocked-list">
    <p class="blocked-friends-intro add-friend-section p">Your blocked users:</p>
    <ul class="blocked-friends-list">
      <li v-for="blocked in blockedFriends" :key="blocked.id" class="blocked-friend-item">
        {{ blocked.name }}
        <button @click="unblockUser(blocked)">Unblock</button>
      </li>
    </ul>
  </div>
  
  <div class="success-message" v-if="successMessage">{{ successMessage }}</div>
</div>
<!-- Content for the 'Spam' subtab of 'Message Requests' -->
<div v-if="currentTab === 'Message Requests' && currentSubTab === 'spam'" class="spam-section">
  <h1 class="spam-header">SPAM REQUESTS</h1>

  <div class="message-requests-list">
    <div v-if="spamRequests.length" class="requests">
      <!-- Spam requests list -->
      <ul>
        <li v-for="spam in spamRequests" :key="spam.id" class="request-item">
          <div class="request-content">
            <div class="request-info">
              <h3>{{ spam.from }}</h3>
              <p>{{ spam.messagePreview }}</p>
            </div>
            <div class="request-actions">
              <button @click="markAsNotSpam(spam)">Not Spam</button>
              <button @click="deleteSpam(spam)">Delete</button>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div v-else class="no-requests">
      <p>There are no spam requests.</p>
    </div>
  </div>
</div>

      <!-- Content for the 'Requests' tab -->
      <div v-if="currentTab === 'Message Requests' && currentSubTab === 'requests'" class="requests-section">
  <h1 class="requests-header">MESSAGE REQUESTS</h1>

  <!-- Section for incoming message requests -->
  <div class="message-requests-list">
    <div v-if="messageRequests && messageRequests.length" class="requests">
      <ul>
        <li v-for="request in messageRequests" :key="request.id" class="request-item">
          <div class="request-content">
            <div class="request-info">
              <h3>{{ request.from }}</h3>
              <p>{{ request.messagePreview }}</p>
            </div>
            <div class="request-actions">
              <button @click="acceptMessageRequest(request)">Accept</button>
              <button @click="declineMessageRequest(request)">Decline</button>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div v-else class="no-requests">
      <p>No incoming message requests.</p>
    </div>
  </div>
</div>

   <!-- AVATAR SHOP PAGE -->
   <div v-if="currentTab === 'Shop' && currentSubTab === 'avatar'" class="shop-container">
  <h1 class="avatar-header" >AI Assistant Avatars</h1>
  <div class="shop-grid">
    <div class="shop-item" v-for="avatar in avatars" :key="avatar.id">
      <img :src="avatar.image" :alt="avatar.name" class="shop-image">
      <p>{{ avatar.name }}</p>
      <h3>{{ avatar.price | currency }}</h3>
      <button @click="purchaseAvatar(avatar.id)">Purchase</button>
    </div>
  </div>
</div>
<div v-if="currentSubTab === 'GPT-4'" class="gpt4-container">
  <div class="gpt4-content">
    <h1>GPT-4: Enhance Your Performance</h1>
    <p>
      Integrating GPT-4, OpenAI’s advanced AI, our AI Assistant offers rapid, in-depth coding support, enhancing development speed and understanding for a smoother coding journey.
    </p>
    <a href="https://openai.com/gpt-4" target="_blank">Access GPT-4 Now</a>
  </div>
  <div class="gpt4-image">
    <!-- Replace 'path-to-your-image.jpg' with the actual path to your image -->
    <img src="aipic.png" alt="GPT-4 AI Assistant">
  </div>
</div>

    </main>
  </div>
</template>

<script>
import { sendFriendRequestApi, acceptFriendRequest, getPendingFriendRequests } from '../api/api';

export default {
  data() {
    return {
      username: '',
      successMessage: '',
      currentTab: 'Friends', // Main section
      currentSubTab: null, // Sub-section
      friends: [],
      avatars: [
        // Placeholder data for avatars
        { id: 1, name: 'Zali', price: 8.99, image: 'anime9.png' },
        { id: 2, name: 'Kimino', price: 10.99, image: 'anime7.png' },
        { id: 3, name: 'Tevi', price: 5.99, image: 'anime8.png' },
        { id: 4, name: 'Jairo', price: 5.99, image: 'anime10.png'},
        { id: 5, name: 'Yeiko', price: 4.99, image: 'anime5.png' },
        { id: 6, name: 'Boone', price: 7.99, image: 'anime6.png' }
   
      ],
      
      messageRequests: [
      // Example requests; you would fetch these from your server in a real app
      { id: 1, from: 'Alice', messagePreview: 'Hi, can we connect?' },
      { id: 2, from: 'Bob', messagePreview: 'I saw your profile, let\'s talk!' },
      { id: 3, from: 'Jake', messagePreview: 'Hey bro' },
      { id: 4, from: 'Chris', messagePreview: 'Whats up!' },
      { id: 5, from: 'Pete', messagePreview: 'Yoo' },
      { id: 6, from: 'Wong', messagePreview: 'Hello' },
      { id: 7, from: 'James', messagePreview: 'Hi there' },
      { id: 8, from: 'Zeph', messagePreview: 'Whats up!' }
    ],
    spamRequests: [
        // Dummy records for spam requests
        { id: 1, from: 'Spammer1', messagePreview: 'This is a spam message.' },
        { id: 2, from: 'Spammer2', messagePreview: 'Click this suspicious link!' },
        { id: 3, from: 'Spammer3', messagePreview: 'You won a prize!' },
        { id: 4, from: 'Spammer4', messagePreview: 'You have a virus!' }
      ],
      selectedRequest: null, 
      incomingFriends: [
        { name: 'JohnDoe', id: 1 },
      { name: 'JaneSmith', id: 2 }
    ],
      outgoingFriends: [
      { name: 'MikeBrown', id: 3 },
      { name: 'SarahJones', id: 4 }
      ],
      blockedFriends: [
        // Assume this is populated with the list of blocked friends
        // { name: 'BlockedUser1', id: 101 },
        // { name: 'BlockedUser2', id: 102 },
        // ...etc
      ],
      searchUsername: '',
      // Define the tabs for each main section
      tabs: {
        'Friends': [
          { name: 'addFriend', title: 'Add Friend' },
          { name: 'online', title: 'Online' },
          { name: 'all', title: 'All' },
          { name: 'pending', title: 'Pending' },
          { name: 'blocked', title: 'Blocked' }
          
        ],
        'Message Requests': [
          { name: 'requests', title: 'Requests' },
          { name: 'spam', title: 'Spam' }
        ],
        
        'Shop': [
          { name: 'avatar', title: 'Avatars' },
          { name: 'GPT-4', title: 'GPT-4' }
        ],
        // Add other sidebar items and their tabs as needed
      },
      currentTabs: [] // Tabs to be displayed in the navbar
    };
  },
  methods: {
    
    async checkForPendingRequests() {
    try {
      const userId = this.$store.state.loggedInUser.id; // Get the logged-in user's ID from the store
      const pendingRequests = await getPendingFriendRequests(userId);
      this.pendingFriends = pendingRequests;
    } catch (error) {
      this.errorMessage = error.message;
    }
  },
  purchaseAvatar(avatarId) {
      // Implement your logic to handle avatar purchase
      console.log('Purchasing avatar with ID:', avatarId);
      // Usually, you would call an API to process the purchase here
    },
  selectRequest(request) {
      this.selectedRequest = request;
    },
    // Inside your existing 'methods' object
    acceptMessageRequest(request) {
    // Logic to accept message request
    console.log(`Accepted message request from ${request.from}`);
    // Remove the request from the list after accepting
    this.messageRequests = this.messageRequests.filter(r => r.id !== request.id);
    // Explicitly inform Vue about the data update
    this.$forceUpdate(); // Use this if the standard reactivity does not work
  },
  declineMessageRequest(request) {
    // Logic to decline message request
    console.log(`Declined message request from ${request.from}`);
    // Remove the request from the list after declining
    this.messageRequests = this.messageRequests.filter(r => r.id !== request.id);
    // Explicitly inform Vue about the data update
    this.$forceUpdate(); // Use this if the standard reactivity does not work
  },
  markAsNotSpam(spam) {
      console.log(`Marked message from ${spam.from} as not spam.`);
      // Logic to mark the message as not spam
      this.spamRequests = this.spamRequests.filter(s => s.id !== spam.id);
    },
    deleteSpam(spam) {
      console.log(`Deleted spam message from ${spam.from}.`);
      // Logic to delete the spam message
      this.spamRequests = this.spamRequests.filter(s => s.id !== spam.id);
      // Typically, you would also call an API to update your backend
    },
  async acceptRequest(request) {
    try {
      const userId = this.$store.state.loggedInUser.id; // Get the logged-in user's ID from the store
      await acceptFriendRequest(userId, request.id);
      
      // Remove from incoming requests and add to friends list
      this.incomingFriends = this.incomingFriends.filter(friend => friend.id !== request.id);
      this.friends.push(request);

      // Update success message
      this.successMessage = `You are now friends with ${request.name}.`;
    } catch (error) {
      this.errorMessage = error.message;
    }
  },
  declineRequest(request) {
    // Remove from incoming requests
    this.incomingFriends = this.incomingFriends.filter(friend => friend.id !== request.id);
    // Update success message
    this.successMessage = `You have declined the friend request from ${request.name}.`;
  },
  cancelRequest(request) {
    // Remove from outgoing requests
    this.outgoingFriends = this.outgoingFriends.filter(friend => friend.id !== request.id);
    // Update success message
    this.successMessage = `You have canceled the friend request to ${request.name}.`;
  },
  async sendFriendRequest() {
  if (this.username) {
    try {
      // Call the API and wait for the response
      const response = await sendFriendRequestApi(this.username);
      // If the API call is successful, update the UI accordingly
      this.friends.push({ name: this.username });
      this.successMessage = `Success! Your friend request to ${this.username} was sent.`;
      console.log(response.message); // Log the success message from the API
    } catch (error) {
      // Handle any errors that occur during the API call
      console.error(error.message);
      // Optionally, update the UI to reflect the error
    }
    this.username = ''; // Clear input field regardless of request success or failure
  }
},
    unblockUser(blockedUser) {
      // Logic to unblock the user
      this.blockedFriends = this.blockedFriends.filter(user => user.id !== blockedUser.id);
      this.successMessage = `${blockedUser.name} has been unblocked.`;
      // You would typically make an API call here to unblock the user
    },
    searchUser() {
      // Logic to search for a user
      // You would typically make an API call here to search for the user by their username
      console.log('Searching for user:', this.searchUsername);
    },
    changeSection(mainTab) {
  this.currentTab = mainTab;
  // Set the default subtab depending on the main section
  if (mainTab === 'Friends') {
    this.currentSubTab = 'addFriend';
  } else if (mainTab === 'Message Requests') {
    this.currentSubTab = 'requests'; // Automatically switch to 'Requests' subsection
  } else if (mainTab === 'Shop') {
    this.currentSubTab = 'avatar'; // Automatically switch to 'Avatars' subsection
  } else {
    this.currentSubTab = null; // Or set this to the first subtab of other sections if needed
  }
  // Set the currentTabs based on the selected main section
  this.currentTabs = this.tabs[mainTab] || [];
},

    changeSubSection(subTab) {
      this.currentSubTab = subTab;
      // Optional: you may want to handle sub-section specific logic here
    },
  },
  mounted() {
    // Initialize the tabs when the component mounts
    this.changeSection(this.currentTab);
    
  },
  filters: {
  currency(value) {
    if (typeof value !== "number") {
      return value;
    }
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2 // This ensures that there are always two decimal places
    });
    return formatter.format(value);
  },
},
  computed: {
    // Computed property to get the current tab's name for display
    currentTabName() {
      // Maps the internal currentTab value to a user-friendly name
      const tabNames = {
        'Friends': 'Friends',
        // ... other mappings for your tabs
      };
      return tabNames[this.currentTab] || this.currentTab;
    },
    
    // Computed property to check if the current subtab is part of 'Friends'
    isFriendsSubTabActive() {
      const friendsSubTabs = ['online', 'all', 'pending', 'blocked', 'addFriend'];
      return friendsSubTabs.includes(this.currentSubTab);
    },
    isMessageRequestsSubTabActive() {
      const messageRequestsSubTabs = ['requests', 'blocked'];
      return messageRequestsSubTabs.includes(this.currentMessageRequestsSubTab);
    },
    mounted() {
    this.changeSection(this.currentTab);
  }
  
  }
  
};
</script>

<style scoped>


/* Styling for the current active section name in the top navbar */
.current-tab {
  color: #b9bbbe; /* Grayed-out font */
  padding: 10px 15px;
  margin-right: 20px; /* Space between the section name and the other tabs */
  border-right: 2px solid #333; /* Separator border */
  cursor: default; /* Non-clickable */
  font-weight: bold; /* Bold to distinguish it as a section header */
}
/* Additional global styles for the navbar */
.top-navbar .nav-item:not(.active):hover {
  background-color: #333; /* Darker background on hover for non-active tabs */
}

.app-container {
  position: relative; /* Set a context for absolute positioning */
  display: flex;
  flex-direction: row; /* Keep the flex row direction */
  height: 100vh;
}
.sidebar {
  flex: 0 0 250px; /* Sidebar fixed width */
  background-color: #2c2f33; /* Sidebar background color */
  height: 100vh; /* Full height */
  overflow-y: auto; /* Scroll if needed */
  padding-top: 50px; /* Add padding at the top equal to the navbar height */
  box-sizing: border-box; /* Include padding in the height calculation */
}

/* Additional global styles for the navbar */
.top-navbar {
  position: absolute; /* Position the navbar absolutely */
  top: 0; /* Align it to the top */
  left: 0; /* Align it to the left */
  width: 100%; /* Span the full width of the app container */
  z-index: 10; /* Ensure it's above other elements */
  display: flex;
  align-items: center;
  background: #23272a;
  padding: 2px 0;
  display: flex;
  align-items: center; /* This ensures vertical alignment */
  background: #23272a;

}
/* Styling for the rest of the nav items */
.nav-item {
  color: white;
  padding: 10px 15px;
  cursor: pointer;
}
/* Active nav item styling */
.nav-item.active {
  color: #7289da;
  background-color: #333; /* You can adjust the background color as needed */
  border-bottom: 2px solid #7289da; /* Blue underline for active tab */
  font-weight: bold;
  pointer-events: none;
  cursor: default;
}

.main-content {
  flex-grow: 1; /* Fill the remaining space */
  overflow-y: auto; /* Scroll if needed */
  padding-top: 50px; /* Add padding at the top equal to the navbar height */
  display: flex;
  flex-direction: column; /* Stack children vertically */
  align-items: center; /* Center children horizontally */
  justify-content: center; /* Center children vertically */
  padding: 30px; /* Add some padding */
  overflow: auto; /* Enable scrolling if content overflows */
}

.add-friend-section, .all-section {
  text-align: center;
  max-height: 100%; /* Ensure it does not grow beyond the viewport */
  width: 100%; /* Set width to match parent */
}

.add-friend-section h1 {
  color: #7289da;
}

.add-friend-section p {
  color: #b9bbbe;
}

/* Additional styling for the input and button */
.add-friend-section input {
  margin-top: 20px;
  padding: 10px;
  width: 300px;
  border: none; /* Removes the default border */
  border-radius: 4px; /* Adds rounded corners */
  background-color: #333; /* Sets the background color */
  color: white; /* Text color */
}

.add-friend-section button {
  margin-top: 10px;
  padding: 10px 20px; /* Adjust padding to make button rounder */
  background-color: #7289da;
  border: none;
  border-radius: 20px; /* Fully rounded corners for the button */
  color: white;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); /* Adds a subtle shadow */
  transition: background-color 0.3s; /* Smooth background color transition */
}
.add-friend-section button:hover {
  background-color: #5b6eae; /* Darker shade on hover */
}

.success-message {
  margin-top: 10px;
  color: #43b581;
}

.explore-servers {
  margin-top: 30px;
}

.explore-servers button {
  padding: 10px 15px;
  background-color: #43b581;
  border: none;
  color: white;
  cursor: pointer;
}
/* Styling for sidebar items */
.sidebar-item {
  color: white;
  padding: 10px 15px;
  cursor: pointer;
  border-bottom: 2px solid transparent; /* Prepares for color on active state */
}

/* Styling for sidebar items */
.sidebar-item.active {
  background-color: #333; /* Darker background for active item */
  border-bottom: 2px solid #7289da; /* Blue underline for active item */
  pointer-events: none; /* Disables clicking */
  cursor: default; /* Changes cursor to default instead of pointer */
}

.sidebar-item:hover {
  background-color: #333; /* Darker background on hover */
  border-bottom: 2px solid transparent; /* Keeps the underline transparent on hover */
}
/* Additional global styles for the navbar */
.top-navbar .nav-item:not(.active):hover {
  background-color: #333; /* Darker background on hover for non-active tabs */
}
.nav-item-link:not(.active):hover {
  background-color: #333; /* Darker background on hover for non-active tabs */
}

/* Make sure the list of friends does not stretch the container */
.friends-list ul {
  max-height: 200px; /* Set a max-height for the list */
  overflow-y: auto; /* Enable scrolling for the list */
}


/* Now let's correct the button positioning */
.add-friend-section button, .all-section button {
  margin: 20px auto; /* Add margin to the top and bottom, auto for left and right */
  display: block; /* Display as block to fill the width of its container */
}

/* Styling for the 'Pending' section categories */
.pending-categories {
  display: flex;
  justify-content: space-around;
  padding: 20px;
  /* Remove any height or max-height properties here */
}

.incoming-requests,
.outgoing-requests {
  flex: 1;
  margin: 0 10px;
  /* Remove any height or max-height properties here */
}

.incoming-requests h2,
.outgoing-requests h2 {
  color: #ffffff;
  text-align: center;
}

.friends-list {
  background-color: #333;
  padding: 15px;
  border-radius: 10px;
  overflow-y: auto; /* Change this to 'visible' or remove it */
  height: 300px;
}


.friend-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  margin: 10px 0;
  background-color: #23272a;
  border-radius: 4px;
}

.friend-item button {
  padding: 5px 10px;
  margin-left: 10px;
  background-color: #7289da;
  border: none;
  border-radius: 4px;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s;
}

.friend-item button:hover {
  background-color: #5b6eae;
}

.no-requests-message {
  text-align: center;
  color: #b9bbbe;
}
/* Additional styles for the message requests section */
.requests-section {
  max-width: 600px; /* Set a max width for the layout */
  margin: auto; /* Center it */
}

.requests-header {
  color: #7289da;
  text-align: center;
}

.message-requests-list {
  background-color: #333;
  padding: 15px;
  border-radius: 10px;
  margin-top: 20px;
  width: 700px; /* You can adjust the width as needed */
  max-height: calc(100vh - 160px); /* Maximum height taking into account the navbar and some margin */
  overflow-y: auto; /* Adds scrollbar when content overflows */
  margin-left: -50px;
}

@media (min-width: 1600px) {
  .message-requests-list {
  background-color: #333;
  padding: 15px;
  border-radius: 10px;
  margin-top: 20px;
  width: 1000px; /* You can adjust the width as needed */
  max-height: calc(100vh - 100px); /* Maximum height taking into account the navbar and some margin */
  overflow-y: auto; /* Adds scrollbar when content overflows */
  margin-left: -200px;
  }
}
.request-item {
  display: flex;
  justify-content: space-between;
  background-color: #23272a;
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 4px;
}

.request-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.request-info h3 {
  color: #fff;
  margin-bottom: 5px;
}

.request-info p {
  color: #b9bbbe;
  font-size: 0.9em;
}

.request-actions button {
  padding: 5px 10px;
  margin-left: 10px;
  background-color: #7289da;
  border: none;
  border-radius: 4px;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s;
}

.request-actions button:hover {
  background-color: #5b6eae;
}

.no-requests {
  color: #b9bbbe;
  text-align: center;
}
/* Styling for the 'Spam' section */
.spam-section {
  max-width: 700px; /* Match width with other sections */
  margin: 20px auto; /* Center the section */
}

.spam-header {
  text-align: center;
  color: #7289da;
}

.spam-requests-list {
  background-color: #333;
  padding: 15px;
  border-radius: 10px;
  margin-top: 20px;
  width: 700px; /* You can adjust the width as needed */
  max-height: calc(100vh - 160px); /* Maximum height taking into account the navbar and some margin */
  overflow-y: auto; /* Adds scrollbar when content overflows */
  margin-left: -50px;
}
@media (min-width: 1600px) {
  .spam-requests-list {
  background-color: #333;
  padding: 15px;
  border-radius: 10px;
  margin-top: 20px;
  width: 1000px; /* You can adjust the width as needed */
  max-height: calc(100vh - 100px); /* Maximum height taking into account the navbar and some margin */
  overflow-y: auto; /* Adds scrollbar when content overflows */
  margin-left: -200px;
  }
}
.spam-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  margin: 10px 0;
  background-color: #23272a;
  border-radius: 4px;
}

.spam-content {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.spam-info h3,
.spam-info p {
  margin: 5px 0;
  color: white;
}

.spam-actions button {
  padding: 5px 10px;
  margin-left: 10px;
  background-color: #7289da;
  border: none;
  border-radius: 4px;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s;
}

.spam-actions button:hover {
  background-color: #5b6eae;
}
.no-spam-requests {
  text-align: center;
  color: #b9bbbe;
  margin-top: 20px;
}

.shop-container {
   margin-top: 20px;


}

@media (min-width: 1600px) {
  .shop-container {
  display: center;
  margin-top: -50px;
  }
}

/* Additional styles to ensure grid items fit well */
.shop-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* Adjust the number of columns as per your design */
  gap: 20px;
  justify-content: center;
  align-items: start;
  margin-top: 10px;
  width: 1000px;
}
@media (min-width: 1600px) {
  .shop-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* Adjust the number of columns as per your design */
  gap: 20px;
  justify-content: center;
  align-items: start;
  margin-top: 10px;
  width: 1370px;
  }
}
.shop-item {
  background: #333;
  border: 1px solid #ddd;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
  padding: 15px;
}

.shop-image {
  max-width: 100%;
  height: auto;
  border-bottom: 1px solid #ddd;
  margin-bottom: 15px;
}

.shop-item h3 {
  margin: 10px 0;
  color: #7289da;
  text-overflow: ellipsis;
}

.shop-item p {
  color: #bdbdbd;
  font-size: 0.9em;
  margin-bottom: 15px;
}

.shop-item button {
  background: #a372da;
  color: white;
  border: none;
  border-radius: 20px; /* Rounded corners for the button */
  padding: 10px 20px;
  cursor: pointer;
  font-size: 1em;
}

.shop-item button:hover {
  background: #5b6eae;
}
.avatar-header {
  color: #7289da;
  text-align: center;
}
/* Ensures image is never more than 100% of its container */
.shop-item img {
  max-width: 100%;
  height: auto; /* Maintains the aspect ratio */
  display: block; /* Removes any unwanted space below the image */
  margin: 0 auto; /* Centers the image within its container */
  max-height: 150px; /* Adjusts the maximum height to something reasonable */
}

.gpt4-container {
    display: flex;
    justify-content: space-around; /* Or 'space-between' depending on your design preference */
    align-items: center;
    height: 100vh; /* This will make it take up the full viewport height */
    color: #FFFFFF;
    background-color: #2C2F33;
    font-family: 'Arial', sans-serif;
  }

  .gpt4-content {
    flex-basis: 50%; /* Adjust the width of the text container */
    padding: 40px;
  }

  .gpt4-content h1 {
    font-size: 3rem; /* Large font size for the header */
    font-weight: bold;
    color: #7289DA;
    margin-bottom: 20px;
  }

  .gpt4-content p {
    font-size: 1.5rem; /* Larger font size for the paragraph */
    font-weight: bold;
    line-height: 1.4;
    margin-bottom: 30px;
  }

  .gpt4-content a {
    display: inline-block;
    background-color: #7289DA;
    color: #FFFFFF;
    text-decoration: none;
    padding: 15px 30px;
    font-size: 1.25rem; /* Larger font size for the link */
    font-weight: bold;
    border-radius: 4px;
    transition: background-color 0.3s ease;
  }

  .gpt4-content a:hover {
    background-color: #5b6dac;
  }

  .gpt4-image {
    flex-basis: 50%; /* Adjust the width of the image container */
    /* Add styles for the image container if needed */
  }

  .gpt4-image img {
    max-width: 100%;
    height: auto;
    border-radius: 8px; /* Optional: if you want rounded corners on the image */
  }
</style>

