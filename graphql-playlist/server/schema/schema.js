const graphql = require('graphql');
const _ = require('lodash');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID
} = graphql;

let books = [
    {name:'Saturnin', genre:'Komedie', id:'1'},
    {name:'Star wars', genre:'Komedie', id:'2'},
    {name:'Pejsek a kočička', genre:'Pohádka', id:'3'}
];

const BookType = new GraphQLObjectType({
    name:'Book',
    fields:() => ({
        id:{type:GraphQLID},
        name: {type:GraphQLString},
        genre:{type:GraphQLString}
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
        }
    }
})

module.exports = new GraphQLSchema({
    query:RootQuery
})