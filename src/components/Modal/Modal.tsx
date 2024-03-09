import React, {useEffect, useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {addNewTransaction, getTransactionsList, updateTransaction} from '../../store/transactionThunk';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {selectTransactionToUpdate} from '../../store/transactionSlice';

interface Props {
  id?: string
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
const AddEditModal: React.FC<Props> = ({id,handleClose, show, edit=false}) => {
  const dispatch = useAppDispatch();
  const trToUpdate = useAppSelector(selectTransactionToUpdate);
  const [transaction, setTransaction] = useState(initialTransaction);

  useEffect(() => {
    if (trToUpdate) {
      setTransaction(() => ({...trToUpdate}));
    } else {
      setTransaction(initialTransaction);
    }
  }, [trToUpdate]);

  const change = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const {name, value} = e.target;
    if (!edit) {
      setTransaction((prevState) => ({
        ...prevState,
        [name]: value,
        date: new Date().toISOString()
      }));
    } else {
      setTransaction((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };


  const onFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!edit) {
      await dispatch(addNewTransaction(transaction));
    } else {
      if (id) {
        const withId = {...transaction, id: id};
        await dispatch(updateTransaction(withId));
      }
    }
    dispatch(getTransactionsList());
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
              value={transaction.type}
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
              value={transaction.category}
              required
            >
              <option value=''>--Please select category--</option>
              <option>Food</option>
              <option>Drinks</option>
            </select>

            <label className='mt-3' htmlFor='amount'>Amount</label>
            <div className='d-flex align-items-center'>
              <input
                id="amount"
                type="number"
                name="amount"
                min={1}
                className="form-control mt-2 me-1"
                value={transaction.amount}
                onChange={change}
              />
              <strong>KGS</strong>
            </div>
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