import { Suspense } from "react";
import { Spinner } from "react-bootstrap";
import { Await, useLoaderData } from "react-router-dom";
import TableContainer from "../conponents/TableContainer";

export function Servers() {
  const { items } = useLoaderData();

  return (
    <>
      <h2>Серверы и ПК</h2>
      
      <Suspense fallback={<Spinner animation="border" />}>
        <Await
          resolve={items}
          errorElement={<h2>Ошибка загрузки!</h2>}
        >
          {
            (resolvedItems) => <TableContainer items={resolvedItems}/>
          }
        </Await>
      </Suspense>
    </>
  );
}
