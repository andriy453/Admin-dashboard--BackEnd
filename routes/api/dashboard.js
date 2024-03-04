const express = require("express");
const ctrl = require("../../controllers/product-controller");
const validateBody = require("../../middlewares/validateBody");
const { productAddSchema } = require("../../schemas/product-schemas");
const authenticate = require("../../middlewares/authenticate");

const router = express.Router();

router.get("/products", authenticate, ctrl.ListProducts);
router.post("/products",validateBody(productAddSchema), authenticate, ctrl.addProduct);
router.put("/products/:productId", authenticate, ctrl.updateProduct);

module.exports = router;


