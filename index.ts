import dotenv from "dotenv";
dotenv.config();
import express,{Application} from "express";
import bodyParser from "./config/bodyParser";
import cookieParser from "cookie-parser";
import cors from "./config/config.cores";
import connectDB from "./config/connectDb";
import authRoute from "./routes/auth.routes";
import bookRoutes from "./routes/books.routes";

const app:Application=express();
app.use(bodyParser);
app.use(express.urlencoded({extended:false}));

app.use(cookieParser());
app.use(cors);
app.use(authRoute);
app.use(bookRoutes)

connectDB().then(()=>{
    app.listen(process.env.PORT,()=>{
        try {
            console.log("port is running on "+process.env.PORT);
        } catch (error) {
            console.log(error);
        }
    })
}).catch((error)=>{
    console.log(error);
})

