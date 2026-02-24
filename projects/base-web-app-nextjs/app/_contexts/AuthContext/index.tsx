'use client';

import { Box, Button, Container, Stack, Typography } from '@mui/material';
import locale from '../../../_locale/en-US';
import AuthContext from './context';
import { useAuth0NextJsUser } from './useAuth0NextJsUser';

interface PropTypes {
  children: React.ReactNode;
}

const AuthProvider = ({ children }: PropTypes) => {

  const { user, isLoading } = useAuth0NextJsUser();

  if (isLoading) {
    return (
      <Container
        maxWidth="sm"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
        }}
      >
        <Typography>{locale.auth.loading}</Typography>
      </Container>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        user,
      }}
    >
      <>
        {!user && (
          <Container maxWidth="sm">
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh',
              }}
            >
              <Stack spacing={4} sx={{ width: '100%', textAlign: 'center' }}>
                <Box>
                  <Typography
                    variant="h3"
                    component="h1"
                    sx={{
                      fontWeight: 'bold',
                      mb: 2,
                    }}
                  >
                    {locale.auth.appTitle}
                  </Typography>
                  <Typography
                    variant="h6"
                    color="textSecondary"
                    sx={{
                      mb: 4,
                    }}
                  >
                    {locale.auth.appDescription}
                  </Typography>
                </Box>

                <Stack direction="column" spacing={2}>
                  <Button
                    variant="contained"
                    size="large"
                    href="/auth/login"
                    sx={{
                      py: 1.5,
                      fontSize: '1.1rem',
                    }}
                  >
                    {locale.auth.login}
                  </Button>
                  <Button
                    variant="outlined"
                    size="large"
                    href="/auth/login?screen_hint=signup"
                    sx={{
                      py: 1.5,
                      fontSize: '1.1rem',
                    }}
                  >
                    {locale.auth.signup}
                  </Button>
                </Stack>
              </Stack>
            </Box>
          </Container>
        )}

        {!!user && (
          <>
            {children}
          </>
        )}
      </>

    </AuthContext.Provider>
  );
};

export default AuthProvider;
