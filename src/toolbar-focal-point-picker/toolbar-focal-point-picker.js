/**
 * WordPress Dependencies
 */
import {
	Toolbar,
	Dropdown,
	Button,
	BaseControl,
	FocalPointPicker,
} from '@wordpress/components';
import {__} from '@wordpress/i18n';
import {BlockControls} from '@wordpress/block-editor';

export default function ToolbarFocalPointPicker( props ) {
	const { mediaUrl, mediaDimensions, focalPoint, setFocalPoint } = props;

	if ( !mediaUrl ) {
		return null;
	}

	return (
		<BlockControls>
			<Toolbar>
				<Dropdown
					className="components-toolbar__control"
					contentClassName="components-toolbar__focal-point-picker"
					position="bottom center"
					renderToggle={( { isOpen, onToggle } ) => (
						<Button
							label={__(
								'Select Focal Point',
								'bm-block-library'
							)}
							icon="visibility"
							onClick={onToggle}
							aria-expanded={isOpen}
						/>
					)}
					renderContent={() => (
						<BaseControl
							label={__(
								'Select Focal Point',
								'bm-block-library'
							)}
						>
							<div style={{ padding: '1rem' }}>
								<FocalPointPicker
									url={mediaUrl}
									dimensions={mediaDimensions}
									value={focalPoint}
									onChange={( value ) => setFocalPoint( value )}
								/>
							</div>
						</BaseControl>
					)}
				/>
			</Toolbar>
		</BlockControls>
	);
}
