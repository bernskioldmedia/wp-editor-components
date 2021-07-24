/**
 * Internal Dependencies
 */
/**
 * WordPress Dependencies
 */
import { __, _x } from '@wordpress/i18n';
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
export function SectionAppearance( props ) {
	const { attributes, setAttributes } = props;
	const {
        sectionWrapperEnabled,
		backgroundImageId,
		backgroundImageUrl,
		backgroundImageDimensions,
		backgroundImageFocalPoint,
    } = attributes;
    
	return (
        <>
            <PanelBody>
				<ToggleControl
                    label={  __( 'Enable Section Wrapper', 'TEXTDOMAIN' ) }
                    help={ sectionWrapperEnabled ? null : __('The section wrapper is currently disabled. Toggle to enable.', 'TEXTDOMAIN') }
					checked={ sectionWrapperEnabled }
					onChange={ ( value ) => setAttributes( {
                         sectionWrapperEnabled: value,
                         align: value === true ? 'full' : '',
                    } ) }
				/>
            </PanelBody>
            
            {sectionWrapperEnabled && (
                <>
                    <PanelBody
        				title={ __( 'Size & Spacing', 'TEXTDOMAIN' ) }
        				initialOpen={ false }
        			>
        				<BaseControl
        					help={ __(
        						'While the section itself will go edge-to-edge, you may control the width of the content area inside the section here.', 'TEXTDOMAIN'
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
        							{ __( 'Narrow', 'TEXTDOMAIN' ) }
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
        							{ __( 'Wide', 'TEXTDOMAIN' ) }
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
        							{ __( 'Page', 'TEXTDOMAIN' ) }
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
        							{ __( 'Full', 'TEXTDOMAIN' ) }
        						</Button>
        					</ButtonGroup>
        				</BaseControl>

        				<BaseControl
                            label={ __( 'Section Spacing', 'TEXTDOMAIN' ) }
                            help={ __( 'Control how much spacing you want above and below the content of your section.', 'TEXTDOMAIN' ) }
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
        							{ _x( 'No', 'as in no spacing', 'TEXTDOMAIN' ) }
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
        							{ _x( 'Small', 'small spacing', 'TEXTDOMAIN' ) }
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
        							{ _x( 'Normal', 'normal spacing', 'TEXTDOMAIN' ) }
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
        							{ _x( 'Large', 'large spacing', 'TEXTDOMAIN' ) }
        						</Button>
        					</ButtonGroup>
        				</BaseControl>

        				<ToggleControl
        					label={ __(
        						'Full Viewport Height', 'TEXTDOMAIN'
                            ) }
                            help={ __( 'When set, the section will at least the height of the viewport.', 'TEXTDOMAIN' ) }
        					checked={ attributes.isSectionFullHeight }
        					onChange={ ( value ) =>
        						setAttributes( { isSectionFullHeight: value } )
        					}
        				/>
        			</PanelBody>

        			<PanelBody
        				title={ __( 'Section Background Image', 'TEXTDOMAIN' ) }
        				initialOpen={ false }>

        				<MediaUploadCheck>
        					<MediaUpload
        						title={ __( 'Upload / Select Section Background Image', 'TEXTDOMAIN' ) }
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
        										<Button icon="edit" style={ { margin: '5px' } } isSecondary onClick={ open }>{ __( 'Edit', 'TEXTDOMAIN' ) }</Button>
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
        										}>{ __( 'Remove', 'TEXTDOMAIN' ) }</Button>
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
        										{ __( 'Select Background Image', 'TEXTDOMAIN' ) }
        									</Button>
        								) }

        							</div>
        						) }
        						value={ backgroundImageId }
        					/>
        				</MediaUploadCheck>

                    </PanelBody>
                </>
            )}
		</>
	);
}
