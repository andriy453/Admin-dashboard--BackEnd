const { ctrlWrapper, HttpError } = require("../helpers");
const { Order } = require("../models/orders");

const ListOrder = async (req, res, next) => {
  try {
    const { page = 1, name } = req.query;
    const pageSize = 5;
    const skip = (page - 1) * pageSize;
    let query = {};
    if (name) {
      query.name = { $regex: new RegExp(name, "i") };
    }
    const totalOrder = await Order.countDocuments(query);

    if (totalOrder === 0) {
      throw new HttpError(404, `Order not found`);
    }
    if (skip >= totalOrder) {
      throw new HttpError(404, `No more Order available on page ${page}`);
    }
    const order = await Order.find(query).skip(skip).limit(pageSize);

    res.status(200).json({
      totalOrder,
      pageSize,
      currentPage: page,
      totalPages: Math.ceil(totalOrder / pageSize),
      order,
    });
  } catch (error) {
    console.error("Error fetching Order:", error);
    next(error);
  }
};

module.exports = {
  ListOrder: ctrlWrapper(ListOrder),
};
