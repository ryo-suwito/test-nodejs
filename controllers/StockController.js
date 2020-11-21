var db = require("../models/index")
var moment = require('moment')
const Sequelize = require('sequelize');

const getAllStocks = function(){
    return new Promise(async (res)=>{
        const stocks = await db.Stocks.findAll(
            {
                order: [
                    ['id', 'DESC'],
                ],
                include: [{ attributes: [], model: db.Locations }],
                attributes: ['id', 'product', 'quantity', [Sequelize.literal('"Location"."name"'), 'location']]
            }
        );
        res(stocks)
    }, (rej)=>{
        rej("error")
    })
}
function returnInvalid(el){
    return {
        status: "Failed",
        error_message: "Invalid Product",
        updated_at: moment().format('DD-MM-YYYY HH:mm:ss'),
        location_id: el.location_id
    }
}
const adjustment = function(req){
    return new Promise((resolve)=>{
        data = req.body
        console.log("received \n", data)
        stocks = []
        adjusted_count = 0
        data.forEach(async (el) => {
            var stock = 0
            stock = await db.Stocks.findOne(
                {
                    where: {
                        LocationId: el.location_id,
                        product:el.product
                    },
                    raw:true,
                    attributes: ['quantity']
                }
            ).catch((err)=>{
                console.log(err)
            })
            if(stock) {
                var newQuantity = stock.quantity + el.adjustment
                newQuantity = newQuantity > 0 ? newQuantity : 0
                var updated = 0
                updated = await db.Stocks.update({
                    quantity: newQuantity
                },{
                    where:{
                        LocationId:el.location_id,
                        product: el.product
                    }
                }).catch((err)=>{
                    console.log(err)
                })
                if(updated){
                    var updated_stock = await db.Stocks.findOne(
                        {
                            include: [{ attributes: [], model: db.Locations }],
                            where: {
                                LocationId: el.location_id,
                                product:el.product
                            },
                            raw:true,
                            attributes: ['id', 'product', ['quantity', 'stock_quantity'], ['updatedAt', 'updated_at'], 
                                [Sequelize.literal('"Location"."name"'), 'location_name'],
                                [Sequelize.literal('"Location"."id"'), 'location_id']]
                        }
                    ) 
                    updated_stock.updated_at = moment(updated_stock.updated_at).format('DD-MM-YYYY HH:mm:ss');
                    updated_stock.status = "Success"
                    updated_stock.adjustment = el.adjustment
                    stocks.push(updated_stock)
                    response_log = await db.Logs.insertLog(updated_stock)
                    console.log("insert log", response_log)
                    adjusted_count += 1
                }
                else {
                    failed = returnInvalid(el)
                    stocks.push(failed)
                }
            } else {
                failed = returnInvalid(el)
                stocks.push(failed)
            }
            if(stocks.length == data.length){
                resolve(
                    { 
                        adjusted : stocks,
                        adjusted_count : adjusted_count
                    }
                )
            }
        })
    }, (rej)=>{
        rej("error")
    })
}
module.exports = { getAllStocks, adjustment }