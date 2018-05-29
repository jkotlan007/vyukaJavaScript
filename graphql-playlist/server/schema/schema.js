const graphql = require('graphql');
const _ = require('lodash');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt
} = graphql;

let books = [
    {name:'Saturnin', genre:'Komedie', id:'1'},
    {name:'Star wars', genre:'Komedie', id:'2'},
    {name:'Pejsek a kočička', genre:'Pohádka', id:'3'}
];

let authors = [
    {name:'Zdeněk Jirotka', age:'56', id:'1'},
    {name:'Han Solo', age:'127', id:'2'},
    {name:'Karel Čapek', age:'36', id:'3'}
]

const BookType = new GraphQLObjectType({
    name:'Book',
    fields:() => ({
        id:{type:GraphQLID},
        name: {type:GraphQLString},
        genre:{type:GraphQLInt}
    })
});

const AuthorType = new GraphQLObjectType({
    name:'Author',
    fields:() => ({
        id:{type:GraphQLID},
        name: {type:GraphQLString},
        age:{type:GraphQLString}
    })
});

const RootQuery = new GraphQLObjectType({
    name:'RootQueryType',
    fields:{
        book:{
            type: BookType,
            args:{id:{type: GraphQLID}},
            resolve(parent,args){
                //získání dat z databáze neno odjinud
                console.log(typeof(args.id));
            return _.find(books, {id: args.id})
            }
        },
        author:{
            type: AuthorType,
            args:{id:{type:GraphQLID}},
            resolve(parent,args){
                return _.find(authors, {id:args.id})
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query:RootQuery
})