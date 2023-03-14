const express=require('express')
const  Router=express.Router()
const personController=require('../controllers/personController')

Router.get('/',personController.index)
Router.post('/show',personController.show)
Router.post('/showperson',personController.showperson)
Router.post('/showfavouritefood',personController.showfavouritefood)
Router.post('/store',personController.store)
Router.post('/rfes',personController.rfes)
Router.post('/addgroup',personController.storemany)
Router.put('/update',personController.update)
Router.delete('/delete',personController.destroy)
Router.delete('/deleteall',personController.deleteall)
Router.get('/tri',personController.tri)



module.exports=Router