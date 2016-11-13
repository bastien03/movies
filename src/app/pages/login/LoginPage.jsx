import React from 'react';

class LoginPage extends React.Component {

  render() {
    let username;
    let password;
    return (
      <div className="page login">
        <h3>{'Log in into movies-app'}</h3>
        <form
          name="login"
          onSubmit={(e) => {
            this.props.onLoginClick(e,
              this.props.router,
              this.props.location,
              username.value, password.value,
            ); }}
        >
          <div className="formGroup">
            <span> username</span>
            <input type="text" ref={(node) => { username = node; }} />
          </div>
          <div className="formGroup">
            <span> password</span>
            <input type="password" ref={(node) => { password = node; }} />
          </div>
          <div className="formGroup">
            <input type="submit" value="login" className="btn btn-default" />
          </div>
        </form>
      </div>
    );
  }
}

LoginPage.propTypes = {
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

export default LoginPage;
