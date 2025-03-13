import 'src/global.css';
import Fab from '@mui/material/Fab';
import { Router } from 'src/routes/sections';
import { useScrollToTop } from 'src/hooks/use-scroll-to-top';
import { ThemeProvider } from 'src/theme/theme-provider';
import { Provider as StoreProvider } from 'react-redux'
import { Iconify } from 'src/components/iconify';

import { store } from '@/store';
import { client, ClientProvider } from '@/features/fetch/client';

// ----------------------------------------------------------------------

export default function App() {
  useScrollToTop();

  const githubButton = (
    <Fab
      size="medium"
      aria-label="Github"
      href="https://github.com/Jetlee-lab/project-aits"
      sx={{
        zIndex: 9,
        right: 20,
        bottom: 20,
        width: 44,
        height: 44,
        position: 'fixed',
        bgcolor: 'grey.800',
        color: 'common.white',
      }}
    >
      <Iconify width={24} icon="eva:github-fill" />
    </Fab>
  );

  return (
    <ClientProvider value={client}>
      <StoreProvider store={store}>
        <ThemeProvider>
          <Router />
          {githubButton}
        </ThemeProvider>
      </StoreProvider>
    </ClientProvider>
  );
}
