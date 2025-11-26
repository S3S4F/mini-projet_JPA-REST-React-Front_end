import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import taskService from '../services/taskService';
import authService from '../services/authService';
import TaskCard from '../components/TaskCard';
import TaskForm from '../components/TaskForm';
import Navbar from '../components/Navbar';

const Dashboard = () => {
    const [tasks, setTasks] = useState([]);
    const [filteredTasks, setFilteredTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [showTaskForm, setShowTaskForm] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);
    const [filter, setFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [stats, setStats] = useState({
        total: 0,
        todo: 0,
        inProgress: 0,
        completed: 0,
        overdue: 0
    });
    const navigate = useNavigate();

    useEffect(() => {
        loadTasks();
    }, []);

    useEffect(() => {
        filterTasks();
    }, [tasks, filter, searchTerm]);

    const loadTasks = async () => {
        try {
            setLoading(true);
            const data = await taskService.getAllTasks();
            setTasks(data);
            calculateStats(data);
            setError('');
        } catch (err) {
            console.error('🔴 Erreur chargement tâches:', err);
            setError('Impossible de charger vos tâches. Veuillez réessayer.');
        } finally {
            setLoading(false);
        }
    };

    const calculateStats = (taskList) => {
        const stats = {
            total: taskList.length,
            todo: taskList.filter(t => t.status === 'TODO').length,
            inProgress: taskList.filter(t => t.status === 'IN_PROGRESS').length,
            completed: taskList.filter(t => t.status === 'DONE').length,
            overdue: taskList.filter(t => t.dueDate && new Date(t.dueDate) < new Date() && t.status !== 'DONE').length
        };
        setStats(stats);
    };

    const filterTasks = () => {
        let filtered = [...tasks];

        // Filtrer par statut
        if (filter !== 'all') {
            if (filter === 'overdue') {
                filtered = filtered.filter(t =>
                    t.dueDate && new Date(t.dueDate) < new Date() && t.status !== 'DONE'
                );
            } else if (filter === 'todo') {
                filtered = filtered.filter(t => t.status === 'TODO');
            } else if (filter === 'in_progress') {
                filtered = filtered.filter(t => t.status === 'IN_PROGRESS');
            } else if (filter === 'completed') {
                filtered = filtered.filter(t => t.status === 'DONE');
            }
        }

        // Filtrer par recherche
        if (searchTerm) {
            filtered = filtered.filter(t =>
                t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (t.description && t.description.toLowerCase().includes(searchTerm.toLowerCase()))
            );
        }

        setFilteredTasks(filtered);
    };

    const handleCreateTask = async (taskData) => {
        try {
            await taskService.createTask(taskData);
            setShowTaskForm(false);
            loadTasks();
        } catch (err) {
            console.error('🔴 Erreur création:', err);
            setError('Erreur lors de la création de la tâche');
        }
    };

    const handleUpdateTask = async (taskData) => {
        try {
            await taskService.updateTask(selectedTask.id, taskData);
            setShowTaskForm(false);
            setSelectedTask(null);
            loadTasks();
        } catch (err) {
            console.error('🔴 Erreur mise à jour:', err);
            setError('Erreur lors de la mise à jour de la tâche');
        }
    };

    const handleDeleteTask = async (id) => {
        if (window.confirm('Êtes-vous sûr de vouloir supprimer cette tâche ?')) {
            try {
                await taskService.deleteTask(id);
                loadTasks();
            } catch (err) {
                console.error('🔴 Erreur suppression:', err);
                setError('Erreur lors de la suppression de la tâche');
            }
        }
    };

    const handleStatusChange = async (id, status) => {
        try {
            await taskService.updateTaskStatus(id, status);
            loadTasks();
        } catch (err) {
            console.error('🔴 Erreur changement statut:', err);
            setError('Erreur lors du changement de statut');
        }
    };

    const handleEditTask = (task) => {
        setSelectedTask(task);
        setShowTaskForm(true);
    };

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'URGENT': return 'text-red-700 bg-red-50 border-red-200';
            case 'HIGH': return 'text-orange-700 bg-orange-50 border-orange-200';
            case 'MEDIUM': return 'text-amber-700 bg-amber-50 border-amber-200';
            case 'LOW': return 'text-emerald-700 bg-emerald-50 border-emerald-200';
            default: return 'text-slate-700 bg-slate-50 border-slate-200';
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600 mb-4"></div>
                <p className="text-slate-600 font-medium animate-pulse">Chargement de votre espace...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
            <Navbar />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                {/* Header Section */}
                <div className="md:flex md:items-center md:justify-between mb-10">
                    <div className="flex-1 min-w-0">
                        <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                            Tableau de bord
                        </h2>
                        <p className="mt-2 text-lg text-slate-500">
                            Bonjour {authService.getCurrentUser()?.username || 'Utilisateur'}, voici un aperçu de vos activités.
                        </p>
                    </div>
                    <div className="mt-6 flex md:mt-0 md:ml-4">
                        <button
                            onClick={() => {
                                setSelectedTask(null);
                                setShowTaskForm(true);
                            }}
                            className="group relative inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-white bg-indigo-600 shadow-lg hover:bg-indigo-700 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 transform hover:-translate-y-0.5"
                        >
                            <span className="mr-2 text-xl font-light">+</span>
                            Nouvelle tâche
                        </button>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5 mb-12">
                    {[
                        { label: 'Total', value: stats.total, icon: '📋', color: 'from-blue-500 to-blue-600', bg: 'bg-blue-50' },
                        { label: 'À faire', value: stats.todo, icon: '⏳', color: 'from-amber-500 to-amber-600', bg: 'bg-amber-50' },
                        { label: 'En cours', value: stats.inProgress, icon: '🚀', color: 'from-indigo-500 to-indigo-600', bg: 'bg-indigo-50' },
                        { label: 'Terminées', value: stats.completed, icon: '✅', color: 'from-emerald-500 to-emerald-600', bg: 'bg-emerald-50' },
                        { label: 'En retard', value: stats.overdue, icon: '⚠️', color: 'from-red-500 to-red-600', bg: 'bg-red-50' },
                    ].map((stat) => (
                        <div key={stat.label} className="relative overflow-hidden bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border border-slate-100 group">
                            <div className={`absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 rounded-full opacity-10 bg-gradient-to-br ${stat.color} blur-xl group-hover:opacity-20 transition-opacity`}></div>
                            <div className="p-6">
                                <div className="flex items-center">
                                    <div className={`flex-shrink-0 rounded-xl p-3 ${stat.bg}`}>
                                        <span className="text-2xl">{stat.icon}</span>
                                    </div>
                                    <div className="ml-4 w-0 flex-1">
                                        <dl>
                                            <dt className="text-sm font-medium text-slate-500 truncate">
                                                {stat.label}
                                            </dt>
                                            <dd>
                                                <div className="text-2xl font-bold text-slate-900">
                                                    {stat.value}
                                                </div>
                                            </dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Filters & Search Toolbar */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-2 mb-10 sticky top-20 z-20 backdrop-blur-lg bg-opacity-90">
                    <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0 p-2">
                        {/* Search */}
                        <div className="relative w-full md:w-96 group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <svg className="h-5 w-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                            <input
                                type="text"
                                className="block w-full pl-11 pr-4 py-2.5 border-none rounded-xl bg-slate-50 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:bg-white transition-all duration-300"
                                placeholder="Rechercher une tâche..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        {/* Filter Tabs */}
                        <div className="flex overflow-x-auto pb-2 md:pb-0 hide-scrollbar gap-2">
                            {[
                                { id: 'all', label: 'Toutes' },
                                { id: 'todo', label: 'À faire' },
                                { id: 'in_progress', label: 'En cours' },
                                { id: 'completed', label: 'Terminées' },
                                { id: 'overdue', label: 'En retard' },
                            ].map((f) => (
                                <button
                                    key={f.id}
                                    onClick={() => setFilter(f.id)}
                                    className={`whitespace-nowrap px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${filter === f.id
                                        ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200'
                                        : 'bg-white text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                                        }`}
                                >
                                    {f.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Error Alert */}
                {error && (
                    <div className="rounded-xl bg-red-50 p-4 mb-8 border border-red-100 animate-fade-in">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="ml-3">
                                <h3 className="text-sm font-medium text-red-800">Erreur</h3>
                                <div className="mt-2 text-sm text-red-700"><p>{error}</p></div>
                            </div>
                            <div className="ml-auto pl-3">
                                <button
                                    onClick={() => setError('')}
                                    className="inline-flex bg-red-50 rounded-md p-1.5 text-red-500 hover:bg-red-100 focus:outline-none"
                                >
                                    <span className="sr-only">Fermer</span>
                                    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Tasks Grid */}
                <div className="mt-8">
                    {filteredTasks.length === 0 ? (
                        <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-dashed border-slate-300">
                            <div className="mx-auto h-24 w-24 bg-indigo-50 rounded-full flex items-center justify-center mb-6">
                                <span className="text-4xl">📝</span>
                            </div>
                            <h3 className="mt-2 text-xl font-medium text-slate-900">Aucune tâche trouvée</h3>
                            <p className="mt-2 text-slate-500 max-w-sm mx-auto">
                                {searchTerm
                                    ? 'Aucune tâche ne correspond à votre recherche. Essayez d\'autres mots-clés.'
                                    : 'Votre liste de tâches est vide. Commencez par en créer une nouvelle !'
                                }
                            </p>
                            {!searchTerm && (
                                <div className="mt-8">
                                    <button
                                        onClick={() => setShowTaskForm(true)}
                                        className="inline-flex items-center px-6 py-3 border border-transparent shadow-sm text-base font-medium rounded-full text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300"
                                    >
                                        <span className="mr-2">+</span>
                                        Créer une tâche
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                            {filteredTasks.map(task => (
                                <TaskCard
                                    key={task.id}
                                    task={task}
                                    onEdit={handleEditTask}
                                    onDelete={handleDeleteTask}
                                    onStatusChange={handleStatusChange}
                                    getPriorityColor={getPriorityColor}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </main>

            {/* Task Form Modal */}
            {showTaskForm && (
                <TaskForm
                    task={selectedTask}
                    onSubmit={selectedTask ? handleUpdateTask : handleCreateTask}
                    onClose={() => {
                        setShowTaskForm(false);
                        setSelectedTask(null);
                    }}
                />
            )}
        </div>
    );
};

export default Dashboard;
