import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {addNewTransaction} from '../../store/transactionThunk';
import {useAppDispatch} from '../../app/hooks';

interface Props {
  show: boolean
  handleClose: () => void
  edit?: boolean
}

const initialTransaction = {
  type: '',
  category: '',
  amount: 0,
  date: ''
};
const AddEditModal: React.FC<Props> = ({handleClose, show, edit=false}) => {
  const dispatch = useAppDispatch();
  const [transaction, setTransaction] = useState(initialTransaction);

  const change = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const {name, value} = e.target;
    setTransaction((prevState) => ({
      ...prevState,
      [name]: value,
      date: new Date().toISOString()
    }));
  };

  const onFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(addNewTransaction(transaction));
    handleClose();
    setTransaction(initialTransaction);
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

            <label className="mt-3" htmlFor='category'>Category</label>
            <select
              className="form-control mt-2"
              name="category"
              id="category"
              onChange={change}
              required
            >
              <option value=''>--Please select category--</option>
              <option>Food</option>
              <option>Drinks</option>
            </select>

            <label className='mt-3' htmlFor='amount'>Amount</label>
            <input
              id='amount'
              type='number'
              name='amount'
              min={1}
              className='form-control mt-2'
              value={transaction.amount}
              onChange={change}
            />
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button type='submit' variant="primary">
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