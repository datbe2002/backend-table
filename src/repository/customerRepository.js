const Customer = require("../models/user");

const getAll = async () => {
  const foundAll = await Customer.find();
  return foundAll;
};

const getCustomerById = async (id) => {
  const foundManById = await Customer.findById({ _id: id });
  return foundManById;
};

const getCustomerByEmail = async (email) => {
  const foundManByEmail = await Customer.findOne({ email });
  return foundManByEmail;
};

const deleteCustomerById = async (id) => {
  return await Customer.deleteOne({ _id: id });
};

const updateCustomer = async (id, obj) => {
  console.log(id);
  console.log(obj);
  return await Customer.findByIdAndUpdate(
    id,
    {
      $set: obj,
    },
    { new: true }
  );
};

module.exports = {
  getAll,
  getCustomerById,
  getCustomerByEmail,
  deleteCustomerById,
  updateCustomer,
};
