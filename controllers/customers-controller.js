const { ctrlWrapper, HttpError } = require("../helpers");
const { Customer } = require("../models/customer");

const ListCustomer = async (req, res, next) => {
  try {
    const { page = 1, name } = req.query;
    const pageSize = 5;
    const skip = (page - 1) * pageSize;
    let query = {};
    if (name) {
      query.name = { $regex: new RegExp(name, "i") };
    }
    const totalCustomer = await Customer.countDocuments(query);

    if (totalCustomer === 0) {
      throw new HttpError(404, `Customer not found`);
    }
    if (skip >= totalCustomer) {
      throw new HttpError(404, `No more Customer available on page ${page}`);
    }
    const customer = await Customer.find(query).skip(skip).limit(pageSize);

    res.status(200).json({
      totalCustomer,
      pageSize,
      currentPage: page,
      totalPages: Math.ceil(totalCustomer / pageSize),
      customer,
    });
  } catch (error) {
    console.error("Error fetching Customer:", error);
    next(error);
  }
};

module.exports = {
  ListCustomer: ctrlWrapper(ListCustomer),
};
