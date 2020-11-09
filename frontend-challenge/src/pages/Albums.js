import React, { useContext, useEffect, useState } from 'react';
import HeaderBar from '../components/HeaderBar';
import PageBody from '../components/PageBody';
import { UserContext } from '../wrappers/UserProvider';
import axios from 'axios';

const Albums = () => {
    const { userId, username } = useContext(UserContext);
    const [albums, setAlbums] = useState([]);
    console.log("Yo: " + userId);
    console.log("Eh: " + username);
    useEffect(() => {
        const getAlbums = (userId) => {
            axios.get(`https://jsonplaceholder.typicode.com/albums?userId=${userId}`)
                .then(res => {
                    const fetchedAlbums = res.data?.map(album => {
                        const {
                            id, 
                            title,
                        } = album;
                        
                        return {
                            albumId: id,
                            title: title
                        };
                    });
    
                    setAlbums(fetchedAlbums ?? []);
                })
                .catch(err => console.log("Error fetch album", err));
        }
        console.log(username);
        console.log(userId);
        getAlbums(userId);
    }, [username, userId]);

    return (
        <div>
            <HeaderBar />
            <PageBody pageInfo={albums} username={username} />
        </div>
    )
}

export default Albums
