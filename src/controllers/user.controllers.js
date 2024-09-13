import {asyncHandler} from "../utils/asynchandler.js"
import ApiError from "../utils/ApiError.js"
import { User } from "../models/user.models.js"
import { uploadOnCloudinary } from "../utils/uploadfile.js"
import {ApiRespose} from "../utils/Apiresponse.js"

const registerUser = asyncHandler ( async (req,res) => {
    // 1. get user defails from frontend
    // 2. validation - not empty 
    // 3. Check if user already exist : email
    // 4. check for images, check for avatar
    // 5. upload them in cloudinary
    // 6. create user object - create entry in db
    // 7. remove password and fresh token field from response
    // 8. check for user creation
    // 9. return res



    // 1. get user defails from frontend
    const {fullName , email, userName , password } = req.body
    // console.log("req.boy :",req.body);
    
    // console.log("email" , email , "password", password);


     // Check if all fields are provided
     // 2. validation - not empty
    if (
        [fullName , email , userName , password].some((field)=> field?.trim() === "")
    ) {
        throw new ApiError(400 , "All fields  are required")
    }
    // console.log(fullName , email, userName , password);
    

    // 3. Check if user already exists by email or username
    const existedUser = await User.findOne({
        $or: [
          { userName: userName },
          { email: email }
        ]
      });
    //   console.log(existedUser);
      
      
    // const  existedUser = await User.findOne(
    //     {
    //         $or : [{ userName } ,{ email }]
    //     }
    // )

    if(existedUser){
        throw new ApiError(409 , "user with email and username already exits")
    }

    // 4. Check for avatar and cover image in request files
    const avatarLocalpath = req.files?.avatar[0]?.path ;

    // console.log( "req.files :" , req.files);
    
    const coverImageLocalpath = req.files?.coverImage?.[0]?.path;

    if (!avatarLocalpath){
        throw new ApiError (404 , "Avatar file is required")
    }
    

    // 5. Upload avatar and cover image to Cloudinary
    const avatar = await uploadOnCloudinary(avatarLocalpath)
    console.log(avatar);
    
    const coverImage = await uploadOnCloudinary(coverImageLocalpath)
    
    if (!avatar) {
        throw new ApiError (404 , "Failed to upload on avatar")
    }

    // Create a new user in the database
    const user = await User.create({
        fullName, 
        avatar : avatar.url ,
        coverImage : coverImage?.url || "" ,
        email ,
        password ,
        userName : userName.toLowerCase()
    });
    // Fetch created user without password and refresh token
    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if (!createdUser) {
        throw new ApiError(500 , "SomeThings went wrong while registing the user")
        
    }

    // Return success response
    return res.status(201).json(
        new ApiRespose(200 , createdUser , "User register Successfully ")
    )


})

export default registerUser ;





