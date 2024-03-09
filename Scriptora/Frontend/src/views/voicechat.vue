<template>
  <div class="app-container">
    <!-- Navbar at the top -->
    <nav class="navbar">
      
        <div class="nav-item" @click="changeSection('chats')" :class="{ active: currentSection === 'chats' }">Voice Chat</div>
        <div class="nav-item" @click="changeSection('communities')" :class="{ active: currentSection === 'communities' }">Communities</div>
      
    </nav>

     <!-- Main content area -->
     <main class="main-content">
       
 <!-- CHATS PAGE -->
<div v-show="currentSection === 'chats'" class="chats-page">
 <!-- Friends List -->
<aside class="friends-list" v-if="!voiceChatActive">
  <div class="direct-messages-header">Direct Messages</div>
  <ul>
    <li v-for="friend in friendsList" :key="friend.id" @click="changeFriend(friend)" class="friend-item">
      <span>{{ friend.name }}</span>
      <button @click.stop="toggleVoiceChat(friend.id)" class="voice-up-btn">
        <span class="material-icons">keyboard_arrow_up</span> Voice Up!
      </button>
    </li>
  </ul>
</aside>

  <!-- Friend Chat Area -->
  <section class="friend-chat" v-if="!voiceChatActive && currentFriend">
    <!-- Chat header -->
    <header class="chat-header">
      <h1 class="friend-title">{{ currentFriend.name }}</h1>
    </header>
    
    <!-- Messages container -->
<div class="message-container">
  <template v-if="!friendMessages[currentFriend.id] || friendMessages[currentFriend.id].length === 0">
    <div class="message placeholder-message">Chat away!</div>
  </template>
  <template v-else>
    <div v-for="message in friendMessages[currentFriend.id]" :key="message.id" :class="['message', { 'mine': message.user === 'Me', 'theirs': message.user !== 'Me' }]">
    <span class="message-user">{{ message.user }}:</span>
    <span class="message-text">{{ message.text }}</span>
  </div>
  </template>
</div>
    
    <!-- Chat footer -->
    <footer class="chat-footer">
      <textarea class="chat-input" v-model="newMessage" :placeholder="'Message ' + currentFriend.name"></textarea>
      <button @click="sendChat(currentFriend.id)" class="send-btn">Send</button>
    </footer>
  </section>
 
    <!-- Voice chat elements -->
    <div v-if="voiceChatActive" class="voice-chat-elements">
      <!-- Screen sharing button and viewers window -->
      <div class="screen-sharing-container">
        <!-- Button to toggle screen sharing -->
        <button @click="shareScreen" class="screen-share-btn">
          {{ isScreenShared ? 'Unshare Screen' : 'Share Screen' }}
        </button>
        <!-- Viewer windows -->
        <div class="viewers-window">
          <div id="my-camera" class="viewer">My Camera</div>
          <div class="viewer">Viewer 1</div>
          <div class="viewer">Viewer 2</div>
          <div class="viewer">Viewer 3</div>
          <div class="viewer">Viewer 4</div>
          <div class="viewer">Viewer 5</div>
        </div>
        <!-- Webcam video element and buttons -->
        <div class="button-container-2">
          <button @click="toggleWebcam" class="webcam-toggle-btn">
            <span class="material-icons">
              {{ webcamActive ? 'videocam_off' : 'videocam' }}
            </span>
          </button>
           <!-- Microphone toggle button -->
      <button @click="toggleMicrophone" class="audio-toggle-btn">
        <span class="material-icons">
          {{ microphoneActive ? 'mic_off' : 'mic' }}
        </span>
      </button>
      <!-- Speaker toggle button -->
      <button @click="toggleSpeaker" class="audio-toggle-btn">
        <span class="material-icons">
          {{ speakerActive ? 'volume_off' : 'volume_up' }}
        </span>
      </button>
          <!-- Chat toggle button -->
          <button @click="toggleChat" class="chat-toggle-btn">
  <span class="material-icons">chat</span>
</button>
<!-- Invite button with a material icon -->
<button @click="toggleInviteModal" class="invite-btn">
  <span class="material-icons">person_add</span>
