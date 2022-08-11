const pool = require("./db.js");

const getPhotos = () => {
    let date = new Date();
    let dd = String(date.getDate()).padStart(2, '0');
    let mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = date.getFullYear();

    let today = mm + '/' + dd + '/' + yyyy;
    // console.log(today);s

    return pool.query(`
        SELECT * 
        FROM "Photos"s
        WHERE
            created_at = '${today}' AND
            reported != 1
    `);
}

const postPhoto = (uid, photo_subject, url, date) => {

    return pool.query(`
        INSERT INTO "Photos"(user_uid, subject, photo_url, created_at)
        VALUES(${uid},'${photo_subject}','${url}','${date}');
    `);
}

const likePhoto = (photo_id) => {
    return pool.query(`
        UPDATE "Photos"
            SET likes = likes + 1
        WHERE photo_id = ${photo_id}
    `);
}

const reportPhoto = (photo_id) => {
    return pool.query(`
    UPDATE "Photos"
        SET reported = 1
    WHERE photo_id = ${photo_id}
    `);
}

module.exports = {getPhotos, postPhoto, likePhoto, reportPhoto}