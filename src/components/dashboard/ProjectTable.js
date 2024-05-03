import React from 'react';
import { Row, Col } from "reactstrap";
import UserList from "../../views/ui/user/UserList"; // Import komponen UserList langsung

const ProjectTables = () => {
  return (
    <Row>
      <Col lg="12">
        <UserList /> {/* Gunakan komponen UserList di sini */}
      </Col>
    </Row>
  );
};

export default ProjectTables;
