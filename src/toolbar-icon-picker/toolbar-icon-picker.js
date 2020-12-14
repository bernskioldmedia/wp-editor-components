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

export default function ToolbarIconPicker( props ) {
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
							label={ __( 'Select Icon', 'bm-block-library' ) }
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
										'bm-block-library'
									) }
									help={ __(
										'Choose which Font Awesome family the icon should be loaded from.',
										'bm-block-library'
									) }
									selected={ selectedFamily }
									options={ fontAwesomeFamilyOptions }
									onChange={ setFamily }
								/>
								<TextControl
									label={ __(
										'Icon Name',
										'bm-block-library'
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
