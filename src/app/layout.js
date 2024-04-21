import { Roboto } from 'next/font/google';
import Footer from '../partials/Footer';
import '../styles/sass/global.scss';
import Navigation from '../components/Navigation';

const roboto = Roboto({
	weight: ['300', '400', '500', '700'],
	subsets: ['latin'],
});

export const metadata = {
	title: 'Universe Explorer',
	description: 'Generated by create next app',
};

export default function RootLayout({ children }) {
	return (
		<html lang='en'>
			<body className={roboto.className}>
				<Navigation />
				{children}
				<Footer />
			</body>
		</html>
	);
}
