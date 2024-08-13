import { useState } from "react";
import { Dropdown } from "react-bootstrap";

export function StatusFilter({ setStatusUsedForFilter }) {
  const [status, setStatus] = useState("all");

  const dropDownSelect = (status) => {
    setStatus(status);
    setStatusUsedForFilter(status);
  };

  const dropDownAll = () => {
    setStatus("all");
    setStatusUsedForFilter(null);
  };

  return (
    <div className="d-flex justify-content-around align-items-center my-1">
      <label className="text-primary px-2 mx-2">Status Filter : </label>
      <Dropdown>
        <Dropdown.Toggle variant="primary" id="dropdown-basic">
          {status}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item key="active" href="#" onClick={() => dropDownSelect("active")}>
            active
          </Dropdown.Item>{" "}
          <Dropdown.Item key="inactive" href="#" onClick={() => dropDownSelect("inactive")}>
            inactive
          </Dropdown.Item>
          <Dropdown.Item key="all" href="#" onClick={() => dropDownAll(null)}>
            all
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}
