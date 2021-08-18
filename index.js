import { Login } from "./components/login.js";
import { setScreen } from "./app.js";
import { Chat } from "./components/chat.js";

const login = new Login();
setScreen(login);

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        const chat = new Chat();
        setScreen(chat);
    } else {
        const login = new Login();
        setScreen(login);
    }
})