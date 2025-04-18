import { SWRConfig } from 'swr';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'eBay Metrics Analyzer',
  description: 'Analyze eBay seller metrics and track performance',
};

// Define fetcher function outside of the component
const fetcher = async (url: string) => {
  const res = await fetch(url);
  return res.json();
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SWRConfig 
          value={{
            fetcher: fetcher,
            revalidateOnFocus: false,
          }}
        >
          {children}
        </SWRConfig>
      </body>
    </html>
  );
}
