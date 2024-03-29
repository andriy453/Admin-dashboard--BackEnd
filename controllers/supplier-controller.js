const { ctrlWrapper, HttpError } = require("../helpers");
const { Supplier } = require("../models/supplier");
const ListSupplier = async (req, res, next) => {
  try {
    const { page = 1, name } = req.query;
    const pageSize = 5;
    const skip = (page - 1) * pageSize;
    let query = {};
    if (name) {
      query.name = { $regex: new RegExp(name, "i") };
    }
    const totalSupplier = await Supplier.countDocuments(query);

    if (totalSupplier === 0) {
      throw new HttpError(404, `Supplier not found`);
    }
    if (skip >= totalSupplier) {
      throw new HttpError(404, `No more supplier available on page ${page}`);
    }
    const supplier = await Supplier.find(query).skip(skip).limit(pageSize);

    res.status(200).json({
      totalSupplier,
      pageSize,
      currentPage: page,
      totalPages: Math.ceil(totalSupplier / pageSize),
      supplier,
    });
  } catch (error) {
    console.error("Error fetching supplier:", error);
    next(error);
  }
};

const addSupplier = async (req, res, next) => {
  try {
    const result = await Supplier.create({ ...req.body });
    res.status(201).json({ data: result });
  } catch (error) {
    next(error);
  }
};

const updateSupplier = async (req, res, next) => {
  const { supplierId } = req.params;
  const result = await Supplier.findByIdAndUpdate(supplierId, req.body, {
    new: true,
  });
  if (!result) {
    HttpError(404, `Supplier with id=${supplierId} not found`);
  }
  res.status(200).json(result);
};

const deleteById = async (req, res, next) => {
  const { supplierId } = req.params;
  const result = await Supplier.findByIdAndDelete(supplierId);

  if (!result) {
    throw HttpError(404, `Supplier with id=${supplierId} not found`);
  }
  res.json({
    message: "Supplier success",
  });
};

module.exports = {
  ListSupplier: ctrlWrapper(ListSupplier),
  addSupplier: ctrlWrapper(addSupplier),
  updateSupplier: ctrlWrapper(updateSupplier),
  deleteById: ctrlWrapper(deleteById),
};
