const { Book, User } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
  // get a single user by either their id or their username
  everyone: async () => {
    return User.find();
  },
  me: async (params, args, context) => {
    if (context.user) {
      return User.findOne({ _id: context.user._id }).populate('savedBooks');
    }
    throw new AuthenticationError('You need to be logged in!'); 
  },
    },
    Mutation: {
        login: async (parent, { email, password }, context) => {
            const user = await User.findOne({ email: email, password: password });
      
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
              const token = signToken(newUser);
              console.log(newUser);
              return {token, newUser } ;
          },
    saveBook: async (parent, { bookData }, context) => {
   const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { [Book]: {$addToSet: { authors: bookData.authors, description: bookData.description, bookId: bookData.bookId, title: bookData.title, image: bookData.image, link: bookData.link} } },
          { new: true }
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
};


module.exports = resolvers ;