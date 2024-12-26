import { DescriptionDetails, DescriptionList, DescriptionTerm, Heading } from '@/core/components';
import { AuthService, ProjectsService, TasksService } from '@/core/services';
import { CreateTaskDialog, TableTasks } from '../components';
import { sanitizeUUID } from '@/core/lib/utils';

interface IProjectPageProps {
	params: {
		id_project: string;
	};
}

export default async function ProjectPage({ params }: IProjectPageProps) {
	const { id_project } = params;

	const project = await ProjectsService.getProject(id_project).catch((error) => {
		console.error(error);
	});

	const { data: tasks } = await TasksService.getTasks(project?.id);
	const { users } = await AuthService.getUsers();

	return (
		<main className='grid grid-cols-2 h-screen justify-center p-8 pb-20 gap-16 sm:p-20'>
			<div className='flex items-end col-span-2 justify-between gap-4 border-b border-zinc-950/10 pb-6 dark:border-white/10'>
				<Heading>{project?.name}</Heading>
				{/* <div className='flex gap-4'>
					<Button>Resend invoice</Button>
				</div> */}
			</div>

			<div className='col-span-2 lg:col-span-1'>
				<DescriptionList>
					<DescriptionTerm>id</DescriptionTerm>
					<DescriptionDetails>{sanitizeUUID(project?.id ?? '')}</DescriptionDetails>
					<DescriptionTerm>name</DescriptionTerm>
					<DescriptionDetails>{project?.name}</DescriptionDetails>
					<DescriptionTerm>description</DescriptionTerm>
					<DescriptionDetails>{project?.description}</DescriptionDetails>
					<DescriptionTerm>owner</DescriptionTerm>
					<DescriptionDetails>{project?.name}</DescriptionDetails>
				</DescriptionList>
			</div>

			<div className='col-span-2 lg:col-span-1 flex flex-col gap-4'>
				<div className='flex items-end justify-between border-b border-zinc-950/10 pb-6 dark:border-white/10'>
					<Heading>Tasks</Heading>
					<div className='flex gap-4'>
						<CreateTaskDialog
							users={users}
							project_id={id_project}
						/>
					</div>
				</div>
				{tasks.length > 0 ? (
					<TableTasks
						users={users}
						tasks={tasks.filter((task) => task.is_active !== false)}
					/>
				) : (
					<p>No tasks found</p>
				)}
			</div>
		</main>
	);
}
