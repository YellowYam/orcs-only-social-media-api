// ObjectId() method for converting userId string into an ObjectId for querying database
const { ObjectId } = require('mongoose').Types;
const { User, Course } = require('../models');

// TODO: Create an aggregate function to get the number of users overall
// const userCount = async () =>
//   User.aggregate(
//     // Your code here
//     [
//       {
//         $group: {
//           // Group by null (no additional grouping by id)
//           _id: null,
//           // Sum of all users
//           numberOfUsers: { $sum: 1 },
//         },
//       },
  
    
//     ] 
//   )
//     .then((numberOfUsers) => numberOfUsers);

// // Execute the aggregate method on the User model and calculate the overall grade by using the $avg operator
// const grade = async (userId) =>
//   User.aggregate([
//     // TODO: Ensure we include only the user who can match the given ObjectId using the $match operator
//     {
//       // Your code here
//       // Filter user by id
//       $match: { _id: ObjectId(userId) } 
//     },
//     {
//       $unwind: '$reactions',
//     },
//     // TODO: Group information for the user with the given ObjectId alongside an overall grade calculated using the $avg operator
//     {
//       // Your code here
//       $group: {
//         // Group by null (no additional grouping by id)
//         _id: null,
//         // Average of all scores
//         avg_score: { $avg: '$reactions.score' },
//         // Maximum price
//         max_score: { $max: '$reactions.score' },
//         // Minimum price
//         min_score: { $min: '$reactions.score' },
//       },
//     },
//   ]);
  

module.exports = {
  // Get all users
  getUsers(req, res) {
    User.find()
      .then(async (users) => {
        const userObj = {
          users,
          headCount: await headCount(),
        };
        return res.json(userObj);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // Get a single user
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select('-__v')
      .lean()
      .then(async (user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json({
              user,
              grade: await grade(req.params.userId),
            })
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // create a new user
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },
  // Delete a user and remove them from the course
  deleteUser(req, res) {
    User.findOneAndRemove({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No such user exists' })
          : Course.findOneAndUpdate(
              { users: req.params.userId },
              { $pull: { users: req.params.userId } },
              { new: true }
            )
      )
      .then((course) =>
        !course
          ? res.status(404).json({
              message: 'User deleted, but no courses found',
            })
          : res.json({ message: 'User successfully deleted' })
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
};
