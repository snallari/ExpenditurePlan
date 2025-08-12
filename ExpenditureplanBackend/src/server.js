import express from 'express'
import mongoose from 'mongoose'
import budgetRouter from './router/budgetRouter.js'
import incomeRouter from './router/incomeRouter.js';

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect(`mongodb+srv://sai:sai@cluster1.jo5x8o3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(()=>{
    console.log("Connected to MongoDB");
}).catch((error) => {
    console.error("MongoDB connection error:", error);
});


app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/api/budget', budgetRouter)
app.use('/api/income', incomeRouter)


app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
