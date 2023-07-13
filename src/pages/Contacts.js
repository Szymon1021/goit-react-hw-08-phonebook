import { Helmet, HelmetProvider } from 'react-helmet-async';
import { ContactList } from 'components/ContactList/ContactList';

export default function Contacts() {
  return (
    <HelmetProvider>
      <>
        <Helmet>
          <title>Contacts</title>
        </Helmet>
        <ContactList />
      </>
    </HelmetProvider>
  );
}
