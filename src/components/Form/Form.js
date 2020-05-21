import React, {PureComponent} from 'react';

class Form extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      name: props.user.name || '',
      surname: props.user.surname || '',
      desc: props.user.desc || '',
      errors: props.errors,
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.errors !== this.props.errors)
      this.setState({errors: this.props.errors});
  }

  handleInputChange = event => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
      errors: {...this.state.errors, [name]: ''},
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    const {onUserEdit, onUserCreate, isEdit, user} = this.props;
    isEdit ? onUserEdit({...user, ...this.state}) : onUserCreate(this.state);
  };

  render() {
    const {name, surname, desc, errors} = this.state;
    const {isEdit} = this.props;
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            id="name"
            value={name}
            onChange={this.handleInputChange}
          />
          {errors?.name && <span>{errors.name[0]}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="surname">Surname</label>
          <input
            type="text"
            name="surname"
            className="form-control"
            id="surname"
            value={surname}
            onChange={this.handleInputChange}
          />
          {errors?.surname && <span>{errors.surname[0]}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="name">Description</label>
          <textarea
            className="form-control"
            name="desc"
            id="description"
            value={desc}
            onChange={this.handleInputChange}
          />
          {errors?.desc && <span>{errors.desc[0]}</span>}
        </div>
        <button type="submit" className="btn btn-primary">
          {isEdit ? 'Edit' : 'Create'}
        </button>
      </form>
    );
  }
}

export default Form;
