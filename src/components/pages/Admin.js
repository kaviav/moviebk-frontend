import { useDispatch } from "react-redux";
import { sendAdminAuthRequest } from "../../api-helpers/api-helpers";
import AuthForm from "../AuthForm";
import { adminActions } from "../../store";
import { useNavigate } from "react-router";

const Admin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onResReceived = (data) => {
    console.log(data);
    dispatch(adminActions.login());
    localStorage.setItem("adminId", data.id);
    localStorage.setItem("token", data.token);
    navigate("/");
  };
  //
  const getData = (data) => {
    // console.log(data);
    sendAdminAuthRequest(data.inputs)
      .then(onResReceived)
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <AuthForm onSubmit={getData} isAdmin={true} />
    </div>
  );
};
export default Admin;
