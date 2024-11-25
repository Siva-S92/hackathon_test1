import { LineChart } from "@mui/x-charts/LineChart";
import { useEffect, useState } from "react";
import { axiosInstance } from "../lib/axios";
import { message } from "antd";



export default function BasicLineChart() {

  const [generateddata, setGeneratedData] = useState<any>([])
  const [triggerFetch, setTriggerFetch] = useState(false);

  let soil_moisture_sensor_data = generateddata.map((item:any) =>
    Number(item.soil_moisture_sensor)
  );

  let indexes = [...Array(soil_moisture_sensor_data.length)].map(
    (_, index) => index
  );

  let LDR_sensor_data = generateddata.map((item:any) => Number(item.LDR_sensor));

  const generateData = async () => {
    let data = {
      "productID": "61630893-6873-456c-bc38-b9d7eb7bcedb"
      }
    try {
      const response = await axiosInstance.post(`/api/generate-data`, data)
      console.log(response.data.message)
      message.success(response.data.message)

      // Signal to re-trigger effect
      setTriggerFetch((prev) => !prev);
    } catch (error) {
      console.log(error)
    }
  }


  const getData = async () => {
    let data = {
      "productID": "61630893-6873-456c-bc38-b9d7eb7bcedb"
      }
    try {
      const response = await axiosInstance.post(`/api/get-alldata`, data)
      if(response.data.status === "success"){
        setGeneratedData(response.data.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getData(); // Refetch
  }, [triggerFetch, generateddata]); // Dependency on triggerFetch



  return (
    <>
    <div className="flex gap-20 flex-col md:flex-row md:gap-0">
      <LineChart className="w-full md:w-[50%]"
        xAxis={[{ data: indexes }]}
        series={[
          {
            data: soil_moisture_sensor_data,
            label: "Soil Moisture",
          },
        ]}
        
        height={300}
      />
      <LineChart className="w-full md:w-[50%]"
        xAxis={[{ data: indexes }]}
        series={[
          {
            data: LDR_sensor_data,
            label: "LDR_sensor",
          },
        ]}
        
        height={300}
      />
    </div>

    <div className="text-center mb-10">
      <button type="button" onClick={generateData} className="bg-red-600 text-xl text-white border rounded-md px-4 py-1">Danger to Generate Data</button>
    </div>
    </>
  );
}
