import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from 'redux/filterSlice';
import { selectFilter } from 'redux/selectors';
import style from './filter.module.css';
export const Filter = () => {
  const filterValue = useSelector(selectFilter);
  const dispatch = useDispatch();
  const onChange = e => {
    const value = e.target.value.toLowerCase();
    dispatch(setFilter(value));
  };

  return (
    <div className={style.inputWrap}>
      Find contacts by name:
      <input
        className={style.filterInput}
        type="text"
        onChange={onChange}
        value={filterValue}
      />
    </div>
  );
};
