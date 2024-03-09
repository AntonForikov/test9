import React, {useEffect, useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {addNewCategory, getCategoriesList, updateCategory} from '../../store/categoryThunk';
import {selectCategoryToUpdate} from '../../store/categorySlice';

interface Props {
  id?: string
  show: boolean
  handleClose: () => void
  edit?: boolean
}

const initialCategory = {
  type: '',
  name: '',
};
const AddEditModal: React.FC<Props> = ({id,handleClose, show, edit=false}) => {
  const dispatch = useAppDispatch();
  const categoryToUpdate = useAppSelector(selectCategoryToUpdate);
  const [category, setCategory] = useState(initialCategory);

  useEffect(() => {
    if (categoryToUpdate) {
      setCategory(() => ({...categoryToUpdate}));
    } else {
      setCategory(initialCategory);
    }
  }, [categoryToUpdate]);

  const change = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const {name, value} = e.target;
    setCategory((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };


  const onFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(addNewCategory(category));
    setCategory(initialCategory);
    dispatch(getCategoriesList());
    if (!edit) {
      await dispatch(addNewCategory(category));
      setCategory(initialCategory);
    } else {
      if (id) {
        const withId = {...category, id: id};
        await dispatch(updateCategory(withId));
      }
    }
    handleClose();
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>{edit ? 'Edit Expense/Income' : 'Add Expense/Income'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={onFormSubmit}>
            <label htmlFor='type'>Type</label>
            <select
              className="form-control mt-2"
              name="type"
              id="type"
              value={category.type}
              onChange={change}
              required
            >
              <option value="">--Please select type--</option>
              <option>Expense</option>
              <option>Income</option>
            </select>

            <label className="mt-3" htmlFor='name'>Name</label>
            <input
              className="form-control mt-2"
              name="name"
              id="name"
              value={category.name}
              onChange={change}
              required
            />

            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button type="submit" variant="primary">
                Save Changes
              </Button>
            </Modal.Footer>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddEditModal;