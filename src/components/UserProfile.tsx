import React from 'react';
import { User, Car, CreditCard, Bell, MapPin, Clock } from 'lucide-react';
import { useParkingContext } from '../contexts/ParkingContext';

const UserProfile: React.FC = () => {
  const { reservations } = useParkingContext();

  const userStats = {
    totalBookings: reservations.length,
    totalSpent: reservations.reduce((sum, res) => sum + res.amount, 0),
    averageSession: '2.5 hours',
    memberSince: 'January 2024'
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">User Profile</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Info */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white text-xl font-bold">SV</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Saicharan Veldurthy</h3>
                <p className="text-gray-600 dark:text-gray-400">veldurthysaicharan5@gmail.com</p>
                <p className="text-sm text-gray-500 dark:text-gray-500">Member since {userStats.memberSince}</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Car className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Vehicle</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Toyota Camry - ABC-1234</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <CreditCard className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Payment Method</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">•••• •••• •••• 1234</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Bell className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Notifications</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Email & SMS enabled</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats and Activity */}
        <div className="lg:col-span-2 space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Total Bookings</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{userStats.totalBookings}</p>
                </div>
                <MapPin className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Total Spent</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">${userStats.totalSpent.toFixed(2)}</p>
                </div>
                <CreditCard className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Avg. Session</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{userStats.averageSession}</p>
                </div>
                <Clock className="w-8 h-8 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Active</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {reservations.filter(r => r.status === 'active').length}
                  </p>
                </div>
                <Car className="w-8 h-8 text-orange-600 dark:text-orange-400" />
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Activity</h3>
            <div className="space-y-4">
              {reservations.slice(0, 5).map((reservation) => (
                <div key={reservation.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      reservation.status === 'active' ? 'bg-green-100 dark:bg-green-900/20' : 'bg-gray-100 dark:bg-gray-600'
                    }`}>
                      <MapPin className={`w-5 h-5 ${
                        reservation.status === 'active' ? 'text-green-600 dark:text-green-400' : 'text-gray-600 dark:text-gray-400'
                      }`} />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        Spot {reservation.spotId}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {reservation.duration} hours • {reservation.startTime}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900 dark:text-white">${reservation.amount.toFixed(2)}</p>
                    <p className={`text-sm ${
                      reservation.status === 'active' ? 'text-green-600 dark:text-green-400' : 'text-gray-600 dark:text-gray-400'
                    }`}>
                      {reservation.status}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;