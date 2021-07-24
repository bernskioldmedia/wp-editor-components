/**
 * Internal Dependencies
 */
import linkIcon from './icon';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { displayShortcut, rawShortcut } from '@wordpress/keycodes';
import { __experimentalLinkControl as LinkControl, BlockControls, } from '@wordpress/block-editor';
import { Popover, ToolbarButton, ToolbarGroup } from '@wordpress/components';
import { useCallback, useState } from '@wordpress/element';

const NEW_TAB_REL = 'noreferrer noopener';

export function URLPicker( props ) {
	const { url, rel, saveUrl, saveLinkTarget, opensInNewTab } = props;

	const onToggleOpenInNewTab = useCallback(
		( value ) => {
			const newLinkTarget = value ? '_blank' : undefined;

			let updatedRel = rel;
			if ( newLinkTarget && ! rel ) {
				updatedRel = NEW_TAB_REL;
			} else if ( ! newLinkTarget && rel === NEW_TAB_REL ) {
				updatedRel = undefined;
			}

			saveLinkTarget( newLinkTarget, updatedRel );
		},
		[ rel ]
	);

	return (
		<LinkControl
			className="wp-block-navigation-link__inline-link-input"
			value={ { url, opensInNewTab } }
			onChange={ ( {
							 url: newURL = '',
							 opensInNewTab: newOpensInNewTab,
						 } ) => {
				saveUrl( newURL );

				if ( opensInNewTab !== newOpensInNewTab ) {
					onToggleOpenInNewTab( newOpensInNewTab );
				}
			} }
		/>
	);
}

export function PopoverURLPicker( props ) {
	const { shouldShow, label, position = 'bottom center' } = props;

	return (
		<>
			{ shouldShow && (
				<Popover
					position={ position }
					focusOnMount={ false }
				>
					{ label && (
						<p style={ {
							margin: 0,
							padding: '0.75rem 1rem',
							fontWeight: 'bold',
							borderBottom: '1px solid #ccc',
						} }>{ label }</p>
					) }
					<URLPicker isOpen={ shouldShow } { ...props } />
				</Popover>
			)
			}
		</>
	);
}

export function ToolbarURLPicker( props ) {
	const { isSelected, label, toolbarLabel = __( 'Link', 'TEXTDOMAIN' ), icon = linkIcon } = props;

	const [ isURLPickerOpen, setIsURLPickerOpen ] = useState( false );

	const openLinkControl = () => {
		setIsURLPickerOpen( true );

		// prevents default behaviour for event
		return false;
	};

	return (
		<>
			<BlockControls>
                <ToolbarGroup>
					<ToolbarButton
						icon={ icon }
                        label={ toolbarLabel }
						shortcut={ displayShortcut.primary( 'k' ) }
                        onClick={ openLinkControl }
                        iconPosition="left"
                    />
                    { isURLPickerOpen && (
        				<Popover
        					position="bottom center"
        					onClose={ () => setIsURLPickerOpen( false ) }
                        >
                            { label && (
        						<p style={ {
        							margin: 0,
        							padding: '0.75rem 1rem',
        							fontWeight: 'bold',
        							borderBottom: '1px solid #ccc',
        						} }>{ label }</p>
        					) }
        					<URLPicker isOpen={ isURLPickerOpen } { ...props } />
        				</Popover>
        			) }
				</ToolbarGroup>
			</BlockControls>
		</>
	);
}
