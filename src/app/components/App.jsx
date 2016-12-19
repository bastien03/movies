import React from 'react';
import { mouseTrap } from 'react-mousetrap';
import LoadingBar from 'react-redux-loading-bar';
import Header from './header/HeaderContainer';
import AppVersion from './appVersion/AppVersionContainer';

const hotKeys = ['ctrl+o']; // show/hide the AppVersion component

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showVersion: false,
    };
    this.goToNext = this.goToNext.bind(this);
  }

  componentWillMount() {
    this.props.bindShortcut(hotKeys, () => this.goToNext(this));
  }

  goToNext(instance) {
    instance.setState({
      showVersion: !this.state.showVersion,
    });
  }

  componentWillUnMount() {
    this.props.unbindShortcut(hotKeys);
  }

  render() {
    const versionStyle = {
      display: this.state.showVersion ? 'block' : 'none',
    };
    return (
      <div className="container-fluid root">
        <AppVersion style={versionStyle} />
        <LoadingBar />
        <Header />
        <div className="container">
          {this.props.children}
        </div>
      </div>
    );
  }
}

App.propTypes = {
  children: React.PropTypes.element,
  bindShortcut: React.PropTypes.func.isRequired,
  unbindShortcut: React.PropTypes.func.isRequired,
};

export default mouseTrap(App);
