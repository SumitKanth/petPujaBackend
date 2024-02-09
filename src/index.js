import  app  from "./app.js";
import { connectDB } from "./database/database.js";

// data base
connectDB();


const port = process.env.PORT;


app.listen(port, () => {
    console.log(`Server is running at ${port} port and in ${process.env.NODE_ENV} mode`);
})