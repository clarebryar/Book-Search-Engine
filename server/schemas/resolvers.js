const { Book, User } = require('./models');

const resolvers = {
    Query: {
  // get a single user by either their id or their username
    User: async () => {
      return  User.find({});
    },
    
    },
    Mutation: {

    }
};

module.exports = resolvers ;