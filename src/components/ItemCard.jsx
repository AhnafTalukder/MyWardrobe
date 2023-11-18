import React from 'react'
import { useState } from 'react'
import './Card.css'
import {Link} from 'react-router-dom';
import { supabase } from '../client';


import Card from '@mui/material/Card';

import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Chip } from '@mui/material';
import CardMedia from '@mui/material/CardMedia';

import Grid from '@mui/material/Grid';

import { useEffect } from 'react';


//icons
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import { light } from '@mui/material/styles/createPalette';


import Menu from '@mui/joy/Menu';
import MenuButton from '@mui/joy/MenuButton';
import MenuItem from '@mui/joy/MenuItem';
import Dropdown from '@mui/joy/Dropdown';




const ItemCard = (props) =>  {


  


  const [heartCount, setHeartCount] = useState(props.heartCount)

  const fetchUpvotes = async () => {
    try {
      // Fetch the upvotes count from Supabase
      const { data, error } = await supabase
        .from('Posts')
        .select('heartCount')
        .eq('id', props.id)
        .single();

      if (error) {
        throw error;
      }
  
      setHeartCount(data.heartCount);
    } catch (error) {
   
      console.error('Error fetching upvotes:', error.message);
    }
  };



  
    useEffect(()=>{

      fetchUpvotes();
     
    },[])
    

    const updateHearts = async () =>{
     
      const { data, error } = await supabase
      .rpc('increment', { x: 1, row_id: props.id })

      fetchUpvotes();
    }

  
 



  const deletePost = async (event) => {
    event.preventDefault();
  
    await supabase
      .from('Posts')
      .delete()
      .eq('id', props.id); 
  
      window.location = "http://localhost:5173/catalog-view";
   
  }



  

  return (
    <Card sx={{ maxWidth: 350, boxShadow:"none" }}>
    <CardContent>

   
       
      
      <Grid container direction="column" alignItems="end">
      <Grid item>

        <Dropdown>
        <MenuButton sx={{border: "none"}}>
        <MoreHorizIcon/>
          </MenuButton>
          <Menu>
            <MenuItem > <Link style={{textDecoration: "none"}} to={`/catalog-view/edit/${props.id}`}> Edit </Link> </MenuItem>
            <MenuItem sx={{color: "red"}}onClick={deletePost}> Delete </MenuItem>
        
          </Menu>
      </Dropdown>
    
        </Grid>
      </Grid>
    

 
    <CardMedia sx={{borderRadius: "20px"}}
        component="img"
        height="400"
        width="300"
        image={props.url}
        alt="featured image"
      />
     
     <div style={{padding:"10px"}}className='card-description'>

      <div style={{display: "flex"}}>
        <div>
          <p style={{margin: "0px", fontSize: "10px"}}>{props.created_at}</p>
        <Typography variant="h5" component="div">
          {props.name}
        </Typography>
        
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          By {props.author}
        </Typography>
        </div>
        <div>
        <ArrowCircleRightIcon   onClick={() => window.location= `/catalog-view/${props.id}`} sx={{fontSize:"60px", margin: "0px 0px 0px 40px", cursor: "pointer", '&:hover': {color: "blue"}}} />
        </div>
      </div>
      
      
        <div>

          {
            
            props.style_tags && props.style_tags.map((tagName, index)=> (
              <Chip sx={{ marginRight: 1.5 }} size="small" label={tagName} variant="outlined"  />
            ))}
       

        </div>

     

        <div style={{display:"flex"}} >

          
         
        <FavoriteBorderIcon onClick={updateHearts}  sx={{ "&:hover": { color: "red" }, marginTop: 1.5}}/>
      
          <p  style={{fontSize:"15px", marginLeft: "3px"}}> {heartCount} </p>
         
        </div>
     
        </div>
       
      
    </CardContent>
  
  </Card>
  );
};

export default ItemCard;