</button>
             <!-- Voice Down button with a material icon -->
<button @click="toggleVoiceChat" class="voice-down-btn">
  <span class="material-icons">keyboard_arrow_down</span>
</button>
        </div>
        
        <!-- Stream window -->
        <div class="stream-window">
          <video ref="sharedScreen" autoplay></video>
        </div>
      </div>
      </div>
      </div>
    <!-- Invite Modal -->
<div v-if="showInviteModal" class="modal-overlay">
  <div class="invite-modal">
    <h2>Select friends to invite:</h2>
    <ul class="invite-friends-list">
      <li v-for="friend in friendsList" :key="friend.id" class="invite-friend-item" @click="toggleFriendSelection(friend.id)">
        <span class="friend-name">{{ friend.name }}</span>
        <span class="invite-status-dot" :class="{ 'is-selected': isSelected(friend.id) }"></span>
      </li>
    </ul>
    <button @click="inviteSelectedFriends" class="invite-selected-btn">Invite Selected</button>
    <button @click="toggleInviteModal" class="close-modal-btn">Close</button>
  </div>
</div>
      <!-- Temporary Voice Chat Window -->
      <div v-if="tempChatWindowActive && currentSection === 'chats'" class="temporary-voice-chat">
    <div class="users-in-voice-chat">
      <!-- List users in voice chat -->
      <div v-for="user in usersInVoiceChat" :key="user.id" class="user">
        {{ user.name }}
      </div>
    </div>
    
    <!-- Temporary chat messages -->
    <div class="temp-chat-messages" ref="tempChatMessagesContainer">
      <div v-for="message in tempVoiceChatMessages" :key="message.id" class="message">
        <span class="message-user">{{ message.user }}:</span>
        <span class="message-text">{{ message.text }}</span>
      </div>
    </div>
    
    <!-- Input to send a message -->
    <footer class="temp-chat-footer">
      <textarea class="temp-chat-input" v-model="newTempMessage" placeholder="Type a message..." @keyup.enter="sendTempChat"></textarea>

      <button @click="sendTempChat" class="send-temp-btn">Send</button>
    </footer>
  </div>
      <!-- COMMUNITIES PAGE-->
<div v-show="currentSection === 'communities'" class="communities-container">
  <h2>Groups you may be interested in</h2>
  <div class="communities-grid">
    <div class="community-card" v-for="group in groups" :key="group.id">
      <img :src="group.image" :alt="group.name" class="community-image">
      <p>{{ group.members }} members</p>
      <h2>{{ group.name }}</h2>
      <br>
      <button @click="joinGroup(group.id)">Join</button>
    </div>
  </div>
</div>
    </main>
  </div>
</template>

<script>
import { useLoggedInUserStore } from "../store/loggedInUser";

export default {
  
  data() {
    return {
      currentSection: 'chats', // default section
      friendsList: [
        { id: 1, name: 'Frazier' },
        { id: 2, name: 'Noel' },
        {id: 3, name: 'Kenny'},
        {id: 4, name: 'Jesse'},
        {id: 5, name: 'Pinkman'},
        {id: 6, name: 'Walter'},
        {id: 7, name: 'White'},
    ],
      currentFriend: null, // The friend currently selected
      friendMessages: {
        1: [
          { id: 1, user: 'Frazier', text: 'Yoo' },
          { id: 2, user: 'Me', text: 'wassup' },
          { id: 3, user: 'Frazier', text: 'hop on the game or code?' },
          { id: 4, user: 'Me', text: 'code first ngl ' },
        ],
        2: [
          { id: 1, user: 'Noel', text: 'Hello' },
          { id: 2, user: 'Me', text: 'Hi' },
          { id: 3, user: 'Noel', text: 'How are you?' },
          { id: 4, user: 'Me', text: 'I\'m good, thanks!' },
        ],
      },
      viewers: [], // List of viewers watching the stream
      webcamActive: false, // Whether the webcam is active or not
      webcamStream: null, // The webcam stream
      microphoneActive: true, // Whether the microphone is active or not
      speakerActive: true, // Whether the speaker is active or not
      isScreenShared: false, // Whether the screen is being shared or not
      chatActive: false, // Whether the chat is active or not
      voiceChatActive: false,
      newMessage: '',
      tempChatWindowActive: false,
      showInviteModal: false,
      selectedFriends: [], // Array to store selected
      tempVoiceChatMessages: [],
    maxMessages: 5, // M
      messages: [],
      channels: ['#general', '#random', '#help'],
      currentChannel: '#general', // Set a default channel
      channelMessages: {
        '#general': [],
        '#random': [],
        '#help': [],
      },
      name: "", // The username of the logged in user
      groups: [
        { id: 1, name: 'C++ Yappers', members: Math.floor(Math.random() * 1000), image: 'f23.png', style: { width: '30px', height: 'auto' } },
        { id: 2, name: 'Type Script Dudes', members: Math.floor(Math.random() * 1000), image: 'f24.png', style: { width: '30px', height: 'auto' } },
        { id: 3, name: 'React For Losers', members: Math.floor(Math.random() * 1000), image: 'f13.png', style: { width: '30px', height: 'auto' } },
        { id: 4, name: 'Python Lovers', members: Math.floor(Math.random() * 1000), image: 'f25.png', style: { width: '30px', height: 'auto' } },
        { id: 5, name: 'Java Script Gurus', members: Math.floor(Math.random() * 1000), image: 'f27.png', style: { width: '30px', height: 'auto' } },
        { id: 6, name: 'Ruby Masters', members: Math.floor(Math.random() * 1000), image: 'f28.png', style: { width: '30px', height: 'auto' } },
        { id: 7, name: 'GoLangPros', members: Math.floor(Math.random() * 1000), image: 'f29.png', style: { width: '30px', height: 'auto' } },
        { id: 8, name: 'TypeScript Ninjas', members: Math.floor(Math.random() * 1000), image: 'f30.png', style: { width: '30px', height: 'auto' } },
        { id: 9, name: 'Swift Experts', members: Math.floor(Math.random() * 1000), image: 'f31.png', style: { width: '30px', height: 'auto' } },
      ],
      
    };
  },
  mounted() {
    this.loadLastOpenedChat();
  },
  methods: {
    sendChat(friendId) {
  const store = useLoggedInUserStore(); // Access the store

  if (this.newMessage.trim() !== '') {
    // Make sure the username is actually set in the store
    if (!store.name) {
      console.error("Username is not set in the store");
      // Handle the case where username is not set
      return; // Exit the function if no username is set
    }

    const newMsg = {
      id: Date.now(),
      user: store.name, // Use the username from the store
      text: this.newMessage,
    };

    // Check if it is a channel message or a friend message
    if (this.currentSection === 'chats' && this.currentFriend) {
      // Check if the friendMessages array exists for the friendId
      if (!this.friendMessages[friendId]) {
        this.$set(this.friendMessages, friendId, []); // Initialize the array if it doesn't exist
      }
      this.friendMessages[friendId].push(newMsg);
    } else if (this.currentChannel) {
      this.channelMessages[this.currentChannel].push(newMsg);
    }

    this.newMessage = ''; // Clear the input after sending
  }
},
    
    changeSection(section) {
    // Check if the section is a channel by looking for a hashtag
    if (section.startsWith('#')) {
      this.currentChannel = section;
    } else {
      this.currentSection = section;
    }
  },
  toggleVoiceChat() {
  // Toggle the voice chat on or off
  this.voiceChatActive = !this.voiceChatActive;

  // Deactivate the temp chat window when closing the voice chat
  if (!this.voiceChatActive) {
    this.tempChatWindowActive = false;
  }

    // When turning off voice chat, set the current friend if a friendId is provided
    if (!this.voiceChatActive && friendId) {
      this.currentFriend = this.friendsList.find(friend => friend.id === friendId);
    }
  },
  changeFriend(friend) {
      this.currentFriend = friend;
      // Save the last opened chat friend's ID to localStorage
      localStorage.setItem('lastOpenedChatFriendId', friend.id.toString());
      // Load messages or set up the chat for the selected friend
    },
    loadLastOpenedChat() {
      // Load the last opened chat friend's ID from localStorage
      const lastOpenedChatFriendId = localStorage.getItem('lastOpenedChatFriendId');

      if (lastOpenedChatFriendId) {
        const friendId = parseInt(lastOpenedChatFriendId);
        this.currentFriend = this.friendsList.find(friend => friend.id === friendId);

        // If for some reason the friend is not found, clear the storage
        if (!this.currentFriend) {
          localStorage.removeItem('lastOpenedChatFriendId');
        }
      }
    },
    sendChat(friend) {
      this.currentFriend = friend;
    },
    toggleChat() {
    // Directly toggle the temporary chat window
    this.tempChatWindowActive = !this.tempChatWindowActive;
  },
  sendTempChat() {
    if (this.newTempMessage.trim() !== '') {
      const tempMsg = {
        id: Date.now(),
        user: 'YourUsername', // Replace with the actual username
        text: this.newTempMessage,
      };
      this.tempVoiceChatMessages.push(tempMsg);
      this.newTempMessage = ''; // Clear the input after sending
      this.scrollToBottom(); // Scroll to the bottom of the chat
    }
  },
  scrollToBottom() {
    this.$nextTick(() => {
      const container = this.$refs.tempChatMessagesContainer;
      container.scrollTop = container.scrollHeight;
    });
  },
  handleEnterKey(event) {
      if (event.keyCode === 13 && !event.shiftKey) {
        this.sendTempChat();
        event.preventDefault(); // Prevent the default action to avoid a newline in the textarea
      }
    },
   
  changeChannel(channel) {
      if (this.channels.includes(channel)) {
        this.currentChannel = channel;
        this.newMessage = ''; // Clear the new message input
      }
    },
    
    async shareScreen() {
  if (!this.isScreenShared) {
    try {
      // Add 'audio: true' to capture system sounds
      const stream = await navigator.mediaDevices.getDisplayMedia({ video: true, audio: true });
      this.$refs.sharedScreen.srcObject = stream;
      this.isScreenShared = true;
      // Listen for when the user stops sharing their screen
      stream.getVideoTracks()[0].onended = () => {
        this.stopSharingScreen();
      };
    } catch (error) {
      console.error('Error sharing the screen:', error);
    }
  } else {
    this.stopSharingScreen();
  }
},

stopSharingScreen() {
  // Stop all tracks on the stream to end the sharing
  if (this.$refs.sharedScreen.srcObject) {
    let tracks = this.$refs.sharedScreen.srcObject.getTracks();
    tracks.forEach(track => track.stop());
  }
  // Clear the srcObject to revert to the default state
  this.$refs.sharedScreen.srcObject = null;
  this.isScreenShared = false;
},
async toggleWebcam() {
      if (this.webcamActive) {
        this.stopWebcam();
      } else {
        try {
          // Request both video and audio to ensure microphone functionality
          this.webcamStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
          this.webcamActive = true;
          this.attachStreamToElement(this.webcamStream, 'my-camera');
        } catch (error) {
          console.error('Error accessing the webcam:', error);
        }
      }
    },
    stopWebcam() {
      if (this.webcamStream) {
        let tracks = this.webcamStream.getTracks();
        tracks.forEach(track => track.stop());
      }
      this.webcamActive = false;
      const myCameraBox = document.getElementById('my-camera');
      myCameraBox.innerHTML = 'My Camera';
      this.webcamStream = null; // Clear the webcam stream
    },
    attachStreamToElement(stream, elementId) {
      const element = document.getElementById(elementId);
      element.innerHTML = ''; // Clear the innerHTML in case there's placeholder text
      const videoElement = document.createElement('video');
      videoElement.srcObject = stream;
      videoElement.autoplay = true;
      videoElement.playsInline = true;
      videoElement.style.width = '100%'; // Ensure the video fills the box
      element.appendChild(videoElement);
    },
    async startWebcam() {
  try {
    // Here we're asking for both video and audio
    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    this.$refs.webcamVideo.srcObject = stream;
    this.webcamStream = stream; // Save the stream to toggle the microphone later
    this.webcamActive = true; // Indicate that the webcam is active
  } catch (error) {
    console.error('Error accessing the webcam:', error);
  }
},
toggleMicrophone() {
      if (this.webcamActive && this.webcamStream) {
        let audioTracks = this.webcamStream.getAudioTracks();
        if (audioTracks.length > 0) {
          // Toggle the 'enabled' property of the audio tracks to mute/unmute
          audioTracks[0].enabled = !audioTracks[0].enabled;
          this.microphoneActive = audioTracks[0].enabled;
        } else {
          console.error('No audio tracks found.');
        }
      } else {
        console.error('Webcam is not active.');
      }
    },
    toggleSpeaker() {
      if (this.webcamActive) {
        const videoElement = document.querySelector('#my-camera video');
        if (videoElement) {
          videoElement.muted = !videoElement.muted;
          this.speakerActive = !videoElement.muted;
        }
      } else {
        console.error('Webcam is not active.');
      }
    },
    toggleInviteModal() {
      this.showInviteModal = !this.showInviteModal;
      if (!this.showInviteModal) {
        this.selectedFriends = []; // Reset selection when closing modal
      }
    },
    toggleFriendSelection(friendId) {
      const index = this.selectedFriends.indexOf(friendId);
      if (index > -1) {
        this.selectedFriends.splice(index, 1); // Remove from selection
      } else {
        this.selectedFriends.push(friendId); // Add to selection
      }
    },
    isSelected(friendId) {
      return this.selectedFriends.includes(friendId);
    },
    inviteSelectedFriends() {
      // Here you would implement the actual multiple invite logic
      console.log(`Invited friends with IDs: ${this.selectedFriends.join(", ")}`);
      this.toggleInviteModal(); // Close the modal after inviting
    },
    joinGroup(groupId) {
      // Implement your logic to join a group
      console.log('Joining group with ID:', groupId);
  },
  },
  setup() {
      const store = useLoggedInUserStore();
      return {
        store
      }
    }
  }
