import PropTypes from 'prop-types';
import React from 'react';

import ButtonBase from '@material-ui/core/ButtonBase';
import Container from '@material-ui/core/Container';
import { withStyles } from '@material-ui/core/styles';

import i1 from '../../../public/images/1.jpg';
import i2 from '../../../public/images/2.jpg';
import i3 from '../../../public/images/3.jpg';
import i4 from '../../../public/images/4.jpg';
import i5 from '../../../public/images/5.jpg';
import i6 from '../../../public/images/6.jpg';
import i7 from '../../../public/images/7.jpg';
import i8 from '../../../public/images/8.jpg';
import i9 from '../../../public/images/9.jpg';
import Typography from '../components/Typography';

const styles = (theme: any) => ({
  root: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(4),
  },
  images: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexWrap: 'wrap',
  },
  imageWrapper: {
    position: 'relative',
    display: 'block',
    padding: 0,
    borderRadius: 0,
    height: '40vh',
    [theme.breakpoints.down('sm')]: {
      width: '100% !important',
      height: 100,
    },
    '&:hover': {
      zIndex: 1,
    },
    '&:hover $imageBackdrop': {
      opacity: 0.15,
    },
    '&:hover $imageMarked': {
      opacity: 0,
    },
    '&:hover $imageTitle': {
      border: '4px solid currentColor',
    },
  },
  imageButton: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.common.white,
  },
  imageSrc: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%',
  },
  imageBackdrop: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    background: theme.palette.common.black,
    opacity: 0.5,
    transition: theme.transitions.create('opacity'),
  },
  imageTitle: {
    position: 'relative',
    padding: `${theme.spacing(2)}px ${theme.spacing(4)}px 14px`,
  },
  imageMarked: {
    height: 3,
    width: 18,
    background: theme.palette.common.white,
    position: 'absolute',
    bottom: -2,
    left: 'calc(50% - 9px)',
    transition: theme.transitions.create('opacity'),
  },
});
const PUBLIC_PATH = process.env.PUBLIC_PATH;
function ProductCategories(props: any) {
  const { classes } = props;

  const images = [
    {
      url: i1,
      title: 'Show',
      width: '40%',
    },
    {
      url: i2,
      title: 'Beauty',
      width: '20%',
    },
    {
      url: i3,
      title: 'News',
      width: '40%',
    },
    {
      url: i4,
      title: 'Music',
      width: '38%',
    },
    {
      url: i5,
      title: 'New Year',
      width: '38%',
    },
    {
      url: i6,
      title: 'Sharing',
      width: '24%',
    },
    {
      url: i7,
      title: 'Reward',
      width: '40%',
    },
    {
      url: i8,
      title: 'Mise Shop',
      width: '20%',
    },
    {
      url: i9,
      title: 'Seminar',
      width: '40%',
    },
  ];

  return (
    <Container className={classes.root} component="section">
      <Typography variant="h4" marked="center" align="center" component="h2">
        Participating in Activities You Enjoy
      </Typography>
      <div className={classes.images}>
        {images.map((image) => (
          <ButtonBase
            key={image.title}
            className={classes.imageWrapper}
            style={{
              width: image.width,
            }}>
            <div
              className={classes.imageSrc}
              style={{
                backgroundImage: `url(${image.url})`,
              }}
            />
            <div className={classes.imageBackdrop} />
            <div className={classes.imageButton}>
              <Typography component="h3" variant="h6" color="inherit" className={classes.imageTitle}>
                {image.title}
                <div className={classes.imageMarked} />
              </Typography>
            </div>
          </ButtonBase>
        ))}
      </div>
    </Container>
  );
}

ProductCategories.propTypes = {
  classes: PropTypes.object.isRequired,
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export default withStyles(styles)(ProductCategories);
