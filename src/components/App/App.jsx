import React, { Component } from 'react';
import ContactForm from '../ContactForm/ContactForm';
import ContactList from '../ContactList/ContactList';
import Filter from '../Filter/Filter';
import css from "./App.module.css";
import { AiFillPhone, AiFillContacts } from "react-icons/ai";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const storedContacts = localStorage.getItem('contacts');
    if (storedContacts) {
      this.setState({ contacts: JSON.parse(storedContacts) });
    }
  }

  componentDidUpdate(_, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (newContact) => {
    if (this.state.contacts.some((contact) => contact.name === newContact.name)) {
      Notify.failure(`${newContact.name} вже є в списку контактів.`, {
        position: 'center-bottom',
        timeout: 3000,
        width: '320px',
        fontSize: '18px'
      });
      return;
    }

    this.setState((prevState) => ({
      contacts: [...prevState.contacts, newContact],
    }));
  };

  handleDelete = (id) => {
    this.setState((prevState) => ({
      contacts: prevState.contacts.filter((contact) => contact.id !== id),
    }));
  };

  render() {
    const { contacts, filter } = this.state;
    return (
      <div className={css.sectionapp}>
        <div className={css.titleflex}><h1 className={css.sectiontitle}>Phonebook</h1><AiFillPhone className={css.iconphone}/></div>
        <ContactForm onSubmit={this.handleSubmit} />

        <div className={css.titleflex}><h2>Contacts</h2><AiFillContacts className={css.iconcontacts}/></div>
        <Filter value={filter} onChange={this.handleChange} />
        <ContactList contacts={contacts} filter={filter} onDelete={this.handleDelete} />
      </div>
    );
  }
}

export default App;