</script>

<style scoped>
/* Basic styling, you'll need to adjust it to match your design */
.main-content {
  display: flex;
  flex-direction: column;
  justify-content: space-between; /* This will push the footer to the bottom */
  height: calc(100vh - (height of your header)); /* Adjust the height based on your header */
}
.navbar {
  background-color: #23272a;
  color: white;
  padding: 10px;
  display: flex;
  justify-content: center;
  color: #7289da;
  border-bottom: 2px solid #7289da; /* Blue underline for active tab */
  font-weight: bold; /* Make the active tab text bold */ 
}

.navbar .nav-item:not(.active):hover {
  background-color: #333; /* Darker background on hover for non-active tabs */
}
.nav-item {
  color: white;
  padding: 10px 15px;
  cursor: pointer;
  
}
.nav-item.active {
  color: #7289da;
  border-bottom: 2px solid #7289da; /* Blue underline for active tab */
  font-weight: bold; /* Make the active tab text bold */
}

/* Screen sharing and viewers window styling */
.screen-sharing-container {
  display: flex;
  justify-content: space-between;
  padding: 18px;
  position: relative;
}

.screen-share-btn {
  background-color: #7289DA;
  color: white;
  padding: 5px 15px; /* Smaller padding for a smaller button */
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px; /* Space between the stream window and the button */
  position: absolute; /* Position the button absolutely within its parent */
  bottom: -30px; /* Align to the bottom of the parent */
  right: 36%; /* Align to the right of the parent */
  transform: translateX(50%); /* Move the button to the center */
}


