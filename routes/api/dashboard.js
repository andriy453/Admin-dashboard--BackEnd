const express = require("express");
const ctrl = require("../../controllers/product-controller");
const ctrlS = require("../../controllers/supplier-controller");
const ctrlO = require("../../controllers/order-controller");
const ctrlC = require("../../controllers/customers-controller");
const ctrlD = require("../../controllers/dashboard-controller");
const validateBody = require("../../middlewares/validateBody");
const { productAddSchema } = require("../../schemas/product-schemas");
const { supplierAddSchema } = require("../../schemas/suppliers-schemas");
const authenticate = require("../../middlewares/authenticate");

const router = express.Router();

router.get("/dashboard", authenticate, ctrlD.getDashboardData);
router.get("/products", authenticate, ctrl.ListProducts);
router.post("/products",validateBody(productAddSchema), authenticate, ctrl.addProduct);
router.post("/products/:productId", authenticate, ctrl.deleteById);
router.put("/products/:productId", authenticate, ctrl.updateProduct);
router.get("/suppliers", authenticate, ctrlS.ListSupplier);
router.post("/suppliers",validateBody(supplierAddSchema), authenticate, ctrlS.addSupplier);
router.post("/suppliers/:supplierId", authenticate, ctrlS.deleteById);
router.put("/suppliers/:supplierId", authenticate, ctrlS.updateSupplier);
router.get("/orders", authenticate, ctrlO.ListOrder);
router.get("/customers", authenticate, ctrlC.ListCustomer);

module.exports = router;


