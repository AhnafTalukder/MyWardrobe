import React, { useState, useEffect } from 'react';
import Card from './Card';

const ReadPosts = (props) => {

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        setPosts(props.data);
    }, [props]);
    
    return (
        <div className="ReadPosts">
            {
                posts && posts.length > 0 ?
                posts.map((post,index) => 
                   <Card id={post.id} name={post.name} author={post.author} style_tags={post.style_tags} purchase_link={post.purchase_link} description={post.description}/>
                ) : <h2>{'No Styles Yet 😞'}</h2>
            }
        </div>  
    )
}

export default ReadPosts;