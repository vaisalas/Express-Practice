const router = require("express").Router();
const Bakery = require("../db");

router.get("/getAll", (req, res, next) => {
    Bakery.find((err, bakery) => {
        if (err)
            return next({status: 400, message: err.message});
        else 
            return res.json(bakery);
    })

});

router.get("/get/:id", (req, res, next) => {
    const id = req.params.id;

    Bakery.findById(id, (err, found) => {
        if (err)
            return next({status: 400, message: err.message});
        else if (!found)
            return next({status: 404, message: "No Bakery found with id: " + id});
        else
            return res.status(202).send(found);
    });
})

router.post("/create", (req, res, next) => {
    const bakery = req.body;
    
    new Bakery(bakery).save().then(() => {
        res.status(201).send("Successfully created");
    }).catch(err => next({status: 400, message: err.message}));    
});

router.put("/replace/:id",  (req, res) => {   
    const newBakery = req.query;
    const id = req.params.id;
    
    Bakery.findByIdAndUpdate(id, newBakery, (err, replaced) => {
        if (err)
            return next({status: 400, message: err.message});
        else 
        Bakery.findById(id, (err, updatedBakery) => {
                if (err)
                    return next({status: 400, message: err.message});
                else
                    return res.status(202).send(updatedBakery);
            });
    })
   
});

router.delete("/remove/:id", (req, res) => {
    const id = req.params.id;

    Bakery.findByIdAndDelete(id, (err) => {
        if (err)
            return next({status: 400, message: err.message});
        else
            return res.sendStatus(204);
    })
});


module.exports = router;