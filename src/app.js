const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const viewsPath = path.join(__dirname, './templates/views')
const partialsPath = path.join(__dirname, './templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath )
hbs.registerPartials(partialsPath)

app.use(express.static(path.join(__dirname,'../Public')))


app.get('', (req,res)=>{
    res.render('index', {
        title: 'moi weathr',
        name: 'deejay'
    })
})
app.get('/about', (req,res)=>{
    res.render('about', {
        title: 'loi weathr',
        name: 'rana'
    })
})
app.get('/help', (req, res)=>{
    res.render('help', {
        message: 'chaman chu ke lulu be tutu lanunun sanuna makarunu',
        title: 'koi weathr',
        name: 'Scooby'
    })
})



app.get('/weather', (req, res)=>{

    if(!req.query.address){
       return res.send({
            error:"Enter address for weather search"
        })
    }
    geocode(req.query.address, (error,{Latitude, Longitude, Location}={})=>{
        if(error){
           return res.send({error})//added error in object cause in JS js file .json wont be able to parse error
        }

        forecast(Latitude,Longitude,Location, (error, data)=>{
            if(error){
                return res.send("Location data incorrect")
            }
            res.send( {
                Weather_Descrip : data.Weather_Descrip,
                Temperature : data.Temperature,
                Address : data.Location
            })
            
        })
    })
    console.log(req.query)
})

app.get('/products', (req, res)=>{
    if(!req.query.search){
        res.send({
            error:"Must provide search"
        })
    }else{
        console.log(req.query)
        res.send({
        products:[]
    })
    }
})


app.listen(3000, ()=>{
    console.log('server has started')
})


// console.log(__dirname)
// console.log(path.join(__dirname,'../Public'))

// app.get('', (req,res)=>{
//     res.send("<h1>my node sdkjc site</h1>")
// })

// app.get('/help', (req, res)=>{
//     res.send([{
//         name: 'digvijay'},
//         {age : 28
//     }])
// })

// app.get('/about', (req, res)=>{
//     res.send("<h1>my About page</h1>")
// })
