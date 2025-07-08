import React from 'react';
import { Car, Clock, MapPin } from 'lucide-react';

interface ParkingSpotProps {
  spot: {
    id: string;
    status: 'available' | 'occupied' | 'reserved';
    type: 'regular' | 'handicapped' | 'electric' | 'compact';
    price: number;
    timeRemaining?: number;
    sensorData?: {
      temperature: number;
      humidity: number;
      lastUpdate: string;
    };
  };
  onClick: () => void;
}

const ParkingSpot: React.FC<ParkingSpotProps> = ({ spot, onClick }) => {
  const getStatusColor = () => {
    switch (spot.status) {
      case 'available':
        return 'bg-green-100 border-green-300 hover:bg-green-200 dark:bg-green-900/20 dark:border-green-700';
      case 'occupied':
        return 'bg-red-100 border-red-300 dark:bg-red-900/20 dark:border-red-700';
      case 'reserved':
        return 'bg-yellow-100 border-yellow-300 dark:bg-yellow-900/20 dark:border-yellow-700';
      default:
        return 'bg-gray-100 border-gray-300 dark:bg-gray-700 dark:border-gray-600';
    }
  };

  const getStatusIcon = () => {
    switch (spot.status) {
      case 'available':
        return <MapPin className="w-4 h-4 text-green-600 dark:text-green-400" />;
      case 'occupied':
        return <Car className="w-4 h-4 text-red-600 dark:text-red-400" />;
      case 'reserved':
        return <Clock className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />;
      default:
        return <MapPin className="w-4 h-4 text-gray-600 dark:text-gray-400" />;
    }
  };

  const getTypeIcon = () => {
    switch (spot.type) {
      case 'handicapped':
        return '♿';
      case 'electric':
        return '⚡';
      case 'compact':
        return '📦';
      default:
        return '🚗';
    }
  };

  return (
    <div
      onClick={onClick}
      className={`p-4 rounded-lg border-2 transition-all duration-200 cursor-pointer ${
        spot.status === 'available' ? 'hover:scale-105 hover:shadow-md' : 'cursor-not-allowed'
      } ${getStatusColor()}`}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2">
          <span className="text-lg">{getTypeIcon()}</span>
          <span className="text-sm font-medium text-gray-900 dark:text-white">
            {spot.id}
          </span>
        </div>
        {getStatusIcon()}
      </div>
      
      <div className="space-y-1">
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-600 dark:text-gray-400">Status</span>
          <span className={`text-xs font-medium capitalize ${
            spot.status === 'available' ? 'text-green-600 dark:text-green-400' :
            spot.status === 'occupied' ? 'text-red-600 dark:text-red-400' :
            'text-yellow-600 dark:text-yellow-400'
          }`}>
            {spot.status}
          </span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-600 dark:text-gray-400">Price</span>
          <span className="text-xs font-medium text-gray-900 dark:text-white">
            ${spot.price}/hr
          </span>
        </div>
        
        {spot.timeRemaining && (
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-600 dark:text-gray-400">Time Left</span>
            <span className="text-xs font-medium text-gray-900 dark:text-white">
              {spot.timeRemaining}m
            </span>
          </div>
        )}
      </div>
      
      {spot.sensorData && (
        <div className="mt-2 pt-2 border-t border-gray-200 dark:border-gray-600">
          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
            <span>Temp: {spot.sensorData.temperature}°C</span>
            <span>Humidity: {spot.sensorData.humidity}%</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ParkingSpot;