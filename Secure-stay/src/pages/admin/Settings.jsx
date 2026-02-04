import React, { useState } from 'react';

const Settings = () => {
    const [activeTab, setActiveTab] = useState('general');
    const [fraudSensitivity, setFraudSensitivity] = useState(80);
    const [autoReject, setAutoReject] = useState(false);
    
    // Mock user data
    const [user, setUser] = useState({
        name: 'Admin User',
        email: 'admin@securestay.com',
        role: 'Super Admin'
    });

    const tabs = [
        { id: 'general', label: 'General', icon: 'person' },
        { id: 'security', label: 'Fraud & Security', icon: 'security' },
        { id: 'notifications', label: 'Notifications', icon: 'notifications' }
    ];

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
                <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-opacity-90 transition-colors shadow-sm">
                    Save Changes
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col md:flex-row min-h-[500px]">
                {/* Sidebar Tabs */}
                <div className="w-full md:w-64 bg-gray-50 border-r border-gray-100 p-4">
                    <nav className="space-y-1">
                        {tabs.map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                                    activeTab === tab.id 
                                    ? 'bg-white text-primary shadow-sm ring-1 ring-gray-200' 
                                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                                }`}
                            >
                                <span className="material-icons-outlined text-[20px]">{tab.icon}</span>
                                {tab.label}
                            </button>
                        ))}
                    </nav>
                </div>

                {/* Content Area */}
                <div className="flex-1 p-8">
                    {/* General Settings */}
                    {activeTab === 'general' && (
                        <div className="space-y-6 animate-fade-in">
                            <div>
                                <h3 className="text-lg font-medium text-gray-900">Profile Information</h3>
                                <p className="text-sm text-gray-500">Update your account details and profile.</p>
                            </div>
                            
                            <div className="flex items-center gap-6 pb-6 border-b border-gray-100">
                                <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center text-gray-400 text-2xl">
                                    {user.name.charAt(0)}
                                </div>
                                <div>
                                    <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 shadow-sm">
                                        Change Avatar
                                    </button>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                    <input 
                                        type="text" 
                                        value={user.name}
                                        onChange={(e) => setUser({...user, name: e.target.value})}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" 
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                    <input 
                                        type="email" 
                                        value={user.email}
                                        onChange={(e) => setUser({...user, email: e.target.value})}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" 
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                                    <input 
                                        type="text" 
                                        value={user.role}
                                        disabled
                                        className="w-full px-3 py-2 border border-gray-200 bg-gray-50 rounded-lg text-gray-500" 
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Security Settings */}
                    {activeTab === 'security' && (
                        <div className="space-y-8 animate-fade-in">
                            <div>
                                <h3 className="text-lg font-medium text-gray-900">Fraud Detection Rules</h3>
                                <p className="text-sm text-gray-500">Configure how the system handles suspicious bookings.</p>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <div className="flex justify-between items-center mb-2">
                                        <label className="text-sm font-medium text-gray-700">Fraud Score Threshold ({fraudSensitivity})</label>
                                        <span className="text-xs text-gray-500">Bookings above this score are flagged as Critical</span>
                                    </div>
                                    <input 
                                        type="range" 
                                        min="0" 
                                        max="100" 
                                        value={fraudSensitivity}
                                        onChange={(e) => setFraudSensitivity(e.target.value)}
                                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary" 
                                    />
                                </div>

                                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                                    <div>
                                        <h4 className="text-sm font-medium text-gray-900">Auto-Reject High Risk</h4>
                                        <p className="text-xs text-gray-500 mt-1">Automatically reject bookings with a score of 90+</p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input 
                                            type="checkbox" 
                                            className="sr-only peer" 
                                            checked={autoReject}
                                            onChange={() => setAutoReject(!autoReject)}
                                        />
                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                                    </label>
                                </div>

                                <div className="pt-6 border-t border-gray-100">
                                    <h4 className="text-sm font-medium text-gray-900 mb-4">Password & Authentication</h4>
                                    <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 shadow-sm w-full md:w-auto">
                                        Change Password
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Notifications Settings */}
                    {activeTab === 'notifications' && (
                        <div className="space-y-6 animate-fade-in">
                            <div>
                                <h3 className="text-lg font-medium text-gray-900">Notification Preferences</h3>
                                <p className="text-sm text-gray-500">Manage how and when you receive alerts.</p>
                            </div>

                            <div className="space-y-4">
                                {['New Booking Alerts', 'Fraud Detection Alerts', 'System Updates'].map((item, idx) => (
                                    <div key={idx} className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">{item}</p>
                                            <p className="text-xs text-gray-500">Receive emails for {item.toLowerCase()}</p>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input type="checkbox" className="sr-only peer" defaultChecked={idx < 2} />
                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Settings;
