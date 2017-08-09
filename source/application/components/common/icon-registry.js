import {uniq, noop} from 'lodash';
import React, {PropTypes as t} from 'react';
import ReactDOM from 'react-dom';
import withSideEffect from 'react-side-effect';
import styled, {injectGlobal} from 'styled-components';
import {icons, iconNames} from './icons';

export function withRegistry(Component) {
	return withSideEffect(toState, onChange)(Component);
}

function toState(propsList) {
	const list = propsList
		.map(item => item.symbol || 'placeholder')
		.sort();
	const symbols = uniq(list);
	return <IconRegistry symbols={symbols}/>;
}

function onChange(registry) {
	const element = getRegistryMountPoint();
	ReactDOM.render(registry, element);
}

function getRegistryMountPoint() {
	const {document} = global;
	const found = document.querySelector('[data-icon-registry]');
	if (found) {
		return found;
	}

	const created = document.createElement('div');
	created.setAttribute('data-icon-registry', true);
	document.body.appendChild(created);
	return created;
}

const HiddenSVG = styled.svg`
	position: 'fixed';
	height: 0;
	width: 0;
	overflow: 'hidden';
	padding: 0;
	visibility: 'hidden';
`;

class IconRegistry extends React.Component {
	componentWillMount() {
		/* eslint-disable */
		injectGlobal`
			[data-icon-registry] {
				position: 'fixed';
				height: 0;
				width: 0;
				overflow: 'hidden';
				padding: 0;
				visibility: 'hidden';
			}
		`;
		/* eslint-disable */
	}

	render() {
		const {props} = this;
		return (
			<HiddenSVG>
				{
					props.symbols
						.map(symbol => {
							const creator = icons[symbol] || icons.placeholder;
							const paths = creator() || [];
							return <Symbol id={symbol} key={symbol} definition={paths}/>;
						})
				}
			</HiddenSVG>
		);
	}
}

IconRegistry.propTypes = {
	symbols: t.arrayOf(t.oneOf(iconNames)).isRequired
};

IconRegistry.defaultProps = {
	symbols: []
};

function Symbol(props) {
	const paths = Array.isArray(props.definition) ?
		props.definition :
		[props.definition];

	return (
		<symbol
			id={props.id}
			viewBox="0 0 24 24"
			>
			{
				paths.map(path => <Path definition={path} key={path}/>)
			}
		</symbol>
	);
}

Symbol.propTypes = {
	definition: t.oneOfType([t.string, t.object, t.array]).isRequired,
	id: t.string.isRequired
};

function Path(props) {
	const {definition} = props;
	const def = typeof definition === 'string' ? {d: definition} : definition;
	const {tagName, ...p} = def;
	const Component = tagName || 'path';
	return <Component {...p}/>;
}

Path.propTypes = {
	definition: t.oneOfType([t.string, t.object]).isRequired
};
