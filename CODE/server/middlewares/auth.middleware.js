const authorize = (req,res,next) => {
    const token = req?.headers?.authorization?.split(' ')[1];
        if(!token){
            return res.status(403).send({ message : "Forbidden" })
        }
        jwt.verify( token ,"MY_KEY", ( err , decoded ) => {
            console.log(err);
            if(err) return res.status(400).send({ err });
            if(decoded) {
                res.role = user.role;
                res._id = user_id;
                next();
            } 
            // return res.status(200).send({ user : decoded });
    })
}

module.exports = authorize