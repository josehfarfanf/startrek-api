
import * as inyectorController from './inyector.controller'

const inyectorData = require('./inyectors.json')

describe('inyectors',()=>{
    test('should get inyectors',()=>{
        const expected=inyectorData.length;
        const result=inyectorController.getInyectors.length
        expect(result).toEqual(expected);
    })
});

