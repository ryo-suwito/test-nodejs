var express = require('express');
var router = express.Router();

var { getByLocation } = require('../controllers/LogController');
var { getAllStocks, adjustment } = require('../controllers/StockController');

/* GET users listing. */
router.get('/stock', function(req, res, next) {
  getAllStocks().then((data)=>{
    result = {
      status_code : "200",
      status_message : "Success",
      stocks: data
    };
    res.json(result);
  })
});

router.post('/adjustment', function(req, res, next) {
  adjustment(req).then((data)=>{
    var adjusted = data.adjusted_count
    var data = data.adjusted
    result = {
      status_code : "200",
      requests : req.body.length,
      adjusted : adjusted,
      results: data
    };
    res.json(result);
  })
});
router.get('/logs/:location_id', function(req, res, next) {
  getByLocation(req).then((data)=>{
    if(data.logs){
      result = {
        status_code : "200",
        status_message : "Success, logs found",
        location_id: data.location_id,
        location_name: data.location_name,
        product: data.product,
        current_qty: data.current_qty,
        logs: data.logs
      };
    } else {
      result = {
        status_code : "200",
        status_message : "Failed, logs not found",
        location_id: data.location_id
      };
    }
    res.json(result);
  })
}); 
module.exports = router;
