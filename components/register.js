import { setScreen } from "../app.js";
import { InputGroup } from "./input-group.js";
import { Login } from "./login.js";

class Register {
    $container;
    $title;

    $formRegister;

    $inputGroupEmail;
    $inputGroupDisplayName
    $inputGroupPassword;
    $inputGroupConfirmPassword;

    $feedbackMessage;

    $btnSubmit;
    $linkToLogin;

    constructor() {
        this.$container = document.createElement("div");
        this.$container.style.width = "400px"
        this.$container.style.margin = "auto"
        this.$container.classList.add("center", "h-screen", "flex-col");

        this.$title = document.createElement('h3');
        this.$title.innerHTML = "Register";

        this.$formRegister = document.createElement("form");
        this.$formRegister.addEventListener("submit", this.handleSubmit)

        this.$inputGroupEmail = new InputGroup("email", "Email", "email")
        this.$inputGroupDisplayName = new InputGroup("text", "Display name", "DisplayName")
        this.$inputGroupPassword = new InputGroup("password", "Password", "password")
        this.$inputGroupConfirmPassword = new InputGroup("password", "Confirm Password", "ConfirmPassword")

        this.$feedbackMessage = document.createElement("div");

        this.$btnSubmit = document.createElement("button")
        this.$btnSubmit.type = "submit"
        this.$btnSubmit.innerHTML = "Register"

        this.$linkToLogin = document.createElement("div");
        this.$linkToLogin.classList.add("btn-link");
        this.$linkToLogin.innerHTML = "< Back to Login";
        this.$linkToLogin.addEventListener('click', this.moveToLogin)
    }

    moveToLogin = () => {
        const login = new Login()
        setScreen(login);
    }

    handleSubmit = (evt) => {
        evt.preventDefault();

        // Validate form
        const email = this.$inputGroupEmail.getInputValue();
        const displayName = this.$inputGroupDisplayName.getInputValue()
        const password = this.$inputGroupPassword.getInputValue()
        const conFirmPassword = this.$inputGroupConfirmPassword.getInputValue();

        this.$inputGroupEmail.setError(null);
        this.$inputGroupDisplayName.setError(null);
        this.$inputGroupPassword.setError(null);
        this.$inputGroupConfirmPassword.setError(null);

        if (!email) {
            this.$inputGroupEmail.setError("Email cannot be empty!")
        }
        if (!displayName) {
            this.$inputGroupDisplayName.setError("Display name cannot be empty!")
        }
        if (password.length < 6) {
            this.$inputGroupPassword.setError("Password length must be greater or equal than 6!");
        }
        if (conFirmPassword !== password) {
            this.$inputGroupConfirmPassword.setError("confirm password not matched!")
        } else {
            firebase
                .auth()
                .createUserWithEmailAndPassword(email, password)
                .then(() => {
                    this.$feedbackMessage.innerHTML = "Register successfully! Please check your inbox"
                    firebase.auth().currentUser.sendEmailVerification();
                })
                .catch((error) => {
                    console.log(error);
                })
        }

    };

    render() {
        this.$formRegister.appendChild(this.$inputGroupEmail.render());
        this.$formRegister.appendChild(this.$inputGroupDisplayName.render());
        this.$formRegister.appendChild(this.$inputGroupPassword.render());
        this.$formRegister.appendChild(this.$inputGroupConfirmPassword.render());
        this.$formRegister.appendChild(this.$btnSubmit);

        this.$container.appendChild(this.$title);
        this.$container.appendChild(this.$feedbackMessage);
        this.$container.appendChild(this.$formRegister);
        this.$container.appendChild(this.$linkToLogin)
        return this.$container;
    }
}
export { Register };