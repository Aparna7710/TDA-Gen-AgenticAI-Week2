const API_KEY_INPUT  = document.getElementById("apiKeyInput");
const toggleKey      = document.getElementById("toggleKey");
const enterBtn       = document.getElementById("enterBtn");
const welcomeScreen  = document.getElementById("welcomeScreen");
const textarea       = document.getElementById("userInput");
const fileInput      = document.getElementById("fileInput");
const generateBtn    = document.getElementById("generateBtn");
const loading        = document.getElementById("loading");
const modeHint       = document.getElementById("modeHint");

let API_KEY      = "";
let currentMode  = "eli5";
let isGenerating = false;
let lastInput    = "";

const modeHints = {
    eli5:         "Explaining like you're five with simple words.",
    teacher:      "Teacher mode, structured explanations with proper guidance.",
    professional: "Rewriting professionally in a formal tone for all your polished needs.",
    quiz:         "Generating quiz questions for your efficient practice.",
};

const modeLabels = {
    eli5:         "ELI5",
    teacher:      "Teacher",
    professional: "Professional",
    quiz:         "Quiz",
};

const prompts = {

    eli5: (input) => `
Explain the following concept as if you're talking to a 5 year old.

Requirements:
- Use very simple words and real-world examples
- Absolutely no jargon
- Short sentences and bullet points where helpful
- Maximum 250 words
- Use markdown formatting

Concept:
${input}
`,

    teacher: (input) => `
Explain the following topic as a patient, thorough and experienced teacher would.

Requirements:
- Start with a simple one-line definition if possible
- Break it into clear sections using markdown headers
- Use examples to illustrate each point
- End with a short "Key Takeaways" bullet list
- Maximum 400 words
- Have a general guiding tone

Topic:
${input}
`,

    professional: (input) => `
Rewrite the following text in a polished, professional tone.

Requirements:
- Preserve the original meaning completely
- Fix grammar, clarity, and sentence structure
- Suitable for a formal email or business document
- After the rewrite, add a brief =list of your changes
- Use markdown formatting

Original text:
${input}
`,

    quiz: (input) => `
Generate quiz questions based on the following content.

Requirements:
- 5 to 10 questions depending on how much content is given
- Mix question types: MCQ, true/false, short answer
- Number all questions
- Do not provide answers
- Add brief hints for harder questions at the very end under a "Hints" section
- Use markdown formatting

Content:
${input}
`,

};


enterBtn.addEventListener(
    "click",
    () => {

        const key = API_KEY_INPUT.value.trim();

        if (!key) {
            API_KEY_INPUT.style.borderColor = "#f87171";
            return;
        }

        API_KEY = key;

        welcomeScreen.classList.add("welcome-hide");
    }
);


toggleKey.addEventListener(
    "click",
    () => {
        API_KEY_INPUT.type =
            API_KEY_INPUT.type === "password"
                ? "text"
                : "password";
    }
);


const modes = document.querySelectorAll(".mode");

modes.forEach(btn => {

    btn.addEventListener(
        "click",
        () => {

            modes.forEach(b =>
                b.classList.remove("active")
            );

            btn.classList.add("active");

            currentMode = btn.dataset.mode;

            modeHint.textContent =
                modeHints[currentMode];

            if (lastInput !== "") {
                generateResponse(lastInput);
            }
        }
    );
});


textarea.addEventListener(
    "input",
    () => {
        textarea.style.height = "auto";
        textarea.style.height =
            textarea.scrollHeight + "px";
    }
);


textarea.addEventListener(
    "keydown",
    e => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            generateResponse();
        }
    }
);


fileInput.addEventListener(
    "change",
    e => {

        const file = e.target.files[0];

        if (!file) return;

        const reader = new FileReader();

        reader.onload = ev => {
            textarea.value = ev.target.result;
            textarea.style.height = "auto";
            textarea.style.height =
                textarea.scrollHeight + "px";
        };

        reader.readAsText(file);
    }
);


generateBtn.addEventListener(
    "click",
    () => generateResponse()
);


function addMessage(text, type, tag) {

    const chat =
        document.getElementById("chatMessages");

    const msg =
        document.createElement("div");

    msg.classList.add("message", type);

    if (type === "bot") {

        if (tag) {
            const pill =
                document.createElement("div");
            pill.classList.add("mode-tag");
            pill.textContent = tag;
            msg.appendChild(pill);
        }

        const content =
            document.createElement("div");
        content.innerHTML = marked.parse(text);
        msg.appendChild(content);

    } else {
        msg.textContent = text;
    }

    chat.appendChild(msg);

    chat.scrollTop = chat.scrollHeight;

    return msg;
}


async function generateResponse(prefill) {

    if (isGenerating) return;

    const input =
        prefill || textarea.value.trim();

    if (input === "") {
        addMessage(
            "Please enter something first.",
            "bot"
        );
        return;
    }

    if (!API_KEY) {
        addMessage(
            "No API key — please reload and enter your key.",
            "bot"
        );
        return;
    }

    isGenerating      = true;
    generateBtn.disabled = true;

    if (!prefill) {
        lastInput = input;
        addMessage(input, "user");
        textarea.value = "";
        textarea.style.height = "52px";
    }

    loading.classList.remove("hidden");

    try {

        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent?key=${API_KEY}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    contents: [
                        {
                            parts: [
                                {
                                    text: prompts[currentMode](input)
                                }
                            ]
                        }
                    ]
                })
            }
        );

        const data = await response.json();

        loading.classList.add("hidden");

        if (data.error) {
            addMessage(
                "Error: " + data.error.message,
                "bot"
            );
            return;
        }

        const result =
            data.candidates?.[0]
                ?.content?.parts?.[0]
                ?.text;

        if (!result) {
            addMessage(
                "Got an empty response — try again.",
                "bot"
            );
            return;
        }

        addMessage(
            result,
            "bot",
            modeLabels[currentMode]
        );

    } catch (err) {

        console.error(err);

        loading.classList.add("hidden");

        addMessage(
            "Something went wrong, can't reach Gemini.",
            "bot"
        );

    } finally {

        isGenerating         = false;
        generateBtn.disabled = false;

    }
}
