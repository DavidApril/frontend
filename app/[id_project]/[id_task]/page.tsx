import { Comment, CreateComment } from '@/app/components';
import {
	Button,
	DescriptionDetails,
	DescriptionList,
	DescriptionTerm,
	Divider,
	Field,
	Heading,
	Label,
	Strong,
	Text,
	Textarea,
} from '@/core/components';
import { CommentsService } from '@/core/services';

interface TeamPageProps {
	params: {
		id_project: string;
		id_task: string;
	};
}

export default async function TaskPage({ params }: TeamPageProps) {
	const { data: comments, meta } = await CommentsService.getComments(params.id_task);

	return (
		<main className='h-screen grid grid-cols-2 justify-center p-8 pb-20 gap-16 sm:p-20'>
			<div className='flex items-end col-span-2 justify-between gap-4 border-b border-zinc-950/10 pb-6 dark:border-white/10'>
				<Heading>Task</Heading>
				<div className='flex gap-4'>
					<Button>Resend invoice</Button>
				</div>
			</div>
			<Text>Description task</Text>

			<div className='col-span-1 gap-4 flex flex-col'>
				<Heading>Comments</Heading>
				<Divider />

				<DescriptionList>
					{meta.total === 0 ? <Text>No comments here.</Text> : comments.map((comment) => <Comment comment={comment} />)}
				</DescriptionList>

				<CreateComment task_id={params.id_task} />
			</div>

			<div className='col-span-1'></div>
		</main>
	);
}
