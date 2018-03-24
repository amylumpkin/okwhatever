const express      = require("express");
const port         = process.env.PORT || 8080; // Initialize the port
const app          = express();                // Initializes express
const bodyParser   = require("body-parser");
const path         = require("path");
const exphbs       = require("express-handlebars");
const env          = require('dotenv').config();
const jwt          = require('jsonwebtoken');
const cookieParser = require('cookie-parser')
const db          = require("./models");

db.sequelize.sync().then(function(){
  app.listen(port, ()=> console.log(`listening on port ${port}`)); // I hear you, dog
})

app.use( bodyParser.urlencoded({ extended: false })     ); 
app.use( bodyParser.json()                              );
app.use( express.static(path.join(__dirname, 'public')) );
app.use( cookieParser()                                 );


app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.get('/login',(req,res)=>{

    res.sendFile( path.join(__dirname + `/public/login.html`));

});

require('./routes/authRoutes.js')(app,jwt);

app.get('/test',(req,res)=>{

    res.send(req.user_data);
    
});

app.get('/foo',(req,res)=>{

    res.send(req.user_data);    

});
