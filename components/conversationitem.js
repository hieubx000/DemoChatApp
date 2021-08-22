class ConversationItem {
    id;
    name;
    users;

    $container;
    $txtName;
    $txtNoOfUser

    onSelectConversation;
    constructor(id, name, users, onSelectConversation) {
        this.id = id;
        this.name = name;
        this.users = users;
        this.onSelectConversation = onSelectConversation;

        this.$container = document.createElement("div");
        this.$container.classList.add("conversation-item");
        this.$container.addEventListener("click", this.handleClick);

        this.$txtName = document.createElement("span");
        this.$txtName.innerHTML = this.name;

        this.$txtNoOfUser = document.createElement("span");
        this.$txtNoOfUser.innerHTML = "(" + this.users.length + ")";
    };

    handleClick = () => {
        this.onSelectConversation({
            id: this.id,
            name: this.name,
            users: this.users
        });
    };

    setActive = (active) => {
        if (active) {
            this.$container.classList.add("active");
        } else {
            this.$container.classList.remove("active");
        }
    }

    updateData(name, users) {
        this.name = name;
        this.users = users;

        this.$txtName.innerHTML = name;
        this.$txtNoOfUser.innerHTML = "(" + users.length + ")";
    }

    render() {
        this.$container.appendChild(this.$txtName);
        this.$container.appendChild(this.$txtNoOfUser);
        return this.$container;
    };
}
export { ConversationItem }