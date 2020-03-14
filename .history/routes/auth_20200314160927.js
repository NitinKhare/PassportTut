var express = require('express');
var router = express.Router();
require('dotenv').config()

router.get('/:provider', function(req, res){
    res.send(req.params.provider+" "E);
})


module.exports  = router;