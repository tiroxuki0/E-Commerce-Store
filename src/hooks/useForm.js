import { useDispatch } from "react-redux";
import axios from "axios";
import { Buffer } from "buffer";
import {
  toggleForm as toggleFormRedux,
  setFormUserInfo as setFormUserInfoRedux,
  signUpStart,
  signUpEnd,
} from "../redux/commonSlice";
import useToast from "./useToast";
import {
  firebaseCreateNewAccount,
  firebaseNormalSignIn,
  addDocument,
} from "../firebase/service";
import { ref, get, child } from "firebase/database";
import { db } from "../firebase/config";

const useForm = () => {
  const dispatch = useDispatch();
  const { notify } = useToast();

  // handling form-submission
  const handleFormSubmit = async (values) => {
    try {
      const { confirm, ...others } = values;
      if (values.confirm) {
        const result = await firebaseCreateNewAccount({
          email: values.email,
          password: values.password,
        });
        if (result.code === 0) {
          notify("error", `Your email is already exist!`);
        } else {
          const { uid } = result.user;
          dispatch(signUpStart());
          axios
            .get(`https://api.multiavatar.com/${uid}`)
            .then((res) => {
              const buffer = new Buffer(res.data);
              const imgSrc = buffer.toString("base64");
              notify("success", `Create new account successfully!`);
              addDocument("usersData", {
                uid,
                providerId: "normal",
                photoURL: imgSrc,
                ...others,
              });
              dispatch(
                setFormUserInfoRedux({
                  uid,
                  providerId: "normal",
                  photoURL: imgSrc,
                  ...others,
                })
              );
              dispatch(toggleFormRedux(false));
              dispatch(signUpEnd());
            })
            .catch((err) => console.log(err));
        }
      } else {
        const result = await firebaseNormalSignIn({
          email: values.email,
          password: values.password,
        });
        if (result.code === 0) {
          if (result.error.code.includes("user-not-found")) {
            notify("error", `Your email is not valid!`);
          } else {
            notify("error", `Wrong password!`);
          }
        } else {
          const { uid } = result.user;
          /*  */
          const dbRef = ref(db);
          get(child(dbRef, `usersData`))
            .then((snapshot) => {
              if (snapshot.exists()) {
                const data = snapshot.val();
                const users = Object.keys(data).map((key) => data[key]);
                const user = users
                  .filter((e) => e !== undefined)
                  .find((u) => u.uid === uid);
                dispatch(setFormUserInfoRedux(user));
                dispatch(toggleFormRedux(false));
                notify("success", `You'r successfully logged in!`);
              } else {
                console.log("No data available");
              }
            })
            .catch((error) => {
              console.error(error);
            });
          /*  */
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  return { handleFormSubmit };
};

export default useForm;
