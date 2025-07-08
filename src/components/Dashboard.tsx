import React from 'react';
import { BarChart3, TrendingUp, Clock, DollarSign, Car, Users } from 'lucide-react';
import { useParkingContext } from '../contexts/ParkingContext';

const Dashboard: React.FC = () => {
  const { parkingSpots, reservations } = useParkingContext();

  const stats = {
    totalRevenue: 2847.50,
    todayRevenue: 425.75,
    averageOccupancy: 68,
    totalReservations: reservations.length,
    activeReservations: reservations.filter(r => r.status === 'active').length,
    peakHours: '2:00 PM - 6:00 PM'
  };

  const chartData = [
    { time: '00:00', occupancy: 15 },
    { time: '04:00', occupancy: 8 },
    { time: '08:00', occupancy: 45 },
    { time: '12:00', occupancy: 78 },
    { time: '16:00', occupancy: 92 },
    { time: '20:00', occupancy: 65 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span>Live Data from Blynk</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                ${stats.totalRevenue.toFixed(2)}
              </p>
              <p className="text-sm text-green-600 dark:text-green-400">+12.5% from last month</p>
            </div>
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Today's Revenue</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                ${stats.todayRevenue.toFixed(2)}
              </p>
              <p className="text-sm text-blue-600 dark:text-blue-400">+5.2% from yesterday</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Avg. Occupancy</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {stats.averageOccupancy}%
              </p>
              <p className="text-sm text-yellow-600 dark:text-yellow-400">Peak: {stats.peakHours}</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Active Reservations</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {stats.activeReservations}
              </p>
              <p className="text-sm text-purple-600 dark:text-purple-400">
                Total: {stats.totalReservations}
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Occupancy Trends
          </h3>
          <div className="space-y-3">
            {chartData.map((item, index) => (
              <div key={index} className="flex items-center space-x-3">
                <span className="text-sm text-gray-600 dark:text-gray-400 w-12">
                  {item.time}
                </span>
                <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${item.occupancy}%` }}
                  ></div>
                </div>
                <span className="text-sm font-medium text-gray-900 dark:text-white w-8">
                  {item.occupancy}%
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Recent Reservations
          </h3>
          <div className="space-y-3">
            {reservations.slice(0, 5).map((reservation) => (
              <div key={reservation.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
                    <Car className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      Spot {reservation.spotId}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      {reservation.duration}h • ${reservation.amount}
                    </p>
                  </div>
                </div>
                <div className={`px-2 py-1 rounded text-xs font-medium ${
                  reservation.status === 'active' 
                    ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                    : 'bg-gray-100 text-gray-800 dark:bg-gray-600 dark:text-gray-300'
                }`}>
                  {reservation.status}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sensor Data */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Real-time Sensor Data
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-blue-900 dark:text-blue-100">
                Temperature
              </span>
              <span className="text-2xl font-bold text-blue-900 dark:text-blue-100">
                24°C
              </span>
            </div>
          </div>
          <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-green-900 dark:text-green-100">
                Humidity
              </span>
              <span className="text-2xl font-bold text-green-900 dark:text-green-100">
                65%
              </span>
            </div>
          </div>
          <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-purple-900 dark:text-purple-100">
                Light Level
              </span>
              <span className="text-2xl font-bold text-purple-900 dark:text-purple-100">
                450 lux
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;