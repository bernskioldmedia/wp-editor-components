/**
 * External Dependencies
 */
import classnames from 'classnames';
/**
 * WordPress Dependencies
 */
import { RichText } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

/**
 * Internal Dependencies
 */
import { ToolbarURLPicker } from '../url-picker';

export function SectionFooterEdit( props ) {
	const { attributes, setAttributes, isSelected } = props;

	const {
        sectionWrapperEnabled,
		sectionFooterShow,
		sectionFooterAlignment,
		sectionFooterText,
		sectionFooterCtaShow,
		sectionFooterCtaText,
		sectionFooterCtaLink,
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
		[`is-${ sectionFooterAlignment }-aligned`]: sectionFooterAlignment,
	} );

	return (
		<>
			<footer className={ classes }>
				<div className="section-footer-content">
						<RichText
							tagName="p"
							className="section-footer-text"
							placeholder="Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros."
							value={ sectionFooterText }
							onChange={ ( value ) =>
								setAttributes( {
									sectionFooterText: value,
								} )
							}
						/>

					{ sectionFooterCtaShow && (
						<div className="section-footer-cta">
							<RichText
								tagName="span"
								className="section-footer-cta-button button"
								placeholder="Lorem ipsum dolor"
								multiline={ false }
								allowedFormats={ [] }
								value={ sectionFooterCtaText }
								onChange={ ( value ) =>
									setAttributes( {
										sectionFooterCtaText: value,
									} )
								}
							/>
						</div>
					) }
				</div>
			</footer>
			<ToolbarURLPicker
                label={ __( 'Section Footer Call to Action Link' ) }
                toolbarLabel={ __( 'Section Footer CTA' ) }
				opensInNewTab={
					sectionFooterCtaLinkTarget === '_blank'
				}
				url={ sectionFooterCtaLink }
				rel={ sectionFooterCtaLinkRel }
				saveLinkTarget={ ( target, rel ) =>
					setAttributes( {
						sectionFooterCtaLinkTarget: target,
						sectionFooterCtaLinkRel: rel,
					} )
				}
				saveUrl={ ( url ) =>
					setAttributes( {
						sectionFooterCtaLink: url,
					} )
				}
			/>
		</>
	);
}
