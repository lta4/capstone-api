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
    },
    type Quote {
          id: Int
          q: String
          a: String
          isChecked: Boolean
      },
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
        "id": 1,
        "q": "Never close your lips to those whom you have already opened your heart",
        "a": "Charles Dickens",
        "isChecked": true
      },
      {
        "id": 2,
        "q": "He that can have patience can have what he will",
        "a": "Benjamin Franklin",
        "isChecked": true
      },
      {
        "id": 3,
        "q": "There is no greater agony than bearing an untold story inside you",
        "a": "Maya Angelou",
        "isChecked": true
      },
      {
        "id": 4,
        "q": "All that a man achieves and all that he fails to achieve is the direct result of his own thoughts",
        "a": "James Allen",
        "isChecked": true
      },
      {
        "id": 5,
        "q": "Failure is simply the opportunity to begin again, this time more intelligently",
        "a": "Henry Ford",
        "isChecked": true
      },
      {
        "id": 6,
        "q": "In the practice of tolerance, ones enemy is the best teacher",
        "a": "Dalai Lama",
        "isChecked": true
      },
      {
        "id": 7,
        "q": "If you do not change direction, you may end up where you are heading",
        "a": "Laozi",
        "isChecked": true
      },
      {
        "id": 8,
        "q": "Peace is not something you wish for, its something you make, something you do, something you are, and something you give away",
        "a": "John Lennon",
        "isChecked": true
      },
      {
        "id": 9,
        "q": "To be great is to be misunderstood",
        "a": "Ralph Waldo Emerson",
        "isChecked": true
      },
      {
        "id": 10,
        "q": "Motivation gets you going and habit gets you there",
        "a": "Zig Ziglar",
        "isChecked": true
      },
      {
        "id": 11,
        "q": "Too many of us are not living our dreams because we are living our fears",
        "a": "Les Brown",
        "isChecked": true
      },
      {
        "id": 12,
        "q": "We crave for new sensations but soon become indifferent to them. The wonders of yesterday are today common occurrences",
        "a": "Nikola Tesla",
        "isChecked": true
      },
      {
        "id": 13,
        "q": "Dont shortchange yourself when it comes to investing in your own better future",
        "a": "Jim Rohn",
        "isChecked": true
      },
      {
        "id": 14,
        "q": "By the practice of meditation, you will find that you are carrying within your heart a portable paradise",
        "a": "Paramahansa Yogananda",
        "isChecked": true
      },
      {
        "id": 15,
        "q": "Shoot for the moon, because even if you miss, youll land among the stars",
        "a": "Les Brown",
        "isChecked": true
      },
      {
        "id": 16,
        "q": "Appear weak when you are strong, and strong when you are weak",
        "a": "Sun Tzu",
        "isChecked": true
      },
      {
        "id": 17,
        "q": "Courage is found in unlikely places",
        "a": "J R R Tolkien",
        "isChecked": true
      },
      {
        "id": 18,
        "q": "Fiction is the truth inside the lie",
        "a": "Stephen King",
        "isChecked": true
      },
      {
        "id": 19,
        "q": "The best teacher is experience and not through someones distorted point of view",
        "a": "Jack Kerouac",
        "isChecked": true
      },
      {
        "id": 20,
        "q": "Freedom lies in being bold",
        "a": "Robert Frost",
        "isChecked": true
      },
      {
        "id": 21,
        "q": "Whatever you do in life, surround yourself with smart people wholl argue with you",
        "a": "John Wooden",
        "isChecked": true
      },
      {
        "id": 22,
        "q": "Be yourself, everyone else is already taken",
        "a": "Oscar Wilde",
        "isChecked": true
      },
      {
        "id": 23,
        "q": "If anything is worth doing, do it with all your heart",
        "a": "Buddha",
        "isChecked": true
      },
      {
        "id": 24,
        "q": "If you correct your mind, the rest of your life will fall into place",
        "a": "Lao Tzu",
        "isChecked": true
      },
      {
        "id": 25,
        "q": "True wealth is of the heart, not of the purse",
        "a": "Og Mandino",
        "isChecked": true
      },
      {
        "id": 26,
        "q": "Dream big and dare to fail",
        "a": "Norman Vaughan",
        "isChecked": true
      },
      {
        "id": 27,
        "q": "It is what we make out of what we have, not what we are given, that separates one person from another",
        "a": "Nelson Mandela",
        "isChecked": true
      },
      {
        "id": 28,
        "q": "We turn not older with years but newer every day",
        "a": "Emily Dickinson",
        "isChecked": true
      },
      {
        "id": 29,
        "q": "To lead the people, walk behind them",
        "a": "Laozi",
        "isChecked": true
      },
      {
        "id": 30,
        "q": "Never do to others what you would not like them to do to you",
        "a": "Confucius",
        "isChecked": true
      },
      {
        "id": 31,
        "q": "The real meditation is how you live your life",
        "a": "Jon Kabat Zinn",
        "isChecked": true
      },
      {
        "id": 32,
        "q": "Just do the best you can. No one can do more than that",
        "a": "John Wooden",
        "isChecked": true
      },
      {
        "id": 33,
        "q": "Opportunity is missed by most people because it is dressed in overalls and looks like work",
        "a": "Thomas Edison",
        "isChecked": true
      },
      {
        "id": 34,
        "q": "If you want to see things just as they are, then you yourself must practice just as you are",
        "a": "Dogen",
        "isChecked": true
      },
      {
        "id": 35,
        "q": "Most people fail in life not because they aim too high and miss, but because they aim too low and hit",
        "a": "Les Brown",
        "isChecked": true
      },
      {
        "id": 36,
        "q": "If light is in your heart, you will find your way home",
        "a": "Rumi",
        "isChecked": true
      },
      {
        "id": 37,
        "q": "Blessed is he who expects nothing, for he shall never be disappointed",
        "a": "Alexander Pope",
        "isChecked": true
      },
      {
        "id": 38,
        "q": "What you become is far more important than what you get",
        "a": "Jim Rohn",
        "isChecked": true
      },
      {
        "id": 39,
        "q": "Its not what we do once in a while that shapes our lives, but what we do consistently",
        "a": "Tony Robbins",
        "isChecked": true
      },
      {
        "id": 40,
        "q": "The secret of happiness is not in doing what you like but in liking what you have to do",
        "a": "Sathya Sai Baba",
        "isChecked": true
      },
      {
        "id": 41,
        "q": "In life you need either inspiration or desperation",
        "a": "Tony Robbins",
        "isChecked": true
      },
      {
        "id": 42,
        "q": "The truth is not for all men, but for those who seek it",
        "a": "Ayn Rand",
        "isChecked": true
      },
      {
        "id": 43,
        "q": "I wasnt brave I just didnt have time to be scared",
        "a": "Amelia Earhart",
        "isChecked": true
      },
      {
        "id": 44,
        "q": "Peace begins with a smile",
        "a": "Mother Teresa",
        "isChecked": true
      },
      {
        "id": 45,
        "q": "Be, dont try to become",
        "a": "Osho",
        "isChecked": true
      },
      {
        "id": 46,
        "q": "To improve is to change, so to be perfect is to change often",
        "a": "Winston Churchill",
        "isChecked": true
      },
      {
        "id": 47,
        "q": "The first rule of handling conflict is dont hang around people who are constantly engaging in conflict",
        "a": "Naval Ravikant",
        "isChecked": true
      },
      {
        "id": 48,
        "q": "Faithless is he that says farewell when the road darkens",
        "a": "J R R Tolkien",
        "isChecked": true
      },
      {
        "id": 49,
        "q": "Let us rather run the risk of wearing out than rusting out",
        "a": "Theodore Roosevelt",
        "isChecked": true
      },
      {
        "id": 50,
        "q": "Failure is feedback. Learn from it and move on",
        "a": "Jack Butcher",
        "isChecked": true
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