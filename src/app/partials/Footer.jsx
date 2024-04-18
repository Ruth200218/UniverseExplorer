import React from 'react';
import Link from 'next/link';
import { PrimaryBtn } from '../components/Buttons';
import * as Icon from 'react-feather';

const Footer = () => {
	return (
		<footer id='footer'>
			<div className='container'>
				<div className='footer section'>
					<div className='devs_section'>
						<h2>Meet the Developers</h2>
						<div className='devs_container'>
							<Developer />
						</div>
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
		['Ruth Cedeño', 'BackEnd Dev', 'https://github.com/Ruth200218', '', '', ''],
		['Richar Arenas', 'FullStack Dev', 'https://github.com/ErAo', 'https://www.linkedin.com/in/richarenas/', '', ''],
		['Santiago Salazar', 'FrontEnd Dev', 'https://github.com/SantiagoCode', 'https://www.linkedin.com/in/santiagocode/', '', ''],
	];

	return (
		<>
			{developers.map(([dev_name, dev_position, dev_git, dev_link, dev_mail, dev_phone], index) => (
				<div className='developer' key={index}>
					<Link href={dev_git} target='_blank'>
						<img src={`${dev_git}.png`} width={120} height={120} alt={`${dev_name}-pic`} />
					</Link>
					<h3 className='dev_name'>{dev_name}</h3>
					<p className='dev_position'>{dev_position}</p>
					<div className='dev_media'>
						<Link href={dev_git} target='_blank'>
							<Icon.GitHub size={24} />
						</Link>
						<Link href={dev_link} target='_blank'>
							<Icon.Linkedin size={24} />
						</Link>
						<Link href={''} target='_blank'>
							<Icon.Mail size={24} />
						</Link>
						<Link href={''} target='_blank'>
							<Icon.Phone size={24} />
						</Link>
					</div>
				</div>
			))}
		</>
	);
};

export default Footer;
