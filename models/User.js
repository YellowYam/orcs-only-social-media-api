const { Schema, model } = require('mongoose');

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
      unique: true,
      // Email validation
      validate: {
        validator: function (v) {
          return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
        },
        message: "Please enter a valid email"
      },
      required: [true, "Email required"]
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'thought',
      },
    ],
    friends: [ // self reference
      {
        type: Schema.Types.ObjectId, 
        ref: 'user' 
      }
    ]
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
  }

);

//Virtual to return friend count on query
userSchema.virtual('friendCount').get(function () {
  return this.friends.length;
});


const User = model('user', userSchema);

module.exports = User;
