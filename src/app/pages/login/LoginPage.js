import React from 'react';

export default class LoginComponent extends React.Component {

  render() {
    let username;
    let password;
    return (
      <div className="container page login">
        <h3>{'Log in into movies-app'}</h3>
        <form
          name="login"
          onSubmit={e => {
            this.props.onLoginClick(e,
              this.props.router,
              this.props.location,
              username.value, password.value
            ); }}
        >
          <div className="formGroup">
            <span className="col-sm-2 control-label"> username</span>
            <input type="text" ref={node => { username = node; }}></input>
          </div>
          <div className="formGroup">
            <span className="col-sm-2 control-label"> password</span>
            <input type="password" ref={node => { password = node; }}></input>
          </div>
          <div className="formGroup">
            <div className="col-sm-offset-2 col-sm-10">
              <input type="submit" value="login" className="btn btn-default"></input>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

LoginComponent.propTypes = {
  onLoginClick: React.PropTypes.func,
  location: React.PropTypes.shape({
    state: React.PropTypes.shape({
      nextPathname: React.PropTypes.string,
    }),
  }),
  router: React.PropTypes.shape({
    push: React.PropTypes.func.isRequired,
  }),
};
