import { ctrlWrapper } from "../decorators/index.js";
import Dashboard from "../models/dashboard.js";
import Customer from "../models/customer.js";
import { HttpError } from "../helpers/index.js";
import Product from "../models/Products.js";
import Supplier from "../models/supplier.js";

export const getDashboardData = async (req, res, next) => {
  try {
    const { page = 1 } = req.query;
    const perPage = 6;
    const skip = (page - 1) * perPage;

    const totalDashboards = await Dashboard.countDocuments({});

    if (totalDashboards === 0) {
      throw new HttpError(404, `Dashboards not found`);
    }

    if (skip >= totalDashboards) {
      throw new HttpError(404, `No more dashboards available on page ${page}`);
    }
    const dashboards = await Dashboard.find({}).skip(skip).limit(perPage);

    const response = {
      dashboards: {
        dashboards: dashboards,
        totalDashboards,
        perPage,
        currentPage: page,
        totalPages: Math.ceil(totalDashboards / perPage),
      },
      products: (await Product.find({})).length,
      customers: await Customer.find({}),
      suppliers: (await Supplier.find({})).length,
    };

    res.status(200).json(response);
  } catch (error) {
    console.error("Error fetching dashboards:", error);
    next(error);
  }
};

export default {
  getDashboardsData: ctrlWrapper(getDashboardData),
};