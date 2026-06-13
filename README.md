# TDA-Gen-AgenticAI-Week2

For the second week of this AI summer school, I have made improvements on my already made Clarity AI. I have kept the initial base framework same but added changes to focus on the various techniques of prompting.

---

## Features

**→ ELI5 — Explain Like I'm 5**
Simplifies complex topics into easy-to-understand explanations using simple language.

**→ Teacher Mode**
This mode aims to provide teacher like guidance with structured explanations to help you learn more efficiently.

**→ Professional Rewrite**
This mode aims to rewrite your given text professionally and convert it to a mode suitable for emails and other professional writing needs. It also provides you an insight into the changes made.

**→ Quiz Generator**
Creates quiz questions from provided content to help with revision and self-assessment. It also includes useful hints for the tougher questions.

---

## Major Changes Since Week 1

The input area sits above the mode selector on purpose. You type your question first, pick a mode, and get a response. Switch modes on the same question and Clarity AI re-runs it automatically so that you can directly compare how different prompts change the output. Each response is tagged with the mode that generated it so nothing gets confusing. I have also added the option to add your API key at the screen itself so that there is no need to clone the repository. Furthermore, a Vercel deployment has also been added.

---

## Clarity AI is Equipped With the Following

1. **Chat-Based Interface**
Maintains conversation history within the current session through a chatbot-style interface. Switch modes mid-conversation and responses stay in the chat.

2. **Mode Tag on Responses**
Every AI response is labelled with the mode that generated it — so when you switch modes on the same question, you can clearly tell which answer came from which prompt.

3. **File Upload Support**
Allows users to upload `.txt` files and process their contents directly through the application.

4. **Markdown Rendering**
AI responses are rendered using Markdown for improved readability and formatting.

5. **Loading Indicator**
Provides visual feedback while waiting for AI-generated responses.

6. **API Key Input on Welcome Screen**
Your Gemini API key is entered through the app UI — no need to hardcode anything into the source files.

---

## Built With

- HTML5
- CSS3
- JavaScript (ES6)
- Gemini API (gemini-3.5-flash)
- Marked.js (Markdown rendering)

---

## Project Structure

```text
Clarity-AI/
│
├── index.html
├── style.css
├── script.js
└── README.md
```

---

## How to Run

Clarity AI can be run in two different ways, either

**1. Locally**

a) Clone or download the repository.
b) Open `index.html` in a browser.
c) On the welcome screen, paste your Gemini API key into the input field.
d) Click **Enter to attain clarity**.

**2. Deployed on Vercel**

Follow this link to access the deployed Vercel page — https://tda-gen-agentic-ai-week2.vercel.app/

---

## Usage

- Launch the app and enter your Gemini API key on the welcome screen.
- Type your question or paste text into the input box.
- Select a mode — ELI5, Teacher, Professional, or Quiz.
- Hit the send button or press Enter.
- Switch modes on the same question to compare how the prompt changes the response.
- Optionally upload a `.txt` file using the paperclip button.

---

## Demo

A short demonstration video showcasing the application's features is included as part of the project submission.

---

## Author

Developed as a web-based AI productivity assistant project using modern frontend technologies and generative AI.
