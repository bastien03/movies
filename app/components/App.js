import React from 'react'

export default class App extends React.Component {
    render() {
        return (
            <html>
            <head>
                <link rel="stylesheet" href="/movies/styles.css"/>
                <link rel="stylesheet"
                      href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css"
                      integrity="sha512-dTfge/zgoMYpP7QbHy4gWMEGsbsdZeCXz7irItjcC3sPUFtf0kuFbDz/ixG7ArTxmDjLXDmezHubeNikyKGVyQ=="
                      crossOrigin="anonymous"/>
                <script src="/movies/app.js"/>
            </head>
            <body>
                <div id="app"></div>
                {this.props.children}
                <script src="/movies/client.js"/>
            </body>
            </html>
        )
    }
}