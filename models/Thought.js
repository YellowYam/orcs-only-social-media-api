const { Schema, model } = require('mongoose');

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 120
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    username: [
      {
      type: Schema.Types.ObjectId,
      ref: 'User',
      },
    ],
    reactions: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Reaction',
      },
    ],
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
  //Add reaction count virtual
);

const Course = model('course', courseSchema);

module.exports = Course;
