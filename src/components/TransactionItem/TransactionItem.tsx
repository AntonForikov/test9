import React, {useState} from 'react';
import Modal from '../Modal/Modal';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {deleteTransaction, getTransactionById} from '../../store/transactionThunk';
import {clearTransactionToUpdate, selectDeleteButtonDisabler} from '../../store/transactionSlice';

interface Props {
  id: string
  date: string
  amount: number
  category: string
  type: string
}
const TransactionItem: React.FC<Props> = ({ id, date, amount,  category, type }) => {
  const dispatch = useAppDispatch();
  const deleteDisabler = useAppSelector(selectDeleteButtonDisabler);
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(!show);
    dispatch(clearTransactionToUpdate());
  };

  const edit = async () => {
    await dispatch(getTransactionById(id));
    setShow(true);
  };

  const onDelete = async () => {
    const confirmation = confirm('Are you sure?');
    if (confirmation) await dispatch(deleteTransaction(id));
  };
  return (
    <div className="d-flex justify-content-between align-items-center border rounded m-3">
      <div className="d-flex align-items-center">
        <h4 className="m-0 ms-3 me-4">{date}</h4>
        <h3 className='m-0 ms-5'>{category}</h3>
      </div>
      <div className="d-flex align-items-center me-3">
        <h4 className={type === 'Expense' ? 'm-0 text-danger' : 'm-0 text-success'}>
          {type === 'Expense'? `-${amount}` : `+${amount}`} KGS
        </h4>
        <button className="btn btn-primary mx-3" onClick={edit}>Edit</button>
        <button className="btn btn-danger my-2" onClick={onDelete} disabled={id === deleteDisabler}>Delete</button>
      </div>
      <Modal handleClose={handleClose} show={show} edit={true} id={id}/>
    </div>
  );
};

export default TransactionItem;