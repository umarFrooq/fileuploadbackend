const User = require('../models/userModel');

const createUser = async (userData) => {
  console.log("user datra is ",userData)
  return await User.create(userData);
};

const getAllUsers = async (filter) => {
  return await User.aggregate([
    {
      $match: filter
    },
    {
      $sort: {
        age: -1 
      }
    },
    {
      $skip: 1 
    },
    {
      $limit: 3 
    },
    {
      $project: {
        _id: 1,      
        name: 1,     
        email: 1,    
        age: 1       
      }
    }
  ]);
};



const getUserById = async (id) => {

 let result= await User.findById(id);
if(!result)
  throw error("record not found");
else return result


};

const updateUser = async (id, updateData) => {
  return await User.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
};

const deleteUser = async (id) => {
  return await User.findByIdAndDelete(id);
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
