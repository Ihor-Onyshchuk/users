import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import T from 'prop-types';
import {fetchUsers} from './actions';

class App extends PureComponent {
  componentDidMount() {
    this.props.onFetchUsers();
  }

  render() {
    console.log('users', this.props.users);
    return (
      <div className="App">
        <div></div>
      </div>
    );
  }
}

App.propTypes = {
  onFetchUsers: T.func.isRequired,
  users: T.array.isRequired,
  isloading: T.bool,
  isError: T.bool,
};

const mapStateToProps = ({users, isloading, isError}) => ({
  users,
  isloading,
  isError,
});

const mapDispatchToProps = dispatch => ({
  onFetchUsers: () => dispatch(fetchUsers()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
