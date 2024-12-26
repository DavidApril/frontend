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

interface TeamPageProps {
	id_project: string;
	id_task: string;
}

export default function TaskPage(params: TeamPageProps) {
	const { id_project, id_task } = params;

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
					<DescriptionTerm>
						<Strong>7:43 </Strong>
						David A.
					</DescriptionTerm>
					<DescriptionDetails>This is the first comment</DescriptionDetails>
				</DescriptionList>
				<Field>
					<Textarea
						placeholder='Write a new comment.'
						name='description'
					/>
				</Field>
			</div>

			<div className='col-span-1'></div>
		</main>
	);
}
