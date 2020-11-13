import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';

import { AppModal, HeaderBar, PageBody } from '../components/components';
import { UserContext } from '../wrappers/UserProvider';

const Photos = ({ history, match }) => {
    const { username } = useContext(UserContext);

    const [photos, setPhotos] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPhotoUrl, setSelectedPhotoUrl] = useState("");
    const [selectedPhotoTitle, setSelectedPhotoTitle] = useState("");

    const handleSelectImage = (url, title) => {
        setSelectedPhotoUrl(url);
        setSelectedPhotoTitle(title);
        setIsModalOpen(true);
    }
    
    const handleClose = () => {
        setIsModalOpen(false);
        setSelectedPhotoUrl("");
        setSelectedPhotoTitle("");
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
                    setPhotos(fetchedPhotos ?? []);
                })
                .catch(err => console.error("Error fetch photos", err));
        }

        const albumId = match.params.albumId;

        if (albumId) {
            getPhotos(albumId);
        }
    }, [match])

    return (
        <div>
            <HeaderBar history={history} />
            <PageBody pageTitle={"Your Photos"} pageInfo={photos} username={username} handleSelection={handleSelectImage} />
            {selectedPhotoUrl && <AppModal isModalOpen={isModalOpen} 
                                            handleClose={handleClose} 
                                            url={selectedPhotoUrl} 
                                            title={selectedPhotoTitle} />}
        </div>
    )
}

export default Photos;
