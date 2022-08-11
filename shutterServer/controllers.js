const model = require("./models.js");
const prompts = require("./utils/prompts");


//GET SUBJECT
const getSubject = (req, res) => {
    console.log("hit getSubject");
    let date = new Date();
    let dd = String(date.getDate()).padStart(2, '0');


    res.status(200).send(prompts.subjects[dd]);
}

//GET PHOTOS
const getPhotos = (req, res) => {
    console.log("hit getPhotos");

    model.getPhotos()
        .then((data) => {
            res.status(200).send(data.rows);
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(500);
        })

}

//POST
const postPhoto = (req, res) => {
    console.log("hit postPhoto");

    let date = new Date();
    let dd = String(date.getDate()).padStart(2, '0');
    let mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = date.getFullYear();
    let today = mm + '/' + dd + '/' + yyyy;

    // console.log(req.body.user_uid);
    model.postPhoto(req.body.user_uid, req.body.subject, req.body.photo_url, today)
        .then(() => {
            res.sendStatus(201);
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(500);
        })
    }


//PUT LIKE
const likePhoto = (req, res) => {
    console.log("hit likePhoto");
    // console.log("id: ", req.params.id);
    // res.sendStatus(200);

    model.likePhoto(req.params.id)
        .then(() => {
            res.sendStatus(204)
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(500);
        })
}

//PUT REPORT
const reportPhoto = (req, res) => {
    console.log("hit reportPhoto");
    model.reportPhoto(req.params.id)
    .then(() => {
        res.sendStatus(204)
    })
    .catch(err => {
        console.log(err);
        res.sendStatus(500);
    })
}

module.exports = {
    getSubject,
    getPhotos,
    postPhoto,
    likePhoto,
    reportPhoto
}