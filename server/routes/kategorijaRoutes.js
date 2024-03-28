const express = require("express");
const mysqlPool = require('../db/connection');

const router = express.Router();

router.post("/",async (req,res) => {
    
        try {
            const { naziv } = req.body;
            const sql = 'INSERT INTO kategorija (naziv, datum_dodavanja) VALUES (?,?)';
            const datum = (new Date()).toISOString().split('T')[0];

            mysqlPool.query(sql, [naziv,datum], (err, results) => {
                if (err) {
                    console.error(err);
                    return res.status(500).send("Internal server error");
                }
            
                return res.status(200).json({ message: 'Category added', info: results });
            });
            
        } catch (err) {
            console.error(err.message);
            return res.status(500).json({ message: 'Internal server error' });
        }
    
})

router.delete("/",async (req,res) => {
    
    try {
        const { id } = req.body;

        const mainSQL = 'SELECT idKategorija FROM kategorija';

        mysqlPool.query(mainSQL,(error,result) => {
            if(error){
                console.error(error);
                return res.status(500).send("Internal server error");
            }

            if (result.length <=1) {
                return res.status(404).json({ message: 'Cannot delete last category' });
            }

            const mainCategory = result.filter((category) => category.idKategorija === id);
            const swapCategoryData = result.filter((category) => category.idKategorija !== id);

            if (mainCategory.length === 0) {
                return res.status(404).json({ message: 'Category not found' });
            }

            const updateSQL = "UPDATE objava SET kategorija_idKategorija = ? WHERE kategorija_idKategorija = ?;";

            mysqlPool.query(updateSQL,[swapCategoryData[0].idKategorija, mainCategory[0].idKategorija],(error,result) => {

                if (error) {
                    console.error(error);
                    return res.status(500).send("Internal server error");
                }
                if (result.length === 0) {
                    return res.status(404).json({ message: 'Objava not found' });
                }

                const sql = 'DELETE FROM kategorija WHERE idKategorija = ?';
                
                mysqlPool.query(sql, [id], (err, results) => {
                    if (err) {
                        console.error(err);
                        return res.status(500).send("Internal server error");
                    }
                
                    return res.status(200).json({ message: 'Category deleted', info: results });
                });
            })

        })

        
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ message: 'Internal server error' });
    }

})


//GET ALL
router.get("/", async (req,res) => {

    try {

        let sql = 'SELECT idKategorija, naziv, datum_dodavanja FROM kategorija';

        mysqlPool.query(sql, (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).send("Internal server error");
            }
           
            return res.status(200).json({ message: 'Kategorija selected successfully', categories: results });
        });
        
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ message: 'Internal server error' });
    }

})

module.exports = router;