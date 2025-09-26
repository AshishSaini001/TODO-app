import jwt from "jsonwebtoken"


function auth(req,res,next){
    const token=req.headers.token
    const decodedData=jwt.verify(token,"random")
    if(decodedData){
        req.userId=decodedData.id
        next()
    }
    else{
        res.status(401).json({
            message:"Not logged in"
        })
    }
}
export default auth;