.screen-share-btn:hover {
  background-color: #677BC4;
}

/* Styles for the video element */
#shared-screen {
  width: 100%;
  height: 100%;
  border: none;
}

.stream-window {
  background-color: #23272A;
  color: #FFF;
  width: 70%; /* Adjust as needed */
  height: 500px; /* Adjust as needed */
  display: flex;
  align-items: center;
  justify-content: center;
}

@media (min-width: 1600px) {
  .stream-window {
  background-color: #23272A;
  color: #FFF;
  width: 70%; /* Adjust as needed */
  height: 580px; /* Adjust as needed */
  display: flex;
  align-items: center;
  justify-content: center;
}
}
.viewers-window {
  background-color: #2C2F33;
  color: #FFF;
  padding: 20px; /* Increased padding for better spacing */
  border-radius: 8px; /* Rounded corners */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Subtle shadow for depth */
  width: 380px; /* Slightly wider to accommodate larger content */
  overflow-y: auto; /* Keep as is for scrollability */
  margin: 20px auto; /* Center the viewers window with automatic margins */
  display: grid; /* Use grid layout */
  grid-template-columns: repeat(2, 1fr); /* Two columns of equal width */
  grid-gap: 15px; /* Increase gap for better visual separation */
  align-items: start; /* Align items to the start of the container */
  height: auto; /* Height to be determined by content */
  position: relative; /* Position the container relatively */
}

