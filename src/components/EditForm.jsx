import React, { useState } from 'react';
import './ClothingForm.css'
import { supabase } from '../client'

import {Typography} from '@mui/material';
import { useEffect } from 'react';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';


import TagsInput from './TagsInput';
import { useParams } from 'react-router-dom';

import { v4 as uuidv4 } from 'uuid';


const EditForm = () => {
    const params = useParams();

 
    const [post, setPost] = useState({name: "", author: "Anonymous", style_tags: [], purchase_link: "", description:"", url: ""})
    const [error, setError] = useState({name: false, style_tags: false, purchase_link: false, description: false});

    const [file, setFile] = useState(null);
    const [imageUrl, setImageUrl] = useState('');
    const [uploading, setUploading] = useState(false);


        
  useEffect(()=>{
    const fetchData = async () =>{
        const { data, error } = await supabase
        .from('Posts')
        .select()
        .eq('id', params.id)
      
      
        setPost(data[0])
       
  
    }

   

    fetchData().catch(console.error);
    console.log(post)
  
  },[]);

  
    

    const handleChange = (event) => {
        const {name, value} = event.target;
        setPost( (prev) => {
            return {
                ...prev,
                [name]:value,
            }

        })


        
    }


    const verifyEntries = () =>{
        let errorFound = false;
        for(const [key, value] of Object.entries(error)){
            if(!post[key]|| post[key].length===0){
                setError( (prev) => {
                    return {
                        ...prev,
                        [key]:true,
                    }
        
            })
                errorFound = true;
            }else{
                setError( (prev) => {
                    return {
                        ...prev,
                        [key]:false,
                    }
        
            })
            }
        }

        return errorFound;
    }


    const handleFileChange = (event) =>{
        const selectedFile = event.target.files[0];
        setFile(selectedFile);
    }

    const handleUpload = async() =>{
        
        if(!file){
            //alert('Please select an image to upload');
            return;
        }
    


        try{

           

            
            setUploading(true);

            const uniqueId = uuidv4(); 

            const {data, error} = await supabase.storage
            .from('uploads')
            .upload(file.name+uniqueId, file);

            if(error){
                throw error;
            }

            const {data:image_url} = supabase.storage.from("uploads").getPublicUrl(file.name+uniqueId);
            setImageUrl(image_url.publicUrl);
            console.log(image_url.publicUrl);
       
        
        }catch(error){
            console.log('Error uploading image', error);
        }finally{
            setUploading(false);
        }
    }


  

    const createPost = async (event) => {

        event.preventDefault();
    
        if(verifyEntries()){
            alert("Please enter values for all required fields.")
        }else{
            handleUpload();
         

            const { data, error } = await supabase
            .from('Posts')
            .update({name: post.name, author: post.author, style_tags: post.style_tags, purchase_link: post.purchase_link, description: post.description, image: post.image, url: post.url})
            .eq('id', post.id)
    
            console.log(data);
            
            if (error) {
                console.log(error);
            }


            window.location = "/catalog-view";
        
        }

    
       


        

      

    }



  

    return (
        <div style={{display: "flex", justifyContent:"center", alignItems:"center"}}>

            <form style={{backgroundColor: 'beige'}}  className='clothing-form'>
                <Box
                component="form"
                sx={{'& > :not(style)': { m: 3}}}
                noValidate
                autoComplete="off">

               
                    
                    <TextField value={post.name} sx={{width: "80%"}} error={error.name} color="primary"  name="name"  required id="name-of-clothing" type="email" label="Name of Clothing/Accessory" variant="outlined"  onChange={handleChange} />
                    <div >
                    <Autocomplete
                        
                        error={error.style_tags}
                        sx={{width: "83%"}}
                        multiple
                        id="tags-filled"
                        options={post.style_tags}
                        freeSolo
                        value={post.style_tags}
                        onChange={(value, getTagProps) => setPost( (prev) => {
                            return {
                                ...prev,
                                ["style_tags"]:getTagProps,
                            }
                
                        })}
                        renderTags={(value, getTagProps) => 
                      
                        value.map((option, index) => (
                            
                            <Chip
                            variant="outlined"
                            label={option}
                            {...getTagProps({ index })}
                            />
                        ))
                        }
                        renderInput={(params) => (
                        <TextField
                            required
                            error={error.style_tags}
                            {...params}
                            variant="outlined"
                            label="Style tags"
                            placeholder="Input descriptive tags"
                        />
                        )}
                    />
                    </div>
                    
                    <TextField value={post.purchase_link} sx={{width: "80%"}} error={error.purchase_link} name="purchase_link"   required id="purchase-link" label="Purchase Link" variant="outlined"  margin="normal" onChange={handleChange}/>
                    <TextField value={post.description} sx={{width: "80%"}} error={error.description} name="description"   id="filled-multiline-static" label="Write a brief description about your item." multiline rows={4}  variant="outlined" onChange={handleChange} />
                    <TextField value={post.url} sx={{width: "80%"}} error={false} id="url" name="url" label="Image Url" variant="outlined" onChange={handleChange}  />
                    <TextField value={post.author}  error={false} name="author"  style={{width:"25ch"}} id="author" label="Your Name" variant="outlined"  inputProps={{ maxLength: 20}} defaultValue="Anonymous"  onChange={handleChange}/>
                    <Button onChange={handleFileChange} variant="outlined" component="label"><input  accept="image/*" type="file" hidden/>Insert Image</Button>
                    <Button onClick={createPost} disabled={uploading} sx={{padding: "10px 20px 10px 20px", fontSize:"20px"}} variant="contained" component="label"><input type="file" hidden/>Submit</Button>

               
                </Box>
             
                
            </form>

          
           
        </div>


    )
}

export default EditForm;
