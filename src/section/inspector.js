/**
 * Internal Dependencies
 */
/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { PanelBody, ToggleControl, BaseControl, Button, ButtonGroup, FocalPointPicker, } from '@wordpress/components';
import { MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { getMediaUrl, getMediaDimensions } from '../utilities';

/**
 * We allow both images and videos for the background image selector.
 *
 * @type {string[]}
 */
const ALLOWED_MEDIA_TYPES = [ 'image', 'video' ];

/**
 * The Section appearance options allows the user
 * to control the general Section appearance.
 *
 * @param props
 */
function SectionAppearance( props ) {
	const { attributes, setAttributes } = props;
	const {
		backgroundImageId,
		backgroundImageUrl,
		backgroundImageDimensions,
		backgroundImageFocalPoint,
	} = attributes;

	return (
		<>
			<PanelBody
				title={ __( 'Size & Spacing', 'bm-block-library' ) }
				initialOpen={ false }
			>
				<BaseControl
					label={ __( 'Section Content Width', 'bm-block-library' ) }
					help={ __(
						'Control the width of the content area in the Section.',
						'bm-block-library'
					) }
				>
					<ButtonGroup>
						<Button
							isDefault={
								attributes.sectionContentWidth !== 'narrow'
							}
							isPrimary={
								attributes.sectionContentWidth === 'narrow'
							}
							onClick={ () =>
								setAttributes( {
									sectionContentWidth: 'narrow',
								} )
							}
						>
							{ __( 'Narrow', 'bm-block-library' ) }
						</Button>
						<Button
							isDefault={
								attributes.sectionContentWidth !== 'wide'
							}
							isPrimary={
								attributes.sectionContentWidth === 'wide'
							}
							onClick={ () =>
								setAttributes( {
									sectionContentWidth: 'wide',
								} )
							}
						>
							{ __( 'Wide', 'bm-block-library' ) }
						</Button>
						<Button
							isDefault={
								attributes.sectionContentWidth !== 'page-width'
							}
							isPrimary={
								attributes.sectionContentWidth === 'page-width'
							}
							onClick={ () =>
								setAttributes( {
									sectionContentWidth: 'page-width',
								} )
							}
						>
							{ __( 'Page', 'bm-block-library' ) }
						</Button>
						<Button
							isDefault={
								attributes.sectionContentWidth !== 'fullwidth'
							}
							isPrimary={
								attributes.sectionContentWidth === 'fullwidth'
							}
							onClick={ () =>
								setAttributes( {
									sectionContentWidth: 'fullwidth',
								} )
							}
						>
							{ __( 'Full', 'bm-block-library' ) }
						</Button>
					</ButtonGroup>
				</BaseControl>

				<BaseControl
					label={ __( 'Section Spacing', 'bm-block-library' ) }
				>
					<ButtonGroup>
						<Button
							isDefault={
								attributes.sectionVerticalSpacing !== 'no'
							}
							isPrimary={
								attributes.sectionVerticalSpacing === 'no'
							}
							onClick={ () =>
								setAttributes( {
									sectionVerticalSpacing: 'no',
								} )
							}
						>
							{ __( 'None', 'bm-block-library' ) }
						</Button>
						<Button
							isDefault={
								attributes.sectionVerticalSpacing !== 'small'
							}
							isPrimary={
								attributes.sectionVerticalSpacing === 'small'
							}
							onClick={ () =>
								setAttributes( {
									sectionVerticalSpacing: 'small',
								} )
							}
						>
							{ __( 'Small', 'bm-block-library' ) }
						</Button>
						<Button
							isDefault={
								attributes.sectionVerticalSpacing !== 'normal'
							}
							isPrimary={
								attributes.sectionVerticalSpacing === 'normal'
							}
							onClick={ () =>
								setAttributes( {
									sectionVerticalSpacing: 'normal',
								} )
							}
						>
							{ __( 'Normal', 'bm-block-library' ) }
						</Button>
						<Button
							isDefault={
								attributes.sectionVerticalSpacing !== 'large'
							}
							isPrimary={
								attributes.sectionVerticalSpacing === 'large'
							}
							onClick={ () =>
								setAttributes( {
									sectionVerticalSpacing: 'large',
								} )
							}
						>
							{ __( 'Large', 'bm-block-library' ) }
						</Button>
					</ButtonGroup>
				</BaseControl>

				<ToggleControl
					label={ __(
						'Show at Full Height Always',
						'bm-block-library'
					) }
					checked={ attributes.isSectionFullHeight }
					onChange={ ( value ) =>
						setAttributes( { isSectionFullHeight: value } )
					}
				/>
			</PanelBody>

			<PanelBody
				title={ __( 'Section Background Image', 'bm-block-library' ) }
				initialOpen={ false }>

				<MediaUploadCheck>
					<MediaUpload
						title={ __( 'Upload / Select Section Background Image', 'bm-block-library' ) }
						onSelect={ ( media ) => {
							setAttributes( {
								backgroundImageId: media.id,
								backgroundImageUrl: getMediaUrl( media, 'xlarge' ),
								backgroundImageDimensions: getMediaDimensions( media, 'xlarge' ),
							} );
						} }
						allowedTypes={ ALLOWED_MEDIA_TYPES }
						multiple={ false }
						render={ ( { open } ) => (
							<div className="editor-post-featured-image__container">
								{ backgroundImageId && (
									<>
										<Button icon="edit" style={ { margin: '5px' } } isSecondary onClick={ open }>{ __( 'Edit', 'bm-block-library' ) }</Button>
										<Button icon="no" style={ { margin: '5px' } } isDestructive onClick={
											() => setAttributes(
												{
													backgroundImageId: '',
													backgroundImageUrl: '',
													backgroundImageFocalPoint: {
														x: 0.5,
														y: 0.5,
													},
													backgroundImageDimensions: {
														height: 0,
														width: 0,
													},
												}
											)
										}>{ __( 'Remove', 'bm-block-library' ) }</Button>
									</>
								) }

								{ backgroundImageId && (
									<FocalPointPicker
										url={ backgroundImageUrl }
										dimensions={ backgroundImageDimensions }
										value={ backgroundImageFocalPoint }
										onChange={ ( value ) =>
											setAttributes( {
												backgroundImageFocalPoint: value,
											} )
										}
									/>
								) }

								{ ! backgroundImageId && (
									<Button
										className={
											! backgroundImageId
											? 'editor-post-featured-image__toggle'
											: 'editor-post-featured-image__preview'
										}
										onClick={ open }
									>
										{ __( 'Select Background Image', 'bm-block-library' ) }
									</Button>
								) }

							</div>
						) }
						value={ backgroundImageId }
					/>
				</MediaUploadCheck>

			</PanelBody>
		</>
	);
}

export default SectionAppearance;
