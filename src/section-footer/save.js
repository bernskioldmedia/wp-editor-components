/**
 * External Dependencies
 */
import classnames from 'classnames';
/**
 * WordPress Dependencies
 */
import { RichText } from '@wordpress/block-editor';

export function SectionFooterSave( { attributes } ) {
	const {
        sectionWrapperEnabled,
		sectionFooterShow,
		sectionFooterAlignment,
		sectionFooterText,
		sectionFooterCtaShow,
		sectionFooterCtaLink,
		sectionFooterCtaText,
		sectionFooterCtaLinkTarget,
		sectionFooterCtaLinkRel,
    } = attributes;
    
    if ( ! sectionWrapperEnabled ) {
		return null;
	}

	if ( ! sectionFooterShow ) {
		return null;
	}

	const classes = classnames( 'section-footer', {
		[ `is-${ sectionFooterAlignment }-aligned` ]: sectionFooterAlignment,
	} );

	return (
		<footer className={ classes }>
			<div className="section-footer-content">
				{ sectionFooterText && (
					<RichText.Content
						tagName="p"
						className="section-footer-text"
						value={ sectionFooterText }
					/>
				) }

				{ sectionFooterCtaShow && (
					<div className="section-footer-cta">
						<a
							className="section-footer-cta-button button"
							href={ sectionFooterCtaLink }
							target={ sectionFooterCtaLinkTarget }
							rel={ sectionFooterCtaLinkRel }
						>
							{ sectionFooterCtaText }
						</a>
					</div>
				) }
			</div>
		</footer>
	);
}
