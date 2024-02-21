import express from "express";
import authRoutes from "./routes/authRoutes";
import { config } from "./utils/config";

const app = express();
const PORT = config.host.port;

app.use(express.json());
app.use("/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
