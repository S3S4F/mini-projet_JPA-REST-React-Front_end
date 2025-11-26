import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../services/authService';

const Home = () => {
    const navigate = useNavigate();
    const isAuthenticated = authService.isAuthenticated();

    const handleGetStarted = () => {
        if (isAuthenticated) {
            navigate('/dashboard');
        } else {
            navigate('/register');
        }
    };

    return (
        <div className="min-h-screen bg-white font-sans text-slate-900">
            {/* Header/Navbar */}
            <header className="fixed w-full top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex-shrink-0 flex items-center">
                            <img src="/jef.png" alt="JËF-JËL Logo" className="h-21 w-auto" />
                        </div>
                        <nav className="hidden md:flex space-x-8">
                            <a href="#features" className="text-slate-600 hover:text-indigo-600 transition-colors">Fonctionnalités</a>
                            <a href="#benefits" className="text-slate-600 hover:text-indigo-600 transition-colors">Avantages</a>
                            <a href="#pricing" className="text-slate-600 hover:text-indigo-600 transition-colors">Tarifs</a>
                            <a href="#contact" className="text-slate-600 hover:text-indigo-600 transition-colors">Contact</a>
                        </nav>
                        <div className="flex items-center space-x-4">
                            {isAuthenticated ? (
                                <button
                                    className="px-4 py-2 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 transition-colors font-medium"
                                    onClick={() => navigate('/dashboard')}
                                >
                                    Tableau de bord
                                </button>
                            ) : (
                                <>
                                    <Link to="/login" className="text-slate-600 hover:text-indigo-600 font-medium transition-colors">
                                        Se connecter
                                    </Link>
                                    <Link to="/register" className="px-4 py-2 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 transition-colors font-medium shadow-lg shadow-indigo-200">
                                        Essayer gratuitement
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className="pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                    <div className="lg:grid lg:grid-cols-12 lg:gap-8">
                        <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
                            <h1 className="text-4xl tracking-tight font-extrabold text-slate-900 sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl">
                                <span className="block">Une plateforme pour</span>
                                <span className="block text-indigo-600">simplifier tous vos workflows</span>
                            </h1>
                            <p className="mt-3 text-base text-slate-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                                Découvrez la liberté de créer, connecter, automatiser et développer
                                votre travail avec Jëfjëf.
                            </p>
                            <div className="mt-8 sm:max-w-lg sm:mx-auto sm:text-center lg:text-left lg:mx-0">
                                <div className="space-y-4 sm:space-y-0 sm:flex sm:space-x-4">
                                    <button
                                        onClick={handleGetStarted}
                                        className="w-full sm:w-auto flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10 shadow-xl shadow-indigo-200 transition-all hover:scale-105"
                                    >
                                        Essayer Jëfjëf gratuitement
                                    </button>
                                    <button className="w-full sm:w-auto flex items-center justify-center px-8 py-3 border border-slate-200 text-base font-medium rounded-full text-slate-700 bg-white hover:bg-slate-50 md:py-4 md:text-lg md:px-10 transition-all hover:border-indigo-300">
                                        <span className="mr-2">▶</span>
                                        Découvrir en 3 min
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center">
                            <div className="relative mx-auto w-full rounded-2xl shadow-2xl lg:max-w-md overflow-hidden transform rotate-2 hover:rotate-0 transition-transform duration-500">
                                <div className="relative block w-full bg-white rounded-2xl overflow-hidden">
                                    <div className="w-full h-11 bg-slate-100 border-b border-slate-200 flex items-center px-4 space-x-2">
                                        <div className="w-3 h-3 rounded-full bg-red-400"></div>
                                        <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                                        <div className="w-3 h-3 rounded-full bg-green-400"></div>
                                    </div>
                                    <div className="p-6 bg-slate-50">
                                        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 mb-4">
                                            <div className="flex items-center space-x-3 mb-3">
                                                <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">📝</div>
                                                <div className="flex-1">
                                                    <div className="h-2 w-24 bg-slate-200 rounded mb-1"></div>
                                                    <div className="h-2 w-16 bg-slate-100 rounded"></div>
                                                </div>
                                            </div>
                                            <div className="h-20 bg-slate-50 rounded-lg border border-dashed border-slate-200"></div>
                                        </div>

                                        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
                                            <div className="flex items-center justify-between mb-3">
                                                <div className="flex items-center space-x-2">
                                                    <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs">✓</div>
                                                    <div className="h-2 w-20 bg-slate-200 rounded"></div>
                                                </div>
                                                <div className="h-4 w-4 rounded-full bg-slate-100"></div>
                                            </div>
                                            <div className="space-y-2">
                                                <div className="h-2 w-full bg-slate-100 rounded"></div>
                                                <div className="h-2 w-3/4 bg-slate-100 rounded"></div>
                                            </div>
                                        </div>

                                        <div className="mt-4 bg-indigo-600 rounded-xl p-4 text-white relative overflow-hidden">
                                            <div className="relative z-10">
                                                <div className="flex items-center space-x-2 mb-2">
                                                    <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">🤖</div>
                                                    <span className="text-sm font-medium">AI Assistant</span>
                                                </div>
                                                <p className="text-xs text-indigo-100">J'ai analysé vos tâches. Voulez-vous que je priorise votre backlog ?</p>
                                            </div>
                                            <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Trust Section */}
            <section className="py-12 bg-slate-50 border-y border-slate-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <p className="text-center text-sm font-semibold uppercase text-slate-500 tracking-wider">
                        Approuvé par plus de 20 000+ clients satisfaits dans le monde
                    </p>
                    <div className="mt-8 grid grid-cols-2 gap-8 md:grid-cols-6 lg:grid-cols-6">
                        {['Siemens', 'Edelman', 'Vinci', 'AVEVA', 'Estée Lauder', 'Schneider'].map((brand) => (
                            <div key={brand} className="col-span-1 flex justify-center items-center">
                                <span className="text-slate-400 font-bold text-xl">{brand}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 bg-white" id="features">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">Fonctionnalités</h2>
                        <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                            Pourquoi choisir Jëfjëf ?
                        </p>
                    </div>

                    <div className="mt-16">
                        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                            {[
                                { icon: '🚀', title: 'Automatisation', desc: 'Automatisez vos tâches répétitives et concentrez-vous sur l\'essentiel' },
                                { icon: '👥', title: 'Collaboration', desc: 'Travaillez ensemble efficacement, où que vous soyez' },
                                { icon: '📊', title: 'Tableaux de bord', desc: 'Visualisez vos projets selon vos besoins avec des vues personnalisées' },
                                { icon: '🤖', title: 'Assistant IA', desc: 'Laissez l\'IA vous aider à organiser et prioriser vos tâches' },
                            ].map((feature, index) => (
                                <div key={index} className="relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                                    <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">{feature.icon}</div>
                                    <h3 className="text-lg font-medium text-slate-900">
                                        {feature.title}
                                    </h3>
                                    <p className="mt-2 text-sm text-slate-500">
                                        {feature.desc}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Benefits Section */}
            <section id="benefits" className="py-20 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="lg:text-center mb-16">
                        <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">Avantages</h2>
                        <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                            Conçu pour la performance
                        </p>
                    </div>
                    <div className="mt-10">
                        <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
                            <div className="relative">
                                <dt>
                                    <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                                        ⚡
                                    </div>
                                    <p className="ml-16 text-lg leading-6 font-medium text-slate-900">Gain de temps</p>
                                </dt>
                                <dd className="mt-2 ml-16 text-base text-slate-500">
                                    Réduisez le temps passé sur la gestion administrative et concentrez-vous sur vos projets à forte valeur ajoutée.
                                </dd>
                            </div>
                            <div className="relative">
                                <dt>
                                    <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                                        🎯
                                    </div>
                                    <p className="ml-16 text-lg leading-6 font-medium text-slate-900">Précision accrue</p>
                                </dt>
                                <dd className="mt-2 ml-16 text-base text-slate-500">
                                    Évitez les erreurs humaines grâce à nos automatisations intelligentes et nos workflows validés.
                                </dd>
                            </div>
                            <div className="relative">
                                <dt>
                                    <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                                        🔒
                                    </div>
                                    <p className="ml-16 text-lg leading-6 font-medium text-slate-900">Sécurité maximale</p>
                                </dt>
                                <dd className="mt-2 ml-16 text-base text-slate-500">
                                    Vos données sont chiffrées et protégées selon les normes les plus strictes de l'industrie.
                                </dd>
                            </div>
                            <div className="relative">
                                <dt>
                                    <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                                        📱
                                    </div>
                                    <p className="ml-16 text-lg leading-6 font-medium text-slate-900">Accessible partout</p>
                                </dt>
                                <dd className="mt-2 ml-16 text-base text-slate-500">
                                    Retrouvez votre espace de travail sur tous vos appareils, au bureau comme en déplacement.
                                </dd>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <section id="pricing" className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">Tarifs</h2>
                        <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                            Des plans adaptés à vos besoins
                        </p>
                        <p className="mt-4 max-w-2xl text-xl text-slate-500 mx-auto">
                            Commencez gratuitement et évoluez selon la croissance de votre équipe.
                        </p>
                    </div>
                    <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
                        {/* Starter */}
                        <div className="border border-slate-200 rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow">
                            <h3 className="text-lg font-medium text-slate-900">Starter</h3>
                            <p className="mt-4 text-sm text-slate-500">Pour les freelances et petites équipes.</p>
                            <p className="mt-8">
                                <span className="text-4xl font-extrabold text-slate-900">0€</span>
                                <span className="text-base font-medium text-slate-500">/mois</span>
                            </p>
                            <ul className="mt-8 space-y-4">
                                <li className="flex items-center">
                                    <span className="text-green-500 mr-2">✓</span>
                                    <span className="text-slate-600">Jusqu'à 3 projets</span>
                                </li>
                                <li className="flex items-center">
                                    <span className="text-green-500 mr-2">✓</span>
                                    <span className="text-slate-600">5 membres d'équipe</span>
                                </li>
                                <li className="flex items-center">
                                    <span className="text-green-500 mr-2">✓</span>
                                    <span className="text-slate-600">Support communautaire</span>
                                </li>
                            </ul>
                            <button className="mt-8 w-full bg-indigo-50 text-indigo-700 hover:bg-indigo-100 py-3 px-4 rounded-xl font-medium transition-colors">
                                Commencer
                            </button>
                        </div>
                        {/* Pro */}
                        <div className="border-2 border-indigo-600 rounded-2xl p-8 shadow-xl relative">
                            <div className="absolute top-0 right-0 -mt-4 mr-4 bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                                Populaire
                            </div>
                            <h3 className="text-lg font-medium text-slate-900">Pro</h3>
                            <p className="mt-4 text-sm text-slate-500">Pour les équipes en croissance.</p>
                            <p className="mt-8">
                                <span className="text-4xl font-extrabold text-slate-900">29€</span>
                                <span className="text-base font-medium text-slate-500">/mois</span>
                            </p>
                            <ul className="mt-8 space-y-4">
                                <li className="flex items-center">
                                    <span className="text-green-500 mr-2">✓</span>
                                    <span className="text-slate-600">Projets illimités</span>
                                </li>
                                <li className="flex items-center">
                                    <span className="text-green-500 mr-2">✓</span>
                                    <span className="text-slate-600">Jusqu'à 20 membres</span>
                                </li>
                                <li className="flex items-center">
                                    <span className="text-green-500 mr-2">✓</span>
                                    <span className="text-slate-600">Support prioritaire</span>
                                </li>
                                <li className="flex items-center">
                                    <span className="text-green-500 mr-2">✓</span>
                                    <span className="text-slate-600">Analytiques avancées</span>
                                </li>
                            </ul>
                            <button className="mt-8 w-full bg-indigo-600 text-white hover:bg-indigo-700 py-3 px-4 rounded-xl font-medium transition-colors shadow-lg shadow-indigo-200">
                                Essayer Pro
                            </button>
                        </div>
                        {/* Enterprise */}
                        <div className="border border-slate-200 rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow">
                            <h3 className="text-lg font-medium text-slate-900">Entreprise</h3>
                            <p className="mt-4 text-sm text-slate-500">Pour les grandes organisations.</p>
                            <p className="mt-8">
                                <span className="text-4xl font-extrabold text-slate-900">Sur devis</span>
                            </p>
                            <ul className="mt-8 space-y-4">
                                <li className="flex items-center">
                                    <span className="text-green-500 mr-2">✓</span>
                                    <span className="text-slate-600">Tout illimité</span>
                                </li>
                                <li className="flex items-center">
                                    <span className="text-green-500 mr-2">✓</span>
                                    <span className="text-slate-600">SSO & Sécurité avancée</span>
                                </li>
                                <li className="flex items-center">
                                    <span className="text-green-500 mr-2">✓</span>
                                    <span className="text-slate-600">Manager dédié</span>
                                </li>
                            </ul>
                            <button className="mt-8 w-full bg-slate-50 text-slate-700 hover:bg-slate-100 py-3 px-4 rounded-xl font-medium transition-colors">
                                Contacter les ventes
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="py-20 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
                            Prêt à transformer votre façon de travailler ?
                        </h2>
                        <p className="mt-4 text-lg text-slate-500">
                            Rejoignez des milliers d'équipes qui utilisent Jëfjëf pour accomplir plus, ensemble.
                        </p>
                        <div className="mt-8 flex justify-center space-x-4">
                            <button className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10 shadow-xl shadow-indigo-200 transition-all hover:scale-105">
                                Commencer maintenant
                            </button>
                            <button className="inline-flex items-center justify-center px-8 py-3 border border-slate-200 text-base font-medium rounded-full text-slate-700 bg-white hover:bg-slate-50 md:py-4 md:text-lg md:px-10 transition-all hover:border-indigo-300">
                                Nous contacter
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-slate-900 text-white py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div className="col-span-1 md:col-span-1">
                            <h3 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent mb-4">Jëfjëf</h3>
                            <p className="text-slate-400 text-sm">La plateforme de gestion de travail moderne pour les équipes agiles.</p>
                        </div>
                        <div>
                            <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-4">Produit</h4>
                            <ul className="space-y-2">
                                <li><a href="#features" className="text-slate-300 hover:text-white transition-colors">Fonctionnalités</a></li>
                                <li><a href="#pricing" className="text-slate-300 hover:text-white transition-colors">Tarifs</a></li>
                                <li><a href="#demo" className="text-slate-300 hover:text-white transition-colors">Démo</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-4">Entreprise</h4>
                            <ul className="space-y-2">
                                <li><a href="#about" className="text-slate-300 hover:text-white transition-colors">À propos</a></li>
                                <li><a href="#contact" className="text-slate-300 hover:text-white transition-colors">Contact</a></li>
                                <li><a href="#careers" className="text-slate-300 hover:text-white transition-colors">Carrières</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-4">Ressources</h4>
                            <ul className="space-y-2">
                                <li><a href="#blog" className="text-slate-300 hover:text-white transition-colors">Blog</a></li>
                                <li><a href="#help" className="text-slate-300 hover:text-white transition-colors">Centre d'aide</a></li>
                                <li><a href="#api" className="text-slate-300 hover:text-white transition-colors">API</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="mt-12 pt-8 border-t border-slate-800 text-center text-slate-500 text-sm">
                        <p>&copy; 2025 Jëfjëf. Tous droits réservés.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Home;