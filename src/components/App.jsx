import { useSelector } from 'react-redux';
import { ContactForm } from './ContactForm/contactForm';
import { ContactList } from './ContactList/contacts';
import { Filter } from './Filter/filter';
import style from './app.module.css';
import { selectContacts } from 'redux/selectors';

export const App = () => {
  const contacts = useSelector(selectContacts);

  return (
    <div className={style.formDiv}>
      <h1 className={style.title}>Phone book</h1>
      <ContactForm />

      <h2 className={style.titleContacts}>Contacts</h2>
      {contacts.length > 0 ? (
        <>
          <Filter />
          <ContactList />
        </>
      ) : (
        'You have no contacts'
      )}
    </div>
  );
};
