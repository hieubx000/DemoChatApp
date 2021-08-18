class TitleBar {
    $container;
    $txtName;
    $btnLogout;

    constructor() {
        this.$container = document.createElement("div");
        this.$container.classList.add("title-Bar");

        this.$txtName = document.createElement("div");

        this.$btnLogout = document.createElement("button");
        this.$btnLogout.addEventListener("click", this.handelLogout);
        this.$btnLogout.innerHTML = "Logout";
    }

    handelLogout = () => {
        firebase.auth().signOut()
    }

    setName(name) {
        this.$txtName.innerHTML = name;
    }

    render() {
        this.$container.appendChild(this.$txtName);
        this.$container.appendChild(this.$btnLogout);

        return this.$container;
    }
}
export { TitleBar };