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

graphql(schema,
    `{
        hello,
        person{
            name
        },
        value
    }`,
    root).then((response) => {
    console.log(response);
});
