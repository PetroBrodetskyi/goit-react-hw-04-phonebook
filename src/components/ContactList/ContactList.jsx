import React from 'react';
import css from "./ContactList.module.css";
import { AiFillCloseSquare } from "react-icons/ai";

const ContactList = ({ contacts, filter, onDelete }) => {
  const reversedContacts = [...contacts].reverse();

  const filteredContacts = reversedContacts.filter((contact) =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className={css.contactlistform}>
      <ul className={css.linone}>
        {filteredContacts.map((contact) => (
          <li className={css.liflex} key={contact.id}>
            <div className={css.divflex}>{contact.name}: {contact.number}</div>
            <div className={css.contactlistbutton} onClick={() => onDelete(contact.id)}><AiFillCloseSquare className={css.iconcontacts}/></div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContactList;
