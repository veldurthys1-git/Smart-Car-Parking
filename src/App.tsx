import React, { useState } from 'react';
import { Car, Settings, BarChart3, Users, MapPin, Bell, Sun, Moon } from 'lucide-react';
import Header from './components/Header';
import ParkingMap from './components/ParkingMap';
import Dashboard from './components/Dashboard';
import AdminPanel from './components/AdminPanel';
import UserProfile from './components/UserProfile';
import { ParkingProvider } from './contexts/ParkingContext';
import { ThemeProvider } from './contexts/ThemeContext';

function App() {
  const [activeTab, setActiveTab] = useState('parking');

  const renderContent = () => {
    switch (activeTab) {
      case 'parking':
        return <ParkingMap />;
      case 'dashboard':
        return <Dashboard />;
      case 'admin':
        return <AdminPanel />;
      case 'profile':
        return <UserProfile />;
      default:
        return <ParkingMap />;
    }
  };

  return (
    <ThemeProvider>
      <ParkingProvider>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
          <Header />
          
          <nav className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex space-x-8">
                <button
                  onClick={() => setActiveTab('parking')}
                  className={`flex items-center px-3 py-4 text-sm font-medium transition-colors duration-200 ${
                    activeTab === 'parking'
                      ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                  }`}
                >
                  <MapPin className="w-4 h-4 mr-2" />
                  Parking Map
                </button>
                
                <button
                  onClick={() => setActiveTab('dashboard')}
                  className={`flex items-center px-3 py-4 text-sm font-medium transition-colors duration-200 ${
                    activeTab === 'dashboard'
                      ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                  }`}
                >
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Dashboard
                </button>
                
                <button
                  onClick={() => setActiveTab('admin')}
                  className={`flex items-center px-3 py-4 text-sm font-medium transition-colors duration-200 ${
                    activeTab === 'admin'
                      ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                  }`}
                >
                  <Settings className="w-4 h-4 mr-2" />
                  Admin
                </button>
                
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`flex items-center px-3 py-4 text-sm font-medium transition-colors duration-200 ${
                    activeTab === 'profile'
                      ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                  }`}
                >
                  <Users className="w-4 h-4 mr-2" />
                  Profile
                </button>
              </div>
            </div>
          </nav>

          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {renderContent()}
          </main>
        </div>
      </ParkingProvider>
    </ThemeProvider>
  );
}

export default App;