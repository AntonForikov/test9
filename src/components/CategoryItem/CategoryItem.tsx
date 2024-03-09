import React from 'react';
// import Modal from '../Modal/Modal';

interface Props {
  id: string,
  category: string,
  type: string
}

const CategoryItem: React.FC<Props> = ({id, category, type}) => {
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
          <button className="btn btn-primary mx-3" >Edit</button>
          <button className="btn btn-danger my-2">Delete</button>
        </div>
        {/*<Modal handleClose={handleClose} show={show} edit={true} id={id}/>*/}
      </div>
    </div>
  );
};

export default CategoryItem;