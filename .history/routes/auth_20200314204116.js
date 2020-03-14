var express = require('express');
var router = express.Router();
require('dotenv').config()

router.get('/:provider', function(req, res){
    switch (req.params.provider){
        case 'google' : res.send("Its google"); break;
        case 'google' : res.send("Its google"); break;
        case 'google' : res.send("Its fb"); break;
        default       :      res.send("NOT FOUND")
    }
})


module.exports  = router;