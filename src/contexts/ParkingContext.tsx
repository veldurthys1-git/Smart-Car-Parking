import React, { createContext, useContext, useState, useEffect } from 'react';

interface ParkingSpot {
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
}

interface Reservation {
  id: string;
  spotId: string;
  duration: number;
  amount: number;
  status: 'active' | 'completed' | 'cancelled';
  startTime: string;
  endTime: string;
}

interface ParkingContextType {
  parkingSpots: ParkingSpot[];
  reservations: Reservation[];
  updateSpotStatus: (spotId: string, status: ParkingSpot['status']) => void;
  reserveSpot: (spotId: string, duration: number) => void;
  addSpot: (spot: Omit<ParkingSpot, 'sensorData'>) => void;
  updateSpot: (spotId: string, updates: Partial<ParkingSpot>) => void;
  deleteSpot: (spotId: string) => void;
}

const ParkingContext = createContext<ParkingContextType | undefined>(undefined);

export const useParkingContext = () => {
  const context = useContext(ParkingContext);
  if (!context) {
    throw new Error('useParkingContext must be used within a ParkingProvider');
  }
  return context;
};

export const ParkingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [parkingSpots, setParkingSpots] = useState<ParkingSpot[]>([]);
  const [reservations, setReservations] = useState<Reservation[]>([]);

  // Initialize parking spots
  useEffect(() => {
    const initialSpots: ParkingSpot[] = Array.from({ length: 24 }, (_, i) => {
      const spotNumber = String(i + 1).padStart(2, '0');
      const statuses: ParkingSpot['status'][] = ['available', 'occupied', 'reserved'];
      const types: ParkingSpot['type'][] = ['regular', 'handicapped', 'electric', 'compact'];
      
      return {
        id: `A-${spotNumber}`,
        status: statuses[Math.floor(Math.random() * statuses.length)],
        type: i % 8 === 0 ? 'handicapped' : i % 6 === 0 ? 'electric' : i % 4 === 0 ? 'compact' : 'regular',
        price: types[i % types.length] === 'electric' ? 6.00 : types[i % types.length] === 'compact' ? 4.50 : 5.00,
        timeRemaining: Math.random() > 0.5 ? Math.floor(Math.random() * 120) + 30 : undefined,
        sensorData: {
          temperature: Math.floor(Math.random() * 10) + 20,
          humidity: Math.floor(Math.random() * 30) + 50,
          lastUpdate: new Date().toISOString()
        }
      };
    });
    setParkingSpots(initialSpots);

    // Initialize some sample reservations
    const sampleReservations: Reservation[] = [
      {
        id: 'res-001',
        spotId: 'A-05',
        duration: 2,
        amount: 10.00,
        status: 'active',
        startTime: '2024-01-15 14:30',
        endTime: '2024-01-15 16:30'
      },
      {
        id: 'res-002',
        spotId: 'A-12',
        duration: 1,
        amount: 5.00,
        status: 'completed',
        startTime: '2024-01-15 12:00',
        endTime: '2024-01-15 13:00'
      },
      {
        id: 'res-003',
        spotId: 'A-18',
        duration: 3,
        amount: 15.00,
        status: 'active',
        startTime: '2024-01-15 15:00',
        endTime: '2024-01-15 18:00'
      }
    ];
    setReservations(sampleReservations);
  }, []);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setParkingSpots(prev => prev.map(spot => {
        // Randomly update sensor data
        if (Math.random() > 0.8) {
          return {
            ...spot,
            sensorData: {
              temperature: Math.floor(Math.random() * 10) + 20,
              humidity: Math.floor(Math.random() * 30) + 50,
              lastUpdate: new Date().toISOString()
            }
          };
        }
        return spot;
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const updateSpotStatus = (spotId: string, status: ParkingSpot['status']) => {
    setParkingSpots(prev => prev.map(spot => 
      spot.id === spotId ? { ...spot, status } : spot
    ));
  };

  const reserveSpot = (spotId: string, duration: number) => {
    const spot = parkingSpots.find(s => s.id === spotId);
    if (!spot) return;

    const newReservation: Reservation = {
      id: `res-${Date.now()}`,
      spotId,
      duration,
      amount: spot.price * duration,
      status: 'active',
      startTime: new Date().toLocaleString(),
      endTime: new Date(Date.now() + duration * 60 * 60 * 1000).toLocaleString()
    };

    setReservations(prev => [...prev, newReservation]);
    updateSpotStatus(spotId, 'reserved');
  };

  const addSpot = (newSpot: Omit<ParkingSpot, 'sensorData'>) => {
    const spot: ParkingSpot = {
      ...newSpot,
      sensorData: {
        temperature: Math.floor(Math.random() * 10) + 20,
        humidity: Math.floor(Math.random() * 30) + 50,
        lastUpdate: new Date().toISOString()
      }
    };
    setParkingSpots(prev => [...prev, spot]);
  };

  const updateSpot = (spotId: string, updates: Partial<ParkingSpot>) => {
    setParkingSpots(prev => prev.map(spot => 
      spot.id === spotId ? { ...spot, ...updates } : spot
    ));
  };

  const deleteSpot = (spotId: string) => {
    setParkingSpots(prev => prev.filter(spot => spot.id !== spotId));
  };

  return (
    <ParkingContext.Provider value={{
      parkingSpots,
      reservations,
      updateSpotStatus,
      reserveSpot,
      addSpot,
      updateSpot,
      deleteSpot
    }}>
      {children}
    </ParkingContext.Provider>
  );
};