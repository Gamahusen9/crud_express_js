const express = require('express');
const router = express.Router();
const {
    getAuthors,
    getAuthor,
    addAuthor,
    updateAuthor,
    deleteAuthor
    // addBook
} = require('../controllers/AuthorController')
// route untuk menampilkan data
router.get('/', getAuthors);

// route untuk mengirim data
router.post('/', addAuthor);


router.get('/:id', getAuthor);

router.put('/:id', updateAuthor);

router.delete('/:id', deleteAuthor);

module.exports = router;

// const express = require('express');
// const router = express.Router();

// // route untuk menampilkan data
// router.get('/', (req, res) =>{
//     res.write('GET AUTHOR CODE');
//     res.end();
// });

// // route untuk mengirim data
// router.post('/', (req,res) => {
//     res.write('SEND AUTHOR CODE');
//     res.end();
// });

// // route untuk memperbaharui data/ update data
// router.put('/', (req,res) => {
//     res.write('UPDATE AUTHOR CODE');
//     res.end();
// });

// // route untuk menghapus data
// router.delete('/', (req,res) => {
//     res.write('DELETE AUTHOR CODE');
//     res.end();
// });

// module.exports = router; 





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


