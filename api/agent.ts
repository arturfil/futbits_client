import axios from "axios";

interface JWT_DATA {
    token: string;
}

export const baseURL = process.env.REACT_APP_API_URL;
export const jwt_string:string|undefined = process.env.REACT_APP_JWT_TOKEN

const agent = axios.create({baseURL});

agent.interceptors.request.use(async (config) => {
    let token;
    try {
        const jwt_data:JWT_DATA = await JSON.parse(
            localStorage.getItem(jwt_string!)!
        )
        token = jwt_data.token;
        if (token) config.headers!.authorization = token
    } catch (error:any) {
        console.log({ERROR: error.data});
    }
    return config;
});

export default agent;