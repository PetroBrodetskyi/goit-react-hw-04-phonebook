import React, { useState } from 'react';
import css from "./ContactForm.module.css";
import { nanoid } from 'nanoid';

const ContactForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    number: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, number } = formData;

    if (name && number) {
      onSubmit({ id: nanoid(), name, number });
      setFormData({ name: '', number: '' });
    }
  };

  const { name, number } = formData;

  return (
    <form className={css.contactsflex} onSubmit={handleSubmit}>
      <input
        className={css.contactinput}
        type="text"
        name="name"
        value={name}
        onChange={handleChange}
        placeholder="Ім'я"
        required
      />
      <input
        className={css.contactinput}
        type="tel"
        name="number"
        value={number}
        onChange={handleChange}
        placeholder="Номер телефону"
        required
      />
      <button className={css.contactbutton} type="submit">Додати контакт</button>
    </form>
  );
}

export default ContactForm;
