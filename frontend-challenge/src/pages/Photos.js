import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import HeaderBar from '../components/HeaderBar';
import PageBody from '../components/PageBody';
import { UserContext } from '../wrappers/UserProvider';
import AppModal from '../components/AppModal';

const Photos = ({ history, match }) => {
    const { username } = useContext(UserContext);

    const [photos, setPhotos] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPhotoUrl, setSelectedPhotoUrl] = useState("");
    const [selectedPhotoTitle, setSelectedPhotoTitle] = useState("");

    const handleSelectImage = (url, title) => {
        console.log("Selected Image");
        setSelectedPhotoUrl(url);
        setSelectedPhotoTitle(title);
        console.log(url);
        setIsModalOpen(true);
    }
    
    const handleClose = () => {
        console.log("Closed");
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
            <HeaderBar history={history} />
            <PageBody pageTitle={"Your Photos"} pageInfo={photos} username={username} handleSelection={handleSelectImage} />
            
                {selectedPhotoUrl && 
                    <AppModal 
                        isModalOpen={isModalOpen} 
                        handleClose={handleClose} 
                        url={selectedPhotoUrl} 
                        title={selectedPhotoTitle} />}
        </div>
    )
}

export default Photos;
