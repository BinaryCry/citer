'use strict';

var _graphql = require('graphql');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var express = require('express');
var graphqlHTTP = require('express-graphql');


var schema = (0, _graphql.buildSchema)('\n    type Query {\n        nickname: String!,\n        stat: [Int!],\n        kda: Float\n    }\n');

var root = {
    nickname: function nickname() {
        return 'F@rm05';
    },
    stat: function stat() {
        return [11, 3, 7].map(function (item) {
            return item;
        });
    }
};

var LolGamer = function LolGamer(nickname, kda) {
    _classCallCheck(this, LolGamer);

    this.nickname = nickname ? nickname : 'noname';
    this.kda = kda;
};

var BinaryCry = new LolGamer();
console.log(BinaryCry.nickname);

var app = express();

app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
}));

app.listen(4000, function () {
    console.log('Running a GraphQL API server at localhost:4000/graphql');
});

