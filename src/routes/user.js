import { Router } from 'express';
const { pool } = require("../dbConfig");

const router = Router();
const md5 =require('md5');
const jwt = require('jsonwebtoken');

router.post('/register', async function (req, res, next) {
    try {
        let { username, email, password } = req.body; 
        const hashed_password = md5(password.toString());
        const checkUsername = `SELECT username FROM users WHERE username = $1`;
        pool.query(checkUsername,[username], (err, results) => {
            if (!(results.rows.length > 0)) {
                const registerUser= `INSERT INTO users (id,username, email, password) VALUES (nextval('user_id'),$1, $2, $3)`;
                pool.query(registerUser,[username,email, hashed_password],(err, results) => {
                    if(err){
                        res.send({status: 0 , data: err});
                    }else{
                        let token = jwt.sign({data:results},'secret');
                        res.send({status:1, data: results, token: token});
                    }
                });
            }
        });
    }catch(error){
        console.log("entre aquii")
        res.send({status:0, error: error});
        console.log(error);
    }
});

router.post('/login', async function (req, res, next) {
    try {
        let { username, password } = req.body;
        const hashed_password = md5(password.toString())
        const requete = `SELECT * FROM users WHERE username = $1 AND password = $2`
        pool.query(requete,[username, hashed_password], (err, results) => {
    
            if(err){
                res.send({ status: 0, data: err });
                 console.log(err);
            }else{
                if(results.rows.length>0){
                    let token = jwt.sign({ data: results }, 'secret')
                    res.send({ status: 1, data: results, token: token });
                    console.log("Autorizado")
                }else{
                    res.send("No autorizado");
                }
            }
        });
    } catch (error) {
        res.send({ status: 0, error: error });
        console.log(error);
        console.log("catch");
    }
});

 export default router;
