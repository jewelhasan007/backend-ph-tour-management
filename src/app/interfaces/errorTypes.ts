export interface TErrorSources = {
    path: string, 
    message: stirng
}

export interface TGenericErrorResponse {
    statusCode:  number,
    message: string,
    errorSources ?: TErrorSources[]
}