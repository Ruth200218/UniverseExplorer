const API = process.env.NEXTAUTH_URL;

const API_URL = `${API}/api`

const endPoints = {
    auth: {
        login: `${API_URL}/login`,
        register: `${API_URL}/register`,
    }
}

export default endPoints;