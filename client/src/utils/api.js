import axios from "axios";

export const baseURL = "http://localhost:8000/api/"

export const createSession =  async () => {
    await axios
    .post(baseURL+"create-session/")
    .then(res => {
        localStorage.setItem("access_token", res.data.access_token)
    })
}

export const attachFiles = async (files) => {
    const config = {
        headers: {
            'Content-Type': "multipart/form-data",
            Authorization: "Bearer " + localStorage.getItem("access_token")
        }
    }
    const data = {
        files: files
    }
    console.log(config, data)
    const res = await axios
        .post(baseURL + "attach-files/", { files }, config)
        .then(res => {
            return res
        })
    return res;
}
