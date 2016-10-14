    exports.getAllUsers = function getAllUsers(req,res,next){
        console.log("get all users erequest receieved"); 
        res.status(200).json({'message':'success'});
    };
    
    exports.createUser = function routeCreateUser(req,res) {
    	
    }
    


//var userMdl = require("../models/userRoleAuthorization");
//var project = require("../models/project");


// Creating an user for generating access token.
/*exports.createUser = function routeCreateUser(req,res) {
	
	// variable declaration
	var u_name = req.body.user_name || req.body.email_address || "NA";
    var u_password = req.body.password || "password1";
    var u_role = req.body.role || "NA";
    var u_type = req.body.user_type;
    var isUser = 0;
    
    
    // to insert the data to db
    var insertData = function(users,next){
    	console.log("Inside inserData method");
        if(isUser === 0){

        
            var _userModel = new userModel({    user_name: u_name,
                                                password: u_password,
                                                role: u_role,
                                                user_type: u_type,
                                            });

            _userModel.save(function (err) {
                if (err) {
					logger.log('error', err.message);
					 res.json({info: 'error during project create', error: err});
                } else {
                	 res.json({info: 'project created successfully'});
                }
            });
        }else{				
        	 res.json({info: 'isUser value is not 0'});
        }

    }; */
    

    // Retrieve all created users



	
