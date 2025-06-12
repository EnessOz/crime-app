
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();


app.use(cors());               
app.use(express.json());       


mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB bağlantısı başarılı!'))
.catch((err) => console.error('MongoDB bağlantı hatası:', err));


app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend çalışıyor!' });
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Sunucu ${PORT} portunda çalışıyor.`);
});
