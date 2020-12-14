/**
 * External Dependencies
 */
import classnames from 'classnames';
/**
 * WordPress Dependencies
 */
import { RichText } from '@wordpress/block-editor';

export default function SectionFooterSave( { attributes } ) {
	const {
		sectionFooterShow,
		sectionFooterAlignment,
		sectionFooterText,
		sectionFooterCtaShow,
		sectionFooterCtaLink,
		sectionFooterCtaText,
		sectionFooterCtaLinkTarget,
		sectionFooterCtaLinkRel,
	} = attributes;

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
