// import type { EditorState } from "draft-js";
// import type { FC } from "react";
import { TEXT_EDITOR_BLOCK_TYPES } from '../constans';
import { FormatButton } from '../FormatButton/FormatButton';

// type TProps = {
//   editorState: EditorState;
//   onToggle: (value: string) => void;
// };

export const BlockStyleControls = ({ editorState, onToggle }) => {
	const selection = editorState.getSelection();
	const blockType = editorState
		.getCurrentContent()
		.getBlockForKey(selection.getStartKey())
		.getType('');

	return (
		<>
			{TEXT_EDITOR_BLOCK_TYPES.map((type) => (
				<FormatButton
					key={type.label}
					isActive={type.style === blockType}
					onToggle={onToggle}
					size={type.size}
					style={type.style}
					typeIcon={type.icon}
				/>
			))}
		</>
	);
};
