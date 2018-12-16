import * as express from "express"
import { join } from "path"

export const app = express()

app.use(express.static(join(__dirname, "public")))

app.get("/", (req, res) => {
    res.redirect("index.html")
})

const port = process.env.PORT || 4000
app.listen(port, () => "Server started at " + port)