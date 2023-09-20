import axios from "axios";
import { Suspense } from "react";
import { Spinner } from "react-bootstrap";
import { Await, defer, useLoaderData } from "react-router-dom";
import TableContainer from "../conponents/TableContainer";

function Servers() {
  const { items } = useLoaderData();

  return (
    <>
      <h2>Серверы и ПК</h2>
      
      <Suspense fallback={<Spinner animation="border" />}>
        <Await resolve={items}>
          {
            (resolvedItems) => <TableContainer items={resolvedItems}/>
          }
        </Await>
      </Suspense>
    </>
  );
}

const getItems = async () => {
  const { data } = await axios.get('http://localhost:3001/items');
  return data;
};

const itemsLoader = async () => {
  return defer({
    items: getItems(),
  })
};

export default Servers;
export { itemsLoader };