.viewer, #my-camera {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 120px; /* Increased height for a more spacious look */
  border-radius: 4px; /* Rounded corners for each viewer */
  margin: 0; /* Remove margin to rely on grid gap */
  background-color: #333; /* Placeholder, your video will cover this */
  box-shadow: inset 0 0 8px rgba(0, 0, 0, 0.3); /* Inner shadow for depth */
}

#my-camera {
  background-color: #3B3F45; /* Slightly different background color for emphasis */
}

.viewer:last-child {
  margin-bottom: 0; /* Keep as is, the grid gap handles spacing */
}

.video {
  width: 100%;
  height: auto; /* Maintain aspect ratio */
  border-radius: 4px; /* Rounded corners for video elements */
}



/* Styling for the button container */
.button-container-2 {
  display: flex; /* Use flexbox for layout */
  justify-content: center; /* Center buttons horizontally */
  align-items: center; /* Center buttons vertically */
  position: absolute; /* Absolute position to place it over the gray area */
  bottom: 1px; /* Position it at the bottom of the parent container */
  left: 0; /* Align to the left edge of the parent container */
  right: 68%; /* Align to the right edge of the parent container */
  z-index: 10; /* Ensure it's above other elements */
}
/* Common style for all buttons */
.webcam-toggle-btn,
.voice-down-btn,
.chat-toggle-btn,
.audio-toggle-btn,
.invite-btn {
  background-color: #555; /* Dark gray background */
  color: white; /* White text */
  padding: 5px 15px; /* Uniform padding around text */
  margin: 0 5px; /* Space between buttons */
  border: none; /* No border */
  border-radius: 4px; /* Rounded corners */
  cursor: pointer; /* Pointer cursor on hover */
  font-size: 0.9em; /* Adjust font size as necessary */
}

/* Hover effect for buttons */
.webcam-toggle-btn:hover,
.voice-down-btn:hover,
.chat-toggle-btn:hover,
.audio-toggle-btn:hover {
  background-color: #7289da; /* Discord blue background on hover */
}

/* Ensure that the buttons don't affect layout when they become active/inactive */
.webcam-toggle-btn,
.voice-up-btn,
.voice-down-btn,
.audio-toggle-btn {
  transition: background-color 0.3s; /* Smooth transition for background color */
}
/* Adjust video element styles if needed */
.video {
  /* ... existing styles */
  max-height: calc(100% - 40px); /* Adjust the height to account for buttons */
}


.message {
 
  color: #fff;
  padding: 0px;
  margin-bottom: 0px;
  border-radius: 0px;
}
  .chats-container {
  display: flex;
  height: 100%;
}



/* Header within the sidebar */
.direct-messages-header {
  color: #ffffff;
  font-size: 1.2em;
  border-bottom: 1px solid #4b4b4b; /* Add a subtle border for the header */
  text-align: center; /* Center text horizontally */
  padding: 10px 0;
  margin: 0 auto; /* Center the header in the sidebar */
}

/* List of friends within the sidebar */
.friends-list {
  list-style: none; /* Remove default list styling */
  margin: 20px; /* Remove default margins */
  padding: 0; /* Remove default padding */
 
}

/* Individual friend item styles */
.friend-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 15px;
  color: white;
  cursor: pointer;
  border-bottom: 1px solid #4b4b4b; /* Add a subtle border between items */
}

