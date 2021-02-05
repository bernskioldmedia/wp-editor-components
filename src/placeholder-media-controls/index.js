import { Button, Placeholder } from '@wordpress/components';
import { MediaUploadCheck, MediaUpload } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import { Figure } from '../figure';

export function PlaceholderMediaControls( props ) {
	const {
		icon,
		label,
		instructions,
		className,
		allowedTypes = [ 'image' ],
		removeMedia,
		url,
		alt,
		type,
		style,
		focalPoint,
		mediaId,
		onSelectMedia,
	} = props;

	const renderMediaControls = ( { open } ) => {

		if ( ! mediaId ) {
			return (
				<figure className={ className }>
					<Placeholder
						icon={ icon }
						label={ label }
						instructions={ instructions }
					>
						<Button icon="admin-media" isSecondary onClick={ open }>
							{ __( 'Select/Upload Media', 'bm-block-library' ) }
						</Button>
					</Placeholder>
				</figure>
			);
		}

		return (
			<>
				<Figure
					url={ url }
					alt={ alt }
					type={ type }
					className={ className }
					style={ style }
					focalPoint={ focalPoint }
					mediaId={ mediaId }
				>
					<div style={ {
						'position': 'absolute',
						'background-color': '#fff',
						'top': '1rem',
						'left': '1rem',
						'border-radius': '4px',
                        'z-index': '100',
					} }>
						<Button onClick={ open } icon="edit" label={ __( 'Edit Media', 'bm-block-library' ) } />
						<Button onClick={ removeMedia } icon="no" label={ __( 'Remove Media', 'bm-block-library' ) } />
					</div>
				</Figure>

			</>
		);
	};

	return (
		<MediaUploadCheck>
			<MediaUpload
				onSelect={ onSelectMedia }
				multiple={ false }
				value={ mediaId }
				allowedTypes={ allowedTypes }
				render={ renderMediaControls }
			/>
		</MediaUploadCheck>
	);
}
