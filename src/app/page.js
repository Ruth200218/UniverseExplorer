import Link from 'next/link';
import Earth from '../components/Earth';
import { PrimaryBtn } from '../components/Buttons';
import DevelopersSection from '../partials/DevelopersSection';

export default function Home() {
	return (
		<>
			<section id='hero'>
				<Earth />
				<div className='container'>
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
			<DevelopersSection />
		</>
	);
}
