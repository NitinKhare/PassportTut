var express = require('express');
var router = express.Router();
require('dotenv').config()

router.get('/:provider', setAuthProvider, function(req, res){
    switch (req.params.provider){
        case 'google' : res.send("Its google"+process.env.GOOGLE_CLIENTID); break;
        case 'twitter' : res.send("Its twitter"); break;
        case 'facebook' : res.send("Its fb"); break;
        default       :      res.send("NOT FOUND")
    }
})

var setAuthProvider = (req, res, next)=>{
    if(req.params.provider == 'google'){
        next()
    }else{
        res.send(406)
    }
}


module.exports  = router;