const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');

// Schema to create User model
const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      max_length: 50,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      // TODO: Add email validation
    },
    thoughts: [/* TODO: References thought model object ids*/], 
    friends: [/* TODO: References friend model object ids*/],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
  }
  // TODO: Include virtual to return friend count on query
);

const User = model('user', userSchema);

module.exports = User;
