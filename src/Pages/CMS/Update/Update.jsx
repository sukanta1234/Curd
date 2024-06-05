import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { createApi } from "../../../Api/Function/create.api";
import { toast } from "react-toastify";
import { udateProduct } from "../../../Api/Function/updateProduct.api";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { singleApi } from "../../../Api/Function/single.api";

const defaultTheme = createTheme();

export default function Create() {
  const { id } = useParams();
  const [item, setItem] = useState();
  const [image, setImage] = useState();
  const { mutate, isPending } = useMutation({
    mutationFn: udateProduct,
    mutationKey: "UpdateProduct",
    onSuccess: (data) => {
      if (data.status === true) {
        toast.success(data.message);
      }
    },
  });
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("price", data.price);
    formData.append("description", data.description);
    formData.append("brand", data.brand);
    formData.append("image", data.image[0]);
    mutate({ payload: formData, id });
  };
  useEffect(() => {
    const fetch = async () => {
      try {
        let response = await singleApi(id);
        setItem(response);
      } catch (error) {
        console.log(error);
      }
    };
    fetch();
  }, [id]);
  useEffect(() => {
    if (item) {
      setValue("name", item.name);
      setValue("price", item.price);
      setValue("description", item.description);
      setValue("brand", item.brand);
    }
  }, [item]);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Update Product
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  {...register("name", { required: true })}
                  name="name"
                  required
                  fullWidth
                  id="name"
                  autoFocus
                  error={errors.name}
                  helperText={errors.name && "name is required"}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  {...register("price", { required: true })}
                  required
                  fullWidth
                  id="price"
                  name="price"
                  error={errors.price}
                  helperText={errors.price && "price is required"}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  {...register("description", { required: true })}
                  required
                  fullWidth
                  id="description"
                  name="description"
                  autoComplete="description"
                  error={errors.description}
                  helperText={errors.description && "description is required"}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  {...register("brand", { required: true })}
                  required
                  fullWidth
                  name="brand"
                  id="brand"
                  error={errors.brand}
                  helperText={errors.brand && "brand is required"}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  {...register("image", { required: true })}
                  required
                  fullWidth
                  name="image"
                  type="file"
                  id="image"
                  onChange={(e) => setImage(e.target.files[0])}
                  error={errors.image}
                  helperText={!image && errors.image && "image is required"}
                />
                {image !== "" && image != null && image !== undefined ? (
                  <>
                    {" "}
                    <img
                      src={URL.createObjectURL(image)}
                      alt="hello world"
                      height={"200px"}
                    />
                  </>
                ) : (
                  <>
                    {item?.image === "" ? (
                      <>
                        <img
                          //   src=""
                          alt=""
                        />
                      </>
                    ) : (
                      <>
                        <img
                          src={item?.image}
                          alt="hello world"
                          height={"200px"}
                        />
                      </>
                    )}
                  </>
                )}
              </Grid>
            </Grid>
            {isPending ? (
              <>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Loading....
                </Button>
              </>
            ) : (
              <>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Submit
                </Button>
              </>
            )}
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
