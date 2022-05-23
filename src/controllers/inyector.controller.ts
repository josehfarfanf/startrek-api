
import { InyectorEntry, NewInyectorEntry } from '../types';
import inyectorData from './inyectors.json';


const inyectors:InyectorEntry[]=inyectorData as InyectorEntry[];

export const getInyectors = ():InyectorEntry[] => inyectors;

export const findById = (id:number):InyectorEntry | undefined => {
    const entry= inyectors.find(i=>i.id==id)
    return entry;
}

export const updateDamagePercentage = (id:number, dapagePercentage:number):InyectorEntry | undefined => {
    const entry= inyectors.find(i=>i.id==id)
    if(!entry) return entry
    entry.damagePercentage=dapagePercentage
    return entry;
}



export const addInyector=(newInyectorEntry:NewInyectorEntry):InyectorEntry=>{
    const newInyector:InyectorEntry={
        id:Math.max(...inyectors.map(i=>i.id))+1,
        ...newInyectorEntry
    }
    
    inyectors.push(newInyector)
    return newInyector
}

export const calculateFlow = (expectedSpeed:number):any => {    
    const totalDamage=calculateTotalDamage();
    const availableInyectors=inyectors.filter(i=>i.damagePercentage<100);
    const expectedFlowPerInyector=(3*expectedSpeed+totalDamage)/availableInyectors.length
    return availableInyectors.map(i=>i.id+" "+(expectedFlowPerInyector-i.damagePercentage));
}

const calculateTotalDamage=():number=>{
    const initialValue = 0;
    return inyectors.filter(i=>i.damagePercentage<100).reduce((previousValue, currentValue) => previousValue + currentValue.damagePercentage,initialValue)
}

