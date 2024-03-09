import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

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
}
const AddEditModal: React.FC<Props> = ({handleClose, show, edit=false}) => {
  const [transaction, setTransaction] = useState(initialTransaction);

  const change = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const {name, value} = e.target;
    setTransaction((prevState) => ({
      ...prevState,
      [name]: value
    }))
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>{edit ? 'Edit Expense/Income' : 'Add Expense/Income'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <label htmlFor='type'>Type</label>
            <select
              className='form-control mt-2'
              name='type'
              id='type'
              onChange={change}
            >
              <option>Expense</option>
              <option>Income</option>
            </select>

            <label className='mt-3' htmlFor='category'>Category</label>
            <select
              className='form-control mt-2'
              name='category'
              id='category'
              onChange={change}
            >
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
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddEditModal;