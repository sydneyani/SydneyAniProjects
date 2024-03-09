<template>
  <div class="editor-container">
    <div id="editor"></div>
    <div class="button-container">
      <button class="run-button" @click="runCode">Run</button>
      <button class="clear-button" @click="clearEditor">Clear</button>
    </div>
    <div class="terminal" v-if="showTerminal">{{ terminalOutput }}</div>
    <div class="ai-chat-container">
    <h3 class="ai-chat-title">AI Coding Assistant</h3> <!-- Title for the AI chat box -->
    <div class="ai-messages" ref="messagesContainer">
  <div
    class="message"
    :class="{'user-message': message.sender === 'user', 'ai-message': message.sender === 'ai'}"
    v-for="message in aiChat"
    :key="message.id"
  >
    <span v-if="containsCode(message.text)" @mouseover="showApplyButton = true" @mouseleave="showApplyButton = false">
      <pre>{{ extractCode(message.text) }}</pre>
      <button 
  v-show="showApplyButton" 
  @click="applyCode(extractCode(message.text))" 
  class="apply-code-btn">
  Apply to Code
</button>
    </span>
    <span v-else>{{ message.text }}</span>
  </div>
</div>
    <div class="ai-input-container">
      <input
  type="text"
  v-model="userQuery"
  placeholder="Ask AI for coding help..."
  class="ai-input"
  @keyup.enter="sendQuery"
>
      <button @click="sendQuery" class="ai-send-button">Send</button>
    </div>
  </div>
  </div>
</template>

<script>
import AceEditor from 'ace-builds/src-noconflict/ace';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-monokai';
import axios from 'axios';
import { generateCode } from '../api/api';

