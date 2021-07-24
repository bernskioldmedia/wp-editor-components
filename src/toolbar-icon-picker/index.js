/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { BlockControls } from '@wordpress/block-editor';
import { Dropdown, Button, RadioControl, TextControl, Toolbar, } from '@wordpress/components';

/**
 * Internal Dependencies
 */
import { getDefaultFontAwesomeFamilies } from '../settings';
import icon from './icon';

export function ToolbarIconPicker( props ) {
	const { selectedIcon, selectedFamily, setIcon, setFamily } = props;

	const fontAwesomeFamilyOptions = getDefaultFontAwesomeFamilies( props );

	return (
		<BlockControls>
			<Toolbar>
				<Dropdown
					className="components-toolbar__control"
					contentClassName="components-toolbar__icon-picker"
					position="bottom center"
					renderToggle={ ( { isOpen, onToggle } ) => (
						<Button
							label={ __( 'Select Icon', 'TEXTDOMAIN' ) }
							icon={ icon }
							onClick={ onToggle }
							aria-expanded={ isOpen }
						/>
					) }
					renderContent={ () => (
						<>
							<div
								className="block-editor-block-toolbar"
								style={ {
									padding: '1rem',
									flexFlow: 'column',
								} }
							>
								<RadioControl
									label={ __(
										'Icon Style Family',
										'TEXTDOMAIN'
									) }
									help={ __(
										'Choose which Font Awesome family the icon should be loaded from.',
										'TEXTDOMAIN'
									) }
									selected={ selectedFamily }
									options={ fontAwesomeFamilyOptions }
									onChange={ setFamily }
								/>
								<TextControl
									label={ __(
										'Icon Name',
										'TEXTDOMAIN'
									) }
									value={ selectedIcon }
									onChange={ setIcon }
								/>
							</div>
						</>
					) }
				/>
			</Toolbar>
		</BlockControls>
	);
}
