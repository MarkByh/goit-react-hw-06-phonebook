import { useDispatch, useSelector } from 'react-redux';
import { Formik, Field, Form } from 'formik';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import * as Yup from 'yup';
import { nanoid } from 'nanoid';
import { addContact } from '../../redux/contactsSllice/operations';
import { selectContacts } from '../../redux/selectors';
import style from './contactForm.module.css';

const nameRegex =
  /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/gm;
const numRegex =
  /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/gm;
const state = {
  name: '',
  number: '',
};

const Valid = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too Short!')
    .max(20, 'Too Long!')
    .matches(
      nameRegex,
      'Name may contain only letters, apostrophe, dash and spaces'
    )
    .required(),

  number: Yup.string()
    .min(5, 'Too Short!')
    .max(12, 'Too Long!')
    .matches(
      numRegex,
      'Phone number must be digits and can contain spaces, dashes, parentheses'
    )
    .required(),
});

export const ContactForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);

  const handleSubmit = (values, actions) => {
    const NotValidContact = contacts.find(
      e => e.name.toLowerCase() === values.name.toLowerCase()
    );
    if (NotValidContact) {
      Notify.failure(`${NotValidContact.name} is already in contacts`);
      return;
    }

    const newContact = {
      id: nanoid(),
      name: values.name,
      number: values.number,
    };

    dispatch(addContact(newContact));
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={state}
      onSubmit={handleSubmit}
      validationSchema={Valid}
    >
      {({ errors, touched }) => (
        <Form className={style.form}>
          <div className={style.inputWrap}>
            Name:
            <Field className={style.input} type="text" name="name" />
            {errors.name && touched.name ? (
              <div className={style.errorDiv}>{errors.name}</div>
            ) : null}
          </div>

          <div className={style.inputWrap}>
            Phone:
            <Field className={style.input} type="tel" name="number" />
            {errors.number && touched.number ? (
              <div className={style.errorDiv}>{errors.number}</div>
            ) : null}
          </div>

          <button className={style.submitBtn} type="submit">
            Add contact
          </button>
        </Form>
      )}
    </Formik>
  );
};
