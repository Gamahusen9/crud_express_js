const mysql = require('mysql2');
const dbConfig = require('../config/database');
const pool = mysql.createPool(dbConfig);
const {
    responseNotFound,
    responseSuccess
} = require('../traits/ApiResponse');
// const { response } = require('express');


const getAuthors = (req, res) => {
    const query = "SELECT * FROM author";

    pool.getConnection((err, connection) => {
        if (err) throw err

        connection.query(query, (err, results) => {

            if (err) throw err;

            if (results.length == 0) {
                responseNotFound(res);
                return;
            }
            responseSuccess(res, results, 'AUTHOR SUCCESSFULY FETCHED');
        });

        connection.release()
    });
};

const getAuthor = (req, res) => {
    const keyword = req.params.kata_kunci;
    const query = 
    `
    SELECT * FROM author
    WHERE 
        id LIKE '%${keyword}%' OR
        nama LIKE '%${keyword}%' OR
        email LIKE '%${keyword}%' OR
        alamat LIKE '%${keyword}%' OR
        umur LIKE '%${keyword}%' OR
        medsos LIKE '%${keyword}%'
`;


    pool.getConnection((err, connection) => {
        if (err) throw err

        connection.query(query, (err, results) => {

            if (err) throw err;

            if (results.length == 0) {
                responseNotFound(res);
                return;
            }
            responseSuccess(res, results, 'AUTHOR SUCCESSFULY FETCHED');
        });

        connection.release()
    });
};


const addAuthor = (req, res) => {
    const data = {
        nama: req.body.nama,
        email: req.body.email,
        alamat: req.body.alamat,
        umur: req.body.umur,
        medsos: req.body.medsos
    }

    const query = 'INSERT INTO author SET ?'

    pool.getConnection((err, connection) => {
        if (err) throw err

        connection.query(query, [data], (err, results) => {
            if (err) throw err

            responseSuccess(res, results, "AUTHOR SUCCESFULLY ADDED");
        });

        connection.release();
    });
};

const updateAuthor = (req, res) => {
    const id = req.params.id;

    const data = {
        nama: req.body.nama,
        email: req.body.email,
        alamat: req.body.alamat,
        umur: req.body.umur,
        medsos: req.body.medsos
    }

    const query = `UPDATE author SET ? WHERE id = '${id}'`

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

const deleteAuthor = (req, res) => {
    const id = req.params.id;
    const query = `DELETE FROM author WHERE id = '${id}' `;

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
    getAuthors,
    getAuthor,
    addAuthor,
    updateAuthor,
    deleteAuthor
}
