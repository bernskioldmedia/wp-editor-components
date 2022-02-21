/**
 * External Dependencies
 */
import classnames from 'classnames';
/**
 * Internal Dependencies
 */
import { focalPointToBgPos } from '../utilities';

export function Figure( props ) {
	const {
		type,
		url,
		alt = null,
		className = null,
		style = 'fitted',
		icon = null,
		iconFamily = null,
		focalPoint = null,
		mediaId = null,
		children
	} = props;

	if ( 'icon' !== type && ! url ) {
		return null;
	}

	const classes = classnames( 'media-object', {
		'is-image': 'image' === type,
		'is-video': 'video' === type,
		'is-icon': 'icon' === type,
		[`is-${ style }`]: style && type !== 'icon',
		[className]: className,
	} );

	let mediaStyle = {};

	if ( 'fitted' === style && focalPoint ) {
		mediaStyle = {
			objectPosition: focalPointToBgPos( focalPoint ),
		};
	}

	if ( 'image' === type ) {
		const imageClasses = classnames( 'media-object-image', {
			[`wp-image-${ mediaId }`]: mediaId,
			[`${ className }-source`]: className,
		} );

		return (
			<figure className={ classes }>
				{ children }
				<img
					src={ url }
					alt={ alt }
					className={ imageClasses }
					style={ mediaStyle }
				/>
			</figure>
		);
	} else if ( 'video' === type ) {
		return (
			<figure className={ classes }>
				{ children }
				<video
					className="media-object-video"
					autoPlay
					muted
					loop
					playsInline
					preload="none"
					style={ mediaStyle }
				>
					<source
						src={ url }
						className={ `${ className }-source` }
						type="video/mp4"
					/>
				</video>
			</figure>
		);
	} else if ( 'icon' === type && icon && iconFamily ) {
		const iconClass = classnames( 'icon', {
			[`${ iconFamily } fa-${ icon }`]: iconFamily && icon,
		} );

		return (
			<figure className={ classes }>
				{ children }
				<i className={ iconClass }></i>
			</figure>
		);
	}

	return null;
}
