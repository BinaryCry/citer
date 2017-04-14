let express = require('express');
let graphqlHTTP = require('express-graphql');
import { buildSchema } from 'graphql';

let schema = buildSchema(`
    type Query {
        nickname: String!,
        stat: [Int!],
        kda: Float
    }
`);

let root = {
    nickname: () => 'F@rm05',
    stat: () => [11,3,7].map( item => item )
};


class LolGamer {
    constructor(nickname, kda) {
        this.nickname = nickname ? nickname : 'noname';
        this.kda = kda ? kda : null;
    }

    /*18/4/11 in a game, you have a KDA of:

     (18 + 11 = 29) / 4 = 7.25.*/

}
let BinaryCry = new LolGamer();
console.log(BinaryCry.nickname);

const app = express();

app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
}));

app.listen(4000, function () {
    console.log('Running a GraphQL API server at localhost:4000/graphql');
});
