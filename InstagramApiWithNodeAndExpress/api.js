var express = require('express');
var app = express();
var ig = require('instagram-node').instagram();

//location of our static files(css,js,etc..)
app.use(express.static(__dirname + '/public'));

//set the view engine to use ejs
app.set('view engine', 'ejs');

ig.use({
    client_id: '9755779fdad94fd19cfbba62c9ac00ad',
    client_secret: 'e1dd2c61372e42049909d36dbd1dec5d'
});

//the redirect uri we set when registering our application
var redirectUri = 'http://localhost:8080/handleAuth';

app.get('/handleAuth', function(req, res){
    //retrieves the code that was passed along as a query to the '/handleAuth' route and uses this code to construct an access token
    ig.authorize_user(req.query.code, redirectUri, function(err, result){
        if(err) res.send( err );
    // store this access_token in a global variable called accessToken
        accessToken = result.access_token;
    // After getting the access_token redirect to the '/' route 
        res.redirect('/');
    });
})

app.get('/', function(req, res){
    // create a new instance of the use method which contains the access token gotten
     ig.use({
      access_token : accessToken
     });
 
     ig.user_media_recent(access_token.split('.')[0], function(err, result, pagination, remaining, limit) {
         if(err) res.json(err);
      // pass the json file gotten to our ejs template
         res.render('pages/index', { instagram : result });
     });
 });
 
 app.listen(app.get(8080));

