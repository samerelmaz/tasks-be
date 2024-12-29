import app from "./app";
import { connectToDatabase } from "./database/connection";

const PORT = process.env.PORT || 3001;

connectToDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
