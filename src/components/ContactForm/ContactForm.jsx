import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { addContact } from 'redux/contacts/operations';
import { getStatusContacts } from 'redux/contacts/selectors';
import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

export const ContactForm = () => {
  const dispatch = useDispatch();

  let number = '';
  let name = '';
  const contacts = useSelector(getStatusContacts);
  const onhandleSubmit = evt => {
    evt.preventDefault();
    let isNameUnique = false;
    isNameUnique = contacts.some(elem => elem.name === name);
    if (!isNameUnique) {
      dispatch(addContact({ name, number }));
    } else {
      alert('This contact already exist');
    }
    evt.target.reset();
  };

  const handleChange = e => {
    name = e.currentTarget.value;
  };

  const handleChangeNumber = e => {
    number = e.currentTarget.value;
  };

  return (
    <>
      <h3>Add new contact</h3>

      <Box component="form" onSubmit={onhandleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          autoComplete="name"
          required
          size="small"
          label="Name"
          name="name"
          onChange={handleChange}
          type="text"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        />
        <TextField
          margin="normal"
          required
          size="small"
          label="number"
          onChange={handleChangeNumber}
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        />

        <Button type="submit" variant="contained" sx={{ mt: 1, mb: 7 }}>
          Add contact
        </Button>
      </Box>
    </>
  );
};
