const Pool = require("./../config/db");

const create = (data) => {
    const {id,email,password,fullname,role} = data
    return new Promise ((resolve,reject)=>
        Pool.query(`INSERT INTO users(id,email,password,fullname,role) VALUES('${id}','${email}','${password}','${fullname}','${role}')`,(err,result)=>{
            if(!err){
                resolve(result)
            } else {
                reject(err)
            }
    })
    )
}

const findEmail = (email) => {
    return new Promise ((resolve,reject)=>
        Pool.query(`SELECT * FROM users where email='${email}'`,(err,result)=>{
            if(!err){
                resolve(result)
            } else {
                reject(err)
            }
    }))
}

module.exports = {create,findEmail}