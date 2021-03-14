import pool from './pool';

export const query = (text, params) => {
    return new Promise((resolve, reject) => {
        pool.query(text, params)
            .then((res) => {
            resolve(res);
        })
        .catch(err => {
            reject(err)
        })
    })
}





