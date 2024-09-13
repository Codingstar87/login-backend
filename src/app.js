import  express from "express"
import cors from "cors"
import cookieParser  from "cookie-parser"
const app = express()

app.use(
    cors({
        origin: process.env.CORS_ORIGIN,
        credentials: true, 
    })
);

// Set large enough limit for both JSON and URL-encoded data
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

app.use(express.static("public"));
app.use(cookieParser());



// Routes import
import router from "./routes/user.routes.js";

// Routes declaration
app.use("/api/v1/users", router);

// Export the app for server.js
// http://localhost:8000/api/v1/users
export { app };

