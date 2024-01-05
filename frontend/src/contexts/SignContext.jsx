import PropTypes from "prop-types";
import { useState, createContext, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useGlobalContext } from "./GlobalContext";

const SignContext = createContext();

function SignContextProvider({ children }) {
  const { setErrorMsg, setSuccesMsg, setMsgContent, handleCheckboxChange } =
    useGlobalContext();

  const [signIn, setSignIn] = useState({
    id: uuid(),
    userName: "",
    email: "",
    password: "",
    password2: "",
    cguAgree: false,
    addCvNow: false,
  });
  const [userConnected, setUserConnected] = useState(false);
  const [userSaved, setUserSaved] = useState([]);
  const navigate = useNavigate();
  // const [storageData, setStorageData] = useState([]);

  // Enregistrement dans le "Local Storage".
  const saveUser = async (newUser) => {
    try {
      const { data } = await axios.post(
        `http://localhost:3310/api/signin`,
        newUser
      );
      localStorage.setItem("token", data.token);
      const tokenData = jwtDecode(data.token);
      setUserSaved(
        await axios.post("http://localhost:3310/api/users", newUser)
      );
      setSuccesMsg(true);
      setMsgContent(`Bienvenue, connexion avec ${tokenData.firstname}`);
      setTimeout(() => {
        setSuccesMsg(false);
        navigate("/");
      }, 3000);
    } catch (err) {
      setErrorMsg(true);
      setMsgContent("Identifiants non valides.");
      setTimeout(() => {
        setErrorMsg(false);
      }, 4000);
    }
  };

  const emailRegex = /[a-z0-9._]+@[a-z0-9-]+\.[a-z]{2,3}/;
  const passwordRegex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const handleSubmitSignIn = (event) => {
    if (
      signIn.userName === "" ||
      signIn.email === "" ||
      signIn.password === "" ||
      signIn.password2 === ""
    ) {
      setErrorMsg(true);
      setMsgContent("Champs non remplis");
      setTimeout(() => {
        setErrorMsg(false);
      }, 4000);
    } else if (!emailRegex.test(signIn.email)) {
      setErrorMsg(true);
      setMsgContent("L'adresse mail n'est pas correcte");
      setTimeout(() => {
        setErrorMsg(false);
      }, 4000);
    } else if (signIn.password.length < 8) {
      setErrorMsg(true);
      setMsgContent("Le mot de passe n'est pas assez long");
      setTimeout(() => {
        setErrorMsg(false);
      }, 4000);
    } else if (!passwordRegex.test(signIn.password)) {
      setErrorMsg(true);
      setMsgContent(
        "Le mot de passe doit contenir au moins : 1 majuscule, 1 minuscule, 1 chiffre, 1 caractère spéciale(@$!%*?&)"
      );
      setTimeout(() => {
        setErrorMsg(false);
      }, 6000);
    } else if (signIn.password !== signIn.password2) {
      setErrorMsg(true);
      setMsgContent("Les mots de passes ne sont pas identiques");
      setTimeout(() => {
        setErrorMsg(false);
      }, 4000);
    } else if (signIn.cguAgree === false) {
      setErrorMsg(true);
      setMsgContent("Vous n'avez pas validé les conditions générales");
      setTimeout(() => {
        setErrorMsg(false);
      }, 4000);
    } else {
      setSuccesMsg(true);
      setMsgContent("Compte créé avec");
      setTimeout(() => {
        setSuccesMsg(false);
      }, 2000);

      event.preventDefault();
      setUserSaved((prevData) => [...prevData, signIn]);
      // Réinitialise les valeurs d'input à vide.
      setSignIn({
        userName: "",
        email: "",
        password: "",
        password2: "",
      });

      setUserConnected(true);
      saveUser();

      if (signIn.addCvNow === true) {
        setTimeout(() => {
          navigate("/edit-profile/cv");
        }, 2000);
      } else {
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    }
  };

  const contextValues = useMemo(
    () => ({
      signIn,
      setSignIn,
      handleSubmitSignIn,
      userSaved,
      setUserSaved,
      handleCheckboxChange,
      userConnected,
    }),
    [
      signIn,
      setSignIn,
      handleSubmitSignIn,
      userSaved,
      setUserSaved,
      handleCheckboxChange,
      userConnected,
    ]
  );

  return (
    <SignContext.Provider value={contextValues}>
      {children}
    </SignContext.Provider>
  );
}

SignContextProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default SignContextProvider;
export const useSignContext = () => useContext(SignContext);
