import React, { useState } from 'react';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';
import { useParkingContext } from '../contexts/ParkingContext';

const AdminPanel: React.FC = () => {
  const { parkingSpots, addSpot, updateSpot, deleteSpot } = useParkingContext();
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newSpot, setNewSpot] = useState({
    id: '',
    type: 'regular' as 'regular' | 'handicapped' | 'electric' | 'compact',
    price: 5.00,
    status: 'available' as 'available' | 'occupied' | 'reserved'
  });

  const handleAddSpot = () => {
    if (newSpot.id.trim()) {
      addSpot(newSpot);
      setNewSpot({ id: '', type: 'regular', price: 5.00, status: 'available' });
      setShowAddForm(false);
    }
  };

  const handleUpdateSpot = (spotId: string, updates: any) => {
    updateSpot(spotId, updates);
    setIsEditing(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Admin Panel</h1>
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add Spot</span>
        </button>
      </div>

      {/* Add Spot Form */}
      {showAddForm && (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Add New Parking Spot
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Spot ID
              </label>
              <input
                type="text"
                value={newSpot.id}
                onChange={(e) => setNewSpot({ ...newSpot, id: e.target.value })}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                placeholder="A-01"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Type
              </label>
              <select
                value={newSpot.type}
                onChange={(e) => setNewSpot({ ...newSpot, type: e.target.value as any })}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="regular">Regular</option>
                <option value="handicapped">Handicapped</option>
                <option value="electric">Electric</option>
                <option value="compact">Compact</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Price ($/hour)
              </label>
              <input
                type="number"
                value={newSpot.price}
                onChange={(e) => setNewSpot({ ...newSpot, price: parseFloat(e.target.value) })}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                step="0.25"
                min="0"
              />
            </div>
            <div className="flex items-end space-x-2">
              <button
                onClick={handleAddSpot}
                className="flex items-center space-x-1 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <Save className="w-4 h-4" />
                <span>Add</span>
              </button>
              <button
                onClick={() => setShowAddForm(false)}
                className="flex items-center space-x-1 px-3 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                <X className="w-4 h-4" />
                <span>Cancel</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Parking Spots Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Parking Spots Management
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Spot ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {parkingSpots.map((spot) => (
                <tr key={spot.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                    {spot.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                    {isEditing === spot.id ? (
                      <select
                        defaultValue={spot.type}
                        onChange={(e) => handleUpdateSpot(spot.id, { type: e.target.value })}
                        className="text-sm border border-gray-300 dark:border-gray-600 rounded px-2 py-1 dark:bg-gray-700 dark:text-white"
                      >
                        <option value="regular">Regular</option>
                        <option value="handicapped">Handicapped</option>
                        <option value="electric">Electric</option>
                        <option value="compact">Compact</option>
                      </select>
                    ) : (
                      <span className="capitalize">{spot.type}</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      spot.status === 'available' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                        : spot.status === 'occupied'
                        ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
                    }`}>
                      {spot.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                    {isEditing === spot.id ? (
                      <input
                        type="number"
                        defaultValue={spot.price}
                        onChange={(e) => handleUpdateSpot(spot.id, { price: parseFloat(e.target.value) })}
                        className="text-sm border border-gray-300 dark:border-gray-600 rounded px-2 py-1 w-20 dark:bg-gray-700 dark:text-white"
                        step="0.25"
                        min="0"
                      />
                    ) : (
                      `$${spot.price.toFixed(2)}/hr`
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center space-x-2">
                      {isEditing === spot.id ? (
                        <button
                          onClick={() => setIsEditing(null)}
                          className="text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300"
                        >
                          <Save className="w-4 h-4" />
                        </button>
                      ) : (
                        <button
                          onClick={() => setIsEditing(spot.id)}
                          className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                      )}
                      <button
                        onClick={() => deleteSpot(spot.id)}
                        className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;