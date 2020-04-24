const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const users = require('./routes/users');
const authRoute = require('./routes/auth');
const app = express();
require('./models/db');

/*************** Middleware *******************/

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());



/*************** Routes *******************/

app.use('/api/users', users);
app.use('/api/auth', authRoute);


/*************** Error Handlers *******************/

// 404 catch-all handler (middleware)
app.use(function(req, res, next){
	res.status(404).send();
});

// 500 error handler (middleware)
app.use(function(err, req, res, next){
	console.error(err.stack);
	res.json({"Error":{"status":500, "error":err}});
});
const port = process.env.PORT || 3000;
app.set('port', port);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});