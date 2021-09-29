/**
 * External Dependencies
 */
import classnames from 'classnames';
/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { RichText } from '@wordpress/block-editor';
import { applyFilters } from '@wordpress/hooks';

/**
 * Internal Dependencies
 */
import { ToolbarURLPicker } from '../url-picker';

export function SectionHeaderEdit( props ) {
	const { attributes, setAttributes, isSelected } = props;

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

	if ( ! sectionHeaderShow ) {
		return null;
	}

	const showEyebrow = applyFilters(
		'sectionHeader.showEyebrow',
        'bmEditor',
		'small' !== sectionHeaderStyle,
		props
	);
	const showSubtitle = applyFilters(
		'sectionHeader.showSubtitle',
        'bmEditor',
		'small' !== sectionHeaderStyle,
		props
	);

	const classes = classnames( 'section-header', {
		[`is-style-${ sectionHeaderStyle }`]: sectionHeaderStyle,
	} );

	return (
		<>
			<header className={ classes }>
				<div className="section-header-content">
					{ showEyebrow && (
						<RichText
							tagName="p"
							className="section-eyebrow"
							placeholder="Consectetuer adipiscing"
							multiline={ false }
							allowedFormats={ [] }
							withoutInteractiveFormatting={ true }
							value={ sectionEyebrow }
							onChange={ ( value ) =>
								setAttributes( {
									sectionEyebrow: value,
								} )
							}
						/>
					) }

					<RichText
						tagName="h2"
						className="section-title"
						placeholder="Lorem ipsum dolor sit"
						multiline={ false }
						allowedFormats={ [] }
						withoutInteractiveFormatting={ true }
						value={ sectionTitle }
						onChange={ ( value ) =>
							setAttributes( {
								sectionTitle: value,
							} )
						}
					/>

					{ showSubtitle && (
						<RichText
							tagName="p"
							className="section-subtitle"
							placeholder="Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros."
							multiline={ false }
							value={ sectionSubtitle }
							onChange={ ( value ) =>
								setAttributes( {
									sectionSubtitle: value,
								} )
							}
						/>
					) }
				</div>
				{ sectionCtaShow && (
					<p className="section-cta">
						<RichText
							tagName="span"
							className="section-cta-link text-button"
							placeholder="More"
							multiline={ false }
							allowedFormats={ [] }
							value={ sectionCtaText }
							onChange={ ( value ) =>
								setAttributes( {
									sectionCtaText: value,
								} )
							}
						/>
					</p>
				) }
            </header>

            { sectionCtaShow && (
    			<ToolbarURLPicker
                    label={ __( 'Section Header Call to Action Link', 'TEXTDOMAIN') }
                    toolbarLabel={ __( 'Section Header CTA', 'TEXTDOMAIN' ) }
    				opensInNewTab={ sectionCtaLinkTarget === '_blank' }
    				url={ sectionCtaLink }
    				rel={ sectionCtaLinkRel }
    				saveLinkTarget={ ( target, rel ) =>
    					setAttributes( {
    						sectionCtaLinkTarget: target,
    						sectionCtaLinkRel: rel,
    					} )
    				}
    				saveUrl={ ( url ) =>
    					setAttributes( { sectionCtaLink: url } )
    				}
                />
            ) }
		</>
	);
}
