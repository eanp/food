const { response } = require("../middlewares/common");
const {create, findEmail} = require("../models/users");
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } =  require('uuid');


const UsersController = {
    insert: async  (req, res, next) => {
        let {rows:[users]} = await findEmail(req.body.email)
        if(users.email){
            return response(res, 404, false, "email already use"," register fail") 
        }

        let salt = bcrypt.genSaltSync(10);
        let password = bcrypt.hashSync(req.body.password);
        let data = {
            id : uuidv4(),
            email : req.body.email,
            password ,
            fullname : req.body.fullname,
            role: "toko"
        }
        try{
            const result = await create(data)
            if(result){
                console.log(result)
                response(res, 200, true, true, "register success")
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
        const password = req.body.password
        const validation = bcrypt.compareSync(password,users.password)
        // delete users.password
        if(!validation){
            return response(res, 404, false, null,"wrong password")
        }
        
        response(res, 200, false, "token 12131231","login success")
    }
}

exports.UsersController = UsersController;