import { HashRouter as Router } from "react-router-dom";
import { Fragment } from "react";
import { MainSwitch, TaskInformation } from "./components";
import { Header } from "./templates";

const App = () => {
  return (
    <Router>
      <Header />
      <Fragment>
        <MainSwitch />
      </Fragment>
      {/* <Spinner /> */}
      <TaskInformation />
    </Router>
  );
};

export default App;
