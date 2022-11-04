const { response } = require("../middlewares/common");
const {create, findEmail,verification} = require("../models/users");
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } =  require('uuid');
const {generateToken} = require('../helpers/auth')
const email = require('../middlewares/email')

const Port = process.env.PORT
const Host = process.env.HOST

const UsersController = {
    insert: async  (req, res, next) => {
        let {rows:[users]} = await findEmail(req.body.email)
        console.log('role',req.params.role)
        let role = req.params.role

        if(users){
            return response(res, 404, false, "email already use"," register fail") 
        }

        // create otp
        let digits = '0123456789';
        let otp = '';
        for (let i = 0; i < 6; i++ ) {
            otp += digits[Math.floor(Math.random() * 10)];
        }

        let salt = bcrypt.genSaltSync(10);
        let password = bcrypt.hashSync(req.body.password);
        let data = {
            id : uuidv4(),
            email : req.body.email,
            password ,
            fullname : req.body.fullname,
            role,
            otp
        }
        try{
            const result = await create(data)
            if(result){
                console.log(result)
                let sendEmail = await email(data.email,otp,`https://${Host}:${Port}/${email}/${otp}`,data.fullname)
                if(sendEmail == 'email not sent!'){
                    return response(res, 404, false, null, "register fail")
                }
                response(res, 200, true,{email:data.email},"register success please check your email")
            }
        } catch(err){
            console.log(err)
            response(res, 404, false, err," register fail")
        }
    },
    login: async (req,res,next)=>{
        console.log('email',req.body.email)
        console.log('password',req.body.password)
        let {rows:[users]} = await findEmail(req.body.email)
        if(!users){
            return response(res, 404, false, null," email not found")
        }
        if(users.verif == 0){
            return response(res, 404, false, null," email not verified")
        }
        const password = req.body.password
        const validation = bcrypt.compareSync(password,users.password)
        if(!validation){
            return response(res, 404, false, null,"wrong password")
        }
        delete users.password
        delete users.otp
        delete users.verif
        let payload = {
            email: users.email,
            role: users.role
        }
        users.token = generateToken(payload)
        response(res, 200, false, users,"login success")
    },
    email: async(req,res,next)=>{
        let sendEmail = await email(req.params.email,'Kode OTP Food','https://localhost:3000/products')
        if(sendEmail){
            response(res, 200, true,null,"send email success")
        }
    },
    otp: async(req,res,next)=>{
        console.log('email',req.body.email)
        console.log('password',req.body.otp)
        let {rows:[users]} = await findEmail(req.body.email)
        if(!users){
            return response(res, 404, false, null," email not found")
        }
        if(users.otp ==req.body.otp ){
            const result = await verification(req.body.email)
            return response(res, 200, true, result," verification email success")
        }
        return response(res, 404, false, null," wrong otp please check your email")

    }
}

exports.UsersController = UsersController;