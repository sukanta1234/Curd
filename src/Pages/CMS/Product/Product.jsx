import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { productApi } from "../../../Api/Function/product.api";
import { Container, Grid } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Swal from 'sweetalert2'
import { deleteApi } from "../../../Api/Function/delete.api";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const Product = () => {
    const queryClient=useQueryClient()
  const { data } = useQuery({
    queryKey: "product",
    queryFn: productApi,
  });
  const {mutate}=useMutation({
    mutationFn:deleteApi,
    mutationKey:"delete",
    onSuccess:async(data)=>{
        await queryClient.invalidateQueries("product")
        if (data.status===true) {
            toast.success(data.message)
            
        }

    }
  })
const isConfirmed=(id)=>{
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {
            handleDelete(id)
         
        }
      });
      const handleDelete=(id)=>{
        mutate(id)
        Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success"
          });
        
      }
}
  return (
    <Container>
      <Grid container>
        {Array.isArray(data) &&
          data?.map((item) => (
            <Grid item lg={4}>
              <Card sx={{ maxWidth: 345 ,margin:"10px"}}>
                <CardMedia
                  sx={{ height: 140 }}
                  image={item.image}
                  title="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {item.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.description}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" onClick={(()=>isConfirmed(item._id))}>Delete</Button>
                  <Button size="small" component={Link} to={`/Product/${item._id}`}>Edit</Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
      </Grid>
    </Container>
  );
};

export default Product;
