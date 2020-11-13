import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';

import { HeaderBar, PageBody } from '../components/components';
import { UserContext } from '../wrappers/UserProvider';
import { ROUTES } from '../routes/Routes';

const Albums = ({ history }) => {
    const { userId, username } = useContext(UserContext);
    const [albums, setAlbums] = useState([]);

    const handleSelectAlbum = (selectedAlbumId) => {
        history.push(ROUTES.ALBUMS + `/${selectedAlbumId}` + ROUTES.PHOTOS);
    }
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
                            id,
                            title
                        };
                    });
    
                    setAlbums(fetchedAlbums ?? []);
                })
                .catch(err => console.error("Error fetch album", err));
        }
        getAlbums(userId);
    }, [username, userId]);

    return (
        <div>
            <HeaderBar history={history} />
            <PageBody pageTitle={"Your Albums"} 
                      pageInfo={albums} 
                      username={username} 
                      handleSelection={handleSelectAlbum} />
        </div>
    )
}

export default Albums;
