import Customer from "../models/user";
import customerService from "../service/customerService";
const httpStatus = require("http-status");
const { ApiError } = require("../middleware/apiError");
const sendMail = require("../middleware/sendMail");

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

const updatePasswordCustomer = async (req, res, next) => {
  try {
    const passUpdate = await customerService.handleUpdatePasswordCustomer(req, res)
    return passUpdate
  } catch (error) {
    next(error);

  }
}

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
    const updated = await customerService.handleUpdateCustomer(req, res);
    res.status(200).json({ message: "Update customer successfully", customer: updated });
  } catch (error) {
    next(error);
  }
};

const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const customerMailCheck = await customerService.handleGetCustomerByMail(
      email
    );
    if (!customerMailCheck) {
      throw new ApiError(httpStatus.NOT_FOUND, "Email not found");
    }
    const resetToken = customerService.generateResetToken();
    await customerService.saveResetToken(email, resetToken);

    const html = `Xin vui lòng click vào link dưới đây để thay đổi mật khẩu của bạn.Link này sẽ hết hạn sau 15 phút kể từ bây giờ. <a href=${process.env.URL_SERVER}/api/customer/reset-password/${resetToken}>Click here</a>`;

    const data = {
      email,
      html,
    };

    const rs = await sendMail(data);
    return res.status(200).json({
      success: true,
      rs,
    });
  } catch (error) {
    next(error);
  }
};

const resetPassword = async (req, res, next) => {
  try {
    const { password } = req.body;
    const { resetToken } = req.params;

    if (!password) {
      throw new Error("Missing inputs");
    }

    const customer = await Customer.findOne({ resetToken });
    if (!customer) {
      throw new Error("Invalid reset token");
    }

    customer.password = await customerService.hashPassword(password);
    customer.resetToken = undefined; // Remove the reset token from the customer's record
    await customer.save();

    return res.status(200).json({
      success: customer ? true : false,
      mes: customer ? "Update password" : "Something went wrong",
    });
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
  forgotPassword,
  resetPassword,
  updatePasswordCustomer
};
