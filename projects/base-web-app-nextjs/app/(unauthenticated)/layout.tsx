import { Box, Container } from '@mui/material';
import '../globals.css';

export default function UnAuthenticatedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Box sx={{ display: 'flex' }}>
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
  );
}
