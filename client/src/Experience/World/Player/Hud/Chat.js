import Experience from "../../../Experience.js";


export default class Chat {
    constructor() {
        this.experience = new Experience()

        this.initChat();
    }

    initChat() {

        this.chatContainer = document.createElement("div");
        this.chatContainer.id = "chatContainer";
        this.chatContainer.style.width = "350px";
        this.chatContainer.style.height = "250px";
        this.chatContainer.style.display = "flex";
        this.chatContainer.style.flexDirection = "column";
        this.chatContainer.style.bottom = "0px";
        this.chatContainer.style.left = "5px";
        this.chatContainer.style.position = "absolute";
        document.body.appendChild(this.chatContainer);

        this.toggleButton = document.createElement("button");
        this.toggleButton.id = "toggleButton";
        this.toggleButton.style.width = "50px";
        this.toggleButton.style.height = "50px";
        this.toggleButton.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
        this.toggleButton.style.border = "none";
        this.toggleButton.style.outline = "none";
        this.toggleButton.style.color = "white";
        this.toggleButton.style.fontFamily = "Arial";
        this.toggleButton.style.fontSize = "20px";
        this.toggleButton.style.boxSizing = "border-box";
        this.toggleButton.style.borderRadius = "50%";
        this.toggleButton.style.backgroundImage = "url('chat.avif')";
        this.toggleButton.style.backgroundSize = "cover";
        this.chatContainer.appendChild(this.toggleButton);

        this.chat = document.createElement("div");
        this.chat.id = "chat";
        this.chat.style.opacity = "0";
        this.chat.style.width = "100%";
        this.chat.style.height = "100%";
        this.chat.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
        this.chat.style.display = "flex";
        this.chat.style.flexDirection = "column";
        this.chat.style.color = "white";
        this.chat.style.fontFamily = "Arial";
        this.chat.style.fontSize = "12px";
        this.chat.style.boxSizing = "border-box";
        this.chatContainer.appendChild(this.chat);

        this.chatMessages = document.createElement("ul");
        this.chatMessages.id = "chatMessages";
        this.chatMessages.style.overflow = "auto";
        this.chatMessages.style.height = "100%";
        this.chatMessages.style.padding = "10px";
        this.chat.appendChild(this.chatMessages);

        this.inputContainer = document.createElement("div");
        this.inputContainer.id = "inputContainer";
        this.inputContainer.style.display = "flex";
        this.inputContainer.style.flexDirection = "row";
        this.inputContainer.style.alignItems = "center";
        this.chat.appendChild(this.inputContainer);

        this.chatInput = document.createElement("input");
        this.chatInput.id = "chatInput";
        this.chatInput.style.height = "40px";
        this.chatInput.style.width = "100%";
        this.chatInput.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
        this.chatInput.style.border = "none";
        this.chatInput.style.outline = "none";
        this.chatInput.style.color = "white";
        this.chatInput.style.fontFamily = "Arial";
        this.chatInput.style.fontSize = "12px";
        this.chatInput.style.padding = "10px";

        this.chatInput.style.boxSizing = "border-box";
        this.chatInput.placeholder = "Type your message here...";
        this.inputContainer.appendChild(this.chatInput);

        this.chatButton = document.createElement("button");
        this.chatButton.id = "chatButton";
        this.chatButton.style.width = "120px";
        this.chatButton.style.height = "40px";
        this.chatButton.style.backgroundColor = "black";
        this.chatButton.style.border = "none";
        this.chatButton.style.outline = "none";
        this.chatButton.style.color = "white";
        this.chatButton.style.fontFamily = "Arial";
        this.chatButton.style.fontSize = "12px";
        this.chatButton.style.padding = "10px";
        this.chatButton.style.boxSizing = "border-box";
        this.chatButton.alignSelf = "center";
        this.chatButton.innerHTML = "Send";
        this.inputContainer.appendChild(this.chatButton);

        this.chatButton.addEventListener("click", () => {
            this.sendMessage();
        })



        this.toggleButton.addEventListener("click", () => {
            if (this.chat.classList.contains("fade-in")) {
                this.fadeOut();
            } else {
                this.fadeIn();
            }
        })

        document.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                if (this.chat.classList.contains("fade-in")) {
                    this.sendMessage()
                } else {
                    this.fadeIn();
                    // focus on the input
                    this.chatInput.focus();
                }
            }
        })

    }

    sendMessage() {
        if (this.chatInput.value.length > 0) {
            this.experience.network.socket.emit("chat message", {
                id: this.experience.localPlayer.pseudo.text ,message: this.chatInput.value
            });
            this.chatInput.value = "";
        }
    }

    addMessage(data) {
        let message = document.createElement('li');
        message.textContent = data.id + ': ' + data.message;
        this.chatMessages.appendChild(message);
    }

    fadeIn() {
        // fade in the chat
        this.chat.classList.add("fade-in");
        this.chat.classList.remove("fade-out");
    }

    fadeOut() {
        this.chat.classList.add("fade-out");
        this.chat.classList.remove("fade-in");
    }

    update() {
        this.chatMessages.scrollTop = this.chat.scrollHeight;
    }
}