const authrizedRole = (...alowedRoles) => {
    return(req,res,next) => {
      if(!alowedRoles.includes(req.user.role)){
          return res.json("Access Denied")
      } 
      next()
  
    }
  }
  
  module.exports = authrizedRole