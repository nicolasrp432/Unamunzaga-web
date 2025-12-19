import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Mail, Lock, AlertCircle } from 'lucide-react';
import './Auth.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { signIn, loginAsGuest } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await signIn(email, password);
            navigate('/dashboard');
        } catch (err) {
            setError('Error al iniciar sesión. Comprueba tus credenciales.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleGuestLogin = async () => {
        setLoading(true);
        try {
            await loginAsGuest();
            navigate('/dashboard');
        } catch (err) {
            setError('Error al iniciar como invitado.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="page auth-page">
            <div className="auth-container">
                <div className="auth-card">
                    <h2>Panel de Administración</h2>
                    <p className="auth-subtitle">Accede para gestionar el sitio web</p>

                    {error && (
                        <div className="auth-error">
                            <AlertCircle size={18} />
                            <span>{error}</span>
                        </div>
                    )}

                    <div className="mb-6">
                        <button 
                            type="button" 
                            onClick={handleGuestLogin}
                            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-4 flex items-center justify-center gap-2 transition-colors"
                            disabled={loading}
                        >
                            <Lock size={18} />
                            Acceso Demo (Invitado)
                        </button>
                        <div className="relative flex py-2 items-center">
                            <div className="flex-grow border-t border-gray-300"></div>
                            <span className="flex-shrink-0 mx-4 text-gray-400 text-sm">O inicia sesión</span>
                            <div className="flex-grow border-t border-gray-300"></div>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <div className="input-icon-wrapper">
                                <Mail size={18} className="input-icon" />
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    placeholder="tu@email.com"
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Contraseña</label>
                            <div className="input-icon-wrapper">
                                <Lock size={18} className="input-icon" />
                                <input
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
                            {loading ? 'Cargando...' : 'Entrar'}
                        </button>
                    </form>

                    <div className="auth-footer">
                        <p>¿No tienes cuenta? <Link to="/register">Regístrate</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
