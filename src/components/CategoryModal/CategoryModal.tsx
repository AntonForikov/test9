import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {useAppDispatch} from '../../app/hooks';
import {addNewCategory, getCategoriesList} from '../../store/categoryThunk';

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
  // const trToUpdate = useAppSelector(selectTransactionToUpdate);
  const [category, setCategory] = useState(initialCategory);

  // useEffect(() => {
  //   if (trToUpdate) {
  //     setTransaction(() => ({...trToUpdate}));
  //   }
  // }, [trToUpdate]);

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
    // if (!edit) {
    //   await dispatch(addNewTransaction(transaction));
    //   setTransaction(initialCategory);
    // } else {
    //   if (id) {
    //     const withId = {...transaction, id: id};
    //     await dispatch(updateTransaction(withId));
    //   }
    // }
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