export default {
  data() {
    return {
      editor: null,
      code: '// start coding here...',
      terminalOutput: 'Welcome to Scriptora Terminal!',
      showTerminal: true,
      aiChat: [],
      userQuery: '',
      showApplyButton: false,
    };
  },
  mounted() {
    this.editor = AceEditor.edit('editor');
    this.editor.setTheme('ace/theme/monokai');
    this.editor.session.setMode('ace/mode/javascript');
    this.editor.setValue(this.code);
    this.editor.getSession().setUseWrapMode(true);

    this.editor.session.on('change', () => {
      this.code = this.editor.getValue();
    });
  },
  methods: {
    async sendQuery() {
  console.log('Send button clicked');
  if (!this.userQuery.trim()) return;
  
  // Add the user's query to the chat
  this.aiChat.push({
    id: Date.now(),
    text: this.userQuery,
    sender: 'user',
  });
  
  try {
    // Call the generateCode function with the user's query
    const codeResponse = await generateCode(this.userQuery);
    // Match this with the backend response structure
    this.aiChat.push({
      id: Date.now() + 1,
      text: codeResponse.reply, // Backend responds with { reply: text }
      sender: 'ai',
    });
    this.scrollToBottom();
  } catch (error) {
    console.error('Error:', error);
    // Add error message to the chat
    this.aiChat.push({
      id: Date.now() + 1,
      text: 'Error getting response from AI.',
      sender: 'ai',
    });
  }
  
  // Clear the input field
  this.userQuery = '';
},

containsCode(text) {
      // A basic check to see if the text contains characters common in code
      return /(;|\bfunction\b|\bconsole\.log\b)/.test(text);
    },
    extractCode(text) {
      // Regular expression patterns for different code snippets
      const patterns = {
        javascript: /```javascript([^`]+)```/,
        python: /```python([^`]+)```/,
        csharp: /```csharp([^`]+)```/,
        // Add more patterns for other languages here
      };

      // Try to match each pattern and extract code
      let extractedCode = '';
      Object.keys(patterns).forEach((lang) => {
        const match = text.match(patterns[lang]);
        if (match && match[1]) {
          extractedCode = match[1].trim();
          // Apply syntax highlighting if needed here, using highlight.js or another library
          // For example: extractedCode = hljs.highlight(extractedCode, { language: lang }).value;
        }
      });

      return extractedCode;
    },

    applyCode(codeSnippet) {
      // Apply the extracted code snippet to the editor
      this.editor.session.insert({
        row: this.editor.session.getLength(),
        column: 0
      }, codeSnippet + '\n'); // Add a newline after the inserted code
      this.scrollToBottom();
    },
scrollToBottom() {
    this.$nextTick(() => {
      const element = this.$refs.messagesContainer;
      element.scrollTop = element.scrollHeight;
    });
  },
    runCode() {
      // Clear previous output
      this.terminalOutput = '';
      this.showTerminal = true;

      // Capture console.log output by overriding the function
      const originalConsoleLog = console.log;
      console.log = (...args) => {
        this.terminalOutput += args.join(' ') + '\n';
      };

      try {
        // Run the code
        eval(this.code);
      } catch (error) {
        this.terminalOutput += 'Error: ' + error.toString();
      }

      // Restore the original console.log function
      console.log = originalConsoleLog;
    },
    clearEditor() {
      this.editor.setValue('');
      this.terminalOutput = '';
    }
  },
      
  beforeDestroy() {
    this.editor.destroy();
    this.editor.container.remove();
  },
};
</script>

<style>
  .editor-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between; /* Aligns children (editor and buttons) on the main axis */
}
  #editor { 
    height: 500px; /* Sets the height of the editor */
    width: 680px; /* Sets the width of the editor */
    flex-grow: 0; /* Prevents the editor from growing */
    flex-shrink: 0; /* Prevents the editor from shrinking */
  }
  .button-container {
  position: absolute; /* Position at the bottom left of the editor */
  left: 595px; /* From the left side */
  bottom: 154px; /* Above the terminal */
  z-index: 10;
}
/* Media query for larger screens (for example, screens wider than 1600 pixels) */
@media (min-width: 1600px) {
  .button-container {
    left: calc(50% + -150px); /* Adjust this value as needed */
    bottom: 370px; /* Adjust this value as needed */
    /* You can add or override other styles for .button-container here */
  }
}
.run-button, .clear-button {
  padding: 10px 20px; /* Adds padding inside the button */
  margin-right: 10px; /* Adds margin to the right of each button */
  color: white; /* Text color for the buttons */
  border: none; /* Removes the border */
  border-radius: 5px; /* Rounds the corners of the buttons */
  cursor: pointer; /* Changes the mouse cursor on hover */
  transition: background-color 0.3s; /* Smooth background color transition on hover */
}

.run-button {
  background-color: #007bff; /* Blue color for the run button */
}

.clear-button {
  background-color: #dc3545; /* Red color for the clear button */
}

.run-button:hover, .clear-button:hover {
  opacity: 0.8; /* Slightly lowers the opacity when hovered for a visual effect */
}
.terminal {
  border-top: 3px solid #d135d1; /* Subtle border color */
  background: #1e1e1e; /* Darker background for contrast */
  background: linear-gradient(145deg, #252526, #1e1e1e); /* Soft gradient background */
  color: #dcdcdc; /* Soft white text color */
  padding: 20px; /* More padding for better spacing */
  height: 149px; /* Height of the terminal */
  overflow-y: auto; /* Allows scrolling if content overflows */
  font-family: 'Fira Code', 'Source Code Pro', 'Roboto Mono', monospace; /* Modern monospaced font */
  box-shadow: inset 0 0 10px #000; /* Inner shadow for depth */
  border-radius: 4px; /* Slightly rounded corners */
  font-size: 0.9em; /* Adjust font size as necessary */
}
/* Media query for larger screens (for example, screens wider than 1600 pixels) */
@media (min-width: 1600px) {
  .terminal {
  border-top: 3px solid #d135d1; /* Subtle border color */
  background: #1e1e1e; /* Darker background for contrast */
  background: linear-gradient(145deg, #252526, #1e1e1e); /* Soft gradient background */
  color: #dcdcdc; /* Soft white text color */
  padding: 20px; /* More padding for better spacing */
  height: 365px; /* Height of the terminal */
  overflow-y: auto; /* Allows scrolling if content overflows */
  font-family: 'Fira Code', 'Source Code Pro', 'Roboto Mono', monospace; /* Modern monospaced font */
  box-shadow: inset 0 0 10px #000; /* Inner shadow for depth */
  border-radius: 4px; /* Slightly rounded corners */
  font-size: 0.9em; /* Adjust font size as necessary */
  }
}
.ai-chat-container {
  width: 770px;
  height: 503px;
  position: fixed;
  right: -0.1vw; /* Use viewport width units instead of fixed pixels */
  bottom: 20.5vh; /* Use viewport height units to adjust to different screen heights */
  background-color: #242424;
  border-radius: 8px;
  padding: 10px;
  overflow-y: auto;
  color: white;
  display: flex;
  flex-direction: column;
  border: 1px solid #000;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
}
/* Adjustments for larger screens */
@media (min-width: 1600px) {
  .editor-container {
    display: flex;
  flex-direction: column;
  justify-content: space-between; /* Aligns children (editor and buttons) on the main axis */
  }
}

/* Adjustments for larger screens */
@media (min-width: 1600px) {
  #editor {
    height: 500px; /* Sets the height of the editor */
    width: 900px; /* Sets the width of the editor */
    flex-grow: 0; /* Prevents the editor from growing */
    flex-shrink: 0; /* Prevents the editor from shrinking */
  }
}
/* Adjustments for larger screens */
@media (min-width: 1600px) {
  .ai-chat-container {
    right: 0vw; /* You might want to use a larger/smaller value here */
    bottom: 38.5vh; /* You might want to use a larger/smaller value here */
    width: 950px;
    height: 499px;
  }
}
/* Adjustments for smaller screens */
@media (max-width: 768px) {
  .ai-chat-container {
    width: 72vw; /* Smaller width on small screens */
    height: 40vh; /* Smaller height on small screens */
    right: 1vw; /* Adjust right position for smaller screens */
    bottom: 5vh; /* Adjust bottom position for smaller screens */
  }
}
  .ai-chat-title {
    text-align: center;
    color: white;
    background-color: #333; /* Dark background for the title */
    padding: 5px;
    margin: -10px -10px 10px -10px; /* Align the title with the container edges */
    border-top-left-radius: 8px; /* Round the corners */
    border-top-right-radius: 8px; /* Round the corners */
  }
.ai-messages {
  flex-grow: 1;
  overflow-y: auto;
  border-bottom: 1px solid #333; /* Separator line */
  }

.message {
  margin: 5px;
  padding: 10px;
  border-radius: 5px;
  background-color: rgba(255, 255, 255, 0.1); /* Slightly visible for contrast */
  color: white; /* White text color */
  text-shadow: 1px 1px 1px black; /* Black text shadow for readability */
}
.message pre {
  white-space: pre-wrap; /* Allows the text to wrap */
  word-break: break-word; /* Breaks the text to prevent overflow */
  margin: 0; /* Removes default margin */
  padding: 10px; /* Adds padding inside the message box */
  background-color: inherit; /* Uses the same background as the message */
  border-radius: 5px; /* Keeps the rounded corners */
  font-family: inherit; /* Ensures font consistency */
  overflow-x: auto; /* Allows horizontal scrolling if necessary */
}
.user-message {
  text-align: right;
  background-color: #007bff; /* Blue background for user messages */
  color: white; /* White text color */
}

.ai-message {
  text-align: left;
  background-color: rgba(82, 80, 87, 0.3); /* Slightly darker for AI messages */
}

.ai-input-container {
  display: flex;
  padding-top: 10px;
}

.ai-input {
  flex-grow: 1;
  padding: 5px;
  border-radius: 5px;
  border: 1px solid #000000; /* Black border for input box */
  background-color: #242424; /* Match the background color */
  color: white; /* White text color for input */
  margin-right: 5px; /* Add space between input and button */
}

.ai-send-button {
  background-color: #007bff; /* Blue color for the send button */
  color: white;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.ai-send-button:hover {
  opacity: 0.8;
}

.apply-code-btn {
  display: none; /* Remain hidden until hovered */
  margin-left: 10px;
  padding: 8px 15px; /* Slightly larger padding for a bigger button */
  cursor: pointer; /* Change to pointer on hover to indicate it's clickable */
  border: 2px solid rgb(149, 61, 184); /* A deep purple border for elegance */
  background-color: rgba(149, 61, 184, 0.1); /* Slight purple background on the button */
  color: white; /* White text color for contrast */
  border-radius: 4px; /* Rounded corners for a modern look */
  font-weight: bold; /* Make the text bold */
  text-shadow: 1px 1px 2px black; /* Slight shadow for depth */
  transition: all 0.3s ease;/* Smooth transitions for interactions */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); /* Subtle shadow for 3D effect */
  text-transform: uppercase; /* Capitalize button text for emphasis */
  font-size: 0.85em; /* Adjust font size as needed */
  
}

.message:hover .apply-code-btn {
  display: inline-block; /* Show the button on hover */
  background-color: rgba(149, 61, 184, 0.2); /* Darker background color on hover */
  transform: translateY(-2px); /* Slight lift on hover for a button press effect */
}

</style>