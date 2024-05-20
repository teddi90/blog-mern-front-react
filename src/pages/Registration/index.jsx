import React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';

import { useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { fetchRegister, selectIsAuth } from "../../redux/slices/auth";

import styles from './Login.module.scss';

export const Registration = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);
  const { register, handleSubmit, formState: { errors, isValid } } = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      password: ""
    },
    mode: 'onChange'
  });

  const onSubmit = async (values) => {
    const data = await dispatch(fetchRegister(values));
    if (!data.payload) {
      return alert('Cannot register!');
    }
    if ('token' in data.payload) {
      window.localStorage.setItem('token', data.payload.token)
    }
    console.log(data);
  }

  if (isAuth) {
    return <Navigate to="/" />
  }
  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Create a new account
      </Typography>
      <div className={styles.avatar}>
        <Avatar sx={{ width: 100, height: 100 }} />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          error={Boolean(errors.fullName?.message)}
          helperText={errors.fullName?.message}
          {...register('fullName', { required: 'Enter fullname' })}
          className={styles.field}
          label="Fullname"
          fullWidth
        />
        <TextField
          error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          type="email"
          {...register('email', { required: 'Enter email' })}
          className={styles.field}
          label="Email"
          fullWidth
        />
        <TextField
          error={Boolean(errors.password?.message)}
          helperText={errors.password?.message}
          type="password"
          {...register('password', { required: 'Enter assword' })}
          className={styles.field}
          label="Password"
          fullWidth
        />
        <Button disabled={!isValid} type='submit' size="large" variant="contained" fullWidth>
          Register
        </Button>
      </form>
    </Paper>
  );
};
