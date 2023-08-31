const { Book, User } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
  // get a single user by either their id or their username
  me: async (params, args, context) => {
    return User.findOne({ _id: params.user._id })
  },
    },
    Mutation: {
        login: async (parent, { username, password }, context) => {
            const user = await User.findOne({ username });
      
            if (!user) {
              throw new AuthenticationError('No user found with that username');
            }
      
            const correctPw = await user.isCorrectPassword(password);
      
            if (!correctPw) {
              throw new AuthenticationError('Incorrect credentials');
            }
      
            const token = signToken(user);
      
            return { token, user };
          },
    
    addUser: async (parent, {username, email, password},  context) => {
              const newUser = await User.create({ username, email, password });
              return newUser;
          },
    saveBook: async (parent, args, context) => {
     
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { savedBooks: args } },
          { new: true, runValidators: true }
        );
        return updatedUser;
    
    },
    removeBook: async (parent, args, context) => {
        const updatedUser = await User.findOneAndUpdate(
          { $pull: { savedBooks: { bookId: args.bookId } }},
          { new: true, runValidators: true }
        );
        return updatedUser;
    }
    }
}


module.exports = resolvers ;