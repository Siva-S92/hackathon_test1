import React, { useCallback, useEffect, useState } from "react";
import { Card, message, Modal } from "antd";
import { axiosInstance } from "../lib/axios";


const ProductCard: React.FC = () => {
  const [productname, setProductName] = useState("")
  const [productdefinition, setProductdefinition] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isupdate, setIsUpdate] = useState(false);
  const [isnewproduct, setIsNewProduct] = useState(false);
  const [triggerFetch, setTriggerFetch] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    path: string[]
  ) => {
    const { name, value } = e.target;

    setDefaultFormData((prevState) => {
      const updated = { ...prevState };
      let current: any = updated;

      for (let i = 0; i < path.length - 1; i++) {
        current = current[path[i]];
      }

      const finalKey = path[path.length - 1];
      current[finalKey] =
        name === "min" || name === "max" ? parseFloat(value) || 0 : value;

      return updated;
    });
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const createCancel = () => {
    setIsModalOpen(false);
  };
  const updateCancel = () => {
    setIsUpdate(!isupdate);
  };
  const newproductCancel = () => {
    setIsNewProduct(!isnewproduct);
  };

  const addProduct = async() => {
    let data = {name: productname}
    setConfirmLoading(true); // Start loading
    try {
      const response = await axiosInstance.post(`/api/add-product`, data)
      message.success(`The Product ${response.data.name} created successfully`)
    } catch (error) {
      console.log(error)
    } finally {
      setConfirmLoading(false); // Stop loading
      setIsNewProduct(!isnewproduct)
    }
  }

  const fetchProductDefinition = useCallback(async () => {
    try {
      const response = await axiosInstance.get(`/api/getproductdefinition`);
      setProductdefinition(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const newProductDefinition = async () => {
    setConfirmLoading(true); // Start loading
    try {
      const response = await axiosInstance.post(
        `/api/new-productdefinition`,
        defaultformData
      );
      message.success(response.data.message);
      console.log(response.data);

      // Signal to re-trigger effect
      setTriggerFetch((prev) => !prev);
    } catch (error) {
      console.log(error);
      message.error("Operation failed.");
    } finally {
      setConfirmLoading(false); // Stop loading
      setIsModalOpen(false);
    }
  };


  const updateProductDefinition = async () => {
    let updatedformData = {updates: defaultformData}
    setConfirmLoading(true); // Start loading
    try {
      const response = await axiosInstance.patch(
        `/api/update-productdefinition`,
        updatedformData
      );
      message.success(response.data.message);
      console.log(response.data);

      // Signal to re-trigger effect
      setTriggerFetch((prev) => !prev);
    } catch (error) {
      console.log(error);
      message.error("Operation failed.");
    } finally {
      setConfirmLoading(false); // Stop loading
      setIsUpdate(!isupdate)
    }
  };

  const resetProductDefinition = async () => {
    try {
      const response = await axiosInstance.post(
        `/api/new-productdefinition`,
        defaultformData
      );
      message.success(response.data.message, 5);
      console.log(response.data);

      // Signal to re-trigger effect
      setTriggerFetch((prev) => !prev);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteProductDefinition = async () => {
    try {
      const response = await axiosInstance.delete(`/api/delete-productdefinition`);
      message.success(response.data.message, 5);
      console.log(response.data);

      // Signal to re-trigger effect
      setTriggerFetch((prev) => !prev);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProductDefinition(); // Refetch product definition when triggered
  }, [triggerFetch, fetchProductDefinition]); // Dependency on triggerFetch

  return (
    <>
      <Card
        className="bg-gray-200 w-full max-w-2xl mx-auto "
        title="Product Details"
        extra={
          <span className="flex gap-1">
            <button
              onClick={() => setIsUpdate(!isupdate)}
              className="px-2 bg-green-400 rounded-lg"
            >
              update
            </button>
            <button
              onClick={deleteProductDefinition}
              className="px-2 bg-red-400 rounded-lg"
            >
              delete
            </button>
            <button
              onClick={resetProductDefinition}
              className="px-2 bg-red-400 rounded-lg"
            >
              Reset
            </button>
          </span>
        }
        // style={{ width: 600 }}
      >
        <p>ID: {productdefinition?.productID}</p>
        <p>Product Name: {productdefinition?.name}</p>
        <p>
          Sensor1: {productdefinition?.components?.soil_moisture_sensor?.name}
        </p>
        <p>Type: {productdefinition?.components?.soil_moisture_sensor?.type}</p>
        <p>Unit: {productdefinition?.components?.soil_moisture_sensor?.unit}</p>
        <p>
          Range:{" "}
          {productdefinition?.components?.soil_moisture_sensor?.range.min} -
          {productdefinition?.components?.soil_moisture_sensor?.range.max}
        </p>
        <p>Sensor2: {productdefinition?.components?.LDR_sensor?.name}</p>
        <p>Type: {productdefinition?.components?.LDR_sensor?.type}</p>
        <p>Unit: {productdefinition?.components?.LDR_sensor?.unit}</p>
        <p>
          Range:{productdefinition?.components?.LDR_sensor?.range.min} -
          {productdefinition?.components?.LDR_sensor?.range.max}
        </p>
        <p>Actuator1: {productdefinition?.components?.actuator?.type}</p>
      </Card>

      <div className="w-full max-w-2xl flex flex-col gap-3 mx-auto mt-2">
        <button
          onClick={showModal}
          className="bg-blue-300 w-full rounded-md py-1"
        >
          Create Product Definition
        </button>
        <button
          onClick={() => setIsNewProduct(!isnewproduct)}
          className="bg-blue-300 w-full rounded-md py-1"
        >
          Add new Product
        </button>
      </div>

      <Modal
        width={800}
        title="Create Product Definition"
        open={isModalOpen}
        confirmLoading={confirmLoading} // Loading indicator
        onCancel={createCancel}
        footer={null}
      >
        <form className="w-full flex flex-col gap-4">
          {/* Top-level fields */}
          <div className="w-full">
            <label
              className="block text-sm font-medium mb-1"
              htmlFor="productID"
            >
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
            <label
              className="block text-sm font-medium mb-1"
              htmlFor="productName"
            >
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
            {Object.entries(defaultformData.components).map(
              ([key, component]) => (
                <fieldset key={key} className="w-full border rounded-md p-4">
                  <legend className="text-sm font-medium mb-2">{key}</legend>
                  {Object.entries(component).map(([subKey, value]) => {
                    if (subKey === "range" && typeof value === "object") {
                      return (
                        <div key={subKey} className="flex flex-col gap-2">
                          <div className="w-full">
                            <label
                              className="block text-sm font-medium mb-1"
                              htmlFor={`${key}-range-min`}
                            >
                              Range Min:
                            </label>
                            <input
                              type="number"
                              id={`${key}-range-min`}
                              name="min"
                              value={
                                (value as { min: number; max: number }).min
                              }
                              onChange={(e) =>
                                handleChange(e, [
                                  "components",
                                  key,
                                  "range",
                                  "min",
                                ])
                              }
                              className="w-full border rounded-md py-2 px-3"
                            />
                          </div>
                          <div className="w-full">
                            <label
                              className="block text-sm font-medium mb-1"
                              htmlFor={`${key}-range-max`}
                            >
                              Range Max:
                            </label>
                            <input
                              type="number"
                              id={`${key}-range-max`}
                              name="max"
                              value={
                                (value as { min: number; max: number }).max
                              }
                              onChange={(e) =>
                                handleChange(e, [
                                  "components",
                                  key,
                                  "range",
                                  "max",
                                ])
                              }
                              className="w-full border rounded-md py-2 px-3"
                            />
                          </div>
                        </div>
                      );
                    }
                    return (
                      <div key={subKey} className="w-full">
                        <label
                          className="block text-sm font-medium mb-1"
                          htmlFor={`${key}-${subKey}`}
                        >
                          {subKey.charAt(0).toUpperCase() + subKey.slice(1)}:
                        </label>
                        <input
                          type="text"
                          id={`${key}-${subKey}`}
                          name={subKey}
                          value={
                            typeof value === "string" ||
                            typeof value === "number"
                              ? value
                              : ""
                          }
                          onChange={(e) =>
                            handleChange(e, ["components", key, subKey])
                          }
                          className="w-full border rounded-md py-2 px-3"
                        />
                      </div>
                    );
                  })}
                </fieldset>
              )
            )}
          </fieldset>
          <button type="button" onClick={newProductDefinition} className="bg-slate-400 py-1 rounded-md">submit</button>
        </form>
      </Modal>

      {/* update the form */}
      {isupdate && (
        <Modal
          width={800}
          title="Update Product Definition"
          open={isupdate}
          onCancel={updateCancel}
          footer={null}
        >
          <form className="w-full flex flex-col gap-4">
            {/* Top-level fields */}
            <div className="w-full">
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="productID"
              >
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
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="productName"
              >
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
              {Object.entries(defaultformData.components).map(
                ([key, component]) => (
                  <fieldset key={key} className="w-full border rounded-md p-4">
                    <legend className="text-sm font-medium mb-2">{key}</legend>
                    {Object.entries(component).map(([subKey, value]) => {
                      if (subKey === "range" && typeof value === "object") {
                        return (
                          <div key={subKey} className="flex flex-col gap-2">
                            <div className="w-full">
                              <label
                                className="block text-sm font-medium mb-1"
                                htmlFor={`${key}-range-min`}
                              >
                                Range Min:
                              </label>
                              <input
                                type="number"
                                id={`${key}-range-min`}
                                name="min"
                                value={
                                  (value as { min: number; max: number }).min
                                }
                                onChange={(e) =>
                                  handleChange(e, [
                                    "components",
                                    key,
                                    "range",
                                    "min",
                                  ])
                                }
                                className="w-full border rounded-md py-2 px-3"
                              />
                            </div>
                            <div className="w-full">
                              <label
                                className="block text-sm font-medium mb-1"
                                htmlFor={`${key}-range-max`}
                              >
                                Range Max:
                              </label>
                              <input
                                type="number"
                                id={`${key}-range-max`}
                                name="max"
                                value={
                                  (value as { min: number; max: number }).max
                                }
                                onChange={(e) =>
                                  handleChange(e, [
                                    "components",
                                    key,
                                    "range",
                                    "max",
                                  ])
                                }
                                className="w-full border rounded-md py-2 px-3"
                              />
                            </div>
                          </div>
                        );
                      }
                      return (
                        <div key={subKey} className="w-full">
                          <label
                            className="block text-sm font-medium mb-1"
                            htmlFor={`${key}-${subKey}`}
                          >
                            {subKey.charAt(0).toUpperCase() + subKey.slice(1)}:
                          </label>
                          <input
                            type="text"
                            id={`${key}-${subKey}`}
                            name={subKey}
                            value={
                              typeof value === "string" ||
                              typeof value === "number"
                                ? value
                                : ""
                            }
                            onChange={(e) =>
                              handleChange(e, ["components", key, subKey])
                            }
                            className="w-full border rounded-md py-2 px-3"
                          />
                        </div>
                      );
                    })}
                  </fieldset>
                )
              )}
            </fieldset>
            <button type="button" onClick={updateProductDefinition} className="bg-slate-400 py-1 rounded-md">submit</button>
          </form>
        </Modal>
      )}

      {isnewproduct && (
        <Modal
          width={800}
          title="Add New Product"
          open={isnewproduct}
          onCancel={newproductCancel}
          footer={null}
        >
          <form className="w-full rounded-md flex flex-col">
            <label className="mt-2" htmlFor="">
              Product Name
            </label>
            <input
              className="border rounded-md py-1"
              type="text"
              id="productName"
              name="productName"
              placeholder="product name"
              value={productname}
              onChange={(e) => setProductName(e.target.value)}
            />

            <button type="button" onClick={addProduct} className="block bg-blue-500 py-1 rounded-md mt-5">
              submit
            </button>
          </form>
        </Modal>
      )}
    </>
  );
};

export default ProductCard;
