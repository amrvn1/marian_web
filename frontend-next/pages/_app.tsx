import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { AnimatePresence } from 'framer-motion';
import ToastProvider from '../components/ui/ToastProvider';
import CustomCursor from '../components/ui/CustomCursor';
import CommandPalette from '../components/ui/CommandPalette';

export default function App({ Component, pageProps, router }: AppProps) {
  return (
    <ToastProvider>
      <CustomCursor />
      <CommandPalette />
      <AnimatePresence mode="wait" initial={false}>
        <Component {...pageProps} key={router.route} />
      </AnimatePresence>
    </ToastProvider>
  );
}
