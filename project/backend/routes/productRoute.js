import express from 'express';
import { addNewProductDefinition, addProduct, checkDeviceRunning, deleteProductDefinition, getProductDefinition, startDevice, stopDevice, updateProductDefinition } from '../controllers/product.js';



const router = express.Router();


router.route("/add-product").post(addProduct);
router.route("/check-running").post(checkDeviceRunning);
router.route("/getproductdefinition").get(getProductDefinition);
router.route("/new-productdefinition").post(addNewProductDefinition);
router.route("/update-productdefinition").patch(updateProductDefinition);
router.route("/delete-productdefinition").delete(deleteProductDefinition);
router.route("/start-device").post(startDevice);
router.route("/stop-device").post(stopDevice);



export const productRouter = router;