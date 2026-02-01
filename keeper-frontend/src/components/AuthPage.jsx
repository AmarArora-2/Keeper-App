import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {useAuth} from "../AuthContext.jsx";
import { authAPI } from '../services/api';
import "../CSS/Auth.css";

function AuthPage() {
    const [isToggled, setIsToggled] = useState(false);
    const [loginData, setLoginData] = useState({ email: '', password: '' });
    const [registerData, setRegisterData] = useState({ name: '', email: '', password: '' });

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { login, register, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
    if (isAuthenticated) {
      navigate('/', {replace: true});
    }
    }, [isAuthenticated, navigate]);

    const handleToggle = (e) => {
        e.preventDefault();
        setIsToggled(!isToggled);
        setError('');
    };

    const handleLoginChange = (e) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value });
    };

    const handleRegisterChange = (e) => {
        setRegisterData({ ...registerData, [e.target.name]: e.target.value });
    };

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const result = await login(loginData);
            if (result.success) {
                navigate('/');
            } else {
                setError(result.error);
            }
        } catch (err) {
            setError('Login failed. Please try again.', err);
        } finally {
            setLoading(false);
        }
    };

    const handleRegisterSubmit = async (e) => {

        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const result = await register(registerData);
            if (result.success) {
                navigate('/');
            } else {
                setError(result.error);
            }
        } catch (err) {
            setError('Registration failed. Please try again.', err);
        } finally {
            setLoading(false);
        }
    };
    const handleGoogleLogin = () => {
        authAPI.googleLogin();
    };

    return (
        <div className="auth-page">
            <div className={`auth-wrapper ${isToggled ? 'toggled' : ''}`}>

                {/* Sign In Form */}
                <div className="credentials-panel signin">
                    <form onSubmit={handleLoginSubmit}>
                        <h2 className="slide-element">Sign In</h2>

                        <div className="field-wrapper slide-element">
                            <input
                                type="email"
                                name="email"
                                value={loginData.email}
                                onChange={handleLoginChange}
                                required
                            />
                            <label>Email</label>
                            <i className="bx bxs-envelope"></i>
                        </div>

                        <div className="field-wrapper slide-element">
                            <input
                                type="password"
                                name="password"
                                value={loginData.password}
                                onChange={handleLoginChange}
                                required
                            />
                            <label>Password</label>
                            <i className="bx bxs-lock-alt"></i>
                        </div>

                        {error && !isToggled && (<div className="error-message slide-element">{error}</div>)}
                        
                        <button type="submit" className="submit-button slide-element" disabled={loading}>
                            {loading ? 'Signing In...' : 'Sign In'}
                        </button>

                        <div className="switch-link slide-element">
                            <p>
                                Don't have an account?{' '}
                                <a href="#" onClick={handleToggle} className="register-trigger">
                                    Sign Up
                                </a>
                            </p>
                        </div>

                        <div className="google-signin slide-element">
                            <button type="button" onClick={handleGoogleLogin} className="google-btn">
                                <i className="bx bxl-google"></i> Sign in with Google
                            </button>
                        </div>
                    </form>
                </div>

                {/* Sign Up Form */}
                <div className="credentials-panel signup">
                    <form onSubmit={handleRegisterSubmit}>
                        <h2 className="slide-element">Sign Up</h2>

                        <div className="field-wrapper slide-element">
                            <input
                                type="text"
                                name="name"
                                value={registerData.name}
                                onChange={handleRegisterChange}
                                required
                            />
                            <label>Full Name</label>
                            <i className="bx bxs-user"></i>
                        </div>

                        <div className="field-wrapper slide-element">
                            <input
                                type="email"
                                name="email"
                                value={registerData.email}
                                onChange={handleRegisterChange}
                                required
                            />
                            <label>Email</label>
                            <i className="bx bxs-envelope"></i>
                        </div>

                        <div className="field-wrapper slide-element">
                            <input
                                type="password"
                                name="password"
                                value={registerData.password}
                                onChange={handleRegisterChange}
                                required
                                minLength={6}
                            />
                            <label>Password</label>
                            <i className="bx bxs-lock-alt"></i>
                        </div>

                        {error && isToggled && ( <div className="error-message slide-element">{error}</div>)}
                        <button type="submit" className="submit-button slide-element" disabled={loading}>
                            {loading ? 'Creating Account...' : 'Sign Up'}
                        </button>

                        <div className="switch-link slide-element">
                            <p>
                                Already have an account?{' '}
                                <a href="#" onClick={handleToggle} className="login-trigger">
                                    Sign In
                                </a>
                            </p>
                        </div>

                        <div className="google-signin slide-element">
                            <button type="button" onClick={handleGoogleLogin} className="google-btn">
                                <i className="bx bxl-google"></i> Sign up with Google
                            </button>
                        </div>
                    </form>
                </div>

                {/* Welcome Section - Sign In */}
                <div className="welcome-section signin">
                    <h2 className="slide-element">Welcome Back!</h2>
                    <p className="slide-element">
                        Sign in to access your notes and continue where you left off.
                    </p>
                </div>

                <div className="welcome-section signup">
                    <h2 className="slide-element">Hello, Friend!</h2>
                    <p className="slide-element">
                        Create an account and start organizing your thoughts with our note-taking app.
                    </p>
                </div>

                {/* Background Shapes */}
                <div className="background-shape"></div>
                <div className="secondary-shape"></div>
            </div>

            <div className="footer">
                <p>
                    Designed & Developed by{' '}
                    <a href="https://github.com/AmarArora-2" target="_blank" rel="noopener noreferrer">
                        Amar Arora
                    </a>
                </p>
            </div>
        </div>
    );
}

export default AuthPage;