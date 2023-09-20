import { Badge, Stack, Table } from "react-bootstrap";

const tableHeaders = [
  "Название",
  "Тип",
  "Разположение",
  "Орг.единица",
  "Инв.номер",
  "Теги",
  "Дата создания",
  "Дата обновления",
  "Дата аудита"
];

function TableItems({ items }) {
  return (
    <Table className="overflow-auto">
      <thead>
        <tr>
          {tableHeaders.map((th, ind) => (
            <th key={ind}>{th}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.type && (<Badge bg="primary">{item.type}</Badge>)}</td>
              <td>{item.location}</td>
              <td>{item.office}</td>
              <td>{item.assetTag}</td>
              <td>
                <Stack>
                  {item.tags.map(({ label, color }, ind) => (
                    <Badge bg={color} key={ind}>{label}</Badge>
                  ))}
                </Stack>
              </td>
              <td>{item.createDate && (new Date(Date.parse(item.createDate)).toLocaleString())}</td>
              <td>{item.updateDate && (new Date(Date.parse(item.updateDate)).toLocaleString())}</td>
              <td>{item.auditDate && (new Date(Date.parse(item.auditDate)).toLocaleString())}</td>
            </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default TableItems;