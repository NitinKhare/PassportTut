var express = require('express');
var router = express.Router();

router.get('/:provider', function(req, res){
    res.send(req.params.provider)
})


module.exports  = router;