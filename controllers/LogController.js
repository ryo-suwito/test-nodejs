var db = require("../models/index")
var moment = require('moment')
const { Sequelize, Op } = require('sequelize');

const getByLocation = function(req){
    return new Promise(async (res)=>{
        console.log(req.params.location_id)
        console.log(req.query)
        product = req.query.product ? req.query.product.replace(/['"]+/g, '') : 'Indomie Goreng'
        var stock = null
        stock = await db.Stocks.findOne(
            {
                raw:true,
                include: [{ model: db.Locations }],
                where:{
                    LocationId: req.params.location_id,
                    product: {
                        [Op.like]: '%' + product + '%'
                    }
                },
                attributes: ['id', 'product', 'quantity', 
                    [Sequelize.literal('"Location"."name"'), 'location_name']]
            }
        ).catch((err)=>{
            console.log(err)
        });
        if(stock){
            var logs = await db.Logs.findAll(
                {
                    order: [
                        ['id', 'DESC']
                    ],
                    where: {
                        LocationId: req.params.location_id,
                        StockId: stock.id
                    },
                    raw: true,
                    attributes: ['id', 'type', 
                    ['createdAt',  'created_at'],
                    'adjustment', 'quantity' ]
                }
            ); 
            logs = logs.map(function (log) {
                log.created_at = moment(log.created_at).format('DD-MM-YYYY HH:mm:ss');
                return log;
            });
            result = {
              location_id: req.params.location_id,
              location_name: stock.location_name,
              product: stock.product,
              current_qty: stock.quantity,
              logs: logs
            };
        } else {
            result = {
                location_id: req.params.location_id,
                logs: null
              };
        }
        res(result)
    }, (rej)=>{
        rej("error")
    })
}

module.exports = { getByLocation }