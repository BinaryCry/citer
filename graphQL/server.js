let { graphql, buildSchema } = require('graphql');

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
    }`;

graphql(schema, query, root).then(
    (response) => {
        console.log(response);
    }
);