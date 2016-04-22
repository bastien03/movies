import React from 'react'

export default class LoginComponent extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="container">
                <h1>Login</h1>
                <form name="login" method="post" action="login">
                    <div className="form-group">
                        <span className="col-sm-2 control-label"> username</span>
                        <input type="text" name="username" autofocus></input>
                    </div>
                    <div className="form-group">
                        <span className="col-sm-2 control-label"> password</span>
                        <input type="password" name="password"></input>
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