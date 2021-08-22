import { MessageItem } from "./messageItem.js";

class MessageArea {
    $container;

    $messageList;

    $composer;
    $input;
    $btnSend;

    activeConversation;
    messageSubscribe;

    constructor() {
        this.$container = document.createElement("div");
        this.$container.classList.add("flex", "flex-col", "flex-1");

        this.$messageList = document.createElement("div");
        this.$messageList.classList.add("flex-1");

        this.$composer = document.createElement("form");
        this.$composer.classList.add("flex");
        this.$composer.addEventListener("submit", this.handleSendMessage)

        this.$input = document.createElement("input");
        this.$input.type = "text";
        this.$input.placeholder = "Please be nice in the chat!";
        this.$input.classList.add("flex-1");

        this.$btnSend = document.createElement("button");
        this.$btnSend.type = "submit";
        this.$btnSend.innerHTML = "Send";

    }

    setConversation(conversation) {
        this.activeConversation = conversation;
        this.$messageList.innerHTML = "";
        if (this.messageSubscribe) {
            this.messageSubscribe();
        }
        this.messageSubscribe = db.collection("messages")
            .where('conversationId', '==', this.activeConversation.id)
            .orderBy("sentAt")
            .onSnapshot(this.messageListener);
    }

    messageListener = (snapshot) => {
        snapshot.docChanges().forEach((change) => {
            if (change.type === "added") {
                const data = change.doc.data();
                const $messageItem = new MessageItem(data.sender, data.content);
                this.$messageList.appendChild($messageItem.render());
            }
        });
    };

    handleSendMessage = (event) => {
        event.preventDefault();
        //sender = authenticated user
        //content = this.$input.value
        //conversationId = active conversation id
        if (this.activeConversation) {
            db.collection("messages").add({
                sender: firebase.auth().currentUser.email,
                content: this.$input.value,
                conversationId: this.activeConversation.id,
                sentAt: firebase.firestore.FieldValue.serverTimestamp(),
            })
        } else {
            alert("You must select conversation first");
        }
    }

    render() {
        this.$composer.appendChild(this.$input);
        this.$composer.appendChild(this.$btnSend);

        this.$container.appendChild(this.$messageList);
        this.$container.appendChild(this.$composer);

        return this.$container;
    }
}
export { MessageArea }