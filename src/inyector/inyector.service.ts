import { InyectorEntry, NewInyectorEntry } from "../types"
import InyectorRepository from "./inyector.repository"

export default class InyectorService{
    inyectorRepository :InyectorRepository

    constructor(inyectorRepository:InyectorRepository){
        this.inyectorRepository=inyectorRepository
    }

    getInyectors():InyectorEntry[]{
        return this.inyectorRepository.getInyectors()
    }

    findById(id:number):InyectorEntry| undefined{
        const entry= this.inyectorRepository.getInyectors().find(i=>i.id==id)
        return entry;
    }

    addInyector(newInyectorEntry:NewInyectorEntry):InyectorEntry{
        const newInyector:InyectorEntry={
            id:Math.max(...this.inyectorRepository.getInyectors().map(i=>i.id))+1,
            ...newInyectorEntry
        }
        
        this.inyectorRepository.getInyectors().push(newInyector)
        return newInyector
    }

    calculateFlow(expectedSpeed:number):any{
        const totalDamage=this.calculateTotalDamage();
        const availableInyectors=this.inyectorRepository.getInyectors().filter(i=>i.damagePercentage<100);
        const expectedFlowPerInyector=(this.inyectorRepository.getInyectors().length*expectedSpeed+totalDamage)/availableInyectors.length;
        if(expectedFlowPerInyector<=199){
            let res=availableInyectors.map(i=>i.name+": "+(expectedFlowPerInyector-i.damagePercentage)+ " mg/s");
            res.push(this.calcMaxTime(expectedFlowPerInyector))
            return res.reduce((previousValue, currentValue) => previousValue+", " + currentValue);
        } 
        return 'Unable to comply';
    }

    calcMaxTime(expectedFlowPerInyector:number):string{
        let minutes=100-(expectedFlowPerInyector-100);
        if(minutes>=100)
            return 'Infinite'
        return minutes+ ' minutes'
    }

    calculateTotalDamage(){
        const initialValue = 0;
        return this.inyectorRepository.getInyectors().filter(i=>i.damagePercentage<100).reduce((previousValue, currentValue) => previousValue + currentValue.damagePercentage,initialValue)
    }

    updateDamagePercentage(id:number, dapagePercentage:number):InyectorEntry | undefined{
        const entry= this.inyectorRepository.getInyectors().find(i=>i.id==id)
        if(!entry) return entry
        entry.damagePercentage=dapagePercentage
        return entry;
    }
}