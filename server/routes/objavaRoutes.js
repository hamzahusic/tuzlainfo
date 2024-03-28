const express = require("express");
const mysqlPool = require('../db/connection');
const multer = require("multer");
const router = express.Router();
const fs = require("fs");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../tuzlainfo/public/uploads/')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now();
      cb(null, uniqueSuffix + file.originalname)
    }
})

const uploadStorage = multer({ storage: storage })
  
//KREIRAJ OBJAVU
router.post('/',uploadStorage.single("putanja_slike"), async (req,res) => {

    try {
        const {naslov,sadrzaj,kategorija,datum,idKorisnik} = req.body;

        const sql = "INSERT INTO objava (naslov,sadrzaj,datum_objave,putanja_slike,kategorija_idKategorija,korisnik_idKorisnik) VALUES (?,?,?,?,?,?)";
    
        mysqlPool.query(sql,[naslov,sadrzaj,datum,req.file.filename,kategorija,idKorisnik], (err,result) => {
            if (err) {
                console.error(err);
                try {
                    fs.unlinkSync(`../tuzlainfo/public/uploads/${req.file.filename}`);
                } catch (error) {
                    console.log("No image found!");
                }
                return res.status(500).send('Greška prilikom kreiranja objave');
            } else {
                return res.status(200).json({ message: 'Objava kreirana uspjesno', "info": result });
            }
        })
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ message: 'Internal server error' });
    }

})

//JEDNA OBJAVU
router.get('/one/:idObjava', async (req,res) => {
    try {
        const {idObjava} = req.params;
    
        const sql = "SELECT objava.idObjava, objava.naslov, objava.sadrzaj, objava.datum_objave, objava.putanja_slike, korisnik.ime, korisnik.prezime, kategorija.naziv AS naziv_kategorije, kategorija.idKategorija as kategorija FROM objava INNER JOIN korisnik ON objava.korisnik_idKorisnik = korisnik.idKorisnik INNER JOIN kategorija ON objava.kategorija_idKategorija = kategorija.idKategorija WHERE objava.idObjava = ?;";
    
        mysqlPool.query(sql,[idObjava], (err,result) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Error updating objava');
            } else {
                return res.status(200).json({ message: 'Objava selected successfully', data: result });
            }
        })
    } catch (error) {
        console.error(err.message);
        return res.status(500).json({ message: 'Internal server error' });
    }
})

//GET SVE OBJAVE
router.get('/all', async (req,res) => {
    try {

        const sql = "SELECT idObjava, naslov, sadrzaj,datum_objave,putanja_slike,kategorija_idKategorija as kategorija,ime,prezime,naziv as naziv_kategorije FROM objava INNER JOIN korisnik ON korisnik_idKorisnik = idKorisnik INNER JOIN kategorija ON kategorija_idKategorija = idKategorija;";
    
        mysqlPool.query(sql, (err,result) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Error updating objava');
            } else {
                return res.status(200).json({ message: 'objava selected successfully', "Data": result });
            }
        })
    } catch (error) {
        console.error(err.message);
        return res.status(500).json({ message: 'Internal server error' });
    }
})

//UPDATE OBJAVU
router.put('/',uploadStorage.single("putanja_slike"), async (req,res) => {
    try {
        const {naslov,sadrzaj,datum_objave,kategorija,idObjava,stara_slika} = req.body;
        
        if(req.file){
            try {
                fs.unlinkSync(`../tuzlainfo/public/uploads/${stara_slika}`);
            } catch (error) {
                console.log("No image found!");
            }
        }
        else{
            req.file = { filename: stara_slika };
        }

        const sql = "UPDATE objava SET naslov = ?, sadrzaj = ?, datum_objave = ?, kategorija_idKategorija = ?, putanja_slike = ? WHERE idObjava = ?; ";
    
        mysqlPool.query(sql,[naslov,sadrzaj,datum_objave,kategorija,req.file.filename,idObjava], (err,result) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Error updating objava');
            } else {
                return res.status(200).json({ message: 'objava updated successfully', "Data": result });
            }
        })
    } catch (error) {
        console.error(err.message);
        return res.status(500).json({ message: 'Internal server error' });
    }
})

//DELETE OBJAVU
router.delete('/', async (req,res) => {
    try {
        const {idObjava,ime_slike} = req.body;
    
        const sql = "DELETE FROM objava WHERE idObjava = ?;";
    
        mysqlPool.query(sql,[idObjava], (err,result) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Error deleting objava');
            } else {
                try {
                    fs.unlinkSync(`../tuzlainfo/public/uploads/${ime_slike}`);
                } catch (error) {
                    console.log("No image found!");
                }
                return res.status(200).json({ message: 'objava deleted successfully', "Record deleted": result });
            }
        })
    } catch (error) {
        console.error(err.message);
        return res.status(500).json({ message: 'Internal server error' });
    }
})


module.exports = router;