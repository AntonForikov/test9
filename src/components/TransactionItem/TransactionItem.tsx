import React from 'react';
import {Link} from 'react-router-dom';

interface Props {
  id: string
  date: string
  amount: number
  category: string
  type: string
}
const TransactionItem: React.FC<Props> = ({ id, date, amount,  category, type }) => {
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
        <Link to={`/admin/edit/${id}`} className="btn btn-primary mx-3">Edit</Link>
        <button className="btn btn-danger my-2">Delete</button>
      </div>
    </div>
  );
};

export default TransactionItem;