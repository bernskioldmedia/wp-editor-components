/**
 * External Dependencies
 */
import classnames from 'classnames';
/**
 * WordPress Dependencies
 */
import { RichText } from '@wordpress/block-editor';
import { applyFilters } from '@wordpress/hooks';

export function SectionHeaderSave( props ) {
	const { attributes } = props;
	const {
        sectionWrapperEnabled,
		sectionHeaderStyle,
		sectionHeaderShow,
		sectionEyebrow,
		sectionTitle,
		sectionSubtitle,
		sectionCtaShow,
		sectionCtaText,
		sectionCtaLink,
		sectionCtaLinkTarget,
		sectionCtaLinkRel,
	} = attributes;

    if ( ! sectionWrapperEnabled ) {
		return null;
	}
    
	/**
	 * If the Section header is hidden (by default it is),
	 * then just don't show it.
	 */
	if ( ! sectionHeaderShow ) {
		return null;
	}
	
	const showEyebrow = applyFilters(
		'bmEditor.sectionHeader.showEyebrow',
		'small' !== sectionHeaderStyle,
		props
	);
	const showSubtitle = applyFilters(
		'bmEditor.sectionHeader.showSubtitle',
		'small' !== sectionHeaderStyle,
		props
	);

	const classes = classnames( 'section-header', {
		[ `is-style-${ sectionHeaderStyle }` ]: sectionHeaderStyle,
	} );

	return (
		<header className={ classes }>
			<div className="section-header-content">
				{ showEyebrow && (
					<RichText.Content
						tagName="p"
						className="section-eyebrow"
						value={ sectionEyebrow }
					/>
				) }

				{ sectionTitle && (
					<RichText.Content
						tagName="h2"
						className="section-title"
						value={ sectionTitle }
					/>
				) }

				{ showSubtitle && (
					<RichText.Content
						tagName="p"
						className="section-subtitle"
						value={ sectionSubtitle }
					/>
				) }
			</div>

			{ sectionCtaShow && (
				<p className="section-cta">
					<a
						className="section-cta-link text-button"
						href={ sectionCtaLink }
						target={ sectionCtaLinkTarget }
						rel={ sectionCtaLinkRel }
					>
						{ sectionCtaText }
					</a>
				</p>
			) }
		</header>
	);
}
