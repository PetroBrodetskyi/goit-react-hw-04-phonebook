import React from 'react';
import css from "./Filter.module.css";

const Filter = ({ value, onChange }) => (
  <input
    className={css.filterinput}
    type="text"
    name="filter"
    value={value}
    onChange={onChange}
    placeholder="Пошук"
  />
);

export default Filter;
