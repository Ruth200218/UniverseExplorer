import Navigation from './components/Navigation';
import Link from 'next/link';
import { PrimaryBtn } from './components/Buttons';

export default function Home() {
	return (
		<section id='hero'>
			<div className='container'>
				<Navigation />
				<div className='hero section'>
					<h1>Universe Explorer</h1>
					<h4>
						Explore 3D solar systems with this web app! Moreover, you'll be able to bring solar systems from your imagination to life with just a few steps and use
						them to create stunning exhibitions or even share them with your friends. <br /> Don't miss out, register now!
					</h4>
					<div className='buttons'>
						<PrimaryBtn>
							<Link href='/dashboard'>Make your solar system 🚀</Link>
						</PrimaryBtn>
					</div>
				</div>
			</div>
		</section>
	);
}
