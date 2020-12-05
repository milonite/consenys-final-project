import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      boxShadow: "none",
      width: "400px",
      borderRadius: 0,
    },
    media: {
      height: "30vh",
      paddingTop: "56.25%", // 16:9
      backgroundColor: "black",
    },
    expand: {
      transform: "rotate(0deg)",
      marginLeft: "auto",
      transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: "rotate(180deg)",
    },
    avatar: {
      width: theme.spacing(2),
      height: theme.spacing(2),
      backgroundColor: "black",
    },
  })
);

export default function RecipeReviewCard() {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <Box border={1}>
        <CardActionArea component={Link} to="/create">
          <CardMedia
            className={classes.media}
            image="https://i.ibb.co/3c9CxZT/canvas.png"
          />
          <CardContent>
            <Typography variant="h5" color="textSecondary" component="p">
              Psycho
            </Typography>
            <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="center"
            >
              <Grid item>
                <Typography variant="body1" color="textSecondary" component="p">
                  0.400Ξ ($229)
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body1" color="textSecondary" component="p">
                  4.00Ξ ($2229)
                </Typography>
              </Grid>
            </Grid>
            <Divider variant="middle" />
            <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="center"
            >
              <Grid item>
                <Avatar aria-label="recipe" className={classes.avatar}>
                  K
                </Avatar>
                <Typography variant="body1" color="textSecondary" component="p">
                  Kgolid
                </Typography>
              </Grid>
              <Grid item>
                <Avatar aria-label="recipe" className={classes.avatar}>
                  K
                </Avatar>
                <Typography variant="body1" color="textSecondary" component="p">
                  Kgolid
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </CardActionArea>{" "}
      </Box>
    </Card>
  );
}
