require('dotenv').config();
const express = require('express');
const app = express();

const PORT = process.env.PORT
const routes = require('./src/routes');

app.use(express.json());
app.use(routes);

app.get('/', (req, res) => {
  res.send('Server Inventory Departemen menyala dan siap menerima perintah! 🚀');
});

app.listen(PORT, () => {
  console.log(`Server berhasil berjalan di http://localhost:${PORT}`);
});