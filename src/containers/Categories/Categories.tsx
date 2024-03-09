import CategoryItem from '../../components/CategoryItem/CategoryItem';
import {useEffect, useState} from 'react';
import CategoryModal from '../../components/CategoryModal/CategoryModal';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {selectCategoriesList, selectCategoriesListLoading} from '../../store/categorySlice';
import {getCategoriesList} from '../../store/categoryThunk';
import Spinner from '../../components/Spinner/Spinner';

const Categories = () => {
  const dispatch = useAppDispatch();
  const categoryList = useAppSelector(selectCategoriesList);
  const loading = useAppSelector(selectCategoriesListLoading);
  const [show, setShow] = useState(false);

  useEffect(() => {
    dispatch(getCategoriesList());
  }, [dispatch]);

  const handleClose = () => {
    setShow(!show);
  };
  return (
    <>
      <div className='d-flex justify-content-between align-items-center my-3 mx-4'>
        <h2 className='m-0'>Categories</h2>
        <button className='btn btn-success' onClick={handleClose}>Add</button>
      </div>
      {loading
        ? <div className='d-flex justify-content-center'><Spinner/></div>
        : categoryList.length < 1 && !loading
          ? <div className="alert alert-danger mx-3 mt-3" role="alert">There is no transactions in Database!</div>
          : categoryList.map(category => {
            return <CategoryItem
              key={category.id}
              id={category.id}
              category={category.name}
              type={category.type}
            />;
          })
      }
      <CategoryModal show={show} handleClose={handleClose}/>
    </>
  );
};

export default Categories;