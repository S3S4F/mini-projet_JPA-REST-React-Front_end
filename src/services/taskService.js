import api from './api';

const taskService = {
    // Créer une tâche
    createTask: async (taskData) => {
        const response = await api.post('/tasks', taskData);
        return response.data;
    },

    // Récupérer toutes les tâches
    getAllTasks: async () => {
        const response = await api.get('/tasks');
        return response.data;
    },

    // Récupérer une tâche par ID
    getTaskById: async (id) => {
        const response = await api.get(`/tasks/${id}`);
        return response.data;
    },

    // Récupérer les tâches par statut
    getTasksByStatus: async (status) => {
        const response = await api.get(`/tasks/status/${status}`);
        return response.data;
    },

    // Récupérer les tâches par priorité
    getTasksByPriority: async (priority) => {
        const response = await api.get(`/tasks/priority/${priority}`);
        return response.data;
    },

    // Récupérer les tâches en retard
    getOverdueTasks: async () => {
        const response = await api.get('/tasks/overdue');
        return response.data;
    },

    // Rechercher des tâches
    searchTasks: async (keyword) => {
        const response = await api.get(`/tasks/search?keyword=${keyword}`);
        return response.data;
    },

    // Mettre à jour une tâche
    updateTask: async (id, taskData) => {
        const response = await api.put(`/tasks/${id}`, taskData);
        return response.data;
    },

    // Changer le statut d'une tâche
    updateTaskStatus: async (id, status) => {
        const response = await api.patch(`/tasks/${id}/status`, { status });
        return response.data;
    },

    // Supprimer une tâche
    deleteTask: async (id) => {
        const response = await api.delete(`/tasks/${id}`);
        return response.data;
    },
};

export default taskService;