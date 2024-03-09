import TransactionItem from '../../components/TransactionItem/TransactionItem';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {selectTransactionsList, selectTransactionsListLoading} from '../../store/transactionSlice';
import {useEffect} from 'react';
import {getTransactionsList} from '../../store/transactionThunk';
import Spinner from '../../components/Spinner/Spinner';
import {getCategoriesList} from '../../store/categoryThunk';

const Home = () => {
  const dispatch = useAppDispatch();
  const transactionsList = useAppSelector(selectTransactionsList);
  const transactionsLoading = useAppSelector(selectTransactionsListLoading);

  useEffect( () => {
   dispatch(getTransactionsList());
   dispatch(getCategoriesList());
  }, [dispatch]);

  const total = transactionsList.reduce((acc, transaction) => {
    const parser = parseInt(String(transaction.amount));
    if (transaction.type === 'Expense') {
      return acc - parser;
    } else {
      return acc + parser;
    }
  }, 0);

  return (
    <div>
      <h3 className='m-3 p-2 border rounded d-inline-block'>Total: {total}</h3>
      {transactionsLoading
        ? <div className='d-flex justify-content-center'><Spinner/></div>
        : transactionsList.length < 1 && !transactionsLoading
          ? <div className="alert alert-danger mx-3 mt-3" role="alert">There is no transactions in Database!</div>
          : transactionsList.map(transaction => {
            return <TransactionItem
              key={transaction.id}
              id={transaction.id}
              date={transaction.date}
              amount={transaction.amount}
              category={transaction.category}
              type={transaction.type}
            />;
          })
      }
    </div>
  );
};

export default Home;