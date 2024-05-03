import ProjectTables from "../../components/dashboard/ProjectTable";
import { Row, Col } from "reactstrap";

const TabelUser = () => {
  return (
    <Row>
      <Col lg="12">
        <ProjectTables />
      </Col>
    </Row>
  );
};

export default TabelUser;
