import React, { useState, useEffect } from 'react';
import { Modal, Card, CardMedia, makeStyles, CardContent, Typography } from '@material-ui/core';

const defaultFallbackImageUrl = 'https://cdn-images-1.medium.com/max/280/1*uDgQN05Lv0j-BzRBnIyUVg@2x.jpeg';

const useStyles = makeStyles((theme) => ({
    card: {
        position: 'absolute',
        left: '50%',
        top: '50%',
        marginLeft: -200,
        marginTop: -200,
        textAlign: 'center',
        width: 400,
        height: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    cardMedia: {
        height: '80%',
        width: '80%',
        marginLeft: 'auto',
        marginRight: 'auto',
    }
}));

const AppModal = ({ url, title, handleClose, isModalOpen }) => {
    const classes = useStyles();
    console.log(url);
    return (
        <Modal open={isModalOpen} onClose={handleClose} aria-labelledby="photo modal" aria-describedby="modal showing your images">
            <Card className={classes.card}>
                <CardMedia
                    component="img"
                    image={url ?? defaultFallbackImageUrl}
                    title="Selected Image"
                    className={classes.cardMedia}
                />
                <CardContent>
                    <Typography variant="caption">
                        Title: {title}
                    </Typography>
                </CardContent>
            </Card>
        </Modal>
    )
}

export default AppModal