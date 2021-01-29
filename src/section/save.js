/**
 * External Dependencies
 */
import classnames from 'classnames';
/**
 * Internal Dependencies
 */
import { focalPointToBgPos, } from '../utilities';

/**
 * WordPress Dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';

export function SectionSave( { attributes, children } ) {
	const {
        sectionWrapperEnabled,
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

	const classes = classnames( 'section', {
		'has-background-image bg-cover': backgroundImageUrl,
		'is-full-height': true === isSectionFullHeight,
		'has-carousel': true === displayAsCarousel,
		'has-header': true === sectionHeaderShow,
		'has-footer': true === sectionFooterShow,
		[`has-${ sectionContentWidth }-content`]: sectionContentWidth,
		[`has-${ sectionVerticalSpacing }-vspacing`]: sectionVerticalSpacing,
	} );

	const styles = {};

	if ( backgroundImageUrl ) {
		styles.backgroundImage = `url('${ backgroundImageUrl }')`;
		styles.backgroundPosition = focalPointToBgPos(
			backgroundImageFocalPoint
		);
	}

	const blockProps = useBlockProps.save( {
		className: classes,
		style: styles,
    } );
    
    // If wrapper is disabled, just render the children.
    if ( ! sectionWrapperEnabled ) {
        return (
            { children }
        );
    }

	return (
		<section
			{ ...blockProps }
			aria-roledescription={ displayAsCarousel ? 'carousel' : null }
			aria-label={ sectionHeaderShow ? sectionTitle : null }
		>
			{ children }
		</section>
	);
}
