import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
      const isAuth = localStorage.getItem('isAuthenticated') === 'true';
      if (isAuth) {
          navigate('/admin/dashboard');
      }
  }, [navigate]);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Predefined Credentials
    const ADMIN_EMAIL = 'admin@securestay.ng';
    const ADMIN_PASS = 'secure123';

    setTimeout(() => {
        if (email === ADMIN_EMAIL && password === ADMIN_PASS) {
            localStorage.setItem('isAuthenticated', 'true');
            localStorage.setItem('user', JSON.stringify({ name: 'Segun Admin', role: 'admin' }));
            setLoading(false);
            navigate('/admin/dashboard');
        } else {
            setLoading(false);
            setError('Invalid credentials. Please check your email and password.');
        }
    }, 1500);
  };

  return (
    <div className="flex h-screen w-full flex-row overflow-hidden font-sans text-slate-900 bg-white">
      {/* Left Side: High-Security Graphic & Branding */}
      <div className="hidden lg:flex relative w-1/2 flex-col justify-between p-12 bg-primary overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-t from-primary/90 to-primary/40 mix-blend-multiply z-10"></div>
          <div 
            className="h-full w-full bg-cover bg-center" 
            style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDna_JjlQ7taKrJDU3JMVrVyrjhk9A1vcVyOexwX2Ymj8vJt3ivw88dG19sxKmUQd2n4RRvP6AKLErvcNlROhW7TaZVCiZ6jiYm7zEw2-w1S64nBt6SvLf-XlbekIRW2pJLMfjOlbv3PCiQMGcfmi6cyfBgmoJYjvw7f1MDzzgFYHSvaclHROr2JH-LBZ5fFk_5FQAZzDpqqPTISyXRkWGpv4Ov0y9VHW73iat6rq8IIeilwy7C3WKLKbZXXzqM9IDb9jcMWUMaNT-8")' }} 
          />
        </div>

        {/* Logo */}
        <div className="relative z-20 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/20 backdrop-blur-sm p-1.5">
            <img src="/icon.png" alt="SecureStay" className="w-full h-full object-contain brightness-0 invert" />
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">SecureStay</h2>
        </div>

        {/* Content */}
        <div className="relative z-20 max-w-lg">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 backdrop-blur-sm">
            <span className="material-icons-outlined text-green-400 text-sm">check_circle</span>
            <span className="text-xs font-medium text-white uppercase tracking-wider">System Operational</span>
          </div>
          <h1 className="text-4xl font-extrabold leading-tight text-white mb-4">
            Advanced AI-Powered Fraud Detection
          </h1>
          <p className="text-lg text-blue-100 leading-relaxed opacity-90">
            Protecting Nigeria's hospitality industry with real-time biometric verification and secure transaction monitoring.
          </p>
        </div>

        {/* Footer on Image */}
        <div className="relative z-20 flex justify-between text-blue-200 text-sm font-medium">
          <p>© {new Date().getFullYear()} SecureStay Inc.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>

      {/* Right Side: Login Form */}
      <div className="flex w-full lg:w-1/2 flex-col items-center justify-center bg-white p-6 sm:p-12 relative">
        {/* Mobile Header Logo (Visible only on small screens) */}
        <div className="lg:hidden absolute top-6 left-6 flex items-center gap-2 mb-8">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
             <img src="/icon.png" alt="Logo" className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">SecureStay</h2>
        </div>

        <div className="w-full max-w-[440px] flex flex-col gap-6">
          {/* Card Header */}
          <div className="flex flex-col gap-2 mb-2">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">Admin Portal</h1>
            <p className="text-slate-500 text-base">
              Secure entry point. Please enter your credentials.
            </p>
          </div>

          {/* Alert/Status */}
          {error ? (
              <div className="flex items-center gap-3 rounded-lg bg-red-50 p-3 border border-red-100 animate-pulse">
                <span className="material-icons-outlined text-red-600 text-[20px]">error</span>
                <p className="text-sm text-red-600 font-medium">{error}</p>
              </div>
          ) : (
              <div className="flex items-center gap-3 rounded-lg bg-blue-50 p-3 border border-blue-100">
                <span className="material-icons-outlined text-primary text-[20px]">lock</span>
                <p className="text-sm text-primary font-medium">Connection is end-to-end encrypted</p>
              </div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin} className="flex flex-col gap-5">
            {/* Admin ID / Email */}
            <div className="flex flex-col gap-2">
              <label className="text-slate-900 text-sm font-semibold" htmlFor="admin-id">Admin ID / Email</label>
              <div className="relative">
                <input 
                  className="flex w-full min-w-0 resize-none overflow-hidden rounded-lg text-slate-900 focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-slate-200 bg-white focus:border-primary h-12 placeholder:text-slate-400 pl-4 pr-4 text-base font-normal leading-normal transition-all" 
                  id="admin-id" 
                  placeholder="admin@securestay.ng" 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <label className="text-slate-900 text-sm font-semibold" htmlFor="password">Password</label>
              </div>
              <div className="relative flex w-full items-center">
                <input 
                  className="flex w-full min-w-0 resize-none overflow-hidden rounded-lg text-slate-900 focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-slate-200 bg-white focus:border-primary h-12 placeholder:text-slate-400 pl-4 pr-12 text-base font-normal leading-normal transition-all" 
                  id="password" 
                  placeholder="••••••••••••" 
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-0 top-0 bottom-0 px-3 flex items-center justify-center text-slate-400 hover:text-slate-900 transition-colors"
                >
                  <span className="material-icons-outlined text-[20px]">
                    {showPassword ? 'visibility' : 'visibility_off'}
                  </span>
                </button>
              </div>
            </div>

            {/* Options */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-3 cursor-pointer group">
                <div className="relative flex items-center">
                  <input type="checkbox" className="peer h-5 w-5 cursor-pointer appearance-none rounded border border-slate-200 bg-white checked:border-primary checked:bg-primary transition-all focus:ring-0 focus:ring-offset-0"/>
                  <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 peer-checked:opacity-100 pointer-events-none">
                    <span className="material-icons-outlined text-[16px]">check</span>
                  </span>
                </div>
                <span className="text-sm font-medium text-slate-500 group-hover:text-slate-900 transition-colors">Stay logged in</span>
              </label>
              <a className="text-sm font-bold text-primary hover:text-blue-700 transition-colors" href="#">Forgot Password?</a>
            </div>

            {/* Submit Button */}
            <button 
                type="submit" 
                disabled={loading}
                className="mt-2 flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-4 bg-primary hover:bg-blue-700 text-white text-base font-bold leading-normal tracking-[0.015em] transition-all shadow-lg shadow-blue-500/30 disabled:opacity-70 disabled:cursor-not-allowed"
            >
                {loading ? (
                    <span className="flex items-center gap-2">
                        <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
                        Authenticating...
                    </span>
                ) : (
                    <>
                        <span className="truncate">Secure Sign In</span>
                        <span className="material-icons-outlined ml-2 text-[18px]">arrow_forward</span>
                    </>
                )}
            </button>
          </form>

          {/* Footer Support */}
          <div className="mt-8 pt-6 border-t border-slate-100 text-center">
            <p className="text-sm text-slate-500">
              Having trouble accessing the portal?{' '} 
              <a className="font-bold text-slate-900 hover:underline" href="#">Contact Support</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
