import React, {PropTypes as t} from 'react';
import {Link} from '@marionebl/react-router';

import Icon from '../common/icon';
import NavigationToggle from './navigation-toggle';

export default function NavigationToolbar(props) {
	// const {data} = props;
	const issue = {
		pathname: props.pathname,
		query: {
			...props.query,
			issue: true
		}
	};

	const cheatsheet = {
		pathname: props.pathname,
		query: {
			...props.query,
			lightbox: 'shortcuts'
		}
	};

	const targetTheme = props.theme === 'dark' ? 'light' : 'dark';
	const handleThemeChange = () => props.onThemeChange(targetTheme);

	const styles = {
		light: {display: targetTheme === 'light' ? 'block' : 'none'},
		dark: {display: targetTheme === 'dark' ? 'block' : 'none'}
	};

	return (
		<div className="navigation-toolbar">
			<div className="navigation-toolbar__container">
				<ul className="navigation-toolbar__links">
					<li className="navigation-toolbar__link">
						<Link
							className="button"
							title="Report an issue [ctrl+i]"
							to={issue}
							>
							<Icon symbol="issue"/>
						</Link>
					</li>
					<li className="navigation-toolbar__link">
						<Link
							className="button"
							title="Show keyboard shortcuts [ctrl+k]"
							to={cheatsheet}
							>
							<Icon symbol="command"/>
						</Link>
					</li>
					<li className="navigation-toolbar__link">
						<button
							className="button"
							type="button"
							onClick={handleThemeChange}
							title={`Switch to ${targetTheme} theme [ctrl+t]`}
							>
							<Icon
								base={props.base}
								symbol="light"
								style={styles.light}
								>
								Light
							</Icon>
							<Icon
								base={props.base}
								symbol="dark"
								style={styles.dark}
								>
								Dark
							</Icon>
						</button>
					</li>
				</ul>
			</div>
			<div className="navigation-toolbar__action">
				<NavigationToggle
					base={props.base}
					expanded={props.expanded}
					pathname={props.pathname}
					query={props.query}
					/>
			</div>
		</div>
	);
}

NavigationToolbar.propTypes = {
	base: t.string.isRequired,
	children: t.any,
	expanded: t.bool.isRequired,
	onThemeChange: t.func.isRequired,
	pathname: t.string.isRequired,
	query: t.object.isRequired,
	theme: t.string.isRequired
};
