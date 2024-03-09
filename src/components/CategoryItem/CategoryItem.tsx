import React, {useState} from 'react';
import CategoryModal from '../CategoryModal/CategoryModal';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {clearCategoryToUpdate, selectDeleteButtonDisabler} from '../../store/categorySlice';
import {deleteCategory, getCategoriesList, getCategoryById} from '../../store/categoryThunk';


interface Props {
  id: string,
  category: string,
  type: string
}

const CategoryItem: React.FC<Props> = ({id, category, type}) => {
  const dispatch = useAppDispatch();
  const deleteDisabler = useAppSelector(selectDeleteButtonDisabler);
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(!show);
    dispatch(clearCategoryToUpdate());
  };

  const edit = async () => {
    await dispatch(getCategoryById(id));
    setShow(true);
  };

  const onDelete = async () => {
    const confirmation = confirm('Are you sure?');
    if (confirmation) {
      await dispatch(deleteCategory(id));
      dispatch(getCategoriesList());
    }
  };
  return (
    <div className='mx-3'>
      <div className="d-flex justify-content-between align-items-center border rounded m-3">
        <div className="d-flex align-items-center">
          <h4 className="m-0 ms-3 me-4">{category}</h4>
        </div>
        <div className="d-flex align-items-center me-3">
          <h4 className={type === 'Expense' ? 'm-0 text-danger' : 'm-0 text-success'}>
            {type}
          </h4>
          <button className="btn btn-primary mx-3" onClick={edit}>Edit</button>
          <button className="btn btn-danger my-2" disabled={deleteDisabler === id} onClick={onDelete}>Delete</button>
        </div>
        <CategoryModal handleClose={handleClose} show={show} edit={true} id={id}/>
      </div>
    </div>
  );
};

export default CategoryItem;