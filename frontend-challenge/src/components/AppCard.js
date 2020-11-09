import React, {useState} from 'react';
import 
{ Card, 
  CardMedia, 
  CardContent, 
  CardActionArea, 
  Typography, 
  makeStyles } from '@material-ui/core';

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
  cardMedia: {
    height: 140,
  }
}));

const defaultFallbackImageUrl = 'https://cdn-images-1.medium.com/max/280/1*uDgQN05Lv0j-BzRBnIyUVg@2x.jpeg';

const AppCard = ({ username, cardInfo, index, handleSelection }) => {
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
          onClick={cardInfo.url ? () => handleSelection(cardInfo.url, cardInfo.title) : () => handleSelection(cardInfo.id)}
          raised={hovering.raised}
          zdepth={hovering.shadow}
          key={index}>
    <CardActionArea>
      <CardMedia
            component="img"
            className={classes.cardMedia}
            image={cardInfo.thumbnailUrl ?? defaultFallbackImageUrl}
            title="Image title"
      />
      <CardContent>
          <Typography gutterBottom variant="h6" component="h5">
              {cardInfo.title}
          </Typography>
          <Typography variant="caption">
            {`By @${username ?? ''}`}
          </Typography>
      </CardContent>
    </CardActionArea>
    </Card>
  );
}

export default AppCard;