import { Toolbar, Button } from '@wordpress/components';
import {
	MediaUploadCheck,
	MediaUpload,
	BlockControls,
} from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

export default function ToolbarMediaControls( props ) {
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
					label={ __( 'Select/Upload Media', 'bm-block-library' ) }
					icon="admin-media"
					onClick={ open }
				/>
			);
		}

		return (
			<>
				<Button
					className="components-toolbar__control"
					label={ __( 'Edit Media', 'bm-block-library' ) }
					icon="edit"
					onClick={ open }
				/>
				<Button
					className="components-toolbar__control"
					label={ __( 'Remove Media', 'bm-block-library' ) }
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
