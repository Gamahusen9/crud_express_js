const mysql = require('mysql2');
const dbConfig = require('../config/database');
const pool = mysql.createPool(dbConfig);
const {
    responseNotFound,
    responseSuccess
} = require('../traits/ApiResponse');
const { connect } = require('../routes/book');
// const { response } = require('express');


const search = (req,res) => {
    const keyword = req.query.keyword
    
    const query = `SELECT * FROM book WHERE nama LIKE '%${keyword}%'`

    pool.getConnection((err, connection) => {
        if(err) throw err

        connection.query(query, (err, results) => {
            if(err) throw err 

            if(results.length == 0) {
                return res.json({
                    message: 'tidak ditemukan'
                })
            }

            responseSuccess(res,results, 'BOOK SUCCESSFULLY FETCHED')
        })

        connection.release()
    })
}

const sortBy = (req,res) => {
    const orderBy = req.query.order

    // DESCH ASC
    const query = `SELECT * FROM book ORDER BY nama '${orderBy}'`


    pool.getConnection((err,connection) => {
        if(err) throw err

        connection .query(query, (err,results) => {
            if(err) throw err
             if(results.length == 0) {
            responseNotFound(res)
            return
        }

        responseSuccess(res,results, 'BOOK SUCCESSFULLY FETCHED')
        })
       connection.release()
    })
}

const getBooks = (req, res) => {
    const query = "SELECT * FROM book";

    pool.getConnection((err, connection) => {
        if (err) throw err

        connection.query(query, (err, results) => {

            if (err) throw err;

            if (results.length == 0) {
                responseNotFound(res);
                return;
            }
            responseSuccess(res, results, 'BOOK SUCCESSFULY FETCHED');
        });

        connection.release()
    });
};

const getBook = (req, res) => {
    const id = req.params.id;
    const query = `SELECT * FROM book WHERE id = '${id}'`;

    pool.getConnection((err, connection) => {
        if (err) throw err

        connection.query(query, (err, results) => {

            if (err) throw err;

            if (results.length == 0) {
                responseNotFound(res);
                return;
            }
            responseSuccess(res, results, 'BOOK SUCCESSFULY FETCHED');
        });

        connection.release()
    });
};


const addBook = (req, res) => {
    const data = {
        nama: req.body.nama,
        author: req.body.author,
        year: req.body.year,
        page_count: req.body.page_count,
        publisher: req.body.publisher
    }

    const query = 'INSERT INTO book SET ?'

    pool.getConnection((err, connection) => {
        if (err) throw err

        connection.query(query, [data], (err, results) => {
            if (err) throw err

            responseSuccess(res, results, "BOOK SUCCESFULLY ADDED");
        });

        connection.release();
    });
};

const updateBook = (req, res) => {
    const id = req.params.id;

    const data = {
        nama: req.body.nama,
        author: req.body.author,
        year: req.body.year,
        page_count: req.body.page_count,
        publisher: req.body.publisher
    }

    const query = `UPDATE book SET ? WHERE id = '${id}'`

    pool.getConnection((err, connection) => {
        if (err) throw err

        connection.query(query, [data], (err, results) => {
            if (err) throw err

            if (results.affectedRows == 0) {
                responseNotFound(res);
                return;
            }

            responseSuccess(res, results, "BOOK SUCCESFULLY UPDATED");
        });

        connection.release();
    });


}

const deleteBook = (req, res) => {
    const id = req.params.id;
    const query = `DELETE FROM book WHERE id = '${id}' `;

    pool.getConnection((err, connection) => {
        if (err) throw err
        connection.query(query, (err, results) => {
            if (results.affectedRows == 0) {
                responseNotFound(res)
                return
            }

            responseSuccess(res, results, 'BOOK SUCCESSFULY DELETED')
        })

        connection.release()
    })

}

module.exports =
{
    getBooks,
    getBook,
    addBook,
    updateBook,
    deleteBook,
    search,
    sortBy
}
