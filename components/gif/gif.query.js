export const gifExistsQuery = `SELECT * FROM gif WHERE title =  $1`;
export const gifInsertQuery = `INSERT INTO 
gif (title, about_gif, imageurl, created_on, modified_on)
VALUES ($1, $2, $3, $4, $5)
returning *`;

export const deleteOneGifQuery = 'DELETE FROM gif WHERE id = $1 returning *';
export const fetchAllGifQuery = `SELECT * FROM gif`;
