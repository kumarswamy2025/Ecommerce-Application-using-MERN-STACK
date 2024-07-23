const cloudinary_upload_images_url=`https://api.cloudinary.com/v1_1/dudq7kszm/image/upload`;



const UploadImages=async(image)=>{
    // console.log("the is upload images file-->",process.env.REACT_APP_CLOUDINARYNAME);
    // converting the image to a form data
   const formData = new FormData();
   formData.append("file", image);
   // here we not using the api key so we have use one more field  that is upload_preset name
   formData.append("upload_preset","mern_product_images");
    const dataRespons=await fetch(cloudinary_upload_images_url,{
        method:"post",
        body:formData
    })
    return dataRespons.json();

}

export default UploadImages