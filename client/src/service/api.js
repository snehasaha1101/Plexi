import axios from 'axios';
import { API_NOTIFICATION_MESSAGES, SERVICE_URLS} from '../constants/config.js';
import { getAccessToken,getType} from '../utils/common-utils.js';
const API_URL='http://localhost:8000';
const axiosInstance=axios.create({
    baseURL: API_URL,
    timeout: 10000,
    headers:{
        "content-type":"application/json"
    }
})

axiosInstance.interceptors.request.use(
    function(config){
        if(config.TYPE.params){
            config.params = config.TYPE.params
        }else if(config.TYPE.query){
            config.url=config.url + '?' + config.TYPE.query;

        }return config;
    },
    function(error){
        return Promise.reject(processError(error));
    }

)

axiosInstance.interceptors.response.use(
    function(response){
        return processResponse(response);
    },
    function(error){
        return Promise.reject(processError(error));
    }
)
const processResponse=(response)=>{
    if(response?.status===200){
        return {isSuccess:true,data: response.data}
    }else{
        return{
            isFailure: true,
            status: response?.status,
            msg: response?.msg,
            code: response?.code,
        }
    }
}

const processError=(error)=>{
    if(error.response){
        console.log('ERROR IN RESPONSE: ',error.toJSON())
        return{
            isError: true,
            msg: API_NOTIFICATION_MESSAGES.responseFailure,
            code: error.response.status
        }
    }else if(error.request){
        console.log('ERROR IN REQUEST: ',error.toJSON());
        return{
            isError: true,
            msg: API_NOTIFICATION_MESSAGES.requestFailure,
            code: ""//no code is sent in case of backend
        }
    }else{
        console.log('ERROR IN NETWORK: ',error.toJSON());
        return{
            isError: true,
            msg: API_NOTIFICATION_MESSAGES.networkError,
            code: ""
        }
    }
}
const API={};

for (const [key, value] of Object.entries(SERVICE_URLS)) {
    API[key] = async (body,body2, showUploadProgress, showDownloadProgress) => {
        try {
             const isFormData = body instanceof FormData;
              const headers = {
                authorization: getAccessToken(),
                Accept: isFormData ? "application/json, form-data" : "application/json",
                "Content-Type": isFormData ? "multipart/form-data" : "application/json"
            };
              let url = value.url;
              if (key === "deletePost" && body) {
                url = `${value.url}/${body}`;
             }
               if (key === "updatePost" && body && body2) {
                url = `${value.url}/${body}`;
                body = body2;
            }
            if (key === "getPostById" && body) {
                url = `${value.url}/${body}`;
            }
            const response = await axiosInstance({
                method: value.method,
                url: url,
                data: value.method==='DELETE'?{}:body,
                responseType: value.responseType,
                headers,

                TYPE: getType(value, body),
                onUploadProgress: function (progressEvent) {
                    if (showUploadProgress) {
                        let percentageCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                        showUploadProgress(percentageCompleted);
                    }
                },
                onDownloadProgress: function (progressEvent) {
                    if (showDownloadProgress) {
                        let percentageCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                        showDownloadProgress(percentageCompleted);
                    }
                }
            });

            return response; // ✅ success: return processed response from interceptor
        } catch (error) {
            return error; // ✅ failure: return processed error object from interceptor
        }
    };
}

export{ API };