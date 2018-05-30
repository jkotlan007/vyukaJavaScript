const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb://jarda:test1234@ds261929.mlab.com:61929/gql-jqrda')
mongoose.connection.once('open',()=>{
    console.log('připojeno k databázi');
})

app.use('/graphql',graphqlHTTP({
    schema:schema,
    graphiql:true
}))

app.listen(4000,()=> {
    console.log('Nyní posloucháme na portu 4000');
})