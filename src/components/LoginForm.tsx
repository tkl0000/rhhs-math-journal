import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';

interface LoginFormProps {
    setToken: (token: string) => void;
}

const apiUrl = import.meta.env.VITE_APP_API_URL

const LoginForm: React.FC<LoginFormProps> = ({ setToken }) => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();

        if (password === '') {
            alert('Please fill in all fields.');
            return;
        }

        console.log('Submitted: ', password)

        try {
            const response = await axios.post(apiUrl + 'login', { email, password });
            // Save the token to localStorage or state
            setToken(response.data.access_token);
            console.log(response.data.access_token)
            localStorage.setItem('token', response.data.access_token);
        } catch (error) {
            console.error('Error during login:', error);
        }
    };

    return (
        <div className="flex justify-center items-center">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm"
            >
                <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">Login</h2>
                <div className="mb-4">
                    <label
                        htmlFor="emailInput"
                        className="block text-sm font-medium text-gray-600 mb-2"
                    >
                        Email:
                    </label>
                    <input
                        type="texet"
                        id="emailInput"
                        value={email}
                        onChange={handleEmailChange}
                        className="w-full px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-500"
                        placeholder="Enter your email"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label
                        htmlFor="passwordInput"
                        className="block text-sm font-medium text-gray-600 mb-2"
                    >
                        Password:
                    </label>
                    <input
                        type="password"
                        id="passwordInput"
                        value={password}
                        onChange={handlePasswordChange}
                        className="w-full px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-500"
                        placeholder="Enter your password"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-slate-500 text-white py-2 rounded-lg hover:bg-slate-600 transition duration-200"
                >
                    Enter
                </button>
            </form>
        </div>
    );
}

export default LoginForm;
