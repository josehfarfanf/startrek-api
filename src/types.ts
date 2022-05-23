

export interface InyectorEntry {
    id:number,
    name:string,
    damagePercentage:number
}

export type NewInyectorEntry= Omit<InyectorEntry,'id'>