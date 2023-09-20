import { Pagination, Form, Dropdown, Stack } from "react-bootstrap";

function PaginationTable({ onSwitch, count, params}) {
  if (params.active > count) {
    onSwitch({ ...params, active: 1 });
  }
  const paginationItems = [];
  for(let num = 1; num <= count; num += 1) {
    paginationItems.push(
      <Pagination.Item key={num} onClick={() => onSwitch({ ...params, active: num })} active={num === params.active} >
        {num}
      </Pagination.Item>
    );
  }

  return (
    <Stack direction="horizontal">
      <Pagination className="my-auto">
        <Pagination.First onClick={() => onSwitch({ ...params, active: 1 })} />
        <Pagination.Prev onClick={() => onSwitch((prev) => ({ ...params, active: (prev.active === 1 ? 1 : prev.active - 1) }))} />
        {paginationItems}
        <Pagination.Next onClick={() => onSwitch((prev) => ({ ...params, active: (prev.active === count ? count : prev.active + 1) }))} />
        <Pagination.Last onClick={() => onSwitch({ ...params, active: count })} />
      </Pagination>
      {/* <Form.Group className="ms-auto"> */}
        <Form.Label className="ms-auto me-2 my-auto">На странице</Form.Label>
        <Dropdown className="py-0" onSelect={(value) => onSwitch({ ...params, perPage: value })}>
          <Dropdown.Toggle>{params.perPage}</Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item eventKey={2}>{2}</Dropdown.Item>
            <Dropdown.Item eventKey={5}>{5}</Dropdown.Item>
            <Dropdown.Item eventKey={10}>{10}</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      {/* </Form.Group> */}
    </Stack>
  );
}

export default PaginationTable;