const express = require('express');
const serverless = require('serverless-http');
const app = express();
//const router = express.Router();
//const port = process.env.PORT || 8000;
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const userRoutes = express.Router();
//const PORT = 4000;
const Schema = mongoose.Schema;

//let User = require('./user.model');
let User = new Schema({
    user_name:{
        type:String
    },
    user_city:{
        type:String
    },
    user_phone: {
        type:Number
    },
    user_address: {
        type:String
    }
});

//For middleware
//app.use(cors());
app.use(bodyParser.json());

//mongoose.connect('mongodb://127.0.0.1:27017/users', { useNewUrlParser: true , useUnifiedTopology: true,});
mongoose.connect('mongodb+srv://dbuser:Ka14@cluster0.eowjo.mongodb.net/users?retryWrites=true&w=majority', { useNewUrlParser: true , useUnifiedTopology: true,});

const connection = mongoose.connection;

connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
})

//app.use('/users',userRoutes);
app.use('/.netlify/functions/server', userRoutes);
//router.get('/',(req,res)=>{
//res.send('Ka14');
//});
userRoutes.route('/users').get((req,res)=>{
    console.log("start user mongo inside")
    User.find((err, users)=>{
        if(err){
            console.log(err);
        } else{
            res.json(users);
        }
        
    });
});

userRoutes.route('/:id').get(function(req,res){
    let id= req.params.id;
    User.findById(id, function(err,user){
        res.json(user);
    });
});

userRoutes.route('/add').post(function(req,res){
    let user = new User(req.body); 
    user.save()
    .then(user=>{
        res.status(200).json({'user':'user added successfully'});
    })
    .catch(err =>{
        res.status(400).send('adding new user failed');
    });
});

userRoutes.route('/update/:id').post(function(req,res){
    User.findById(req.params.id, function(err,user){
        if(!user){
            res.status(404).send('data is not found');
        }else{
            user.name = req.body.name;
            user.city = req.body.city;
            user.phone = req.body.phone;
            user.address = req.body.address;

            user.save().then(user=>{
                res.json('User updated');
            })
            .catch(err =>{
                res.status(400).send("user not updated");
            });
    }});
});

//app.listen(PORT,()=>{
  //  console.log("Server is running on port: " + PORT);
//})




//routes
//router.get('/',(req,res)=>{
//res.send('Ka14');
//});

//routes

    
     // path must route to lambda
    //app.use('/', (req, res) => res.sendFile(path.join(__dirname, '../index.html')));
    module.exports=User=mongoose.model('User',User)
    module.exports =serverless(app);
    module.exports.handler  = serverless(app);
   // app.listen(port, () =>  { console.log(`server is running on port :${port}`)} ); 