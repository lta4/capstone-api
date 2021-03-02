const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const expressPlayground = require("graphql-playground-middleware-express").default;
// GraphQL schema
const schema = buildSchema(`
    type Query {
        quote(id: Int!): Quote
        quotes(topic: String): [Quote]
        fav(id: Int!): Fav
        favorites(topic: String): [Fav]
    },
    type Mutation {
        updateQuoteTopic(id: Int!, topic: String!): Quote
        updateFavTopic(id: Int!, topic: String!): Fav
    }
    type Quote {
        id: Int
        q: String
        a: String
        h: String
        topic: String
    }
    type Fav {
        id: Int
        q: String
        a: String
        h: String
        topic: String
    }
`);

const quotesData = [
    {
        id: 1,
        q: "Quality means doing it right when no one is looking",
        a: "Henry Ford",
        h: "<blockquote>“Quality means doing it right when no one is looking.” — <footer>Henry Ford</footer></blockquote>",
        topic: "Node.js",
        // url: ""
    },
    {
        id: 2,
        q: "The important thing is not to stop questioning. Curiosity has its own reason for existing.",
        a: "Albert Einstein",
        h: "<blockquote>“The important thing is not to stop questioning. Curiosity has its own reason for existing.” — <footer>Albert Einstein</footer></blockquote>",
        topic: "Node.js",
        // url: ""
    },
    {
        id: 3,
        q: "Never whine, never complain, never try to justify yourself.",
        a: "Robert Greene",
        h: "<blockquote>&ldquo;Never whine, never complain, never try to justify yourself.&rdquo; &mdash; <footer>Robert Greene</footer></blockquote>",
        topic: "JavaScript",
        // url: ""
    }
]
const favoritesData = [
    {
        id: 4,
        q: "I like pizza",
        a: "Seven Lions",
        h: "<blockquote>“I like pizza.” — <footer>Seven Lions</footer></blockquote>",
        topic: "Node.js",
        // url: ""
    },
    {
        id: 5,
        q: "Cherry Pie",
        a: "Sullivan King",
        h: "<blockquote>“Cherry Pie.” — <footer>Sullivan King</footer></blockquote>",
        topic: "Node.js",
        // url: ""
    }
]
// Quote Functions

// Get Function
const getQuote = function(args) { 
    const id = args.id;
    return quotesData.filter(quote => {
        return quote.id == id;
    })[0];
}
// Get Multiple Function
const getQuotes = function(args) {
    if (args.topic) {
        const topic = args.topic;
        return quotesData.filter(quote => quote.topic === topic);
    } else {
        return quotesData;
    }
}
// Update Function
const updateQuoteTopic = function({id, topic}) {
    quotesData.map(quote => {
        if (quote.id === id) {
            quote.topic = topic;
            return quote;
        }
    });
    return quotesData.filter(quote => quote.id === id)[0];
}
// Fav Functions

// Get Function
const getFav = function(args) { 
    const id = args.id;
    return favoritesData.filter(fav => {
        return fav.id == id;
    })[0];
}
// Get Multiple Function
const getFavorites = function(args) {
    if (args.topic) {
        const topic = args.topic;
        return favoritesData.filter(fav => fav.topic === topic);
    } else {
        return favoritesData;
    }
}
// Update Fav Function
const updateFavTopic = function({id, topic}) {
    favoritesData.map(fav => {
        if (fav.id === id) {
            fav.topic = topic;
            return fav;
        }
    });
    return favoritesData.filter(fav => fav.id === id)[0];
}
// Root resolver
const root = {
    // message: () => 'Hello World!',
    quote: getQuote,
    quotes: getQuotes,
    updateQuoteTopic: updateQuoteTopic,
    fav: getFav,
    favorites: getFavorites,
    updateFavTopic: updateFavTopic
};
// Create an express server and a GraphQL endpoint
const app = express();
app.use('/graphql' , graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
}));

//Graphql Playground route
app.get("/playground", expressPlayground({ endpoint: "/graphql" }));

const port = process.env.PORT || "4000";
app.listen(port, () => console.log(`listening on: http://localhost:${port}/graphql`));