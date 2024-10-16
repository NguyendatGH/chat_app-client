import axios from 'axios';

const errorHandler  = (error : unknown) : string =>{
    let message = "";
    if(axios.isAxiosError(error) && error.response){
        let errorMessage = null;
        if (error.response.data) {
            errorMessage = error.response.data.message;
        }
        return(message = errorMessage ? errorMessage : "unknown error from backend!");
    }

    if(error instanceof Error){
        return (message = error.message);
    }
    
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return (message = "something went wrong!"+ String(error));
};

export default errorHandler;