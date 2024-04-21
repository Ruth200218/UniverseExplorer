'use client';

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import Earth from '../../components/Earth';
import { PrimaryBtn } from '../../components/Buttons';

export default function Register() {
	const [first_name, setFirstName] = useState('');
	const [last_name, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [error, setError] = useState('');
	const invalidPassword = password !== confirmPassword;

	const router = useRouter();

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const signUpResponse = await fetch('http://localhost:3000/api/auth/signup', {
				method: 'POST',
				headers: {
					'Content-type': 'application/json',
				},
				body: JSON.stringify({ first_name, last_name, email, password }),
			});

			if (signUpResponse.ok) {
				//Automatic login

				router.push('/');
				router.refresh();
			} else {
				const errorData = await signUpResponse.json();
				if (errorData.erros) {
					setError(errorData.errors);
				} else {
					throw new Error(errorData.message || 'Error to signup');
				}
			}
		} catch (error) {
			setError(error.message);
		}
	};

	return (
		<section id='signup'>
			<Earth />
			<div className='container'>
				<div className='signup section'>
					<form onSubmit={handleSubmit}>
						{error && <div>{error}</div>}
						<h2>SignUp</h2>
						<div className='half'>
							<div className='input_item'>
								<label>
									Name <span>*</span>
								</label>
								<input required onChange={(e) => setFirstName(e.target.value)} type='text' placeholder='Jhon' name='first_name' />
							</div>
							<div className='input_item'>
								<label>
									Last Name <span>*</span>
								</label>
								<input required onChange={(e) => setLastName(e.target.value)} type='text' placeholder='Due' name='last_name' />
							</div>
						</div>
						<div className='input_item'>
							<label>
								Email <span>*</span>
							</label>
							<input required type='email' onChange={(e) => setEmail(e.target.value)} placeholder='jhondue@gmail.com' name='email' />
						</div>
						<div className='half'>
							<div className='input_item'>
								<label>
									Password <span>*</span>
								</label>
								<input required type='password' onChange={(e) => setPassword(e.target.value)} placeholder='********' name='password' />
							</div>
							<div className='input_item'>
								<label>
									Confirm password <span>*</span>
								</label>
								<input required type='password' onChange={(e) => setConfirmPassword(e.target.value)} placeholder='********' name='password' />
								{invalidPassword && <p className='warning'>Passwords not matching.</p>}
							</div>
						</div>

						<PrimaryBtn clases={`submit`} disabled={invalidPassword || password == '' ? true : false}>
							SignUp
						</PrimaryBtn>
					</form>
				</div>
			</div>
		</section>
	);
}
