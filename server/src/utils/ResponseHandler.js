class ResponseHandler {
    constructor(
        statusCode = 200,
        data = {},
        message = "SUCCESS"
    ){
        this.statusCode = statusCode,
        this.data = data,
        this.message = message
        this.success = true
    }
}

export default ResponseHandler