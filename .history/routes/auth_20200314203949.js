var express = require('express');
var router = express.Router();
require('dotenv').config()

router.get('/:provider', function(req, res){
    res.send(req.params.provider);
    switch (req.params.provider)
})


module.exports  = router;