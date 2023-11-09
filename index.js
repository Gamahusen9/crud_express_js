const express = require('express');
const mysql = require('mysql2');
const bookRoute = require('./routes/book');
const authorRoute = require('./routes/author');
const dbConfig = require('./config/database');
const pool = mysql.createPool(dbConfig);

pool.on('error', (err) => {
    console.log(err);
})
const app = express();
const PORT = 5000;

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

// membuat parameter harus diawali : diawal
// app.get('/contohparameter/:username/:bapak/:rombel', (req,res) => {
//     res.json(req.params);
//     res.end();
// });

// app.get('/contohparam', (req,res) => {
//     res.json(req.query);
//     res.end();
// });


// app.get('/', (req, res) => {
//     res.write('hello world');
//     res.end();
// });

app.use('/book', bookRoute);
app.use('/author', authorRoute);


app.listen(PORT, () => {
    console.log(`server berjalan di http://localhost:${PORT}`);
});







