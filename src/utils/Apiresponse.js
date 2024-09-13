class ApiRespose {
    constructor(statuscode , data , massege = "success"){
        this.statuscode = statuscode 
        this.data = data 
        this.massege = massege 
        this.success = statuscode < 400 
        

    }
}

export {ApiRespose}