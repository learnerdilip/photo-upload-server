import ExpressConfig from "./server.config"

const app = ExpressConfig()
const PORT = process.env.PORT || 4000

app.listen(PORT, () => console.log("Server Running on Port" + PORT))
