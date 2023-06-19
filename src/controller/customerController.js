import customerService from "../service/customerService";
const httpStatus = require("http-status");
const { ApiError } = require("../middleware/apiError");

const loginCustomer = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const customer = await customerService.signInWithEmailPassword(
      email,
      password
    );
    const token = await customerService.genAuthToken(customer);
    res.status(200).json({
      customer,
      token,
    });
  } catch (error) {
    next(error);
  }
};

const getAllCustomer = async (req, res, next) => {
  try {
    const allCustomer = await customerService.handleGetAllCustomer();
    if (allCustomer.length < 1) {
      throw new ApiError(httpStatus.NOT_FOUND, "Customer not found");
    }
    res.status(200).json({ message: "success", allCustomer });
  } catch (error) {
    next(error);
  }
};

const getCustomerById = async (req, res, next) => {
  try {
    const customer = await customerService.handleGetCustomerById(
      req.params._id
    );
    if (!customer) {
      throw new ApiError(httpStatus.NOT_FOUND, "Customer not found");
    }
    res.status(200).json({ message: "success", customer });
  } catch (error) {
    next(error);
  }
};

const regisNewCustomer = async (req, res, next) => {
  try {
    const newCustomer = await customerService.handleCreateNewCustomer(req, res);
    const token = await customerService.genAuthToken(newCustomer);
    res.status(200).json({ message: "success", newCustomer, token });
  } catch (error) {
    next(error);
  }
};

const deleteCustomer = async (req, res, next) => {
  try {
    await customerService.handleDeleteCustomer(req, res);
    res.status(200).json({ message: "Delete customer success" });
  } catch (error) {
    next(error);
  }
};

const updateCustomer = async (req, res, next) => {
  try {
    await customerService.handleUpdateCustomer(req, res);
    res.status(200).json({ message: "Update customer successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllCustomer,
  getCustomerById,
  regisNewCustomer,
  deleteCustomer,
  loginCustomer,
  updateCustomer,
};
