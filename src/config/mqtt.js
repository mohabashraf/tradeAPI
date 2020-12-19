var mqtt = require('mqtt')
const flatted =  require('flatted')
var client  = mqtt.connect('mqtt://localhost:1883')
let stocks = {}
let highestPriceWithInHour 
let lowestPriceWithInHour  
let highestPriceWithInDay  
let lowestPriceWithInDay      
const cron = require('node-cron');
 
// cron.schedule('* * * * *', () => {
//   console.log('running a task every minute');
// });
client.on('connect', function () {
  client.subscribe('thndr-trading', (err) => {
    console.log(err)
  })
})

client.on('message', function (topic, message) {
  // message is Buffer
  const stock = JSON.parse(message.toString())
  cron.schedule('0 0 */1 * * *', () => {
    if (stocks[stock.stock_id] !== undefined){
      stocks[stock.stock_id]["highestPriceWithInHour"] = 0
      stocks[stock.stock_id]["lowestPriceWithInHour"] = Number.MAX_SAFE_INTEGER
    }
  });

  cron.schedule('0 0 * */1 * *', () => {
    if (stocks[stock.stock_id] !== undefined){
      stocks[stock.stock_id]["highestPriceWithInDay"] = 0
      stocks[stock.stock_id]["lowestPriceWithInDay"] = Number.MAX_SAFE_INTEGER
    }
  });
  if(Object.keys(stocks).length !== 0 && stocks.constructor === Object && stocks[stock.stock_id] !== undefined){
    highestPriceWithInHour =  stocks[stock.stock_id]["highestPriceWithInHour"]
    lowestPriceWithInHour =  stocks[stock.stock_id]["lowestPriceWithInHour"] 
    highestPriceWithInDay =  stocks[stock.stock_id]["highestPriceWithInDay"] 
    lowestPriceWithInDay =  stocks[stock.stock_id]["lowestPriceWithInDay"]      
  }

  stocks[stock.stock_id] = stock
  stocks[stock.stock_id]["highestPriceWithInHour"] = highestPriceWithInHour > stock.price ? highestPriceWithInHour: stock.price
  stocks[stock.stock_id]["lowestPriceWithInHour"] = lowestPriceWithInHour < stock.price ? lowestPriceWithInHour: stock.price
  stocks[stock.stock_id]['highestPriceWithInDay'] = highestPriceWithInDay > stock.price ? highestPriceWithInDay: stock.price
  stocks[stock.stock_id]['lowestPriceWithInDay'] = lowestPriceWithInDay < stock.price ? lowestPriceWithInDay: stock.price
})


exports.stocks = stocks;