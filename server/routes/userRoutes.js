const express = require("express");
const mysqlPool = require('../db/connection');
const bcrypt = require('bcrypt');

const router = express.Router();

//REGISTER USER
router.post("/register", async (req,res) => {

    try {
        const { ime, prezime,sifra, email} = req.body;

        const sqlCheck = 'SELECT email FROM korisnik WHERE email = ?';

        mysqlPool.query(sqlCheck, [email], (error,results) => {
            if (error) {
                console.error(error);
                return res.status(500).send("Internal server error");
            }
        
            if (results.length != 0) {
                return res.status(404).json({ message: 'User already exists' });
            }
            
            const sql = 'INSERT INTO korisnik (ime, prezime, sifra, email,uloga_iduloga) VALUES (?, ?, ?, ?,?)';
        
            const saltRounds = 10;
            bcrypt.hash(sifra, saltRounds, (err,hashPass) => {
                
                mysqlPool.query(sql, [ime, prezime, hashPass, email, 2], (error,finalResult) => {
                    
                    if (error) {
                        console.error(error);
                        return res.status(500).send('Error kod kreiranja korisnika');
                    } else {
                        return res.status(200).json({ message: 'korisnik kreiran', "Record inserted": finalResult });
                    }
                    
                });
            
            });
            

        });               
    
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ message: 'Internal server error' });
    }
}
);

//LOGIN USER

router.post("/login", async (req,res) => {

    try {
        const { email, sifra} = req.body;

        const sql = 'SELECT idKorisnik,ime,prezime,email,sifra,naziv as uloga FROM korisnik INNER JOIN uloga ON korisnik.uloga_iduloga = uloga.iduloga WHERE email = ?';
        

        mysqlPool.query(sql, [email], (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).send("Internal server error");
            }
        
            if (results.length === 0) {
                return res.status(404).json({ message: 'User not found' });
            }
        
            const user = results[0]; 
            
            bcrypt.compare(sifra, user.sifra, (compareErr, isValidPassword) => {
                if (compareErr) {
                    console.error(compareErr);
                    return res.status(500).send("Internal server error");
                }
        
                if (isValidPassword) {

                    const userData = {...user,sifra : undefined};//Da ne znamo koja je sifra korisnika
                    
                    return res.status(200).json({ message: 'Validan korisnik', userInfo: userData });
                } else {
                    return res.status(404).json({ message: 'Pogresna sifra' });
                }
            });
        });
        
      
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ message: 'Internal server error' });
    }

})

//DELETE KORISNIK
router.delete('/', async (req,res) => {
    try {
        const {email} = req.body;

        const mainSQL = 'SELECT idKorisnik,email FROM korisnik';

        mysqlPool.query(mainSQL, (error,users) => {

            if(error){
                console.error(error);
                return res.status(500).send("Internal server error");
            }

            if (users.length <=1) {
                return res.status(404).json({ message: 'Users not found' });
            }

            const mainUser = users.filter((user) => user.email == email);
            const swapUserData = users.filter((user) => user.email != email);

            if (mainUser.length === 0) {
                return res.status(404).json({ message: 'User not found' });
            }

            const updateSQL = "UPDATE objava SET korisnik_idKorisnik = ? WHERE korisnik_idKorisnik = ?";

            mysqlPool.query(updateSQL,[swapUserData[0].idKorisnik,mainUser[0].idKorisnik], (error,result) => {
                if (error) {
                    console.error(error);
                    return res.status(500).send("Internal server error");
                }
                if (result.length === 0) {
                    return res.status(404).json({ message: 'User not found' });
                }

                const sql = 'DELETE FROM korisnik WHERE email = ?';
                
                mysqlPool.query(sql, [email], (err, results) => {
                    if (err) {
                        console.error(err);
                        return res.status(500).send("Internal server error");
                    }
                
                    if (results.length === 0) {
                        return res.status(404).json({ message: 'User not found' });
                    }
                
                    return res.status(200).json({ message: 'User deleted', userInfo: results });
                });
            })

        })

        
    
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ message: 'Internal server error' });
    }
})

//ADD ADMIN
router.put("/admin", async (req,res) => {

    try {
        const { email,revoke} = req.body;
        let sql = 'UPDATE korisnik SET uloga_iduloga = 1 WHERE email = ?';

        if(revoke){
            sql = 'UPDATE korisnik SET uloga_iduloga = 2 WHERE email = ?';
        }

        mysqlPool.query(sql, [email], (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).send("Internal server error");
            }
            if (results.length === 0) {
                return res.status(404).json({ message: 'User not found' });
            }
        
            return res.status(200).json({ message: 'User updated', userInfo: results });
        });
        
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ message: 'Internal server error' });
    }

})

//GET ALL USERS
router.get("/all", async (req,res) => {

    try {

        let sql = 'SELECT idKorisnik,ime,prezime,email, naziv as uloga FROM korisnik INNER JOIN uloga on korisnik.uloga_iduloga = uloga.iduloga';

        mysqlPool.query(sql, (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).send("Internal server error");
            }
           
            return res.status(200).json({ message: 'Users selected successfully', users: results });
        });
        
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ message: 'Internal server error' });
    }

})

module.exports = router;