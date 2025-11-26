import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';

const Navbar = () => {
    const [showDropdown, setShowDropdown] = useState(false);
    const navigate = useNavigate();
    const user = authService.getCurrentUser();

    const handleLogout = () => {
        authService.logout();
        navigate('/login');
    };

    return (
        <nav className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-40 transition-all">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        <div className="flex-shrink-0 flex items-center cursor-pointer group" onClick={() => navigate('/dashboard')}>
                            <div className="h-8 w-8 bg-indigo-600 rounded-lg flex items-center justify-center mr-2 group-hover:bg-indigo-700 transition-colors">
                                <span className="text-white font-bold text-lg">T</span>
                            </div>
                            <div className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
                                <img src="/jef.png" alt="JËF-JËL Logo" className="h-18 w-auto" />
                            </div>
                        </div>
                        <div className="hidden sm:ml-8 sm:flex sm:space-x-8">
                            <button className="border-indigo-500 text-slate-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                                <span className="mr-2">📊</span>
                                Dashboard
                            </button>
                            <button className="border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors">
                                <span className="mr-2">📋</span>
                                Mes tâches
                            </button>
                            <button className="border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors">
                                <span className="mr-2">📅</span>
                                Calendrier
                            </button>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <div className="ml-3 relative">
                            <div>
                                <button
                                    className="max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 p-1 hover:bg-slate-50 transition-colors border border-slate-200"
                                    onClick={() => setShowDropdown(!showDropdown)}
                                >
                                    <div className="h-8 w-8 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white font-bold shadow-sm">
                                        {user?.username?.charAt(0).toUpperCase() || 'U'}
                                    </div>
                                    <span className="ml-3 text-slate-700 font-medium hidden md:block">{user?.username || 'Utilisateur'}</span>
                                    <span className="ml-2 text-slate-400 text-xs hidden md:block">▼</span>
                                </button>
                            </div>

                            {showDropdown && (
                                <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-xl shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50 animate-fade-in-down">
                                    <div className="px-4 py-3 border-b border-slate-100 bg-slate-50/50">
                                        <p className="text-xs text-slate-500 uppercase font-semibold tracking-wider">Compte</p>
                                        <p className="text-sm font-medium text-slate-900 truncate">{user?.email}</p>
                                    </div>
                                    <button className="w-full text-left block px-4 py-2.5 text-sm text-slate-700 hover:bg-indigo-50 hover:text-indigo-700 transition-colors flex items-center">
                                        <span className="mr-3">⚙️</span>
                                        Paramètres
                                    </button>
                                    <button className="w-full text-left block px-4 py-2.5 text-sm text-slate-700 hover:bg-indigo-50 hover:text-indigo-700 transition-colors flex items-center">
                                        <span className="mr-3">👤</span>
                                        Profil
                                    </button>
                                    <div className="border-t border-slate-100 my-1"></div>
                                    <button
                                        className="w-full text-left block px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center"
                                        onClick={handleLogout}
                                    >
                                        <span className="mr-3">🚪</span>
                                        Déconnexion
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;