import { useState, useCallback, useRef } from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';

import { useRouter } from 'src/routes/hooks';

import { Iconify } from 'src/components/iconify';

import RestLogin from '@/components/auth/login';
import { z } from 'zod';
import { Alert } from '@mui/material';

import { useAppDispatch } from '@/store';
import { setCredentials, selectCurrentUser } from '@/features/auth/auth-slice';
// import { useSelector } from 'react-redux';
import { useAuth } from '@/hooks/use-auth';

// ----------------------------------------------------------------------

export function SignInView() {
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)

  const dispatch = useAppDispatch()
  const user = useAuth()

  const [error, setError] = useState(false)
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  const schema = z.object({
    email: z.string().email({ message: "Provide valid email" }),
    password: z.string().min(5)
  })

  const handleSignIn = useCallback(() => {
    if (!emailRef.current || !passwordRef.current)
      return
    // console.log(emailRef.current.name)
    
    const [ email, password ] = [
      emailRef.current.value,
      passwordRef.current.value
    ]
    
    const result = schema.safeParse({ email, password })
    console.log([result.success, email, password])
    
    if (!result.success) {
      // for (let e of result.error.issues) console.log(e.path[0], e.message, e)
      setError(true)
      return
    }

    console.log(1, user)
    dispatch(setCredentials({user: {email, password}, token: ''}))
    console.log(2, user)
    return

    console.log(credentials.email, credentials.password)
    
    router.push('/');
  }, [router]);

  const renderForm = (
    <Box display="flex" flexDirection="column" alignItems="flex-end">
      <TextField
        fullWidth
        name="email"
        label="Email address"
        // defaultValue="hello@gmail.com"
        placeholder='you@email.com'
        InputLabelProps={{ shrink: true }}
        sx={{ mb: 3 }}
        inputRef={emailRef}
      />

      <Link variant="body2" color="inherit" sx={{ mb: 1.5 }}>
        Forgot password?
      </Link>

      <TextField
        fullWidth
        name="password"
        label="Password"
        // defaultValue="@demo1234"
        placeholder='Enter your password'
        InputLabelProps={{ shrink: true }}
        type={showPassword ? 'text' : 'password'}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                <Iconify icon={showPassword ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
              </IconButton>
            </InputAdornment>
          ),
        }}
        sx={{ mb: 3 }}
        inputRef={passwordRef}
      />

      {
        error && <Alert severity="error" sx={{ alignSelf: 'normal', paddingLeft: '30%' }}>
          Invalid credentials
        </Alert>
      }

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        color="inherit"
        variant="contained"
        onClick={handleSignIn}
      >
        Sign in
      </LoadingButton>
    </Box>
  );

  return (
    <>
      <Box gap={1.5} display="flex" flexDirection="column" alignItems="center" sx={{ mb: 5 }}>
        <Typography variant="h5">Sign in</Typography>
        <Typography variant="body2" color="text.secondary">
          Don’t have an account?
          <Link variant="subtitle2" sx={{ ml: 0.5 }}>
            Get started
          </Link>
        </Typography>
      </Box>

      {renderForm}
      {/* <RestLogin/> */}

      <Divider sx={{ my: 3, '&::before, &::after': { borderTopStyle: 'dashed' } }}>
        <Typography
          variant="overline"
          sx={{ color: 'text.secondary', fontWeight: 'fontWeightMedium' }}
        >
          OR
        </Typography>
      </Divider>

      <Box gap={1} display="flex" justifyContent="center">
        <IconButton color="inherit">
          <Iconify icon="logos:google-icon" />
        </IconButton>
        <IconButton color="inherit">
          <Iconify icon="eva:github-fill" />
        </IconButton>
        <IconButton color="inherit">
          <Iconify icon="ri:twitter-x-fill" />
        </IconButton>
      </Box>
    </>
  );
}
