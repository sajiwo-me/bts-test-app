if (process.env.NODE_ENV != 'production') {require('dotenv').config()}
const express = require('express');
const mongoose = require('mongoose');




const app = express();

// setting app
app.use(express.json());
app.use(express.urlencoded({extended: true}));





// import routes
const UserRoutes = require('./routes/user/user-routes');
const ShoppingRoutes = require('./routes/shopping/shopping-routes');




app.use('/api/users', UserRoutes);
app.use('/api/shopping', ShoppingRoutes);








// setting server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Running server in port ${PORT}`));



// setting database
const mongoOption = {
	useNewUrlParser: true,
	useUnifiedTopology: true
};
mongoose.connect(process.env.DATABASE_URL, mongoOption);
const db = mongoose.connection;
db.on('error', (err) => console.log("Can't connect into database with mongoose"));
db.once('open', () => console.log(`Connected into database with mongoose`));
