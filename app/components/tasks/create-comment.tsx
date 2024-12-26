'use client';

import { Button, Textarea } from '@/core/components';
import { Field } from '@/core/components';
import { CommentsService } from '@/core/services';
import { useAuthStore } from '@/core/store';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import * as Yup from 'yup';

interface CreateCommentProps {
	task_id: string;
}

export const CreateComment = ({ task_id }: CreateCommentProps) => {
	const router = useRouter();
	const { user } = useAuthStore();

	const [loading, setLoading] = useState<boolean>(false);

	const initialValues = {
		new_comment: 'Example comment',
	};

	const validationSchema = Yup.object().shape({
		new_comment: Yup.string().required('Comment is required'),
	});

	const formik = useFormik({
		initialValues,
		validationSchema,
		onSubmit: async (values) => {
			setLoading(true);
			console.log(values);
			await CommentsService.createComment({ author_id: user.id, content: values.new_comment, resource_id: task_id })
				.then((comment) => router.refresh())
				.finally(() => setLoading(false))
				.catch((error) => console.error(error));
		},
	});

	return (
		<form
			onSubmit={formik.handleSubmit}
			className='flex gap-2'>
			<Field className='flex-1'>
				<Textarea
					invalid={!!formik.errors.new_comment}
					value={formik.values.new_comment}
					onChange={formik.handleChange}
					placeholder='Write a new comment.'
					name='new_comment'
				/>
			</Field>
			<Button
				loading={loading}
				type='submit'
				color='pink'>
				Send
			</Button>
		</form>
	);
};
