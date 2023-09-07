import "./App.css";
import Admin from "./Admin";
import Guest from "./Guest";
import User from "./User";
import { useContext } from "react";
import { GlobalContext } from "./Context/context";
import { decodeToken } from "react-jwt";

export const AppRoute = "http://localhost:2121/";

const componentByRoles = {
  admin: Admin,
  guest: Guest,
  user: User,
};

const getUserRole = (params) =>
  componentByRoles[params] || componentByRoles["guest"];
// const getDecodeToken = (token) => decodeToken(token) || null;
export default function App() {
  const { state, dispatch } = useContext(GlobalContext);
  // console.log(state.token);
  const decodeUser = (token) => {
    if (!token) {
      return undefined;
    } else {
      const res = decodeToken(token);
      return res?.role;
    }
  };

  // const [role, setRole] = useState("admin");
  const currentToken = decodeUser(state.token);
  const CurrentUser = getUserRole(currentToken);
  return <CurrentUser />;
}
