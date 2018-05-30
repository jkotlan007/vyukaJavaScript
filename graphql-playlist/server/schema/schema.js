const graphql = require('graphql');
const _ = require('lodash');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList
} = graphql;

let books = [
    {name:'Saturnin', genre:'Komedie', id:'1', authorid:'1'},
    {name:'Star wars', genre:'Komedie', id:'2', authorid:'2'},
    {name:'Pejsek a kočička', genre:'Pohádka', id:'3', authorid:'3'},
    {name:'Století', genre:'Komedie', id:'4', authorid:'3'}
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
        genre:{type:GraphQLString},
        author:{
            type:AuthorType,
            resolve(parent,args){
                console.log(parent);
                return _.find(authors, {id: parent.authorid});
            }
        }
    })
});

const AuthorType = new GraphQLObjectType({
    name:'Author',
    fields:() => ({
        id:{type:GraphQLID},
        name: {type:GraphQLString},
        age:{type:GraphQLInt},
        books:{
            type: new GraphQLList(BookType),
            resolve(parent,args){
                return _.filter(books, {authorid:parent.id});
            }
        }
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