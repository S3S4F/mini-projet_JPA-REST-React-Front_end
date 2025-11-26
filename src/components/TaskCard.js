import React, { useState } from 'react';

const TaskCard = ({ task, onEdit, onDelete, onStatusChange, getPriorityColor }) => {
    const [showActions, setShowActions] = useState(false);

    const getStatusBadge = (status) => {
        const badges = {
            TODO: { label: 'À faire', classes: 'bg-amber-100 text-amber-800 border-amber-200' },
            IN_PROGRESS: { label: 'En cours', classes: 'bg-indigo-100 text-indigo-800 border-indigo-200' },
            DONE: { label: 'Terminée', classes: 'bg-emerald-100 text-emerald-800 border-emerald-200' }
        };
        return badges[status] || badges.TODO;
    };

    const getPriorityLabel = (priority) => {
        const labels = {
            HIGH: 'Haute',
            MEDIUM: 'Moyenne',
            LOW: 'Basse'
        };
        return labels[priority] || priority;
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('fr-FR', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
    };

    const isOverdue = () => {
        return new Date(task.dueDate) < new Date() && task.status !== 'DONE';
    };

    const statusBadge = getStatusBadge(task.status);

    return (
        <div className={`group relative bg-white rounded-2xl p-6 shadow-sm border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${isOverdue() ? 'border-red-200 ring-1 ring-red-100' : 'border-slate-100 hover:border-indigo-100'}`}>
            {/* Priority & Status Header */}
            <div className="flex justify-between items-start mb-4">
                <div className="flex items-center space-x-2">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getPriorityColor(task.priority)}`}>
                        {getPriorityLabel(task.priority)}
                    </span>
                    {isOverdue() && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 border border-red-200 animate-pulse">
                            En retard
                        </span>
                    )}
                </div>

                <div className="relative">
                    <button
                        className="text-slate-400 hover:text-indigo-600 rounded-full p-1 hover:bg-indigo-50 transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
                        onClick={() => setShowActions(!showActions)}
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                        </svg>
                    </button>

                    {showActions && (
                        <div className="absolute right-0 mt-2 w-40 rounded-xl shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10 overflow-hidden animate-fade-in-down">
                            <div className="py-1">
                                <button
                                    onClick={() => {
                                        onEdit(task);
                                        setShowActions(false);
                                    }}
                                    className="w-full text-left px-4 py-2.5 text-sm text-slate-700 hover:bg-indigo-50 hover:text-indigo-700 flex items-center transition-colors"
                                >
                                    <span className="mr-3">✏️</span> Modifier
                                </button>
                                <button
                                    onClick={() => {
                                        onDelete(task.id);
                                        setShowActions(false);
                                    }}
                                    className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 flex items-center transition-colors"
                                >
                                    <span className="mr-3">🗑️</span> Supprimer
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Content */}
            <h3 className="text-lg font-bold text-slate-900 mb-2 line-clamp-1 group-hover:text-indigo-600 transition-colors">{task.title}</h3>
            <p className="text-slate-500 text-sm mb-6 line-clamp-3 h-[4.5rem] leading-relaxed">{task.description}</p>

            {/* Footer Info */}
            <div className="flex items-center justify-between text-sm text-slate-500 mb-5">
                <div className="flex items-center bg-slate-50 px-3 py-1 rounded-lg">
                    <span className="mr-2">📅</span>
                    <span className={isOverdue() ? 'text-red-600 font-medium' : 'text-slate-600'}>
                        {formatDate(task.dueDate)}
                    </span>
                </div>
            </div>

            {/* Actions Footer */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${statusBadge.classes}`}>
                    {statusBadge.label}
                </span>

                <div className="flex space-x-2">
                    {task.status === 'TODO' && (
                        <button
                            className="text-xs bg-indigo-50 text-indigo-700 hover:bg-indigo-100 px-4 py-2 rounded-lg font-medium transition-colors"
                            onClick={() => onStatusChange(task.id, 'IN_PROGRESS')}
                        >
                            Démarrer
                        </button>
                    )}

                    {task.status === 'IN_PROGRESS' && (
                        <button
                            className="text-xs bg-emerald-50 text-emerald-700 hover:bg-emerald-100 px-4 py-2 rounded-lg font-medium transition-colors"
                            onClick={() => onStatusChange(task.id, 'DONE')}
                        >
                            Terminer
                        </button>
                    )}

                    {task.status === 'DONE' && (
                        <button
                            className="text-xs bg-slate-50 text-slate-700 hover:bg-slate-100 px-4 py-2 rounded-lg font-medium transition-colors"
                            onClick={() => onStatusChange(task.id, 'IN_PROGRESS')}
                        >
                            Réouvrir
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TaskCard;