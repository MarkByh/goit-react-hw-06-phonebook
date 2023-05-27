import { ContactForm } from './ContactForm/contactForm';
import { ContactList } from './ContactList/contacts';
import { Filter } from './Filter/filter';
import style from './app.module.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContacts } from 'redux/contactsSllice/operations';
import { selectContacts, selectError, selectIsLoading } from 'redux/selectors';
import Loader from './Loader/Loader';

export const App = () => {
  const contacts = useSelector(selectContacts);
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <div className={style.formDiv}>
      <h1 className={style.title}>Phone book</h1>
      <ContactForm />
      <h2 className={style.titleContacts}>Contacts</h2>
      {contacts.length > 0 ? (
        <>
          <Filter />
          <ContactList />
          {isLoading && !error && <Loader />}
        </>
      ) : (
        'You have no contacts'
      )}
    </div>
  );
};
