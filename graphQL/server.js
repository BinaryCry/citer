let express = require('express');
let graphqlHTTP = require('express-graphql');
let { buildSchema } = require('graphql');

let schema = buildSchema(`
    type Query {
        hello: String,
        person: User
        value: String
    }
    
    type User {
        name: String
    }
`);

let root = {
    hello: () => 'Hello' + ' ' + 'world!',
    person: {
        name: () =>'Jack'
    },
    value: () => '255'
};

let query = `
    {
        hello,
        person{
            name
        },
        value
    }
`;

const app = express();

app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
}));

app.listen(4000, function () {
    console.log('Running a GraphQL API server at localhost:4000/graphql');
});