import { ProjectsService } from '@/core/services';
import { CreateProjectDialog, CreateTeamDialog, Profile, TableProject } from './components';
import { Auth } from './components/auth';

export default async function Home() {
	const projectsData = await ProjectsService.getProjects();
	const { data: projects } = projectsData;

	return (
		<div className='grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]'>
			<main className='flex flex-col gap-8 row-start-2 items-center sm:items-start'>
				<Auth />
				<h1 className='text-2xl font-bold'>Welcome to the project management system</h1>
				<nav className='flex gap-2'>
					<CreateProjectDialog />
					<CreateTeamDialog />
				</nav>
				{projects.length > 0 ? <TableProject projects={projects} /> : <p>No projects found</p>}
			</main>
		</div>
	);
}
