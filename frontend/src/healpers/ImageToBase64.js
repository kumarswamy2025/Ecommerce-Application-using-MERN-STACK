// the main aim of this function is to convert image to base64 
const ImageToBase64=async(image)=>{
// insalization the file reader class
    const reader=new FileReader();
    // read image data  from image variable
    reader.readAsDataURL(image);
    // applying promise
    const data=await new Promise((resolve,reject)=>{
        // if there is no error this resolve function will be called
        reader.onload=()=>resolve(reader.result);
        // if there is an error this reject function will be called
        reader.onerror=error=>reject(error);
     

    })
    return data;
    

}

export default ImageToBase64;