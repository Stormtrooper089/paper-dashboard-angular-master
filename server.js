//Install express server
const express = require('express');
const path = require('/');

const app = express();

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/sitevankon'));

app.get('/*', function(req,res) {
    
res.sendFile(path.join(__dirname+'/dist/sitevankon/index.html'));
});

app.set( 'port', ( process.env.PORT || 8080 ));

// Start the app by listening on the default Heroku port
app.listen( app.get( 'port' ), function() {
    console.log( 'Node server is running on port ' + app.get( 'port' ));
    });