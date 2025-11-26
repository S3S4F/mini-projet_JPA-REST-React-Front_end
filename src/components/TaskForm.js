import React, { useState, useEffect } from 'react';

const TaskForm = ({ task, onSubmit, onClose }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        dueDate: '',
        priority: 'MEDIUM',
        status: 'TODO'
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (task) {
            setFormData({
                title: task.title || '',
                description: task.description || '',
                dueDate: task.dueDate ? task.dueDate.split('T')[0] : '',
                priority: task.priority || 'MEDIUM',
                status: task.status || 'TODO'
            });
        }
    }, [task]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validate = () => {
        const newErrors = {};

        if (!formData.title.trim()) {
            newErrors.title = 'Le titre est requis';
        } else if (formData.title.length < 3) {
            newErrors.title = 'Le titre doit contenir au moins 3 caractères';
        }

        if (!formData.description.trim()) {
            newErrors.description = 'La description est requise';
        }

        if (!formData.dueDate) {
            newErrors.dueDate = 'La date d\'échéance est requise';
        } else {
            const selectedDate = new Date(formData.dueDate);
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            if (selectedDate < today) {
                newErrors.dueDate = 'La date d\'échéance ne peut pas être dans le passé';
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validate()) {
            onSubmit(formData);
        }
    };

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true" onClick={onClose}>
            <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                {/* Backdrop */}
                <div className="fixed inset-0 bg-slate-900 bg-opacity-60 transition-opacity backdrop-blur-sm" aria-hidden="true"></div>

                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                <div
                    className="inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg w-full border border-slate-100"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-8">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-2xl font-bold text-slate-900" id="modal-title">
                                {task ? 'Modifier la tâche' : 'Nouvelle tâche'}
                            </h3>
                            <button
                                onClick={onClose}
                                className="text-slate-400 hover:text-slate-600 focus:outline-none bg-slate-50 hover:bg-slate-100 p-2 rounded-full transition-colors"
                            >
                                <span className="sr-only">Fermer</span>
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="title" className="block text-sm font-semibold text-slate-700 mb-1">
                                    Titre <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    placeholder="Ex: Finaliser le rapport"
                                    className={`block w-full border rounded-xl shadow-sm py-3 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all ${errors.title ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-slate-50 focus:bg-white'}`}
                                />
                                {errors.title && <p className="mt-1 text-sm text-red-600 font-medium">{errors.title}</p>}
                            </div>

                            <div>
                                <label htmlFor="description" className="block text-sm font-semibold text-slate-700 mb-1">
                                    Description <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    id="description"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    placeholder="Décrivez votre tâche..."
                                    rows="4"
                                    className={`block w-full border rounded-xl shadow-sm py-3 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all ${errors.description ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-slate-50 focus:bg-white'}`}
                                ></textarea>
                                {errors.description && <p className="mt-1 text-sm text-red-600 font-medium">{errors.description}</p>}
                            </div>

                            <div className="grid grid-cols-1 gap-y-6 gap-x-6 sm:grid-cols-2">
                                <div>
                                    <label htmlFor="dueDate" className="block text-sm font-semibold text-slate-700 mb-1">
                                        Date d'échéance <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="date"
                                        id="dueDate"
                                        name="dueDate"
                                        value={formData.dueDate}
                                        onChange={handleChange}
                                        className={`block w-full border rounded-xl shadow-sm py-3 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all ${errors.dueDate ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-slate-50 focus:bg-white'}`}
                                    />
                                    {errors.dueDate && <p className="mt-1 text-sm text-red-600 font-medium">{errors.dueDate}</p>}
                                </div>

                                <div>
                                    <label htmlFor="priority" className="block text-sm font-semibold text-slate-700 mb-1">Priorité</label>
                                    <select
                                        id="priority"
                                        name="priority"
                                        value={formData.priority}
                                        onChange={handleChange}
                                        className="block w-full border border-slate-200 rounded-xl shadow-sm py-3 px-4 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                                    >
                                        <option value="LOW">🟢 Basse</option>
                                        <option value="MEDIUM">🟡 Moyenne</option>
                                        <option value="HIGH">🔴 Haute</option>
                                    </select>
                                </div>
                            </div>

                            {task && (
                                <div>
                                    <label htmlFor="status" className="block text-sm font-semibold text-slate-700 mb-1">Statut</label>
                                    <select
                                        id="status"
                                        name="status"
                                        value={formData.status}
                                        onChange={handleChange}
                                        className="block w-full border border-slate-200 rounded-xl shadow-sm py-3 px-4 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                                    >
                                        <option value="TODO">⏳ À faire</option>
                                        <option value="IN_PROGRESS">🚀 En cours</option>
                                        <option value="DONE">✅ Terminée</option>
                                    </select>
                                </div>
                            )}

                            <div className="mt-8 sm:grid sm:grid-cols-2 sm:gap-4 sm:flex-row-reverse">
                                <button
                                    type="submit"
                                    className="w-full inline-flex justify-center rounded-xl border border-transparent shadow-lg px-6 py-3 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-2 sm:text-sm transition-all transform hover:-translate-y-0.5"
                                >
                                    {task ? 'Mettre à jour' : 'Créer la tâche'}
                                </button>
                                <button
                                    type="button"
                                    className="mt-3 w-full inline-flex justify-center rounded-xl border border-slate-200 shadow-sm px-6 py-3 bg-white text-base font-medium text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-1 sm:text-sm transition-all"
                                    onClick={onClose}
                                >
                                    Annuler
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TaskForm;