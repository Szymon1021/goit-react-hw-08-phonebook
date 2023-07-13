import css from './ContactList.module.css';
import React from 'react';
import { ContactForm } from '../ContactForm/ContactForm';
import { Filter } from '../Filter/Filter';
import { selectVisibleContacts } from 'redux/contacts/selectors';
import { useSelector, useDispatch } from 'react-redux';
import { deleteContact } from 'redux/contacts/operations';
import { useEffect } from 'react';
import { fetchContacts } from 'redux/contacts/operations';
import Stack from '@mui/material/Stack';
import { Container } from '@mui/material';
import { selectUser } from 'redux/auth/selector';

export const ContactList = () => {
  const dispatch = useDispatch();

  const handleDelete = id => {
    dispatch(deleteContact(id));
  };
  const user = useSelector(selectUser);
  const contactsToPreview = useSelector(selectVisibleContacts);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <>
      <Container maxWidth="sm">
        <h2>Welome {user.name} it's yours Contacts</h2>
        <Stack
          direction="column"
          justifyContent="flex-start"
          alignItems="flex-start"
          spacing={1}
        >
          <ContactForm></ContactForm>
          <Filter></Filter>

          {contactsToPreview.map(elem => (
            <p className={css.list__elem} key={elem.id}>
              <span className={css.name}>{elem.name}</span>
              <span className={css.number}>{elem.number}</span>
              <button
                className={css.button}
                type="Button"
                onClick={() => handleDelete(elem.id)}
              >
                Delete
              </button>
            </p>
          ))}
        </Stack>
      </Container>
    </>
  );
};
