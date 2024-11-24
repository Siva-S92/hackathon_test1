import React, { useState } from "react";

const ProductdefinitonForm = () => {
    const [defaultformData, setDefaultFormData] = useState({
        productID: "61630893-6873-456c-bc38-b9d7eb7bcedb",
        productName: "Agricultural Fertilizer Dispensing System ",
        components: {
            soil_moisture_sensor: {
                name: "Soil Moisture Sensor",
                type: "sensor",
                unit: "°C",
                range: { min: 150, max: 350 },
            },
            LDR_sensor: {
                name: "LDR Sensor",
                type: "sensor",
                unit: "%",
                range: { min: 3000, max: 9000 },
            },
            actuator: {
                type: "Fertilizer Dispencing Motor",
                state: "ON",
            },
        },
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, path: string[]) => {
        const { name, value } = e.target;

        setDefaultFormData((prevState) => {
            const updated = { ...prevState };
            let current:any = updated;

            for (let i = 0; i < path.length - 1; i++) {
                current = current[path[i]];
            }

            const finalKey = path[path.length - 1];
            current[finalKey] = name === "min" || name === "max" ? parseFloat(value) || 0 : value;

            return updated;
        });
    };

    return (
        <form className="w-full flex flex-col gap-4">
            {/* Top-level fields */}
            <div className="w-full">
                <label className="block text-sm font-medium mb-1" htmlFor="productID">
                    Product ID:
                </label>
                <input
                    type="text"
                    id="productID"
                    name="productID"
                    value={defaultformData.productID}
                    onChange={(e) => handleChange(e, ["productID"])}
                    className="w-full border rounded-md py-2 px-3"
                />
            </div>
            <div className="w-full">
                <label className="block text-sm font-medium mb-1" htmlFor="productName">
                    Product Name:
                </label>
                <input
                    type="text"
                    id="productName"
                    name="productName"
                    value={defaultformData.productName}
                    onChange={(e) => handleChange(e, ["productName"])}
                    className="w-full border rounded-md py-2 px-3"
                />
            </div>

            {/* Components */}
            <fieldset className="w-full border rounded-md p-4">
                <legend className="text-sm font-medium mb-2">Components</legend>
                {Object.entries(defaultformData.components).map(([key, component]) => (
                    <fieldset key={key} className="w-full border rounded-md p-4">
                        <legend className="text-sm font-medium mb-2">{key}</legend>
                        {Object.entries(component).map(([subKey, value]) => {
                            if (subKey === "range" && typeof value === "object") {
                                return (
                                    <div key={subKey} className="flex flex-col gap-2">
                                        <div className="w-full">
                                            <label className="block text-sm font-medium mb-1" htmlFor={`${key}-range-min`}>
                                                Range Min:
                                            </label>
                                            <input
                                                type="number"
                                                id={`${key}-range-min`}
                                                name="min"
                                                value={(value as { min: number; max: number }).min}
                                                onChange={(e) => handleChange(e, ["components", key, "range", "min"])}
                                                className="w-full border rounded-md py-2 px-3"
                                            />
                                        </div>
                                        <div className="w-full">
                                            <label className="block text-sm font-medium mb-1" htmlFor={`${key}-range-max`}>
                                                Range Max:
                                            </label>
                                            <input
                                                type="number"
                                                id={`${key}-range-max`}
                                                name="max"
                                                value={(value as { min: number; max: number }).max}
                                                onChange={(e) => handleChange(e, ["components", key, "range", "max"])}
                                                className="w-full border rounded-md py-2 px-3"
                                            />
                                        </div>
                                    </div>
                                );
                            }
                            return (
                                <div key={subKey} className="w-full">
                                    <label className="block text-sm font-medium mb-1" htmlFor={`${key}-${subKey}`}>
                                        {subKey.charAt(0).toUpperCase() + subKey.slice(1)}:
                                    </label>
                                    <input
                                        type="text"
                                        id={`${key}-${subKey}`}
                                        name={subKey}
                                        value={typeof value === "string" || typeof value === "number" ? value : ""}
                                        onChange={(e) => handleChange(e, ["components", key, subKey])}
                                        className="w-full border rounded-md py-2 px-3"
                                    />
                                </div>
                            );
                        })}
                    </fieldset>
                ))}
            </fieldset>
        </form>
    );
};

export default ProductdefinitonForm;

