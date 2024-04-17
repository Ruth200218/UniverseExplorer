import React from 'react';
import Link from 'next/link';
import { PrimaryBtn } from '../components/Buttons';
import * as Icon from 'react-feather';

const Footer = () => {
	return (
		<footer id='footer'>
			<div className='container'>
				<div className='footer section'>
					<div className='devs_container'>
						<Developer />
					</div>

					<div className='copyright'>
						<p className='copy'>Made with 💛 by the hackathon team.</p>
						<div className='git_link'>
							<PrimaryBtn>
								<Link href={'https://github.com/SantiagoCode/UniverseExplorer'} target='_blank'>
									<Icon.GitHub size={24} />
									View on GitHub
								</Link>
							</PrimaryBtn>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
};

const Developer = () => {
	const developers = [
		['Ruth Cedeño', 'GitHub', 'LinkedIn'],
		['Richar Arenas', 'GitHub', 'LinkedIn'],
		['Santiago Salazar', 'GitHub', 'LinkedIn'],
	];

	return (
		<>
			{developers.map(([dev_name, dev_git, dev_link], index) => (
				<div className='developer' key={index}>
					<h3 className='dev_name'>{dev_name}</h3>
					<div className='dev_media'>
						<Link href={dev_git} target='_blank'>
							<Icon.GitHub size={36} />
						</Link>
						<Link href={dev_link} target='_blank'>
							<Icon.Linkedin size={36} />
						</Link>
					</div>
				</div>
			))}
		</>
	);
};

export default Footer;
