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
import Sparkles from "../../components/Animations/Sparkle";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      boxShadow: "none",
      width: "250px",
      borderRadius: 0,
      margin: theme.spacing(3, 1),
    },
    text: {
      backgroundImage:
        "linear-gradient(to left, violet, indigo, blue, green, yellow, orange, red)",
      color: "transparent",
      WebkitBackgroundClip: "text",
    },
    media: {
      height: "200px",
      paddingTop: "56.25%", // 16:9
      backgroundColor: "black",
      filter: "blur(2px)",
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
  })
);

interface IOverviewCard {
  imageUrl: string;
  author: string;
  tokenId: string;
  title: string;
  owner: string;
  handleSelect: (art: string, tokenId: string) => void;
}

export default function RecipeReviewCard({
  imageUrl,
  author,
  tokenId,
  title,
  owner,
  handleSelect,
}: IOverviewCard) {
  const classes = useStyles();

  return (
    <Card className={classes.root} onClick={() => handleSelect(title, tokenId)}>
      <Box border={1}>
        <CardActionArea>
          <CardMedia className={classes.media} image={imageUrl}></CardMedia>
          <CardContent>
            <div className={classes.section1}>
              <Typography style={{ textAlign: "initial" }} variant="h5">
                {title} #{tokenId}
              </Typography>
              <Grid container direction="row" justify="space-between">
                <Sparkles>
                  <Typography className={classes.text} variant="body1">
                    Click to see
                  </Typography>
                </Sparkles>
              </Grid>
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
                  <Typography variant="body1">Owner </Typography>
                  <Typography variant="body2">{owner}</Typography>
                </Grid>
                <Grid item>
                  <Typography variant="body1">Artist</Typography>
                  <Typography variant="body2">{author}</Typography>
                </Grid>
              </Grid>
            </div>
          </CardContent>
        </CardActionArea>
      </Box>
    </Card>
  );
}
