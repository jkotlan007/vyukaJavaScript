const graphql = require('graphql');
const _ = require('lodash');

const {GraphQLObjectType, GraphQLString, GraphQLSchema} = graphql;

let books = [
    {name:'Saturnin', genre:'Komedie', id:'1'},
    {name:'Star wars', genre:'Komedie', id:'2'},
    {name:'Pejsek a kočička', genre:'Pohádka', id:'3'}
];

const BookType = new GraphQLObjectType({
    name:'Book',
    fields:() => ({
        id:{type:GraphQLString},
        name: {type:GraphQLString},
        genre:{type:GraphQLString}
    })
});

const RootQuery = new GraphQLObjectType({
    name:'RootQueryType',
    fields:{
        book:{
            type: BookType,
            args:{id:{type: GraphQLString}},
            resolve(parent,args){
                //získání dat z databáze neno odjinud
            return _.find(books, {id: args.id})
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query:RootQuery
})