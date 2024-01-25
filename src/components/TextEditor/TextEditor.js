// import React from 'react';

// const TextEditor = () => {
// 	return <div>TextEditor</div>;
// };

// export default TextEditor;

// import clsx from "clsx";
import { Editor, EditorState, RichUtils } from 'draft-js';
import { convertToHTML, convertFromHTML } from 'draft-convert';
import { memo, useCallback, useEffect, useState } from 'react';

import { BlockStyleControls } from './BlockStyleControls/BlockStyleControls';
import { TEXT_EDITOR_CUSTOM_STYLES, TEXT_EDITOR_STYLE_TO_HTML } from './constans';
import { InlineStyleControls } from './InlineStyleControls/InlineStyleControls';
// import type { TTextEditorTextStyle } from "./types";

import 'draft-js/dist/Draft.css';
import './TextEditor.module.scss';

import styles from './TextEditor.module.scss';
// import { useRef } from 'react';

// type TClasses = {
//   textEditor?: string;
// };

// type TProps = {
//   classes?: TClasses;
//   htmlText?: string;
//   isInvalid?: boolean;
//   onChangeHTMLText?: (value: string) => void;
//   placeholder?: string;
//   title?: string;
// };

const TextEditorComponent = ({
	classes,
	htmlText,
	isInvalid = false,
	onChangeHTMLText,
	placeholder,
	title,
}) => {
	const [isFocused, setFocused] = useState(false);
	const [editorState, setEditorState] = useState(EditorState.createEmpty());

	// const antInputRef = useRef(null);

	let wrapperClassName = 'text_editor_wrapper';
	const contentState = editorState.getCurrentContent();
	if (!contentState.hasText()) {
		if (contentState.getBlockMap().first().getType('') !== 'unstyled') {
			wrapperClassName += ' text_editor_wrapper_hidePlaceholder';
		}
	}

	const options = {
		styleToHTML: (style) => TEXT_EDITOR_STYLE_TO_HTML(style),
	};
	const convertMessageToHtml = convertToHTML(options);

	const convertHtmlToRaw = (html) => {
		const contentState = convertFromHTML({
			htmlToStyle: (nodeName, node, currentStyle) => {
				if (nodeName === 'span' && node.className === 'highlight') {
					return currentStyle.add('HIGHLIGHT');
				} else {
					return currentStyle;
				}
			},
		})(html);
		return EditorState.createWithContent(contentState);
	};

	useEffect(() => {
		htmlText && setEditorState(convertHtmlToRaw(htmlText));
	}, [htmlText]);

	const handleChangeBlur = () => {
		// setFocused((prevState) => (prevState ? false : prevState));
		setFocused(false);
	};

	const handleChangeFocus = () => {
		// setFocused((prevState) => (prevState ? true : !prevState));
		setFocused(true);
	};

	const handleChangeText = useCallback(
		(value) => {
			const currentSelection = value.getSelection();
			onChangeHTMLText?.(convertMessageToHtml(value.getCurrentContent()));
			const stateWithContentAndSelection = EditorState.forceSelection(value, currentSelection);
			setEditorState(stateWithContentAndSelection);
		},
		[convertMessageToHtml, onChangeHTMLText]
	);

	const handleKeyCommand = useCallback(
		(command, editorState) => {
			const newState = RichUtils.handleKeyCommand(editorState, command);
			if (newState) {
				setEditorState(newState);
				return 'handled';
			}
			return 'not-handled';
		},
		[setEditorState]
	);

	const getBlockStyle = (block) => {
		switch (block.getType('')) {
			case 'blockquote':
				return 'RichEditor-blockquote';
			default:
				return null;
		}
	};

	const content = convertMessageToHtml(editorState.getCurrentContent());
	// const convertMessageToHtml = convertToHTML(options);
	// const content = convertMessageToHtml(editorState.getCurrentContent());

	onChangeHTMLText(content);

	return (
		<>
			<div className={`${styles.text_editor} ${styles.classes?.text_editor}`}>
				<div className={styles.text_editor_title}>{title}</div>
				<div className={styles.text_editor_sub}>
					<BlockStyleControls
						editorState={editorState}
						onToggle={(blockType) => {
							const newState = RichUtils.toggleBlockType(editorState, blockType);
							setEditorState(newState);
						}}
					/>
					<InlineStyleControls
						editorState={editorState}
						onToggle={(inlineStyle) => {
							const newState = RichUtils.toggleInlineStyle(editorState, inlineStyle);
							setEditorState(newState);
						}}
					/>
				</div>
				<div
					className={`${styles.text_editor_area} ${
						(isFocused || contentState.hasText()) && styles.text_editor_area__isFocused
					} ${isInvalid && styles.text_editor_area__isInvalid}`}
					onClick={handleChangeFocus}>
					<div className={styles[wrapperClassName]}>
						<Editor
							blockStyleFn={getBlockStyle}
							customStyleMap={TEXT_EDITOR_CUSTOM_STYLES}
							editorState={editorState}
							handleKeyCommand={handleKeyCommand}
							onBlur={handleChangeBlur}
							onChange={handleChangeText}
							placeholder={placeholder}
							onClick={handleChangeFocus}
						/>
					</div>
				</div>
			</div>
		</>
	);
};

export const TextEditor = memo(TextEditorComponent);
