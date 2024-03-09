<template>
  <div class="dashboard-container">
    <!-- Hero Section -->
    <section class="hero">
      <!-- Corrected the path -->
      <img :src="'/f18.png'" alt="Background" style="width: 100%; height: 100vh; object-fit: cover" />
      <div class="hero-content">
        <h1>SCRIPTORA </h1>
        
        <div class="hero-buttons">
          <button class="button download-btn">Download for Windows</button>
          <button class="button open-btn">Open in your browser</button>
        </div>
      </div>
    </section>

    <!-- Additional Sections -->
    <section class="additional-content">
      <p>Where coding meets epic hangouts. Code with buddies, level up in games, or chill and chat about your latest art piece. It’s all about creating cool stuff and sharing laughs. Code, chat, chill - repeat!  Let's make every day a codeventure!</p>
      <article class="content-section">
        
        <img class="content-image" :src="'/f9.png'" alt="Descriptive Alt Text" />
        <div class="content-text">
          <h2>Begin coding directly on our platform</h2>
          <br />
          <p> You have the unlimited ability to debug, run and screenshare your code for friends and peers.</p>
        </div>
      </article>

      <article class="content-section">
        <img class="content-image" :src="'/f12.png'" alt="Descriptive Alt Text" />
        <div class="content-text">
          <h2>Watch your friends code in live time</h2>
          <br />
          <p>Pop in at anytime to your friends channel and watch them code. </p>
        </div>
      </article>

      <article class="content-section">
        <img class="content-image" :src="'/f16.png'" alt="Descriptive Alt Text" />
        <div class="content-text">
          <h2>Hangout a few</h2>
          <br />
          <p>Whether you're having fun or coding, hang out in your own invite-only chats.</p>
        </div>
      </article>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Dashboard',
  // Your component's data and methods will go here
}
</script>

<style scoped>
.dashboard-container {
  text-align: center;
  color: white;
}

.hero {
  position: relative;
  width: 100%;
  height: 100vh; /* Adjust the height as needed */
  display: flex;
  justify-content: center;
  align-items: center;
}

.hero-content {
  position: absolute;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 15px;
  margin-bottom: -230px;
}

.hero-buttons {
  display: flex;
  gap: 10px;
}

.download-btn,
.open-btn {
  margin-top: 70px; /* Adjust this value as needed */
  margin-bottom: 120px;
  margin-left: 15px;
  margin-right: 15px;
  padding: 15px 20px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.download-btn {
  background-color: #5865F2; /* Discord blue */
  color: white;
}

.open-btn {
  background-color: #3BA55D; /* Discord green */
  color: white;
}

.download-btn:hover,
.open-btn:hover {
  opacity: 0.8;
}

.additional-content {
  padding: 2rem 0;
}

.content-section {
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin: 2rem 0;
  padding: 2rem;
}

.content-image {
  max-width: 50%;
  height: auto;
  border-radius: 8px;
}

.content-text {
  max-width: 40%;
}

@media (max-width: 768px) {
  .content-section {
    flex-direction: column;
  }

  .content-image,
  .content-text {
    max-width: 80%;
    margin-top: 2rem;
  }
}

.hero-content h1 {
  color: black; /* Make h1 text black */
  font-weight: bold; /* Make h1 text bold */
  font-size: 6rem;
  margin-top: 1rem;
}

.hero-content p {
  color: black; /* Make h1 text black */
  font-weight: bold; /* Make h1 text bold */
}

.additional-content h2 {
  color: white; /* Make h2 text white */
  font-weight: bold;
  font-size: 3rem;
}

.additional-content p {
  color: white; /* Make h2 text white */
  font-size: 1.5rem;
  font-weight: bold;
}
</style>
