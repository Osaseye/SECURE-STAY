import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-blue-900 border-t border-blue-800 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
        {/* Brand Column */}
                  <div className="col-span-1 md:col-span-1">
                    <div className="flex items-center gap-2 mb-4">
                       <img src="/icon.png" alt="SecureStay Logo" className="w-8 h-8 object-contain" />
                       <span className="font-bold text-xl text-white">SecureStay</span>
                    </div>
                    <p className="text-blue-200 text-sm leading-relaxed">
                      Detecting fraudulent bookings in real-time. SecureStay ensures that your hotel reservations are genuine and safe.
                    </p>
                  </div>

                  {/* Quick Links */}
          <div>
            <h4 className="font-bold text-white mb-4">Platform</h4>
            <ul className="space-y-2 text-sm text-blue-200">
              <li><a href="#" className="hover:text-white transition">Search Hotels</a></li>
              <li><a href="#" className="hover:text-white transition">How it Works</a></li>
              <li><a href="/admin" className="hover:text-white transition">Admin Portal</a></li>
            </ul>
          </div>

          {/* Tech Stack */}
          <div>
            <h4 className="font-bold text-white mb-4">Technology</h4>
            <ul className="space-y-2 text-sm text-blue-200">
              <li><span className="cursor-default">React Frontend</span></li>
              <li><span className="cursor-default">Firebase Backend</span></li>
              <li><span className="cursor-default">FastAPI Microservice</span></li>
              <li><span className="cursor-default">Scikit-Learn AI</span></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-white mb-4">Project Info</h4>
            <ul className="space-y-2 text-sm text-blue-200">
              <li>Final Year Project</li>
              <li>Software Engineering</li>
              <li><a href="mailto:contact@securestay.local" className="hover:text-white transition">contact@securestay.local</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-blue-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-blue-300">
            © 2026 SecureStay. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
