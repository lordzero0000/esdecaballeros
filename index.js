const 
  Twitter = require('twitter'),
  cron = require('node-cron'),
  client = new Twitter({
    consumer_key: process.env.CONSUMER_KEY,
    consumer_secret: process.env.CONSUMER_SECRET,
    access_token_key: process.env.TOKEN_KEY,
    access_token_secret: process.env.TOKEN_SECRET,
  }),
  quotes = [
    "ayudar a la comunidad",
    "no tocar las cosas de los demas",
    "usar todo mi Cosmos para llegar al fin de mi semana escolar",
    "pensar antes de actuar",
    "cooperar con el dinero para las pizzas",
    "invitar los chicles cuando tienes"
  ],
  postTweet = (tweet) => {
    var promise = new Promise((resolve, reject) => {
      var opts = { status: tweet }
      client.post('statuses/update', opts, (error, tweet, response) => {
        if (error) { return reject(error) }
        return resolve(response.body)
      })
    })
    return promise
  }

cron.schedule('0 41 * * * *', () => {
  postTweet(`#EsDeCaballeros ${quotes[Math.floor(Math.random() * quotes.length)]} @MiCanal5 @Online_DAM`)
  .then(res => {
    console.log('Just posted! :' + res)
  }).catch(err => {
    console.log(err)
  })
})