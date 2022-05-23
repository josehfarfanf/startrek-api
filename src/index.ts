import express from 'express';
import inyectorRouter from './routes/inyectors'
const app = express();
app.use(express.json({ strict: false }));

const PORT = 3000;


app.use('/api/inyectors',inyectorRouter)
app.listen(PORT, ()=>{
    console.log(`Server run in port ${PORT}...`)
})