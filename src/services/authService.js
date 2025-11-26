import api from './api';

const authService = {
    // Inscription
    register: async (userData) => {
        try {
            const response = await api.post('/auth/register', userData);
            console.log('Register response:', response.data); // Debug

            // Vérifier différents noms de champs possibles
            const token = response.data.token || response.data.jwt || response.data.accessToken;

            if (token) {
                localStorage.setItem('token', token);
                localStorage.setItem('user', JSON.stringify(response.data));
            }
            return response.data;
        } catch (error) {
            console.error('Register error:', error.response?.data || error.message);
            throw error;
        }
    },

    // Connexion
    login: async (credentials) => {
        try {
            const response = await api.post('/auth/login', credentials);
            console.log('Login response:', response.data); // Debug

            // Vérifier différents noms de champs possibles
            const token = response.data.token || response.data.jwt || response.data.accessToken;

            if (token) {
                localStorage.setItem('token', token);
                localStorage.setItem('user', JSON.stringify(response.data));
            } else {
                console.error('No token found in response:', response.data);
                throw new Error('Token non reçu du serveur');
            }
            return response.data;
        } catch (error) {
            console.error('Login error:', error.response?.data || error.message);
            throw error;
        }
    },

    // Déconnexion
    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    },

    // Récupérer l'utilisateur actuel
    getCurrentUser: () => {
        const userStr = localStorage.getItem('user');
        if (userStr) {
            try {
                return JSON.parse(userStr);
            } catch (e) {
                console.error('Error parsing user data:', e);
                return null;
            }
        }
        return null;
    },

    // Vérifier si l'utilisateur est connecté
    isAuthenticated: () => {
        return !!localStorage.getItem('token');
    },
};

export default authService;