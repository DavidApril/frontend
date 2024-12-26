'use client';
import { AuthService } from '@/core/services';
import { Button, Input } from '@/core/components';
import { useAuthStore } from '@/core/store';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import * as Yup from 'yup';
import clsx from 'clsx';

export const SignInForm = () => {
	const router = useRouter();

	const { setUser, setToken } = useAuthStore();

	const [loading, setLoading] = useState(false);
	const [errors, setErrors] = useState<boolean>(false);

	const initialValues = {
		email: 'admin@example.com',
		password: 'Abc123456@',
	};

	const validationSchema = Yup.object().shape({
		email: Yup.string().email('Invalid email address').required('Email is required'),
		password: Yup.string().required('Password is required'),
	});

	const formik = useFormik({
		initialValues,
		validationSchema,
		onSubmit: async (credentials) => {
			setLoading(true);
			await AuthService.signin(credentials)
				.then(async (r) => {
					const user = await AuthService.getUser(r.user.id);
					setUser(user);
					setToken(r.token);
					router.replace('/');
				})
				.catch(() => {
					setErrors(true);
					setTimeout(() => setErrors(false), 3000);
				})
				.finally(() => {
					setLoading(false);
				});
		},
	});

	return (
		<form
			className='flex flex-col gap-4'
			onSubmit={formik.handleSubmit}>
			<Input
				invalid={errors}
				name='email'
				type='email'
				placeholder='Email'
				value={formik.values.email}
				onChange={formik.handleChange}
				onBlur={formik.handleBlur}
			/>
			<Input
				invalid={errors}
				name='password'
				type='password'
				placeholder='Password'
				value={formik.values.password}
				onChange={formik.handleChange}
				onBlur={formik.handleBlur}
			/>
			<Button
				type='submit'
				disabled={errors}
				loading={loading}
				className={clsx(errors && 'bg-red-500')}>
				Sign in
			</Button>
		</form>
	);
};
