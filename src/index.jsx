import React from 'react'
import ReactDOM from 'react-dom'
import {Route} from 'react-router-dom'

import App from './components/App'

let Test = React.createClass({
  render: function () {
    return <h1>Test Success</h1>
  }
})

ReactDOM.render(
  <App>
    <h1>Lorem Ipsum</h1>

    <Route path='/' component={Test} />
  </App>,
  document.getElementById('app')
)
