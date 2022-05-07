const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');

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
      type: String,
      required: true,
      },
    ],
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }

);

//Virtual to return reaction count on query
thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});



const Thought = model('thought', thoughtSchema);

module.exports = Thought;
