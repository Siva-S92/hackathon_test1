const response = {
    status: "success",
    data: [
      {
        Timestamp: "2024-11-25T07:31:35.538Z",
        ProductID: "61630893-6873-456c-bc38-b9d7eb7bcedb",
        DeviceID: "47d32e23-65d5-470a-af4e-2a2ea211e06b",
        soil_moisture_sensor: "316.59",
        LDR_sensor: "5364.29",
      },
      {
        Timestamp: "2024-11-25T07:31:58.126Z",
        ProductID: "61630893-6873-456c-bc38-b9d7eb7bcedb",
        DeviceID: "47d32e23-65d5-470a-af4e-2a2ea211e06b",
        soil_moisture_sensor: "200.96",
        LDR_sensor: "6871.18",
      },
      {
        Timestamp: "2024-11-25T09:29:38.625Z",
        ProductID: "61630893-6873-456c-bc38-b9d7eb7bcedb",
        DeviceID: "47d32e23-65d5-470a-af4e-2a2ea211e06b",
        soil_moisture_sensor: "247.87",
        LDR_sensor: "8003.09",
      },
      {
        Timestamp: "2024-11-25T09:29:44.862Z",
        ProductID: "61630893-6873-456c-bc38-b9d7eb7bcedb",
        DeviceID: "47d32e23-65d5-470a-af4e-2a2ea211e06b",
        soil_moisture_sensor: "173.10",
        LDR_sensor: "6871.80",
      },
    ],
  };
  
  
  let timestamps = response.data.map((item) => Number(item.Timestamp))
  let soil_moisture_sensor_data = response.data.map((item) => Number(item.soil_moisture_sensor))
  
  let LDR_sensor_data = response.data.map((item) => Number(item.LDR_sensor))
  
  
  console.log(soil_moisture_sensor_data)
  console.log(LDR_sensor_data)
console.log(timestamps)  