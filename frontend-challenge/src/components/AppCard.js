import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { CardActionArea, CardActions, Button, } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    transition: "transform 0.15s ease-in-out !important",
    maxWidth: 310,
  },
  cardHovered: {
      borderBottom: 5,
      transform: "scale3d(1.05, 1.05, 1) !important",
      borderBottomColor: '#5D3F6A !important',
      borderBottomStyle: 'solid',
  },
}));

const AppCard = ({ username, cardTitle, index }) => {
  const classes = useStyles();
  const [hovering, setHovering] = useState({
    raised: false,
    shadow: 1,
  })
  const handleMouseOver = () => {
    setHovering({ raised: true, shadow: 3});
  }

  const handleMouseOut = () => {
      setHovering({ raised: false, shadow: 1});
  }
  return (
    <Card className={classes.card}
          classes={{root: hovering.raised ? classes.cardHovered : ""}}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
          raised={hovering.raised}
          zdepth={hovering.shadow}
          key={index}>
    <CardActionArea>
    <CardMedia
        className={classes.cardMedia}
        image="https://source.unsplash.com/random"
        title="Image title"
    />
    <CardContent className={classes.cardContent}>
        <Typography gutterBottom variant="h5" component="h2">
            {cardTitle}
        </Typography>
        <Typography>
          {`By @${username ?? ''}`}
        </Typography>
    </CardContent>
    </CardActionArea>
    <CardActions>
        <Button size="small" color="primary">
        View
        </Button>
        <Button size="small" color="primary">
        Edit
        </Button>
    </CardActions>
    </Card>
  );
}

export default AppCard;