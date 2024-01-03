import { useState, createContext, useContext, useMemo, useEffect } from "react";
import PropTypes from "prop-types";
import { v4 as uuid } from "uuid";
import { useGlobalContext } from "./GlobalContext";

const UserContext = createContext();

function UserContextProvider({ children }) {
  const { saveItemInLS, setErrorMsg, setSuccesMsg, setMsgContent } =
    useGlobalContext();

  const [addXp, setAddXp] = useState({
    id: uuid(),
    title: "",
    company: "",
    city: "",
    contract: "",
    isWorking: false,
    dateBegin: "",
    dateEnd: "",
    description: "",
  });
  const [xpSaved, setXpSaved] = useState([]);

  const [addCv, setAddCv] = useState({
    id: uuid(),
    title: "",
    lastName: "",
    firstName: "",
    email: "",
    number: "",
    adress: "",
  });
  const [cvSaved, setCvSaved] = useState([]);

  const handleAddXp = (event) => {
    if (
      addXp.title === "" ||
      addXp.company === "" ||
      addXp.city === "" ||
      addXp.contract === "" ||
      addXp.description === ""
    ) {
      setErrorMsg(true);
      setMsgContent("Veuillez remplir tous les champs");
      setTimeout(() => {
        setErrorMsg(false);
      }, 4000);
    }
    if (
      addXp.isWorking === false &&
      (addXp.dateEnd === "" || addXp.dateBeggin === "")
    ) {
      setErrorMsg(true);
      setMsgContent("Veuillez renseigner les dates");
      setTimeout(() => {
        setErrorMsg(false);
      }, 4000);
    }
    if (addXp.isWorking === true && addXp.dateBeggin === "") {
      setErrorMsg(true);
      setMsgContent("Veuillez renseigner les dates");
      setTimeout(() => {
        setErrorMsg(false);
      }, 4000);
    } else {
      event.preventDefault();
      setXpSaved((prevData) => [...prevData, addXp]);
      setMsgContent("L'expérience a été ajoutée avec");
      setSuccesMsg(true);
      setTimeout(() => {
        setSuccesMsg(true);
      }, 4000);
      saveItemInLS("Experience", xpSaved);
    }
  };

  const handleAddCv = (event) => {
    if (
      addXp.title === "" ||
      addXp.lastName === "" ||
      addXp.firstName === "" ||
      addXp.email === "" ||
      addXp.number === "" ||
      addXp.adress === ""
    ) {
      setErrorMsg(true);
      setMsgContent("Veuillez remplir tous les champs");
      setTimeout(() => {
        setErrorMsg(false);
      }, 4000);
    } else {
      event.preventDefault();
      setCvSaved((prevData) => [...prevData, addCv]);
      setMsgContent("L'expérience a été ajoutée avec");
      setSuccesMsg(true);
      setTimeout(() => {
        setSuccesMsg(false);
      }, 4000);
      saveItemInLS("CV", cvSaved);
    }
  };

  useEffect(() => {}, [xpSaved]);

  const [addCourse, setAddCourse] = useState({
    id: uuid(),
    level: "",
    domaine: "",
    name: "",
    dateBegin: "",
    dateEnd: "",
    description: "",
  });
  const [courseSaved, setCourseSaved] = useState([]);

  const handleAddCourse = (event) => {
    if (
      addCourse.domaine === "" ||
      addCourse.name === "" ||
      addCourse.description === "" ||
      addCourse.level === "" ||
      addCourse.dateBegin === "" ||
      addCourse.dateEnd === ""
    ) {
      setErrorMsg(true);
      setMsgContent("Veuillez remplir tous les champs");
      setTimeout(() => {
        setErrorMsg(false);
      }, 4000);
    } else if (
      addCourse.level === "Sélectionnez un niveau" ||
      addCourse.level === null
    ) {
      setErrorMsg(true);
      setMsgContent("Veuillez sélectionner un niveau valide");
      setTimeout(() => {
        setErrorMsg(false);
      }, 4000);
    } else {
      event.preventDefault();
      setCourseSaved((prevData) => [...prevData, addCourse]);
      setMsgContent("La formation a été ajoutée avec succès");
      setSuccesMsg(true);
      setTimeout(() => {
        setSuccesMsg(false);
      }, 4000);
      saveItemInLS("Formation", courseSaved);
    }
  };

  useEffect(() => {}, [courseSaved]);

  const userContextValues = useMemo(
    () => ({
      addXp,
      setAddXp,
      xpSaved,
      setXpSaved,
      handleAddXp,
      addCourse,
      setAddCourse,
      courseSaved,
      setCourseSaved,
      handleAddCourse,
      addCv,
      setAddCv,
      handleAddCv,
    }),
    [
      addXp,
      setAddXp,
      xpSaved,
      setXpSaved,
      handleAddXp,
      addCourse,
      setAddCourse,
      courseSaved,
      setCourseSaved,
      handleAddCourse,
      addCv,
      handleAddXp,
      setAddCv,
      handleAddCv,
    ]
  );

  return (
    <UserContext.Provider value={userContextValues}>
      {children}
    </UserContext.Provider>
  );
}

UserContextProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default UserContextProvider;
export const useUserContext = () => useContext(UserContext);
