import React, { Component, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../client";
import { Chip } from "@mui/material";
import Button from '@mui/material/Button';
import {Link} from 'react-router-dom';

import Comments from "./Comments";

import Menu from '@mui/joy/Menu';
import MenuButton from '@mui/joy/MenuButton';
import MenuItem from '@mui/joy/MenuItem';
import Dropdown from '@mui/joy/Dropdown';

import Grid from '@mui/material/Grid';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';


const DetailedView = () => {
    const params = useParams();
    const [post, setPost] = useState('');


    
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

  const deletePost = async (event) => {
    event.preventDefault();
  
    await supabase
      .from('Posts')
      .delete()
      .eq('id', props.id); 
  
      window.location = "http://localhost:5173/catalog-view";
   
  }

 

    return (
    <>



   
    <div style={{display: "flex", justifyContent:"center", padding: "20px"}} className="post-container">

      <ArrowBackIosIcon   sx={{'&:hover': {color: "blue"}}} onClick={(event) => window.location = document.referrer}/>
   
      <img style={{width: "20%"}} src={post.url} alt="" />
      <div style={{padding: "20px"}}>
      <Grid container direction="column" alignItems="end">
      <Grid item>

        <Dropdown>
        <MenuButton sx={{border: "none"}}>
        <MoreHorizIcon/>
          </MenuButton>
          <Menu>
            <MenuItem > <Link style={{textDecoration: "none"}} to={`/catalog-view/edit/${post.id}`}> Edit </Link> </MenuItem>
            <MenuItem onClick={ (event) => deletePost} sx={{color: "red"}}> Delete </MenuItem>
        
          </Menu>
      </Dropdown>
    
        </Grid>
      </Grid>

        <h1>{post.name}</h1>
        <p>By {post.author}</p>
        {
            
            post.style_tags && post.style_tags.map((tagName, index)=> (
              <Chip sx={{ marginRight: 1.5 }} size="small" label={tagName} variant="outlined"  />
            ))}

        <p>{post.description}</p>
        <Button variant="contained"><Link style={{textDecoration: "none", color: "white"}} target="_blank" to={post.purchase_link}>Where Can I BUY IT?</Link></Button>

        <p>Creation: {post.created_at}</p>
      </div>

    </div>

    <Comments id={params.id}/>
   
    
    
    </>
    );
  };
  
  export default DetailedView;