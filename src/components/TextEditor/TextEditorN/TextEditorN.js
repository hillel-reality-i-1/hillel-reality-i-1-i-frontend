import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Editor, EditorState, RichUtils, convertToRaw, getDefaultKeyBinding } from 'draft-js';

import { ReactComponent as Bold } from '../../../assets/img/icons/icon_text_editor/icon_bold.svg';
import { ReactComponent as Italic } from '../../../assets/img/icons/icon_text_editor/icon_italic.svg';
import { ReactComponent as H } from '../../../assets/img/icons/icon_text_editor/icon_H.svg';
// import { ReactComponent as Link } from '../../../assets/img/icons/icon_text_editor/icon_link.svg';
import { ReactComponent as ListOl } from '../../../assets/img/icons/icon_text_editor/icon_list_ol.svg';
import { ReactComponent as ListUl } from '../../../assets/img/icons/icon_text_editor/icon_list_ul.svg';
// import { ReactComponent as Strike } from '../../../assets/img/icons/icon_text_editor/icon_strike.svg';
// import { ReactComponent as Teg } from '../../../assets/img/icons/icon_text_editor/icon_teg.svg';
import './TextEditorN.scss';

const styleMap = {
	CODE: {
		backgroundColor: 'rgba(0, 0, 0, 0.05)',
		fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
		fontSize: 16,
		padding: 2,
	},
};

const getBlockStyle = (block) => {
	switch (block.getType()) {
		case 'blockquote':
			return 'RichEditor-blockquote';
		default:
			return null;
	}
};

const StyleButton = ({ onToggle, style, label, active }) => {
	const handleToggle = (e) => {
		e.preventDefault();
		onToggle(style);
	};

	let className = 'RichEditor-styleButton';
	if (active) {
		className += ' RichEditor-activeButton';
	}

	return (
		<span
			className={className}
			onMouseDown={handleToggle}>
			{label}
		</span>
	);
};

const BLOCK_TYPES = [
	// { label: 'H', style: 'header-one' },
	// { label: 'H2', style: 'header-two' },
	{ label: <H />, style: 'header-three' },
	// { label: 'H4', style: 'header-four' },
	// { label: 'H5', style: 'header-five' },
	// { label: 'H6', style: 'header-six' },
	// { label: 'Blockquote', style: 'blockquote' },
	{ label: <ListUl />, style: 'unordered-list-item' },
	{ label: <ListOl />, style: 'ordered-list-item' },
	// { label: 'Code Block', style: 'code-block' },
];

const BlockStyleControls = ({ editorState, onToggle }) => {
	const selection = editorState.getSelection();
	const blockType = editorState
		.getCurrentContent()
		.getBlockForKey(selection.getStartKey())
		.getType();

	return (
		<div className='RichEditor-controls'>
			{BLOCK_TYPES.map((type) => (
				<StyleButton
					key={type.style}
					active={type.style === blockType}
					label={type.label}
					onToggle={onToggle}
					style={type.style}
				/>
			))}
		</div>
	);
};

const INLINE_STYLES = [
	{ label: <Bold />, style: 'BOLD' },
	{ label: <Italic />, style: 'ITALIC' },
	// { label: 'Underline', style: 'UNDERLINE' },
	// { label: 'Monospace', style: 'CODE' },
];

const InlineStyleControls = ({ editorState, onToggle }) => {
	const currentStyle = editorState.getCurrentInlineStyle();

	return (
		<div className='RichEditor-controls'>
			{INLINE_STYLES.map((type) => (
				<StyleButton
					key={type.style}
					active={currentStyle.has(type.style)}
					label={type.label}
					onToggle={onToggle}
					style={type.style}
				/>
			))}
		</div>
	);
};

const TextEditorN = ({ onChangeHTMLText, placeholder }) => {
	const [editorState, setEditorState] = useState(EditorState.createEmpty());
	const editorRef = useRef(null);

	const focusEditor = () => {
		editorRef.current.focus();
	};

	const handleKeyCommand = useCallback(
		(command) => {
			const newState = RichUtils.handleKeyCommand(editorState, command);
			if (newState) {
				setEditorState(newState);
				return true;
			}
			return false;
		},
		[editorState]
	);

	const mapKeyToEditorCommand = useCallback(
		(e) => {
			if (e.keyCode === 9 /* TAB */) {
				const newEditorState = RichUtils.onTab(e, editorState, 4 /* maxDepth */);
				if (newEditorState !== editorState) {
					setEditorState(newEditorState);
				}
				return;
			}
			return getDefaultKeyBinding(e);
		},
		[editorState]
	);

	const toggleBlockType = useCallback(
		(blockType) => {
			setEditorState(RichUtils.toggleBlockType(editorState, blockType));
		},
		[editorState]
	);

	const toggleInlineStyle = useCallback(
		(inlineStyle) => {
			setEditorState(RichUtils.toggleInlineStyle(editorState, inlineStyle));
		},
		[editorState]
	);

	useEffect(() => {
		const contentState = editorState.getCurrentContent();
		console.log(contentState.selectionAfter.anchorOffset);
		if (!contentState.hasText() && contentState.getBlockMap().first().getType() !== 'unstyled') {
			editorRef.current.className += ' RichEditor-hidePlaceholder';
		}
	}, [editorState]);

	const contentState = editorState.getCurrentContent();
	const rawContentState = convertToRaw(contentState);
	const contentJSON = JSON.stringify(rawContentState);

	const characters = contentState.selectionAfter.anchorOffset;

	// Assuming onChangeHTMLText is a function to send data to the server
	// contentJSON && onChangeHTMLText(contentJSON);
	useEffect(() => {
		onChangeHTMLText(contentJSON, characters);
	}, [onChangeHTMLText, contentJSON, characters]);

	return (
		<div className='RichEditor-root'>
			<div className='button_control_wrapper'>
				<InlineStyleControls
					editorState={editorState}
					onToggle={toggleInlineStyle}
				/>
				<BlockStyleControls
					editorState={editorState}
					onToggle={toggleBlockType}
				/>
			</div>

			<div
				className={`RichEditor-editor ${
					editorState.getCurrentContent().hasText() ? '' : 'RichEditor-hidePlaceholder'
				}`}
				onClick={focusEditor}>
				<Editor
					blockStyleFn={getBlockStyle}
					customStyleMap={styleMap}
					editorState={editorState}
					handleKeyCommand={handleKeyCommand}
					keyBindingFn={mapKeyToEditorCommand}
					onChange={setEditorState}
					placeholder={placeholder}
					ref={editorRef}
					spellCheck={true}
				/>
			</div>
		</div>
	);
};

export default TextEditorN;
