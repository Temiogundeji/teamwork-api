import moment from 'moment';
import { isEmailValid, isPasswordValid,
     isEmpty, emptyFields,
      generateToken, checkIfEntityExists,
       generateHash, comparePassword     
} from '../../helpers/utils.js';
import { query } from '../../db/query.js'
import { employeeCheckQuery, employeeInsertQuery } from './employee.queries.js';
// import { getRoleTitle, roles } from '../../helpers/roles';

const registerEmployee = async (req, res) =>{
    const { first_name, last_name, email, password, department_id, address } =  req.body;
    const { path } = req.file;

    if(!first_name || !last_name || !email ||
        !password || !department_id ||
         !address){
        return res.status(400).send({
            status: "error",
            error: "Some values are missing!"
        });
    }
    
    if(!isEmailValid(email)){
        return res.status(400).send({
            message:'Please enter a valid email address'
        });
    }

    const hashedPassword = generateHash(password);

    const userCheckVal = [email];
    const usersFound = await query(employeeCheckQuery, userCheckVal);


    if(usersFound.rows.length !== 0){
        res.status(400).send({
            message: 'User with that email already exists'
        });
    }

    const values = [
            first_name,
            last_name,
            email, 
            hashedPassword,
            path,
            department_id,
            address,
            moment(new Date()),
            moment(new Date())
    ];

    try {
        const { rows } = await query(employeeInsertQuery, values);
        const { email, id, first_name, last_name, role_id } = rows[0];

        const token = generateToken(email, id, first_name, last_name, role_id );
        return res.status(201).send({
            data: rows[0],
            token: token,                                                                                                                                                                                                                                                                    
            message:`${first_name} has been registered successfully`,
            status: 'success'
        });
    }
    catch(err){
        return  res.status(400).send({
            status:"error",
            error: err
        });
    }
}  

const login = async (req, res) => {
    const { email, password } = req.body;
    if(!email || !password){
        return res.status(400).send({ 'message': 'Incomplete user login parameter' });
    }

    if(!isEmailValid(email)){
        return res.status(400).send({ 'message': 'Please enter a valid email address' });
    }

   try {
    const userCheckVal = [email];
    const { rows } = await query(employeeCheckQuery, userCheckVal);

    if(rows.length === 0){
       return res.status(400).send({ 'message': 'User with provided email address does not exist!'}); 
    }
    
    if(!comparePassword(rows[0].password, password)){
        return res.status(400).send({ 'message': 'Incorrect password!' });
    }

    const { id, first_name, last_name, role_id } = rows[0];
    const token = generateToken( id, first_name, last_name, role_id );

    return res.status(200).send({
        "status" : "success",
        "message": `Welcome ${first_name}`,
        "data" : {
        "token" : token ,
        "userId" : id ,
        "roleId": role_id
        }
    });
   }
   catch(err){
    res.status(400).send(err);
   }
}

export {
    registerEmployee,
    login
}
