import { NewInyectorEntry } from './../types';
import toNewInyectorEntry, { toValidPercentage,toValidNumber } from '../util'


import expres from 'express'
import * as inyectorController from '../controllers/inyector.controller'

const router = expres.Router()

router.get('/', (_req,res)=>{
    res.send(inyectorController.getInyectors())
})

router.get('/:id', (req,res)=>{
    const inyector=inyectorController.findById(+req.params.id)
    return inyector
        ?res.send(inyector)
        :res.sendStatus(404)
    
})

router.post('/', (req,res)=>{
    try {
        const newIntectorEntry:NewInyectorEntry=toNewInyectorEntry(req.body);
        const newInyector=inyectorController.addInyector(newIntectorEntry);
        res.json(newInyector);    
    } catch (e) {
        res.status(400).send(e.message)
    }   
    
})

router.put('/updateDamagePercentage/:id', (req,res)=>{
    try {
        console.log('req.body',req.body)
        const newIntectvalidPercentageDamageorEntry:number=toValidPercentage(req.body);
        const newInyector=inyectorController.updateDamagePercentage(+req.params.id,newIntectvalidPercentageDamageorEntry);
        res.json(newInyector);    
    } catch (e) {
        res.status(400).send(e.message)
    }   
    
})

router.get('/calcFlow/:expectedSpeed', (req,res)=>{
    try {
        console.log('req.body',req.body)
        const expectedSpeed:number=toValidNumber(+req.params.expectedSpeed);
        const newInyector=inyectorController.calculateFlow(expectedSpeed);
        res.json(newInyector);    
    } catch (e) {
        res.status(400).send(e.message)
    }   
    
})

export default router