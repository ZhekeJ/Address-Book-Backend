const express = require('express')
const router = express.Router();

//clients model

const Clients = require('../../models/clients')

//get request
router.get('/', async (req, res) => {
    try {
        const clients = await Clients.find();
        if (!clients) throw Error('No Items')
        
        res.status(200).json(clients)
    } catch(err) {
        res.status(400).json({msg: err}) 
    }   
})

//get request by id
router.get('/:id', async (req, res) => {
    try {
        const client = await Clients.findById(req.params.id);
        if (!client) throw Error('No Items')
        
        res.status(200).json(client)
    } catch(err) {
        res.status(400).json({msg: err})
    }   
})

//posts request
router.post('/', async (req, res) => {
    const newClient = new Clients(req.body)
    try {
        const client = await newClient.save()
        if (!client) throw Error('something went wrong')
        
        res.status(200).json(client)
    } catch(err) {
        res.status(400).json({msg: err})
    }
})

//delete request
router.delete('/:id', async (req, res) => {
    try {
        const client = await Clients.findByIdAndDelete(req.params.id)
        if (!client) throw Error('No client found')

          res.status(200).json({success: true})
    } catch(err) {
        res.status(400).json({msg: err})
    }   
})

//update request
router.patch('/:id', async (req, res) => {
    try {
        const client = await Clients.findByIdAndUpdate(req.params.id, req.body)
        if (!client) throw Error('Something went wrong when updating client')

          res.status(200).json({success: true})
    } catch(err) {
        res.status(400).json({msg: err})
    } 
})

module.exports = router