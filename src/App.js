import { HashRouter as Router } from "react-router-dom";
import { Fragment } from "react";
import { MainSwitch, TaskInformation, TopArrow, Spinner } from "./components";
import { Header, Footer } from "./templates";

const App = () => {
  return (
    <Router>
      <Header />
      <Fragment>
        <MainSwitch />
      </Fragment>
      <Footer />
      <Spinner />
      <TaskInformation />
      <TopArrow />
    </Router>
  );
};

export default App;
