import ReactPaginate from 'react-paginate';
import './styles.css';

type Props = {
  forcePage: number;
  pageCount: number;
  range: number;
  onChange?: (pageNumber: number) => void;
}

const Pagination = ({ pageCount, range, onChange, forcePage }: Props) => {

  return (
    <ReactPaginate
      forcePage={forcePage}
      pageCount={pageCount}
      pageRangeDisplayed={range}
      marginPagesDisplayed={1}
      containerClassName="pagination-container list-unstyled"
      pageLinkClassName="pagination-item"
      breakClassName='paginarion-item'
      previousLabel={<i className="bi bi-chevron-left"></i>}
      nextLabel={<i className="bi bi-chevron-right"></i>}
      activeLinkClassName="pagination-link-active"
      disabledClassName='inactive-arrow'
      onPageChange={(items) => onChange ? onChange(items.selected) : {}}
    />
  );
}

export default Pagination;
