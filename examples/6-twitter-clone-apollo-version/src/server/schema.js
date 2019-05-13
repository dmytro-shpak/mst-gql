const { PubSub } = require("graphql-subscriptions")
const { ChuckNorris } = require("fakergem")

// Fake message dispatcher
let id = 0

const pubsub = new PubSub()

const store = {
  messages: [
    {
      id: nextId(),
      text: "#MobX is cool",
      user: "mweststrate"
    },
    {
      id: nextId(),
      text: ChuckNorris.fact(),
      user: "chucknorris"
    },
    {
      id: nextId(),
      text: ChuckNorris.fact(),
      user: "chucknorris"
    }
  ],
  users: [
    {
      id: "mweststrate",
      name: "Michel Weststrate",
      avatar:
        "https://pbs.twimg.com/profile_images/1126182603944599558/BlES9eyZ_400x400.jpg"
    },
    {
      id: "chucknorris",
      name: "Chuck Norris",
      avatar:
        "https://beardoholic.com/wp-content/uploads/2017/12/c74461ae2a9917a2482ac7b53f195b3c6e2fdd59e778c673256fb29d1b07f181.jpg"
    }
  ]
}

const typeDefs = `
  type Query {
    messages: [Message]
    me: User
  }
  type Subscription {
    newMessages: Message
  }
  type User {
    id: ID,
    name: String!
    avatar: String!
  }
  type Message {
    id: ID,
    user: User!,
    text: String!,
  }
  type Mutation {
    changeName(id: ID!, name: String!): User
  }
  
`

const resolvers = {
  Query: {
    messages: () =>
      store.messages.map(msg => ({
        ...msg,
        user: store.users.find(user => user.id === msg.user)
      })),
    me: () => store.users.find(user => user.id === "mweststrate")
  },
  Subscription: {
    newMessages: {
      subscribe: () => pubsub.asyncIterator("newMessages")
    }
  },
  Mutation: {
    changeName: (root, args, context) => {
      const { id, name } = args
      const user = store.users.find(user => user.id === id)
      user.name = name
      return user
    }
  }
}

module.exports = {
  typeDefs,
  resolvers,
  context: (headers, secrets) => {
    return {
      headers,
      secrets
    }
  }
}

function nextId() {
  return "" + ++id
}

setInterval(
  () =>
    pubsub.publish("newMessages", {
      newMessages: {
        id: nextId(),
        text: ChuckNorris.fact(),
        user: "chucknorris"
      }
    }),
  5000
)