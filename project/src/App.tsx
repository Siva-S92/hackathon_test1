import { useEffect, useState } from 'react';
import { Settings, Bell, X, Droplet, Sun, Gauge, Power } from 'lucide-react';
import StatusCard from './components/StatusCard';
import DeviceCard from './components/DeviceCard';
import ProductCard from './components/ProductCard';
import { axiosInstance } from './lib/axios';


function App() {
  const [moistureLevel, setMoistureLevel] = useState(75);
  const [sunlightLevel, setSunlightLevel] = useState(40);
  const [fertilizerLevel, setFertilizerLevel] = useState(70);
  const [isDeviceOn, setIsDeviceOn] = useState(false);

  const checkDeviceRunningStatus = async() => {
    let data = {productID: "61630893-6873-456c-bc38-b9d7eb7bcedb"}
    try {
      const response = await axiosInstance.post(`/api/check-running`, data)
      console.log(response.data)
      if(parseInt(response.data.runningDevicesCount) > 0){
        setIsDeviceOn(true)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    checkDeviceRunningStatus()
  }, [])

  const adjustValue = (value: number, delta: number): number => {
    const newValue = value + delta;
    return Math.min(Math.max(newValue, 0), 100);
  };

  // Update fertilizer level when sunlight changes
  const handleSunlightChange = (delta: number) => {
    const newSunlight = adjustValue(sunlightLevel, delta);
    setSunlightLevel(newSunlight);
    
    // Inverse relationship: as sunlight increases, fertilizer decreases
    const fertilizerDelta = -delta * 0.5; // 50% inverse relationship
    setFertilizerLevel(prev => adjustValue(prev, fertilizerDelta));
  };

  return (
    <div className="min-h-screen bg-pink-400">
      {/* Header */}
      <header className="bg-violet-400 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-2">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold text-gray-900">SMART FERTILIZER DISPENSER DASHBOARD</h1>
            <div className="flex items-center gap-4">
              <button className="p-2">
                <Settings className="w-5 h-5" />
              </button>
              <button className="p-2">
                <Bell className="w-5 h-5" />
              </button>
              <button className="p-2">
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatusCard
            title="Soil Moisture Status"
            value={moistureLevel}
            label="Moisture"
            icon={<Droplet className="w-5 h-5" />}
            canAdjust={true}
            onIncrease={() => setMoistureLevel(prev => adjustValue(prev, 5))}
            onDecrease={() => setMoistureLevel(prev => adjustValue(prev, -5))}
          />
          <StatusCard
            title="Sunlight Level Status"
            value={sunlightLevel}
            label="Sunlight"
            icon={<Sun className="w-5 h-5" />}
            canAdjust={true}
            onIncrease={() => handleSunlightChange(5)}
            onDecrease={() => handleSunlightChange(-5)}
          />
          <StatusCard
            title="Fertilizer Level"
            value={fertilizerLevel}
            label="Fertilizer"
            icon={<Gauge className="w-5 h-5" />}
            canAdjust={true}
            onIncrease={() => setFertilizerLevel(prev => adjustValue(prev, 5))}
            onDecrease={() => setFertilizerLevel(prev => adjustValue(prev, -5))}
          />
          <StatusCard
            title="Dispenser Status"
            value={isDeviceOn ? "Running" : "Stopped"}
            label="Dispenser"
            icon={<Power className="w-5 h-5" />}
            type="status"
          />
        </div>

        <div className="mt-6">
          <DeviceCard 
            isOn={isDeviceOn} 
            onToggle={() => setIsDeviceOn(!isDeviceOn)} 
          />
        </div>

          {/* productcard */}

        <div className='mt-6'>
            <ProductCard />
        </div>

      </main>
    </div>
  );
}

export default App;