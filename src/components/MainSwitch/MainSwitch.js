import { useSelector } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";
import {
  AddUserPannel,
  ContactViev,
  HaveTransport,
  NeedTransport,
  StartViev,
} from "../../templates";
import { MyItems } from "../../components";

const MainSwitch = () => {
  const cookie = useSelector((store) => store.cookie[0]);
  const user = useSelector((store) => store.user);
  const localStorage = useSelector(
    (store) => store.localStorage[0].storageData
  );
  return (
    <>
      <Routes>
        <Route exact path="/" element={<StartViev />} />
        <Route exact path="/add-user" element={<AddUserPannel />} />
        <Route exact path="/have-transport" element={<HaveTransport />} />
        <Route exact path="/need-transport" element={<NeedTransport />} />
        <Route exact path="/contact" element={<ContactViev />} />

        {user.length || cookie.isCookie || localStorage ? (
          <Route exact path="/my-items" element={<MyItems />} />
        ) : (
          <Route exact path="/" element={<StartViev />} />
        )}

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
};
export default MainSwitch;
