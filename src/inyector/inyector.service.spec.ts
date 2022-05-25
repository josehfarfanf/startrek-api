
import InyectorRepository from './inyector.repository';
import InyectorService from './inyector.service';

const inyectorData = require('./inyectors.json')

describe('inyectors',()=>{

    let inyectorService:InyectorService;

    beforeEach(() => {
        inyectorService = new InyectorService(new InyectorRepository());
    });

    test('should get inyectors',()=>{
        const expected=inyectorData.length;
        const result=inyectorService.getInyectors().length
        expect(result).toEqual(expected);
    })

    test('should get inyector with id',()=>{
        const result=inyectorService.findById(1)
        expect(result).toBeDefined;
    })

    test('should return A: 100 mg/s, B: 100 mg/s, C: 100 mg/s, infinite',()=>{
        const result=inyectorService.calculateFlow(100)
        expect(result).toStrictEqual('A: 100 mg/s, B: 100 mg/s, C: 100 mg/s, Infinite');
    })

    test('should return A: 150 mg/s, B: 150 mg/s, C: 150 mg/s, 50 minutes',()=>{
        const result=inyectorService.calculateFlow(150)
        expect(result).toStrictEqual('A: 150 mg/s, B: 150 mg/s, C: 150 mg/s, 50 minutes');
    })

    test('should return A: 150 mg/s, B: 150 mg/s, C: 120 mg/s, 50 minutes',()=>{
        inyectorService.updateDamagePercentage(3,30)
        const result=inyectorService.calculateFlow(140)
        expect(result).toStrictEqual('A: 150 mg/s, B: 150 mg/s, C: 120 mg/s, 50 minutes');
    })

    test('should return Unable to comply',()=>{
        inyectorService.updateDamagePercentage(1,20)
        inyectorService.updateDamagePercentage(2,50)
        inyectorService.updateDamagePercentage(3,40)
        const result=inyectorService.calculateFlow(170)
        expect(result).toStrictEqual('Unable to comply');
    })

    test('should add a new inyector',()=>{
        const expected=inyectorData.length+1;
        inyectorService.addInyector({
            "name":"A",
            "damagePercentage":0
        });
        expect(inyectorService.getInyectors().length).toEqual(expected);
    })


   
});

