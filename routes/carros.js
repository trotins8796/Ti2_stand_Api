const express = require("express");
const router = express.Router();
const mysql = require("../mysql").pool;

router.get("/", (req, res, next) => {
  mysql.getConnection((error, connection) => {
    if(error) {return res.status(500).send({ error: error})}
    connection.query(
      'SELECT * FROM carros;',
      (error,resultado,fields)  =>{
        if(error) {return res.status(500).send({ error: error})}
        return res.status(200).send({response:resultado})
      }
    )
});
});

router.post("/", (req, res, next) => {
  mysql.getConnection((error, connection) => {
    if(error) {return res.status(500).send({ error: error})}
    connection.query(
      "INSERT INTO carros(Marca,Modelo,tipocombs,nportas,cc,descricao,preco,foto) Values(?,?,?,?,?,?,?,?)",
      [
        req.body.Marca,
        req.body.Modelo,
        req.body.tipocombs,
        req.body.nportas,
        req.body.cc,
        req.body.descricao,
        req.body.preco,
        req.body.foto,
      ],
      (error, resultado, fields) => {
        connection.release();
        if (error) {
          res.status(500).send({
            error: error,
            response: null,
          });
        }
        res.status(201).send({
          mensagem: "Rote dos carros Post",
          id_carro: resultado.insertId,
        });
      }
    );
  });
});

router.get("/:id_carro", (req, res, next) => {
  mysql.getConnection((error, connection) => {
    if(error) {return res.status(500).send({ error: error})}
    connection.query(
      'SELECT * FROM carros WHERE id_carro= ?;',
      [req.params.id_carro],
      (error,resultado,fields)  =>{
        if(error) {return res.status(500).send({ error: error})}
        return res.status(200).send({response:resultado})
      }
    )
});
});

router.patch("/", (req, res, next) => {
  mysql.getConnection((error, connection) => {
    if(error) {return res.status(500).send({ error: error})}
    connection.query(
      `UPDATE carros 
        SET Marca= ?,
            Modelo = ?,
            tipocombs = ?,
            nportas= ?,
            cc= ?,
            descricao= ?,
            preco= ?,
            foto= ?
        WHERE id_carro = ?`,
        [
          req.body.Marca,
          req.body.Modelo,
          req.body.tipocombs,
          req.body.nportas,
          req.body.cc,
          req.body.descricao,
          req.body.preco,
          req.body.foto,
          req.body.id_carro
        ],
      (error,resultado,fields)  =>{
        if(error) {return res.status(500).send({ error: error})}
         res.status(202).send({
          mensagem: "Carro atualizado",
          id_carro: resultado.insertId,
        });
      }
    )
});
});

router.delete("/", (req, res, next) => {
  mysql.getConnection((error, connection) => {
    if(error) {return res.status(500).send({ error: error})}
    connection.query(
      `DELETE FROM carros where id_carro=?`,
        [req.body.id_carro],
      (error,resultado,fields)  =>{
        if(error) {return res.status(500).send({ error: error})}
         res.status(202).send({
          mensagem: "Carro eliminado",
          id_carro: resultado.insertId,
        });
      }
    )
});
});

module.exports = router;
