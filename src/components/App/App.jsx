import React, { useState, useEffect, useCallback } from 'react';
import ContactForm from '../ContactForm/ContactForm';
import ContactList from '../ContactList/ContactList';
import Filter from '../Filter/Filter';
import css from "./App.module.css";
import { AiFillPhone, AiFillContacts } from "react-icons/ai";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
  const storedContacts = localStorage.getItem('contacts');
  if (storedContacts) {
    setContacts(JSON.parse(storedContacts));
  }
}, []);

useEffect(() => {
  if (contacts.length > 0) {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }
}, [contacts]);

  const handleChange = (e) => {
    const { value } = e.target;
    setFilter(value);
  };

  const handleSubmit = useCallback((newContact) => {
    if (contacts.some((contact) => contact.name === newContact.name)) {
      Notify.failure(`${newContact.name} вже є в списку контактів.`, {
        position: 'center-bottom',
        timeout: 3000,
        width: '320px',
        fontSize: '18px'
      });
      return;
    }

    setContacts((prevContacts) => [...prevContacts, newContact]);
  }, [contacts]);

  const handleDelete = useCallback((id) => {
    setContacts((prevContacts) => prevContacts.filter((contact) => contact.id !== id));
  }, []);

  return (
    <div className={css.sectionapp}>
      <div className={css.titleflex}><h1 className={css.sectiontitle}>Phonebook</h1><AiFillPhone className={css.iconphone}/></div>
      <ContactForm onSubmit={handleSubmit} />

      <div className={css.titleflex}><h2>Contacts</h2><AiFillContacts className={css.iconcontacts}/></div>
      <Filter value={filter} onChange={handleChange} />
      <ContactList contacts={contacts} filter={filter} onDelete={handleDelete} />
    </div>
  );
};

export default App;