/* Hover effect for friend items */
.friend-item:hover {
  background-color: #333; /* Darker background on hover */
 
}
.channel-list {
  list-style: none;
  padding: 0;
}

.channel {
  padding: 10px;
  color: #ffffff;
  cursor: pointer;
}

.channel:hover {
  background-color: #393c43;
}

.chat-area {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  height: 575px;
}

.chat-header {
  background-color: #252525;
  padding: 25px;
  color: #ffffff;
}

.message-container {
  flex-grow: 1;
  padding: 10px;
  background-color: #36393f;
  overflow-y: auto;
  display: flex;
  flex-direction: column; /* Stack messages vertically */
  justify-content: flex-start; /* Align messages to the top */
}
.placeholder-message {
  color: #aaa; /* Light grey text for placeholder */
  text-align: center; /* Center the placeholder text */
  flex-grow: 1; /* Grow to fill the space */
  display: flex; /* Use flexbox */
  align-items: center; /* Center vertically */
  justify-content: center; /* Center horizontally */
}

.message {
  display: flex;
  padding: 10px;
  margin-bottom: 5px;
  align-items: center;
}

.message.mine {
  justify-content: flex-end;
}

.message.theirs {
  justify-content: flex-start;
}

.message-user {
  font-weight: bold;
  margin-right: 10px;
}

.message-text {
  padding: 5px 10px;
  border-radius: 15px;
  max-width: 60%; /* To ensure messages don't span the full width */
}

/* Style for messages sent by 'Me' */
.message.mine .message-text {
  background-color: #c15edf; /* Your preferred color for your own messages */
  color: white; /* Text color for your own messages */
}

/* Style for messages sent by friends */
.message.theirs .message-text {
  background-color: #40444b; /* A different color for friends' messages */
  color: white; /* Text color for friends' messages */
}
.chat-footer {
  background-color: #40444b;
  padding: 10px;
  margin-top: auto; /* Push the footer to the bottom */
}

.chat-input {
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: none;
  margin-bottom: 10px;
  background-color: #333;
  resize: none;
}

.send-btn {
  margin-bottom: 10px;
  padding: 10px;
  background-color: #7289da;
  border-radius: 5px;
}
.communities-container {
  padding: 20px;
}

.communities-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* Adjust the number of columns as per your design */
  gap: 20px;
}

.community-card {
  background: #333;
  border: 1px solid #ddd;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
  padding: 15px;
}

.community-image {
  max-width: 100%;
  height: auto;
  border-bottom: 1px solid #ddd;
  margin-bottom: 15px;
}

.community-card h3 {
  margin: 10px 0;
  color: #333;
}

.community-card p {
  color: #666;
  font-size: 0.9em;
  margin-bottom: 15px;
}

.community-card button {
  background: #7289da;
  color: white;
  border: none;
  border-radius: 20px; /* Rounded corners for the button */
  padding: 10px 20px;
  cursor: pointer;
  font-size: 1em;
}

.community-card button:hover {
  background: #5b6eae;
}
.community-card img {
  max-width: 100%; /* Ensures image is never more than 100% of its container */
  height: auto; /* Maintains the aspect ratio */
  display: block; /* Removes any unwanted space below the image */
  margin: 0 auto; /* Centers the image within its container */
  max-height: 150px; /* Adjusts the maximum height to something reasonable */
}
/* Voice up button styling */
.voice-up-btn {
  background-color: transparent; /* Make the button transparent */
  color: white;
  border: none;
  padding: 15px;
  cursor: pointer;
  display: inline-flex; /* Aligns the icon with text */
  align-items: center; /* Vertical alignment */
  justify-content: center; /* Horizontal alignment */
}

/* Hover effect for voice up button */
.voice-up-btn:hover {
  color: #7289da; /* Change text color on hover */
}

/* Material icons styling */
.material-icons {
  font-size: 1em; /* Adjust icon size */
  margin-right: 5px; /* Space between icon and text */
}

/* Assuming the .chat-area and .friend-chat have the same styling */
.friend-chat {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  height: 600px;
  background-color: #36393f;
  border-radius: 5px;
  overflow: hidden;
}

.friend-title {
  background-color: #252525;
  padding: 10px;
  color: #ffffff;
  border-bottom: 1px solid #444;
}

