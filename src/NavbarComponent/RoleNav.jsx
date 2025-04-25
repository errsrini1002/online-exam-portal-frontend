import AdminHeader from "./AdminHeader";
import HeaderStudent from "./HeaderStudent";
import HeaderEmployee from "./HeaderStudent";
import HeaderTeacher from "./HeaderTeacher";
import HeaderEmployer from "./HeaderTeacher";
import NormalHeader from "./NormalHeader";
import HeaderCustomer from "./HeaderCustomer";
import HeaderDirector from "./HeaderDirector";

const RoleNav = () => {
  const teacher = JSON.parse(sessionStorage.getItem("active-teacher"));
  const admin = JSON.parse(sessionStorage.getItem("active-admin"));
  const student = JSON.parse(sessionStorage.getItem("active-student"));
  const customer = JSON.parse(sessionStorage.getItem("active-customer"));
  const director = JSON.parse(sessionStorage.getItem("active-director"));


  if (teacher != null) {
    return <HeaderTeacher />;
  } else if (admin != null) {
    return <AdminHeader />;
  } else if (student != null) {
    return <HeaderStudent />;
  } else if (customer != null) {
    return <HeaderCustomer />;
  } else if (director != null) {
    return <HeaderDirector />;
  } 
  else {
    return <NormalHeader />;
  }
};

export default RoleNav;
