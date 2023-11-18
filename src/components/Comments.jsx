import react, { useEffect } from 'react'
import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import { supabase } from '../client';

const Comments = (props) =>{


    const [comments, setComments] = useState([]);
    const [savedComments, setSavedComments] = useState([]);

    const [currentComment, setCurrentComment] = useState("");

    

    useState(()=>{

        
        const fetchComments = async () =>{
            const { data, error } = await supabase
            .from('Posts')
            .select('comments')
            .eq('id', props.id)
            .single();
    
          if (error) {
            throw error;
          }
    
          setSavedComments(data.comments)
    
          console.log(data);
    
        }

        fetchComments();
    


        const channel = supabase
        .channel('schema-db-changes')
        .on(
        'postgres_changes',
        {
            event: '*',
            schema: 'public',
            table: "Posts"
        },
        (payload) => {
            console.log(payload)
            setSavedComments(payload.new.comments)
        }
        )
        .subscribe()
    
    
  
  
    }, [])


 
    console.log(savedComments)


    
    const postComment = async () =>{

    

       
  
        const { data, error } = await supabase
        .from('Posts')
        .update({comments: [...savedComments, currentComment]})
        .eq('id', props.id)
        .select();

      if (error) {
        throw error;
      }

  

    }


    return(
        <>
        <div style={{display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center"}}>
          
            <TextField onChange = {(event) => setCurrentComment(event.target.value)} sx={{width: "80%"}}  name="comment"   id="filled-multiline-static" label="Write an encouraging comment!" multiline rows={4}  variant="outlined" />
          <Button onClick={postComment}> Submit </Button>
        
          {savedComments && [...savedComments].reverse().map((item, index) => (

            <div style={{width: "70%", backgroundColor: "beige", margin: "5px", padding: "60px", borderRadius:"20px", listStyle:"none"}} className="text-bubble">
                     <li>{item}</li> 
            </div>
      
          ))}

        </div>
        </>
    )
}

export default Comments;