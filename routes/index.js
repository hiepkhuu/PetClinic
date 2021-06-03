var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', async (req, res, next)=> {
  // const answers = await Answer.findAll({
  //   order: [['creattedAt', 'DESC']]
  // })


  res.render('index', {  });
});

module.exports = router;
