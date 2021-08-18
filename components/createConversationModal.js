class CreateConversationModal {
    $container;
    $form;
    $input;
    btnCreate;
    $btnCancel;

    constructor() {
        this.$container = document.createElement("div");
        this.$container.style.display = "none";
        this.$container.classList.add("modal-container");

        this.$form = document.createElement("form");
        this.$form.addEventListener("submit", this.handleSubmit);

        this.$input = document.createElement("input")
        this.$input.type = "text"
        this.$input.placeholder = "Enter conversation name ...";

        this.$btnCreate = document.createElement("button");
        this.$btnCreate.type = "submit";
        this.$btnCreate.innerHTML = "Create";

        this.$btnCancel = document.createElement("button");
        this.$btnCancel.type = "button";
        this.$btnCancel.innerHTML = "Cancel";
        this.$btnCancel.addEventListener("click", this.handleCancel);

    }

    handleSubmit = (event) => {
        event.preventDefault();
        db.collection("conversations")
            .add({
                name: this.$input.value,
                createdBy: firebase.auth().currentUser.email,
                users: [firebase.auth().currentUser.email],
            })
            .then(() => {
                this.setVisible(false);
            });

    };

    handleCancel = () => {
        this.setVisible(false);
    };

    setVisible(visible) {
        if (visible) {
            this.$container.style.display = "flex";
        } else {
            this.$container.style.display = "none";
        }
    }

    render() {
        const modalContent = document.createElement("div");
        modalContent.classList.add("modal-content");

        this.$form.appendChild(this.$input);
        this.$form.appendChild(this.$btnCreate);
        this.$form.appendChild(this.$btnCancel);
        modalContent.appendChild(this.$form)

        this.$container.appendChild(modalContent);
        return this.$container;
    }
}
export { CreateConversationModal };