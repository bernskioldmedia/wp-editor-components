/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { PanelBody, ToggleControl, SelectControl } from '@wordpress/components';

/**
 * Carousel Inspector Panel
 *
 * @param attributes.attributes
 * @param attributes
 * @param setAttributes
 * @param attributes.setAttributes
 * @return {*}
 * @class
 */
export default function CarouselInspectorPanel( {
	attributes,
	setAttributes,
} ) {
	return (
		<PanelBody
			title={ __( 'Carousel', 'bm-block-library' ) }
			initialOpen={ false }
		>
			<ToggleControl
				label={ __( 'Display as Carousel', 'bm-block-library' ) }
				checked={ attributes.displayAsCarousel }
				onChange={ ( value ) =>
					setAttributes( { displayAsCarousel: value } )
				}
			/>

			{ attributes.displayAsCarousel && (
				<SelectControl
					label={ __(
						'Show Carousel For Screen',
						'bm-block-library'
					) }
					help={ __(
						'The Carousel can be enabled for some or all screen sizes. Note, the Carousel will not be previewed in the editor.',
						'bm-block-library'
					) }
					value={ attributes.carouselDisplayScreen }
					onChange={ ( value ) =>
						setAttributes( {
							carouselDisplayScreen: value,
						} )
					}
					options={ [
						{
							label: __( 'All Sizes', 'bm-block-library' ),
							value: 'always',
						},
						{
							label: __( 'Mobile Only', 'bm-block-library' ),
							value: 'mobile-only',
						},
						{
							label: __(
								'Mobile & Tablet Only',
								'bm-block-library'
							),
							value: 'mobile-tablet-only',
						},
						{
							label: __(
								'Tablet and larger',
								'bm-block-library'
							),
							value: 'from-tablet',
						},
						{
							label: __(
								'Desktop and larger',
								'bm-block-library'
							),
							value: 'from-desktop',
						},
					] }
				/>
			) }
		</PanelBody>
	);
}
