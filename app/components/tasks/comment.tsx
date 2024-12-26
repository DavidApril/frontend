import { DescriptionDetails, DescriptionTerm } from '@/core/components';
import { IComment } from '@/core/interfaces';

interface CommentProps {
	comment: IComment;
}

export const Comment = ({ comment }: CommentProps) => {
	return (
		<>
			<DescriptionTerm>David A.</DescriptionTerm>
			<DescriptionDetails>{comment.content}</DescriptionDetails>
		</>
	);
};
