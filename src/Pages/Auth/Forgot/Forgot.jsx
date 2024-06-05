import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { useForm } from "react-hook-form"
import { useMutation } from '@tanstack/react-query';
import { forgotApi } from '../../../Api/Function/forgot.api';
import { toast } from 'react-toastify';



const defaultTheme = createTheme();

export default function Forgot() {
    const {mutate,isPending}=useMutation({
        mutationFn:forgotApi,
        mutationKey:"forgot",
        onSuccess:(data)=>{
            if (data.success===true) {
                toast.success(data.message)
                
            }
        }
    })
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm()
    
      const onSubmit = (data) =>{
        const value={
            "email":data.email,
            "newPassword":data.newPassword,
            "first_school":data.first_school
        }
        mutate(value)
      }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Forgot Password
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              
              <Grid item xs={12} sm={12}>
                <TextField
                {...register("first_school",{required:true})}
                  required
                  fullWidth
                  id="first_school"
                  label="first_school"
                  name="first_school"
                  error={errors.first_school}
                  helperText={errors.first_school && "first_school is required"}
                  
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                {...register("email",{required:true})}
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  error={errors.email}
                  helperText={errors.email && "email is required"}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                {...register("newPassword",{required:true})}
                  required
                  fullWidth
                  name="newPassword"
                  label="newPassword"
                  type="password"
                  id="newPassword"
                  error={errors.newPassword}
                  helperText={errors.newPassword && "newPassword is required"}
                  
                />
              </Grid>
              
            </Grid>
           {isPending?(<>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Loading....
            </Button>
           </>):(<>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Submit
            </Button>
           </>)}
           
          </Box>
        </Box>
       
      </Container>
    </ThemeProvider>
  );
}