const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
// GraphQL schema
const schema = buildSchema(`
    type Query {
        course(id: Int!): Course
        courses(topic: String): [Course]
        fav(id: Int!): Fav
        favorites(topic: String): [Fav]
    },
    type Mutation {
        updateCourseTopic(id: Int!, topic: String!): Course
        updateFavTopic(id: Int!, topic: String!): Fav
    }
    type Course {
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

const coursesData = [
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
// Get Function
const getCourse = function(args) { 
    const id = args.id;
    return coursesData.filter(course => {
        return course.id == id;
    })[0];
}
// Get Multiple Func
const getCourses = function(args) {
    if (args.topic) {
        const topic = args.topic;
        return coursesData.filter(course => course.topic === topic);
    } else {
        return coursesData;
    }
}
// Update Function
const updateCourseTopic = function({id, topic}) {
    coursesData.map(course => {
        if (course.id === id) {
            course.topic = topic;
            return course;
        }
    });
    return coursesData.filter(course => course.id === id)[0];
}
const getFav = function(args) { 
    const id = args.id;
    return favoritesData.filter(fav => {
        return fav.id == id;
    })[0];
}
const getFavorites = function(args) {
    if (args.topic) {
        const topic = args.topic;
        return favoritesData.filter(fav => fav.topic === topic);
    } else {
        return favoritesData;
    }
}
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
    course: getCourse,
    courses: getCourses,
    updateCourseTopic: updateCourseTopic,
    fav: getFav,
    favorites: getFavorites,
    updateFavTopic: updateFavTopic
};
// Create an express server and a GraphQL endpoint
const app = express();
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
}));
app.listen(4000, () => console.log('Express GraphQL Server Now Running On localhost:4000/graphql'));