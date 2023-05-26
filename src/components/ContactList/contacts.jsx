import { useDispatch, useSelector } from 'react-redux';
import style from './contacts.module.css';
import { deleteContact } from 'redux/contactsSlice';
import { selectFilter, selectContacts } from 'redux/selectors';

export const ContactList = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);
  const filterValue = useSelector(selectFilter);

  const filteredContacts = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filterValue)
    );
  };

  return (
    <ul className={style.contact}>
      {filteredContacts().map(({ id, name, number }) => (
        <li key={id} className={style.contactItem}>
          <p>
            <span>{name}:</span> {number}
          </p>
          <button
            className={style.subButton}
            type="button"
            onClick={() => dispatch(deleteContact(id))}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};
