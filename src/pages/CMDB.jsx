import { Breadcrumb } from "react-bootstrap";
import { Outlet } from "react-router-dom";

export function CMDB() {
  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item>CMDB</Breadcrumb.Item>
        <Breadcrumb.Item active>Серверы и ПК</Breadcrumb.Item>
      </Breadcrumb>
      <Outlet />
    </>
  );
}
