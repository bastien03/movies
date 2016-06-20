import React from 'react'
import uris from '../uris'

export default class LoginComponent extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        let username, password;
        return (
            <div className="container">
                <h1>Login</h1>
                <form name="login" onSubmit={e => {this.props.onLoginClick(e,
                  username.value, password.value
                )}}>
                    <div className="form-group">
                        <span className="col-sm-2 control-label"> username</span>
                        <input type="text" ref={node => {username = node}}></input>
                    </div>
                    <div className="form-group">
                        <span className="col-sm-2 control-label"> password</span>
                        <input type="password" ref={node => {password = node}}></input>
                    </div>
                    <div className="form-group">
                        <div className="col-sm-offset-2 col-sm-10">
                            <input type="submit" value="login" className="btn btn-default"></input>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}
