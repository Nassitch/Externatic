import { Link } from "react-router-dom";
import axios from "axios";
import Input from "../../components/Inputs/Input";
import CheckboxCondition from "../../components/Inputs/CheckboxCondition";
import CompetenceSwitch from "../../components/Competence Switch/CompetenceSwitch";
import HeaderLongTitle from "../../components/Headers/HeaderLongTitle";
// import ButtonMaxi from "../../components/Boutons/ButtonMaxi";
import ErrorMsg from "../../components/Alertes Messages/ErrorMsg";
import AddSomething from "../../components/Add Something/AddSomething";
import Title from "../../components/Titles/Title";
import SuccesMsg from "../../components/Alertes Messages/SuccesMsg";
import { useGlobalContext } from "../../contexts/GlobalContext";
import { useSignContext } from "../../contexts/SignContext";
import "./login-signin.css";
import "../../components/Inputs/input.css";
import "../../components/Boutons/button-maxi.css";
import "../../components/Inputs/checkbox-conditions.css";

function SignIn() {
  const {
    errorMsg,
    setErrorMsg,
    succesMsg,
    setSuccesMsg,
    msgContent,
    setMsgContent,
    handleChange,
    handleCheckboxChange,
    navigate,
    emailRegex,
    passwordRegex,
  } = useGlobalContext();

  const { signIn, setSignIn } = useSignContext();

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   const formulaire = event.target;
  //   const valeurs = {};

  //   // Itérer à travers tous les éléments du formulaire
  //   for (let i = 0; i < formulaire.elements.length; i += 1) {
  //     const element = formulaire.elements[i];
  //     // Vérifier si l'élément est un champ de formulaire avec une valeur
  //     if (element.hasAttribute("data-competence") && element.checked) {
  //       if (valeurs.competences === undefined) {
  //         valeurs.competences = [];
  //       }
  //       valeurs.competences.push(element.value);
  //     } else if (element.type !== "submit" && element.value) {
  //       valeurs[element.name] = element.value;
  //     }
  //   }
  // };

  const handleSubmitSignIn = (event) => {
    event.preventDefault();
    if (
      signIn.email === "" ||
      signIn.password === "" ||
      signIn.password2 === "" ||
      signIn.lastname === "" ||
      signIn.firstname === "" ||
      signIn.phone === "" ||
      signIn.address === ""
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

      axios.post("http://localhost:3010/api/user/", signIn);

      setSignIn({
        email: "",
        password: "",
        password2: "",
        lastname: "",
        firstname: "",
        phone: "",
        address: "",
      });

      // console.log(signIn);

      // setUserConnected(true);

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

  return (
    <>
      <HeaderLongTitle textTitle="Création de votre compte" />
      <div className="container-page container-general-login">
        <h1>S'inscrire</h1>
        <div className="champs-form">
          <form>
            <Input
              titleInput="E-mail *"
              holderText="john.doe@externatic.fr"
              fieldName="email"
              typeInput="email"
              valueInput={signIn}
              handleChange={(event) => handleChange(setSignIn, "email", event)}
            />
            <Input
              titleInput="Mot de passe *"
              holderText="************"
              fieldName="password"
              typeInput="password"
              valueInput={signIn}
              handleChange={(event) =>
                handleChange(setSignIn, "password", event)
              }
            />
            <Input
              titleInput="Confirmer le mot de passe *"
              holderText="************"
              fieldName="password2"
              typeInput="password"
              valueInput={signIn}
              handleChange={(event) =>
                handleChange(setSignIn, "password2", event)
              }
            />
            <div className="container-page">
              <Title titleText="Vos coordonnées" />
              <Input
                titleInput="Nom *"
                holderText="Votre nom"
                fieldName="lastname"
                valueInput={signIn}
                handleChange={(event) =>
                  handleChange(setSignIn, "lastname", event)
                }
              />
              <Input
                titleInput="Prénom *"
                holderText="Votre prénom"
                fieldName="firstname"
                valueInput={signIn}
                handleChange={(event) =>
                  handleChange(setSignIn, "firstname", event)
                }
              />
              <Input
                titleInput="Téléphone *"
                holderText="Numéro de téléphone"
                fieldName="phone"
                typeInput="tel"
                valueInput={signIn}
                handleChange={(event) =>
                  handleChange(setSignIn, "phone", event)
                }
              />
              <Input
                titleInput="Addresse *"
                holderText="Adresse"
                fieldName="address"
                inputType="text"
                valueInput={signIn}
                handleChange={(event) =>
                  handleChange(setSignIn, "address", event)
                }
              />
              <div className="container-switch">
                <h2 className="label-champs"> Cochez vos compétences *</h2>
                <CompetenceSwitch
                  textCompetence="HTML"
                  valueInput={signIn}
                  handleChange={() => handleCheckboxChange(setSignIn, "html")}
                  fieldName="html"
                />
                <CompetenceSwitch
                  textCompetence="CSS"
                  valueInput={signIn}
                  handleChange={() => handleCheckboxChange(setSignIn, "css")}
                  fieldName="css"
                />
                <CompetenceSwitch
                  textCompetence="JAVASCRIPT"
                  valueInput={signIn}
                  fieldName="javascript"
                  handleChange={() =>
                    handleCheckboxChange(setSignIn, "javascript")
                  }
                />
                <CompetenceSwitch
                  textCompetence="ANGULAR"
                  valueInput={signIn}
                  fieldName="angular"
                  handleChange={() =>
                    handleCheckboxChange(setSignIn, "angular")
                  }
                />
                <CompetenceSwitch
                  textCompetence="REACT.JS"
                  valueInput={signIn}
                  fieldName="react"
                  handleChange={() => handleCheckboxChange(setSignIn, "react")}
                />
                <CompetenceSwitch
                  textCompetence="PHP"
                  valueInput={signIn}
                  fieldName="php"
                  handleChange={() => handleCheckboxChange(setSignIn, "php")}
                />
                <CompetenceSwitch
                  textCompetence="SYMPHONY"
                  valueInput={signIn}
                  fieldName="symphony"
                  handleChange={() =>
                    handleCheckboxChange(setSignIn, "symphony")
                  }
                />
                <CompetenceSwitch
                  textCompetence="GIT"
                  valueInput={signIn}
                  fieldName="git"
                  handleChange={() => handleCheckboxChange(setSignIn, "git")}
                />
                <CompetenceSwitch
                  textCompetence="GITHUB"
                  valueInput={signIn}
                  fieldName="github"
                  handleChange={() => handleCheckboxChange(setSignIn, "github")}
                />
                <CompetenceSwitch
                  textCompetence="TRELLO"
                  valueInput={signIn}
                  fieldName="trello"
                  handleChange={() => handleCheckboxChange(setSignIn, "trello")}
                />
                <AddSomething addDetail="Votre CV" />
              </div>
            </div>
            <CheckboxCondition
              textCondition="J'accepte les conditions d' *"
              valueInput={signIn}
              fieldName="cguAgree"
              handleChange={() => handleCheckboxChange(setSignIn, "cguAgree")}
            />
            {/* <a href="#">Externatic</a> */}
            <CheckboxCondition
              textCondition="Je veux créer ou télécharger mon cv maintenant !"
              valueInput={signIn}
              fieldName="addCvNow"
              handleChange={() => handleCheckboxChange(setSignIn, "addCvNow")}
            />
            <div>
              {errorMsg && <ErrorMsg message={msgContent} />}
              {succesMsg && <SuccesMsg message={msgContent} />}
            </div>
            <button type="button" onClick={handleSubmitSignIn}>
              soumettre
            </button>
            {/* <ButtonMaxi textBtn="S'inscrire" clickFunc={handleSubmitSignIn} /> */}
          </form>
        </div>
        <div className="small-paragraphe-info">
          <p>
            Vous avez déjà un compte ?
            <Link to="/login">
              <span>Connectez-vous</span>
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
export default SignIn;
