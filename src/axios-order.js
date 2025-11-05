import axios from "axios";

const instance = axios.create({
    baseURL: "https://learn-react-burger-ae77f-default-rtdb.asia-southeast1.firebasedatabase.app/",
});

export default instance;