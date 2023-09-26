import PropTypes from 'prop-types';
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Button, CloseButton, Dropdown, Form, InputGroup, OverlayTrigger, Popover, Stack } from "react-bootstrap";

function Filter({ values }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQueryParam = searchParams.get("search");
  const typeQueryParam = searchParams.get("type");
  const tagQueryParam = searchParams.get("tag");

  const { types, tags } = values;
  const [tagSearchStr, setTagSearchStr] = useState("");
  const filteredTags = tags.filter((tag) => tagSearchStr ? tag.label.toLowerCase().includes(tagSearchStr.toLowerCase()) : true)
  
  const [isShow, setShowPopover] = useState(false);
  
  const [search, setSearch] = useState(searchQueryParam || "");
  const [type, setType] = useState(typeQueryParam);
  const [tag, setTag] = useState(tagQueryParam);
  

  useEffect(() => {
    const timer = setTimeout(() => {
      if (search) {
        setSearchParams((prev) => {
          const newParams = prev;
          newParams.set("search", search);
          return newParams;
        }, { replace: true });
      } else {
        setSearchParams((prev) => {
          const newParams = prev;
          newParams.delete("search");
          return newParams;
        }, { replace: true });
      }
    }, 350);
    return () => clearTimeout(timer);
  }, [search, setSearchParams]);

  const handlerApplyFilterParams = () => {
    setSearchParams((prev) => {
      const newParams = prev;
      if (type) newParams.set("type", type);
      if (tag) newParams.set("tag", tag);
      console.log(newParams);
      return newParams;
    });
  };

  const handlerResetFilterParams = () => {
    setSearchParams((prev) => {
      const newParams = prev;
      newParams.delete("type");
      newParams.delete("tag");
      return newParams;
    }, { replace: true });
    setType("");
    setTag("");
  };

  return (
    <InputGroup>
      <Button>Search</Button>
      <Form.Control
        type="text"
        value={search}
        onFocus={() => setShowPopover(false)}
        onChange={(e) => setSearch(e.target.value)}
      />
      <OverlayTrigger
        trigger="click"
        placement="bottom-end"
        defaultShow="false"
        show={isShow}
        overlay={
          <Popover>
            <Popover.Header>
              <Stack direction="horizontal" gap={3}>
                <h5>Фильтры</h5>
                <CloseButton className="ms-auto" onClick={() => setShowPopover(false)}/>
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
                <Dropdown
                  onSelect={(value) => {
                    setTag(value);
                    setTagSearchStr("");
                  }}
                >
                  <Dropdown.Toggle>{tag}</Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Form.Control type="text" value={tagSearchStr} onChange={(e) => setTagSearchStr(e.target.value)}/>
                    <hr />
                    {filteredTags
                      ? filteredTags.map(({ label }) => <Dropdown.Item key={label} eventKey={label}>{label}</Dropdown.Item>)
                      : <p>не найдено</p>
                    }
                  </Dropdown.Menu>
                </Dropdown>
              </Form.Group>
            </Popover.Header>
            <Popover.Body>
              <Button className="mx-1" variant="primary" onClick={handlerApplyFilterParams}>Применить</Button>
              <Button className="mx-1" variant="secondary" onClick={handlerResetFilterParams}>Сбросить</Button>
            </Popover.Body>
          </Popover>
        }
      >
        <Button onClick={() => setShowPopover((openState) => !openState)}>Filter</Button>
      </OverlayTrigger>
    </InputGroup>
  );
}

Filter.propTypes = {
  values: PropTypes.exact({
    types: PropTypes.array.isRequired,
    tags: PropTypes.array.isRequired,
  }).isRequired,
};

export default Filter;