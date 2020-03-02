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
app.use(cookieParser())
app.use('/api/v1/users', users);


/*************** Routes *******************/

app.use('/api/user', authRoute);


/*************** Error Handlers *******************/

// 404 catch-all handler (middleware)
app.use(function(req, res, next){
	res.status(404);
	res.render('404');
});

// 500 error handler (middleware)
app.use(function(err, req, res, next){
	console.error(err.stack);
	res.status(500);
	res.json('500');
});
const port = process.env.PORT || 3000;
app.set('port', port);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});