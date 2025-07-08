import React, { useEffect, useState } from 'react';
import { Car, Clock, MapPin, CreditCard } from 'lucide-react';
import { useParkingContext } from '../contexts/ParkingContext';
import ParkingSpot from './ParkingSpot';
import ReservationModal from './ReservationModal';

const ParkingMap: React.FC = () => {
  const { parkingSpots, updateSpotStatus, reserveSpot } = useParkingContext();
  const [selectedSpot, setSelectedSpot] = useState<any>(null);
  const [showReservationModal, setShowReservationModal] = useState(false);

  const handleSpotClick = (spot: any) => {
    if (spot.status === 'available') {
      setSelectedSpot(spot);
      setShowReservationModal(true);
    }
  };

  const handleReservation = (spotId: string, duration: number) => {
    reserveSpot(spotId, duration);
    setShowReservationModal(false);
    setSelectedSpot(null);
  };

  const availableSpots = parkingSpots.filter(spot => spot.status === 'available').length;
  const occupiedSpots = parkingSpots.filter(spot => spot.status === 'occupied').length;
  const reservedSpots = parkingSpots.filter(spot => spot.status === 'reserved').length;

  return (
    <div className="space-y-6">
      {/* Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm font-medium">Available</p>
              <p className="text-3xl font-bold">{availableSpots}</p>
            </div>
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
              <Car className="w-6 h-6" />
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-red-100 text-sm font-medium">Occupied</p>
              <p className="text-3xl font-bold">{occupiedSpots}</p>
            </div>
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
              <Car className="w-6 h-6" />
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-yellow-100 text-sm font-medium">Reserved</p>
              <p className="text-3xl font-bold">{reservedSpots}</p>
            </div>
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6" />
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm font-medium">Total Spots</p>
              <p className="text-3xl font-bold">{parkingSpots.length}</p>
            </div>
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
              <MapPin className="w-6 h-6" />
            </div>
          </div>
        </div>
      </div>

      {/* Parking Lot Map */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Parking Lot A - Level 1
          </h2>
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-green-500 rounded"></div>
              <span className="text-gray-600 dark:text-gray-400">Available</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-red-500 rounded"></div>
              <span className="text-gray-600 dark:text-gray-400">Occupied</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-yellow-500 rounded"></div>
              <span className="text-gray-600 dark:text-gray-400">Reserved</span>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {parkingSpots.map((spot) => (
            <ParkingSpot
              key={spot.id}
              spot={spot}
              onClick={() => handleSpotClick(spot)}
            />
          ))}
        </div>
      </div>

      {/* Reservation Modal */}
      {showReservationModal && selectedSpot && (
        <ReservationModal
          spot={selectedSpot}
          onClose={() => setShowReservationModal(false)}
          onReserve={handleReservation}
        />
      )}
    </div>
  );
};

export default ParkingMap;