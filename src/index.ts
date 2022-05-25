import express from 'express';
import InyectorController from './inyector/inyector.controller';
import InyectorRepository from './inyector/inyector.repository';
import InyectorService from './inyector/inyector.service';
const app = express();
app.use(express.json({ strict: false }));

const PORT = 3000;

const inyectorRepository=new InyectorRepository();
const inyectorService=new InyectorService(inyectorRepository);
const inyectorController=new InyectorController(inyectorService);


app.use('/api/inyectors',inyectorController.routes())
app.listen(PORT, ()=>{
    console.log(`Server run in port ${PORT}...`)
})