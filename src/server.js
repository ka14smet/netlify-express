const express = require('express');
const serverless = require('serverless-http');
const app = express();
const router = express.Router();
//const port = process.env.PORT || 8000;

//routes
router.get('/',(req,res)=>{
res.send('we are on home');
});

//routes

    
    app.use('/.netlify/functions/server', router);  // path must route to lambda
    //app.use('/', (req, res) => res.sendFile(path.join(__dirname, '../index.html')));

    module.exports.handler  = serverless(app);
   // app.listen(port, () =>  { console.log(`server is running on port :${port}`)} ); 