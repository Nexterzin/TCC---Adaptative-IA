
import { Poppins } from 'next/font/google';

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
});

export const metadata = {
  title: 'Predição de diabetes',
  description: 'Sistema que traz uma predição de diabetes com o uso de Machine Learning',
}

export default function RootLayout({ children }) {
  return (
    <html className={`${poppins.variable}`}>
      <body>{children}</body>
    </html>
  )
}
