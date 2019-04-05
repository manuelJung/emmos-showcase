import React from 'react'
import {Provider} from 'react-redux'

import Test from './components/Test'

export default class App extends React.Component {
  render() {
    return (
      <Provider store={this.props.store}>
        <div className="App">
          <Test/>
        </div>
      </Provider>
    );
  }
}
