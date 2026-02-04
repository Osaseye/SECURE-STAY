import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    // Mimic API
    setTimeout(() => {
        setLoading(false);
        navigate('/admin/dashboard');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
         <div className="p-8 pb-6 text-center border-b border-gray-100">
             <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-50 text-primary mb-4">
                 <span className="material-icons-outlined text-3xl">shield</span>
             </div>
             <h1 className="text-2xl font-bold text-gray-900">Admin Portal</h1>
             <p className="text-gray-500 mt-1">Sign in to manage SecureStay</p>
         </div>
         
         <div className="p-8">
            <form onSubmit={handleLogin} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <div className="relative">
                        <span className="material-icons-outlined absolute left-3 top-3 text-gray-400 text-lg">email</span>
                        <input 
                            type="email" 
                            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                            placeholder="admin@securestay.com"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                    <div className="relative">
                        <span className="material-icons-outlined absolute left-3 top-3 text-gray-400 text-lg">lock</span>
                        <input 
                            type="password" 
                            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                            placeholder="••••••••"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                        />
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <label className="flex items-center">
                        <input type="checkbox" className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary" />
                        <span className="ml-2 text-sm text-gray-500">Remember me</span>
                    </label>
                    <a href="#" className="text-sm font-medium text-primary hover:text-blue-700">Forgot password?</a>
                </div>

                <button 
                    type="submit" 
                    disabled={loading}
                    className="w-full bg-primary hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg shadow-lg shadow-blue-500/30 transition-all flex items-center justify-center gap-2"
                >
                    {loading ? (
                        <>
                        <span className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></span>
                        <span>Signing in...</span>
                        </>
                    ) : (
                        <>
                        <span className="material-icons-outlined">login</span>
                        <span>Sign In</span>
                        </>
                    )}
                </button>
            </form>
         </div>
         <div className="bg-gray-50 px-8 py-4 text-center border-t border-gray-100">
             <p className="text-xs text-gray-500">Restricted Access. Authorized Personnel Only.</p>
         </div>
      </div>
    </div>
  );
};

export default AdminLogin;
