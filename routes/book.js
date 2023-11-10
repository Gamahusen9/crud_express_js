const express = require('express');
const router = express.Router();
const {
    getBooks,
    getBook,
    addBook,
    updateBook,
    deleteBook,
    search,
    sortBy
    // addBook
} = require('../controllers/BookController')
// route untuk menampilkan data
router.get('/', getBooks);

// route untuk mengirim data
router.post('/', addBook);


router.get('/search', search);

router.get('/sortBy', sortBy);

router.put('/:id', updateBook);

router.delete('/:id', deleteBook);

module.exports = router;


// route untuk memperbaharui data/ update data
// router.put('/:id', (req,res) => {
//     res.write('UPDATE BOOK CODE');
//     res.end();
// });

// // route untuk menghapus data
// router.delete('/:id', (req,res) => {
//     res.write('DELETE BOOK CODE');
//     res.end();
// });


