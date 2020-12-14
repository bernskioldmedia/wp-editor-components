/**
 * External Dependencies
 */
import classnames from 'classnames';
/**
 * Internal Dependencies
 */
import { focalPointToBgPos } from '../utilities';
/**
 * WordPress Dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';

export function SectionEdit( props ) {
	const {
		attributes,
		className,
		children,
	} = props;

	const {
		backgroundImageUrl,
		backgroundImageFocalPoint,
		isSectionFullHeight,
		displayAsCarousel,
		sectionHeaderShow,
		sectionFooterShow,
		sectionContentWidth,
		sectionVerticalSpacing,
		sectionTitle,
	} = attributes;

	/**
	 * Get the image styles and apply to the main
	 * Section, conditional on us having a Figure.
	 */
	const getStyles = () => {
		const styles = {};

		if ( backgroundImageUrl ) {
			styles.backgroundImage = `url('${ backgroundImageUrl }')`;
			styles.backgroundPosition = focalPointToBgPos(
				backgroundImageFocalPoint
			);
		}

		return styles;
	};


	const classes = classnames( 'section', {
		[`section-${ className }`]: className,
		'has-background-image bg-cover': backgroundImageUrl,
		'is-full-height': true === isSectionFullHeight,
		'has-carousel': true === displayAsCarousel,
		'has-header': true === sectionHeaderShow,
		'has-footer': true === sectionFooterShow,
		[`has-${ sectionContentWidth }-content`]: sectionContentWidth,
		[`has-${ sectionVerticalSpacing }-vspacing`]: sectionVerticalSpacing,
	} );

	const blockProps = useBlockProps( {
		className: classes,
		style: getStyles(),
	} );

	return (
		<>
			<section { ...blockProps }
					 aria-roledescription={ displayAsCarousel ? 'carousel' : null }
					 aria-label={ sectionHeaderShow ? sectionTitle : null }
			>
				{ children }
			</section>
		</>
	);
}
