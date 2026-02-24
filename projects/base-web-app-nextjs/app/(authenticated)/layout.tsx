import { Box, Container } from '@mui/material';
import LeftNavBar from '../_components/LeftNavBar';
import AuthProvider from '../_contexts/AuthContext';
import '../globals.css';

export default function AuthenticatedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <Box sx={{ display: 'flex' }}>
        <LeftNavBar />
        <Box sx={{ flex: 1, width: '100%' }}>
          <Box sx={{ display: 'flex' }}>
            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', width: '100%' }}>
              <Container maxWidth="lg" sx={{ py: 4 }}>
                <main>
                  {children}
                </main>
              </Container>
            </Box>
          </Box>
        </Box>
      </Box>
    </AuthProvider>
  );
}
