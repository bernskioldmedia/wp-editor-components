/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { PanelBody, ToggleControl, SelectControl } from '@wordpress/components';

export function CarouselInspectorPanel( {
	attributes,
	setAttributes,
} ) {
    const { displayAsCarousel, carouselDisplayScreen } = attributes;

	return (
		<PanelBody
			title={ displayAsCarousel ? __( 'Carousel: On', 'TEXTDOMAIN' ) : __( 'Carousel: Off', 'TEXTDOMAIN' ) }
			initialOpen={ false }
		>
			<ToggleControl
				label={ __( 'Display as Carousel', 'TEXTDOMAIN' ) }
				checked={ displayAsCarousel }
				onChange={ ( value ) =>
					setAttributes( { displayAsCarousel: value } )
				}
			/>

			{ displayAsCarousel && (
				<SelectControl
					label={ __(
						'Show Carousel For Screen',
						'TEXTDOMAIN'
					) }
					help={ __(
						'The Carousel can be enabled for some or all screen sizes. Note, the Carousel will not be previewed in the editor.',
						'TEXTDOMAIN'
					) }
					value={ carouselDisplayScreen }
					onChange={ ( value ) =>
						setAttributes( {
							carouselDisplayScreen: value,
						} )
					}
					options={ [
						{
							label: __( 'All Sizes', 'TEXTDOMAIN' ),
							value: 'always',
						},
						{
							label: __( 'Mobile Only', 'TEXTDOMAIN' ),
							value: 'mobile-only',
						},
						{
							label: __(
								'Mobile & Tablet Only',
								'TEXTDOMAIN'
							),
							value: 'mobile-tablet-only',
						},
						{
							label: __(
								'Tablet and larger',
								'TEXTDOMAIN'
							),
							value: 'from-tablet',
						},
						{
							label: __(
								'Desktop and larger',
								'TEXTDOMAIN'
							),
							value: 'from-desktop',
						},
					] }
				/>
			) }
		</PanelBody>
	);
}
