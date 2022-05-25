import { InyectorEntry } from "../types";
import inyectorData from './inyectors.json';

export default class InyectorRepository{
    inyectors:InyectorEntry[]=inyectorData as InyectorEntry[]

    getInyectors():InyectorEntry[]{
        return this.inyectors;
    }

}