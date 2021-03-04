import moment from 'moment';
import { query } from "../../db/query.js";
import { commentInsertQuery, commentCheckQuery } from './comment.query.js';

export const createGifComment = async (req, res) => {
    const { title, employeeId, gifId, commentbody } = req.body;
    if(!title || !employeeId || !gifId || !commentbody){
        return res.status(400).send({
            status: "error",
            error: "Some values are missing!"
        });
    }

    const values = [
        title,
        employeeId,
        gifId,
        commentbody,
        moment(new Date())
    ];

    const gifCheckVal = [title];
    const articlesFound = await query(commentCheckQuery, gifCheckVal);

    if(articlesFound.rows.length !== 0){
        return res.status(400).send({ message: 'Article with that title already exists!' });
    }

    try {

        const { rows } = await query(commentInsertQuery, values);
        const { title, created_on, commentbody } = rows[0];
    
        return res.status(201).send({
                "status" : "success" ,
                "data" : {
                    "message" : "comment successfully created" ,
                    "createdOn" : created_on,
                    "gifTitle" : title,
                    "comment" : commentbody
                }
            });
        }
        catch(err) {
            console.log(err);
            res.status(400).send({
                "status": "error",
                "error": err
            })
        }
}