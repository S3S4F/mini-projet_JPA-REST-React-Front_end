import axios from 'axios';

// URL de base de votre API Spring Boot
const API_URL = 'http://localhost:8080/api';

console.log('🌐 API URL configurée:', API_URL);

// Créer une instance axios avec configuration par défaut
const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Intercepteur pour ajouter automatiquement le token JWT à chaque requête
api.interceptors.request.use(
    (config) => {
        console.log('📤 Requête sortante:', {
            method: config.method,
            url: config.url,
            data: config.data
        });

        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
            console.log('🔑 Token ajouté à la requête');
        }
        return config;
    },
    (error) => {
        console.error('❌ Erreur dans request interceptor:', error);
        return Promise.reject(error);
    }
);

// Intercepteur pour gérer les erreurs de réponse
api.interceptors.response.use(
    (response) => {
        console.log('📥 Réponse reçue:', {
            status: response.status,
            url: response.config.url,
            data: response.data
        });
        return response;
    },
    (error) => {
        console.error('🔴 Erreur dans response:', {
            message: error.message,
            status: error.response?.status,
            data: error.response?.data,
            url: error.config?.url
        });

        // ✅ Ne déconnecter QUE sur erreur 401 (non autorisé)
        // Ne PAS déconnecter sur 400 (bad request) ou autres erreurs
        if (error.response?.status === 401) {
            console.warn('🔓 401 Unauthorized - Token invalide ou expiré');
            // Éviter la boucle de redirection si on est déjà sur login
            if (!window.location.pathname.includes('/login')) {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                window.location.href = '/login';
            }
        }

        // Vérifier les erreurs CORS ou réseau
        if (error.message === 'Network Error') {
            console.error('⚠️ ERREUR RÉSEAU - Vérifiez:');
            console.error('  1. Le backend est-il démarré sur http://localhost:8080 ?');
            console.error('  2. CORS est-il configuré correctement ?');
        }

        return Promise.reject(error);
    }
);

export default api;