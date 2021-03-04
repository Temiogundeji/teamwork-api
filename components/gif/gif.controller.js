import moment from 'moment';
import { gifExistsQuery, gifInsertQuery, fetchAllGifQuery, deleteOneGifQuery } from './gif.query.js';
import { query } from '../../db/query.js'

export const createGif = async (req, res) => {
    const { title, about_gif } = req.body;
    const { path } = req.file;

    if(!title || !about_gif){
        return res.status(400).send({ 
            message: 'Incomplete parameters',
            status: 'error',
            error: 'Some values are missing!'
        });
    }
    
    const values = [
        title,
        about_gif,
        path,
        moment(new Date()),
        moment(new Date())
    ];

    try {
        //check if gif with the same title already exists.
        const gifCheckVal = [title];
        const gifFound = await query(gifExistsQuery, gifCheckVal);
    
        if(gifFound.rows.length !== 0){
                res.status(400).send({
                    message: 'Gif(s) with the same title already exists.',
            });
        }
        // save gif post to database
        const { rows } = await query(gifInsertQuery, values);
        const { id, created_on, title, imageurl } = rows[0];
        return res.status(201).send({
            "status": "success",
            "data" : {
                "gifId" : id,
                "message" : "GIF image successfully posted",
                "createdOn" : created_on,
                "title": title,
                "imageUrl" : imageurl
            }
        });
    }
    catch(err){
        res.status(400).send(err);
        console.log(err)
    }
}

export const getAllGifs = async (req, res) => {
    
    const values = [];

    try {
        const { rows } = await query(fetchAllGifQuery, values);
        res.status(200).send({
            status: 'success',
            data: rows
        });
    }
    catch(err) {
        console.log(err);
    }
}


export const deleteAGif = async(req, res) => {
    const { gifId } = req.params;
    try {
        const { rows } = await query(deleteOneGifQuery, [gifId]);
        
        if(!rows[0]) {
            return res.status(404).send({'message': 'Gif not found'});
        }

        return res.status(204).send({
                "status" : "success" ,
                "data" : {
                    "message" : "Gif post successfully deleted",
                }
            });
    } 
    catch(err) {
        console.log(err);
        return res.status(400).send({
            "status": "error",
            "error": err
        });
    }
}
