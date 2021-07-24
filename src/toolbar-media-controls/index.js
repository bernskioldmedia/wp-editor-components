import { Toolbar, Button } from '@wordpress/components';
import {
	MediaUploadCheck,
	MediaUpload,
	BlockControls,
} from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

export function ToolbarMediaControls( props ) {
	const {
		allowedTypes = [ 'image' ],
		removeMedia,
		url,
		mediaId,
		onSelectMedia,
	} = props;

	const renderMediaControls = ( { open } ) => {
		if ( ! url ) {
			return (
				<Button
					className="components-toolbar__control"
					label={ __( 'Select/Upload Media', 'TEXTDOMAIN' ) }
					icon="admin-media"
					onClick={ open }
				/>
			);
		}

		return (
			<>
				<Button
					className="components-toolbar__control"
					label={ __( 'Edit Media', 'TEXTDOMAIN' ) }
					icon="edit"
					onClick={ open }
				/>
				<Button
					className="components-toolbar__control"
					label={ __( 'Remove Media', 'TEXTDOMAIN' ) }
					icon="no"
					onClick={ removeMedia }
				/>
			</>
		);
	};

	return (
		<BlockControls>
			<Toolbar>
				<MediaUploadCheck>
					<MediaUpload
						onSelect={ onSelectMedia }
						multiple={ false }
						value={ mediaId }
						allowedTypes={ allowedTypes }
						render={ renderMediaControls }
					/>
				</MediaUploadCheck>
			</Toolbar>
		</BlockControls>
	);
}
