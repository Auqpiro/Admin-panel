import PropTypes from 'prop-types';
import { Pagination, Form, Dropdown, Stack } from "react-bootstrap";

function PaginationTable({ onSwitch, params}) {
  const { count, active, perPage } = params;
  
  const paginationItems = [];
  for(let num = 1; num <= count; num += 1) {
    paginationItems.push(
      <Pagination.Item key={num} onClick={() => onSwitch({ perPage, active: num })} active={num === active} >
        {num}
      </Pagination.Item>
    );
  }

  return (
    <Stack direction="horizontal">
      <Pagination className="my-auto">
        <Pagination.First onClick={() => onSwitch({ perPage, active: 1 })} />
        <Pagination.Prev onClick={() => onSwitch((prev) => ({ perPage, active: (prev.active === 1 ? 1 : prev.active - 1) }))} />
        {paginationItems}
        <Pagination.Next onClick={() => onSwitch((prev) => ({ perPage, active: (prev.active === count ? count : prev.active + 1) }))} />
        <Pagination.Last onClick={() => onSwitch({ perPage, active: count })} />
      </Pagination>
      <Form.Label className="ms-auto me-2 my-auto">На странице</Form.Label>
      <Dropdown className="py-0" onSelect={(value) => onSwitch({ active, perPage: value })}>
        <Dropdown.Toggle>{perPage}</Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item eventKey={2}>{2}</Dropdown.Item>
          <Dropdown.Item eventKey={5}>{5}</Dropdown.Item>
          <Dropdown.Item eventKey={10}>{10}</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Stack>
  );
}

PaginationTable.propTypes = {
  onSwitch: PropTypes.func.isRequired,
  params: PropTypes.exact({
    count: PropTypes.number.isRequired,
    active: PropTypes.number.isRequired,
    perPage: PropTypes.number.isRequired,
  }).isRequired,
};

export default PaginationTable;