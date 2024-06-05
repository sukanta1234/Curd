import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { homeApi } from "../../../Api/Function/home.api";
import { Container, Grid } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useDispatch } from "react-redux";
import { resetRe } from "../../../Toolkit/authSlice";

const Home = () => {
    const dispatch=useDispatch()
  const { data } = useQuery({
    queryKey: "home",
    queryFn: homeApi,
  });
  useEffect(()=>{
    dispatch(resetRe(null))

  },[dispatch])
  
  return (
    <Container>
      <Grid container sx={{justifyContent:"center"}}>
        { Array.isArray(data) && data?.map((item) => (
          <Grid item lg={4}>
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia
                sx={{ height: 140 }}
                image={item?.image && "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Student_icon.svg/1024px-Student_icon.svg.png"}
                title="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {item.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.email}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Share</Button>
                <Button size="small">Learn More</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Home;
