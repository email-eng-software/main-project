import app from "./app.js";

// Starting server
const PORT = process.env.PORT || 3333;
app.listen(PORT, () =>
  console.log(`Server started at port http://localhost:${PORT}`)
);
