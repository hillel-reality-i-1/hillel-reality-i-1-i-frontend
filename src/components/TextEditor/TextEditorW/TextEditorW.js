import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import React, { Component } from 'react';
import { Editor } from 'react-draft-wysiwyg';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import styles from './TextEditorW.module.scss';

export default class TextEditorW extends Component {
	state = {
		editorState: EditorState.createEmpty(),
	};
	onEditorStateChange = (editorState) => {
		this.setState({
			editorState,
		});
	};
	render() {
		const { editorState } = this.state;
		return (
			<>
				{/* <div className={styles.text_editor}> */}
				<div className={styles.editor}>
					<Editor
						editorState={editorState}
						onEditorStateChange={this.onEditorStateChange}
						placeholder='Enter your text here...'
					/>
				</div>
				{/* <h3 className={styles.text}>Drafts to HTML</h3> */}
				{/* <textarea
					className={styles.text_area}
					disabled
					value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}></textarea> */}
				{/* </div> */}
			</>
		);
	}
}
