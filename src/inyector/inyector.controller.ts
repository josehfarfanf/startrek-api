import { Router } from "express";
import { NewInyectorEntry } from "../types";
import toNewInyectorEntry, { toValidNumber, toValidPercentage } from "../util";
import InyectorService from "./inyector.service";

export default class InyectorController{
    inyectorService:InyectorService
    router:Router

    constructor(inyectorService:InyectorService){
        this.inyectorService=inyectorService;
        this.router= Router()
    }   

    routes(){
        this.router.get('/', (_req,res)=>{
            res.send(this.inyectorService.getInyectors())
        })
        
        this.router.get('/:id', (req,res)=>{
            const inyector=this.inyectorService.findById(+req.params.id)
            return inyector
                ?res.send(inyector)
                :res.sendStatus(404)
            
        })
        
        this.router.post('/', (req,res)=>{
            try {
                const newIntectorEntry:NewInyectorEntry=toNewInyectorEntry(req.body);
                const newInyector=this.inyectorService.addInyector(newIntectorEntry);
                res.json(newInyector);    
            } catch (e) {
                res.status(400).send(e.message)
            }   
            
        })
        
        this.router.put('/updateDamagePercentage/:id', (req,res)=>{
            try {
                console.log('req.body',req.body)
                const newIntectvalidPercentageDamageorEntry:number=toValidPercentage(req.body);
                const newInyector=this.inyectorService.updateDamagePercentage(+req.params.id,newIntectvalidPercentageDamageorEntry);
                res.json(newInyector);    
            } catch (e) {
                res.status(400).send(e.message)
            }   
            
        })
        
        this.router.get('/calcFlow/:expectedSpeed', (req,res)=>{
            try {
                console.log('req.body',req.body)
                const expectedSpeed:number=toValidNumber(+req.params.expectedSpeed);
                const newInyector=this.inyectorService.calculateFlow(expectedSpeed);
                res.json(newInyector);    
            } catch (e) {
                res.status(400).send(e.message)
            }   
            
        })
        return this.router;
    }
}