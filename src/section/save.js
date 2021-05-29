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
    
    const propsArgs = {};

    if( sectionWrapperEnabled ) {
        propsArgs.className = classnames( 'section', {
    		'has-background-image bg-cover': backgroundImageUrl,
    		'is-full-height': true === isSectionFullHeight,
    		'has-carousel': true === displayAsCarousel,
    		'has-header': true === sectionHeaderShow,
    		'has-footer': true === sectionFooterShow,
    		[`has-${ sectionContentWidth }-content`]: sectionContentWidth,
    		[`has-${ sectionVerticalSpacing }-vspacing`]: sectionVerticalSpacing,
        } );

        if ( backgroundImageUrl ) {
            propsArgs.style = {};
            propsArgs.style.backgroundImage = `url('${ backgroundImageUrl }')`;
            propsArgs.style.backgroundPosition = focalPointToBgPos(
    			backgroundImageFocalPoint
    		);
    	}
    } else {
        propsArgs.className = classnames({
            'has-carousel': true === displayAsCarousel,
        });
    }

	const blockProps = useBlockProps.save( propsArgs );
    
    // If wrapper is disabled, just render the children.
    if ( ! sectionWrapperEnabled ) {
        return (
            <div {...blockProps}>
                { children }
            </div>
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
