import { NewInyectorEntry } from "./types";

const parseName=(nameFromRequest:any):string=>{
    if (!isString(nameFromRequest)){
        throw new Error ('Incorrect or missing name')
    }
    return nameFromRequest;
}

const isString =(string:any):boolean=>{
    console.log(typeof string)
    return typeof string=='string'
}

const parseDamagePercentage=(damagePercentageFromRequest:any):number=>{
    if (!isNumber(damagePercentageFromRequest)){
        throw new Error ('Incorrect or missing percentage')
    }
    if (damagePercentageFromRequest>100 || damagePercentageFromRequest<0){
        throw new Error ('Incorrect value to damage percentage')
    }
    return damagePercentageFromRequest;
}


const isNumber =(number:any):boolean=>{
    return typeof number=='number'
}

const toNewInyectorEntry= (object:any):NewInyectorEntry =>{
    const newEntry : NewInyectorEntry={
        name:parseName(object.name),
        damagePercentage:parseDamagePercentage(object.damagePercentage)
    } 

    return newEntry;
}

const toValidPercentage= (object:any):number =>{
    const validPercentage : number=parseDamagePercentage(object);
    return validPercentage;
}

const toValidNumber= (object:any):number =>{
    if (!isNumber(object)){
        throw new Error ('Incorrect or missing number')
    }
    return object;
}

export default toNewInyectorEntry
export {toValidPercentage,toValidNumber}