import { useState, useEffect } from 'react'
import { supabase } from '../client';
import ItemCard from './ItemCard';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';


import TuneIcon from '@mui/icons-material/Tune';

import Menu from '@mui/joy/Menu';
import MenuButton from '@mui/joy/MenuButton';
import Dropdown from '@mui/joy/Dropdown';

import Grid from '@mui/material/Grid';


const  Catalog = () =>{
  const [posts, setPosts] = useState([{}])
  const [searchQuery, setSearchQuery]  = useState("")
  const [tags, setTags] = useState(["Tag 1", "Tag 2"]);
  const [isAscending, setAscending] = useState(false)


 

  useEffect(()=>{
    const fetchData = async () =>{
      const {data} = await supabase
      .from('Posts')
      .select()
      .order('created_at', { ascending: isAscending })

       setPosts(data);
       console.log(data)
    }

    fetchData().catch(console.error);

  
  },[posts]);


  const filterItems = (items)  =>{


  
  
    const simpleQuery = searchQuery.replace(/\s/g, '').toLowerCase();

    const filteredItems = items.filter(item => {
   
      let itemContents = item.name + item.description;
      itemContents = itemContents.replace(/\s/g, '').toLowerCase();

      return itemContents.includes(simpleQuery);
    })

      return filteredItems;
    
    


   
  }


  const removeTag = (inputArray, elementToRemove) =>{
    console.log(elementToRemove)
    const newArray = inputArray.filter(item => item !== elementToRemove)
    return newArray
  }



  return (
   
   
    <div > 
      <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
       <TextField  onChange={ (event) => setSearchQuery(event.target.value)} sx={{width: "60%"}} color="primary"  name="name"   id="name-of-clothing" type="email" label="Start a fashion fiesta" variant="outlined"  />
          <FormControl sx={{width: "10%"}}>
          <InputLabel id="demo-simple-select-label">Tags</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Age"
            onClick={(event) => setTags([...tags, event.target.innerText])}
        
          >
            <MenuItem name="Fashion">Fashion</MenuItem>
            <MenuItem name="Pink">Pink</MenuItem>
            <MenuItem name="Blue">Blue</MenuItem>
          </Select>
        </FormControl>
       </div>

       <div style={{display: "flex", justifyContent: "center", alignItems: "center", margin: "15px"}}>
       {
            
            tags && tags.map((tagName, index)=> (
              <Chip sx={{ marginRight: 1.5 }} size="small" label={tagName} value={tagName} variant="outlined" onDelete={(event) => setTags(removeTag(tags, tagName))} />
              
            ))}

      <div style={{display: "flex", justifyContent: "end", alignItems: "center"}}>
      <Grid container direction="column" alignItems="end">
      <Grid item>

        <Dropdown>
        <MenuButton sx={{border: "none"}}>
        <TuneIcon/>
          </MenuButton>
          <Menu>
            <MenuItem  onClick={(event) => setAscending(false)} >Most Recent</MenuItem>
            <MenuItem >Most Popular</MenuItem>
            <MenuItem >Most Comments</MenuItem>
            <MenuItem onClick={(event) => setAscending(true)} >Oldest</MenuItem>
        
          </Menu>
      </Dropdown>
    
        </Grid>
      </Grid>
     
       </div>

       </div>

       
       <div style={{display:"flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", padding: "20px"}} className="ReadPosts">
           
            
            {
                posts && posts.length > 0 ?
                
                ( searchQuery) ? 
                filterItems(posts).map((post,index) => 
                <ItemCard created_at ={post.created_at} style_tags={post.style_tags} heartCount = {post.heartCount} id={post.id} name={post.name} author={post.author} purchase_link={post.purchase_link} description={post.description} url={post.url}/>)

                :
                posts.map((post,index) => 
                   <ItemCard created_at ={post.created_at} style_tags={post.style_tags} heartCount = {post.heartCount} id={post.id} name={post.name} author={post.author} purchase_link={post.purchase_link} description={post.description} url={post.url}/>
                ) : <h2>{'No Clothes Yet 😞'}</h2>






            }
      </div>  
      </div>
    
    
 
  )
}

export default Catalog
