import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Photos = ({ match }) => {
    const [photos, setPhotos] = useState([]);

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
                            photoId: id,
                            title: title,
                            url: url,
                            thumbnailUrl: thumbnailUrl
                        };
                    });
                    console.log(fetchedPhotos);
                    setPhotos(fetchedPhotos ?? []);
                })
                .catch(err => console.log("Error fetch photos", err));
        }

        const albumId = match.params.albumId;
        
        if (albumId) {
            getPhotos(albumId);
        }
    }, [match])

    return (
        <div>
            Photos
        </div>
    )
}

export default Photos;
