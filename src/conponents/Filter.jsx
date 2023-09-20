import { useEffect, useState } from "react";
import { Button, CloseButton, Dropdown, Form, InputGroup, OverlayTrigger, Popover, Stack } from "react-bootstrap";

function Filter({ onFilter, values, params }) {
  const { types, tags } = values;

  const [isFilterOpen, setOpenFilter] = useState(false);
  
  const [type, setType] = useState(params.type);
  const [tag, setTag] = useState(params.tag);
  const [filterTag, setFilterTag] = useState("");
  const [search, setSearch] = useState(params.search);

  useEffect(() => {
    const timer = setTimeout(() => {
      onFilter({...params, search: search });
    }, 300);
    return () => clearTimeout(timer);
  }, [search, params, onFilter]);

  const handlerFilter = () => {
    onFilter({
      ...params,
      type: type,
      tag: tag,
    });
  };

  const handlerReset = () => {
    onFilter({
      ...params,
      type: "",
      tag: "",
    });
    setType("");
    setTag("");
  };

  return (
    <InputGroup>
      <Button>Search</Button>
      <Form.Control type="text" value={search} onFocus={() => setOpenFilter(false)} onChange={(e) => setSearch(e.target.value)}/>
      <OverlayTrigger
        trigger="click"
        placement="bottom-end"
        defaultShow="false"
        show={isFilterOpen}
        overlay={
          <Popover>
            <Popover.Header>
              <Stack direction="horizontal" gap={3}>
                <h5>Фильтры</h5>
                <CloseButton className="ms-auto" onClick={() => setOpenFilter(!isFilterOpen)}/>
              </Stack>
              <Form.Group className="mt-1">
                <Form.Label className="me-3">Тип ПК</Form.Label>
                <Dropdown onSelect={(value) => setType(value)}>
                  <Dropdown.Toggle>{type}</Dropdown.Toggle>
                  <Dropdown.Menu>
                    {
                      types.map((type) => (
                        <Dropdown.Item key={type} eventKey={type}>{type}</Dropdown.Item>
                      ))
                    }
                  </Dropdown.Menu>
                </Dropdown>
              </Form.Group>
              <Form.Group className="my-2 w-100">
                <Form.Label className="me-3">Теги</Form.Label>
                <Dropdown onSelect={(value) => {
                    setTag(value);
                    setFilterTag("");
                  }}
                >
                  <Dropdown.Toggle>{tag}</Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Form.Control type="text" value={filterTag} onChange={(e) => setFilterTag(e.target.value)}/>
                    <hr />
                    {
                      tags.filter((tag) => filterTag.length ? tag.label.toLowerCase().includes(filterTag.toLowerCase()) : true)
                        .map((tag) => (
                          <Dropdown.Item key={tag.label} eventKey={tag.label}>{tag.label}</Dropdown.Item>
                      ))
                    }
                  </Dropdown.Menu>
                </Dropdown>
              </Form.Group>
            </Popover.Header>
            <Popover.Body>
              <Button className="mx-1" variant="primary" onClick={handlerFilter}>Применить</Button>
              <Button className="mx-1" variant="secondary" onClick={handlerReset}>Сбросить</Button>
            </Popover.Body>
          </Popover>
        }
      >
        <Button onClick={() => setOpenFilter(!isFilterOpen)}>Filter</Button>
      </OverlayTrigger>
    </InputGroup>
  );
}

export default Filter;