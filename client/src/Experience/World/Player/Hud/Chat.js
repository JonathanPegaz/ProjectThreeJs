import Experience from "../../../Experience.js";
import {CSS2DObject} from "three/addons/renderers/CSS2DRenderer.js";


export default class Chat {
    constructor() {
        this.experience = new Experience()
        this.initChat();
    }

    initChat() {
        this.chat = document.querySelector("#chat");
        this.chatButton = document.querySelector("#chat-send-btn");
        this.chatInput = document.querySelector("#chat-input");
        this.chatMessages = document.querySelector(".chat-messages");
        this.toggleButton = document.querySelector("#chat-toggle-btn");

        this.chatButton.addEventListener("click", () => {
            this.sendMessage();
        })

        this.toggleButton.addEventListener("click", () => {
            this.chat.classList.toggle("chat-hidden");
            const icon = this.toggleButton.querySelector("img");
            if (this.chat.classList.contains("chat-hidden")) {
                icon.src = "icons/tchat_icon.svg";
            } else {
                icon.src = "icons/close_icon.svg";
            }
        })

        // Enter
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

        // Escape
        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape") {
                if (this.chat.classList.contains("fade-in")) {
                    // remove focus from the input
                    this.chatInput.blur();
                    this.fadeOut();
                }
            }
        })

    }

    /*setCSS2DObject() {
        this.dialogLabel = new CSS2DObject(this.dialogContainer);
        this.dialogLabel.position.set(0, 1.5, 0);
    }*/

    createTemporaryChatMessage(data, target) {
        const htmlString = `
          <div class="dialog-content">
              <div class="dialog-chat-icon">
              </div>
              <div class="message-container">
                <p id="chat-text${data.id}" class="dialog-text"></p>
              </div>
          </div>
        `
        const dialogContainer = document.createElement('div');
        dialogContainer.id = 'dialog-container';
        dialogContainer.classList.add('dialog-container');
        dialogContainer.innerHTML = htmlString;


        let dialogLabel = new CSS2DObject(dialogContainer);
        dialogLabel.position.set(0, 1.5, 0);
        const dialogText = dialogContainer.querySelector(`#chat-text${data.id}`)
        dialogText.innerHTML = data.message
        target.object.add(dialogLabel);

        // remove the message after 5 seconds
        setTimeout(() => {
            if (dialogLabel.parent)
                dialogLabel.parent.remove(dialogLabel);
            dialogLabel = null;
        }, 5000);
    }

    sendMessage() {
        if (this.chatInput.value.length > 0) {
            this.experience.network.socket.emit("chat message", {
                id: this.experience.localPlayer.id,
                pseudo: this.experience.localPlayer.pseudo.text,
                message: this.chatInput.value
            });

            this.createTemporaryChatMessage({
                id: this.experience.localPlayer.id,
                pseudo: this.experience.localPlayer.pseudo.text,
                message: this.chatInput.value
            }, this.experience.localPlayer)

            this.chatInput.value = "";
        }
    }

    addMessage(data) {
        let message = document.createElement('li');
        //TODO : change color of the message if it's from the local player
        message.innerHTML = '<span class="chat-messages-id">' + data.pseudo + ' : </span><span>' + data.message + '</span>';
        this.chatMessages.appendChild(message);
        const player = this.experience.network.getRemotePlayerById(data.id)
        if (player) {
            this.createTemporaryChatMessage(data, player)
        }
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
        if(this.chatInput == document.activeElement) {
            this.experience.controls.pause = true;
        } else {
            this.experience.controls.pause = false;
        }
    }

    destroy() {
        this.toggleButton.remove();
        this.chat.remove();
        this.chatMessages.remove();
        this.chatInput.remove();
        this.chatButton.remove();

        this.toggleButton = null;
        this.chat = null;
        this.chatMessages = null;
        this.chatInput = null;
        this.chatButton = null;

        this.experience = null;

        this.fadeIn = null;
        this.fadeOut = null;
        this.sendMessage = null;
    }
}