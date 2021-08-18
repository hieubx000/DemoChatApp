class ConversationItem {
    id;
    name;
    noOfUser;

    $container;
    $txtName;
    $txtNoOfUser

    onSelectConversation;
    constructor(id, name, numberOfUser, onSelectConversation) {
        this.id = id;
        this.name = name;
        this.noOfUser = numberOfUser;
        this.onSelectConversation = onSelectConversation;

        this.$container = document.createElement("div");
        this.$container.classList.add("conversation-item");
        this.$container.addEventListener("click", this.handleClick);

        this.$txtName = document.createElement("span");
        this.$txtName.innerHTML = this.name;

        this.$txtNoOfUser = document.createElement("span");
        this.$txtNoOfUser.innerHTML = "(" + this.noOfUser + ")";
    };

    handleClick = () => {
        this.onSelectConversation({
            id: this.id,
            name: this.name,
        });
    };

    setActive = (active) => {
        if (active) {
            this.$container.classList.add("active");
        } else {
            this.$container.classList.remove("active");
        }
    }

    render() {
        this.$container.appendChild(this.$txtName);
        this.$container.appendChild(this.$txtNoOfUser);
        return this.$container;
    };
}
export { ConversationItem }