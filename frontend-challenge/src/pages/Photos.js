import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import HeaderBar from '../components/HeaderBar';
import PageBody from '../components/PageBody';
import { UserContext } from '../wrappers/UserProvider';

const Photos = ({ match }) => {
    const { username } = useContext(UserContext);

    const [photos, setPhotos] = useState([]);

    const handleSelectImage = () => {
        console.log("Selected Image");
    }

    useEffect(() => {
        const getPhotos = (albumId) => {
            axios.get(`https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`)
                .then(res => {
                    const fetchedPhotos = res.data?.map(photo => {
                        const {
                            id,
                            title,
                            url,
                            thumbnailUrl,
                        } = photo;

                        return {
                            id,
                            title,
                            url,
                            thumbnailUrl
                        };
                    });
                    console.log(fetchedPhotos);
                    setPhotos(fetchedPhotos ?? []);
                })
                .catch(err => console.log("Error fetch photos", err));
        }

        const albumId = match.params.albumId;
        console.log(albumId);
        
        if (albumId) {
            getPhotos(albumId);
        }
    }, [match])

    return (
        <div>
            <HeaderBar />
            <PageBody pageTitle={"Your Photos"} pageInfo={photos} username={username} handleSelection={handleSelectImage} />
        </div>
    )
}

export default Photos;