.chats-page {
  display: flex;
  height: 100%;
}
/* This class should be added to the container that wraps all voice chat elements */
.voice-chat-elements {
  display: absolute;
  flex-direction: column; /* Stack elements vertically */
  width: 100%; /* Take up full width */
  height: 100%; /* Take up full height */
  align-items: center; /* Center items horizontally */
  justify-content: center; /* Center items vertically */
  padding-bottom: 15px;
}

/* Temporary Voice Chat Window styling */
/* Place the temporary voice chat window at the bottom as a footer */
/* Temporary voice chat window styling */
.temporary-voice-chat {
  background: rgba(0, 0, 0, 0.8); /* Slightly transparent background */
  color: #fff; /* White text color */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3); /* Shadow to lift the chat from the page */
  margin-top: 20px; /* Margin from the content above */
  padding-bottom: 20px; /* Padding at the bottom to push footer down */
}

/* Style for the chat messages */
.temp-chat-messages {
  max-height: 120px; /* Limit the height of the messages container */
  overflow-y: auto; /* Allow scrolling for overflow */
}

/* Style for the message input area */
.temp-chat-footer {
  display: flex; /* Use flexbox for a flexible layout */
  align-items: center; /* Vertically align items */
  padding: 10px; /* Padding inside the footer */
}
footer {
  /* If you have a footer element, ensure it has a clear background and is pushed down by the chat */
  background: clear; /* Clear background or any color that matches the design */
}
/* Style for the input field */
.temp-chat-input {
  flex-grow: 1; /* Allow input to grow and fill space */
  margin-right: 10px; /* Margin to separate from send button */
  padding: 10px; /* Padding inside the input field */
  border: none; /* Remove border */
  border-radius: 4px; /* Rounded corners */
  background-color: #333; /* Dark background for the input */
  color: #fff; /* White text color for input */
}

/* Style for the send button */
.send-temp-btn {
  padding: 10px 20px; /* Padding inside the send button */
  background-color: #7289da; /* Background color for the button */
  border: none; /* Remove border */
  border-radius: 4px; /* Rounded corners */
  color: white; /* White text color */
  cursor: pointer; /* Cursor to indicate button */
}

/* Adjust the hover effect for the send button */
.send-temp-btn:hover {
  background-color: #5b6eae; /* Darken the button on hover */
}
.temp-chat-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
}
.temp-chat-footer textarea,
.temporary-voice-chat {
  resize: none; /* This prevents resizing the textarea */
}


.invite-btn:hover {
  background-color: #7289da; /* Discord blue background on hover */
}

/* Modal Overlay */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

/* Invite Modal */
.invite-modal {
  background: #333;
  padding: 20px;
  border-radius: 10px;
  width: 300px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.invite-friends-list {
  list-style: none;
  padding: 0;
}

.invite-friend-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.invite-friend-item:hover {
  background-color: #555;
}

.invite-friend-btn {
  padding: 5px 10px;
  background-color: #7289da;
  border: none;
  border-radius: 4px;
  color: white;
  cursor: pointer;
}

.invite-friend-btn:hover {
  background-color: #5b6eae;
}
.invite-selected-btn {
  padding: 5px 10px;
  background-color: #7289da;
  border: none;
  border-radius: 4px;
  color: white;
  cursor: pointer;
  margin-top: 20px;
  margin-right: 78px;
}
.invite-selected-btn:hover {
  background-color: #5b6eae;
}
.close-modal-btn {
  padding: 5px 10px;
  background-color: #555;
  border: none;
  border-radius: 4px;
  color: white;
  cursor: pointer;
  margin-top: 20px;
}

.close-modal-btn:hover {
  background-color: #41454b;
}


.friend-name {
  cursor: pointer;
  display: flex;
  align-items: center;
}



.invite-status-dot {
  height: 15px;
  width: 15px;
  border-radius: 50%;
  display: inline-block;
  background-color: gray;
  margin-left: 10px;
  cursor: pointer;
}

.invite-status-dot.is-selected {
  background-color: rgb(164, 58, 226);
}

</style>

