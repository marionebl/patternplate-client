import React, {Component, PropTypes as t} from 'react';
import Markdown from '../../containers/markdown';
import Search from '../../containers/search';

// import Messages from './messages';
// import pure from 'pure-render-decorator';

class Home extends Component {
	static propTypes = {
		readme: t.string.isRequired,
		base: t.string.isRequired
	};

	render() {
		const {readme, base} = this.props;
		return (
			<div className="application-container application-container--home">
				<Search inline/>
				<Markdown source={readme} base={base} className="home"/>
			</div>
		);
	}
}

export default Home;
