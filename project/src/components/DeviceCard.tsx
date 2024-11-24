// import React from "react";
import { message } from "antd";
import { Power } from "lucide-react";
import { axiosInstance } from "../lib/axios";

interface DeviceCardProps {
  isOn: boolean;
  onToggle: () => void;
}

const actionDeviceID = {
  devices: [
    { deviceID: "47d32e23-65d5-470a-af4e-2a2ea211e06b", action: "start" },
  ],
};
const stopDeviceID = {
  devices: [
    { deviceID: "47d32e23-65d5-470a-af4e-2a2ea211e06b", action: "stop" },
  ],
};
// to Device Start
const makeDeviseStart = async () => {
  try {
    const response = await axiosInstance.post(
      `/api/start-device`, actionDeviceID
    );
    message.success(`${response.data.message},action: ${response.data.updatedDevices[0].action}`)
  } catch (error) {
    console.log(error)
  }
};

// to Device Stop
const makeDeviseStop = async () => {
  try {
    const response = await axiosInstance.post(
      `/api/stop-device`, stopDeviceID
    );
    message.success(`${response.data.message},action: ${response.data.updatedDevices[0].action}`)
  } catch (error) {
    console.log(error)
  }
};

export default function DeviceCard({ isOn, onToggle }: DeviceCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl text-pink-700 font-bold">Device Control</h3>
        <Power
          className={`w-5 h-5 ${isOn ? "text-green-500" : "text-gray-400"}`}
        />
      </div>

      <div className="flex gap-4 justify-center">
        <button
          onClick={() => {
            !isOn && onToggle()
            makeDeviseStart()
          }}
          className={`px-6 py-2 rounded-lg font-medium transition-colors
            ${
              isOn
                ? "bg-green-100 text-green-700 cursor-default"
                : "bg-gray-100 text-gray-600 hover:bg-green-50 hover:text-green-600"
            }`}
        >
          ON
        </button>
        <button
          onClick={() => {
            isOn && onToggle()
            makeDeviseStop()
          }}
          className={`px-6 py-2 rounded-lg font-medium transition-colors
            ${
              !isOn
                ? "bg-red-100 text-red-700 cursor-default"
                : "bg-gray-100 text-gray-600 hover:bg-red-50 hover:text-red-600"
            }`}
        >
          OFF
        </button>
      </div>

      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600">
          Status:{" "}
          <span className={isOn ? "text-green-600" : "text-red-600"}>
            {isOn ? "Device is running" : "Device is stopped"}
          </span>
        </p>
      </div>
    </div>
  );
}
