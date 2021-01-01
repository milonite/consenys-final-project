import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      boxShadow: "none",
      width: "300px",
      borderRadius: 0,
      margin: theme.spacing(3, 1),
    },
    media: {
      height: "290px",
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
    section1: {
      margin: theme.spacing(0.5, 1),
    },
    section2: {
      margin: theme.spacing(1, 1),
    },
    avatar: {
      width: theme.spacing(2),
      height: theme.spacing(2),
      backgroundColor: "black",
    },
    artist: { color: "#9b9b9b" },
  })
);

export default function RecipeReviewCard(props: any) {
  const classes = useStyles();

  return (
    <>
      <Card className={classes.root}>
        <Box border={1}>
          <CardActionArea component={Link} to={props.to}>
            <CardMedia className={classes.media} image={props.imageUrl} />
            <CardContent>
              <div className={classes.section1}>
                <Typography style={{ textAlign: "initial" }} variant="h5">
                  {props.title}
                </Typography>
              </div>
              <Divider variant="middle" />
              <div className={classes.section2}>
                <Grid
                  container
                  direction="row"
                  justify="space-between"
                  alignItems="center"
                  spacing={2}
                >
                  <Grid item>
                    <Typography className={classes.artist} variant="body2">
                      Artist
                    </Typography>
                    <Typography variant="body2">{props.author}</Typography>
                  </Grid>
                </Grid>
              </div>
              <Grid container direction="row" justify="space-between">
                <Grid item justify="flex-start">
                  <Typography variant="body1">Generated Pieces</Typography>
                </Grid>
                <Grid item>
                  <Typography style={{ color: "#68917b" }} variant="body2">
                    {props.total}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </CardActionArea>
        </Box>
      </Card>
    </>
  );
}
