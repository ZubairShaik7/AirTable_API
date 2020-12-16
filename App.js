const express = require('express')
const path = require('path')
const base = require('airtable').base('app3MeVZXAIdNe3hq')
const app = express()
app.set('view engine', 'pug')
app.set('views', path.join(__dirname, '.'))

let records 

app.get('/', (req,res) => {
    if(records) {
        console.log('cached')
        res.render('page', {
            records
        })
    } else {
    (async () => {
        const records = await base('Business Hours')
          .select({
            view: 'Grid view',
          }).firstPage()
    
          for (const record of records) {
            console.log(record.get('Day'), record.get('Hours'))
          }

          res.render('page', {
            records
        })
      })()}   
})
setTimeout(() => {
    records = null
}, 10000)

app.listen(3000, () => {console.log('Server Ready')})



  