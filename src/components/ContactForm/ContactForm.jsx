import React, { Component } from 'react';
import css from "./ContactForm.module.css";
import { nanoid } from 'nanoid'

class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { name, number } = this.state;
    const { onSubmit } = this.props;

    if (name && number) {
      onSubmit({ id: nanoid(), name, number });
      this.setState({ name: '', number: '' });
    }
  };

  render() {
    const { name, number } = this.state;
    return (
      <form className={css.contactsflex} onSubmit={this.handleSubmit}>
        <input
          className={css.contactinput}
          type="text"
          name="name"
          value={name}
          onChange={this.handleChange}
          placeholder="Ім'я"
          required
        />
        <input
          className={css.contactinput}
          type="tel"
          name="number"
          value={number}
          onChange={this.handleChange}
          placeholder="Номер телефону"
          required
        />
        <button className={css.contactbutton} type="submit">Додати контакт</button>
      </form>
    );
  }
}

export default ContactForm;
