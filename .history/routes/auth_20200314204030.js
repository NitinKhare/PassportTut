var express = require('express');
var router = express.Router();
require('dotenv').config()

router.get('/:provider', function(req, res){
    switch (req.params.provider){
        case 'google' : res.send("Its google")
        default :res.send("NOT FOUND")
    }
})


module.exports  = router;