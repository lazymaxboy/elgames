import React from "react";
import { Box, Grid} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import styles from "../modal-signup/ModalSignUp.module.css";
import { useForm } from "react-hook-form";

const ModalSignUp = ({ handleCloseModalSignUp }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
  } = useForm({
    criteriaMode: "all",
  });
  const onSubmit = (e) => console.log(e);
  return (
    <Box className={styles["form-sign-up"]}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "end",
        }}
      >
        <Grid style={{ cursor: "pointer" }} onClick={handleCloseModalSignUp}>
          <CloseIcon></CloseIcon>
        </Grid>
      </Box>
      <Box className={styles.content}>
        <h2 className={styles.h2}>SIGN UP</h2>
        <br />
        <Grid className={styles.p} textAlign={"center"}>
          Please register below account detail
        </Grid>

        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <Grid>
            <input
              className={styles.input}
              type="text"
              name="name"
              id="name-up"
              placeholder="Name"
              {...register("nameSignup", { required: true })}
            />
            {errors.nameSignup && (
              <div className={styles["form-message"]}>
                This field is required
              </div>
            )}
          </Grid>
          <Grid>
            <input
              className={styles.input}
              type="text"
              name="email"
              id="email-up"
              placeholder="Email"
              {...register("emailSignup", {
                required: "Please enter this field!",
                pattern: {
                  value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                  message: "This field must be email!",
                },
              })}
            />
            {errors.emailSignup && (
              <div className={styles["form-message"]}>
                {errors.emailSignup.message}
              </div>
            )}
          </Grid>
          <Grid>
            <input
              className={styles.input}
              type="password"
              name="pass"
              id="pass-up"
              placeholder="Password"
              {...register("passSignup", {
                required: "Please enter this field!",
                pattern: {
                  value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/,
                  message:
                    "Password must consist of at least 8 letters and contain at least one uppercase letter, one lowercase letter and one number.",
                },
              })}
            />
            {errors.passSignup && (
              <div className={styles["form-message"]}>
                {errors.passSignup.message}
              </div>
            )}
          </Grid>
          <Grid>
            <input
              className={styles.input}
              type="password"
              name="re-pass"
              id="re-pass-up"
              placeholder="Confirm Password"
              {...register("repassSignup", {
                required: "Please enter this field!",
                pattern: {
                  value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/,
                  message:
                    "Password must consist of at least 8 letters and contain at least one uppercase letter, one lowercase letter and one number.",
                },
                validate: {
                  match: (v) =>
                    v === getValues("passSignup") ||
                    "Mật khẩu nhập lại không chính xác",
                },
              })}
            />
            {errors.repassSignup && (
              <div className={styles["form-message"]}>
                {errors.repassSignup.message}
              </div>
            )}
          </Grid>
          <button className={styles.button}>Sign Up</button>
        </form>
        <Grid textAlign={"center"} mt={"24px"}>
          OR
        </Grid>
        <Grid
          sx={{
            marginTop: "16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "32px",
          }}
        >
          <GoogleIcon className={styles.icon}></GoogleIcon>
          <FacebookIcon className={styles.icon}></FacebookIcon>
        </Grid>
      </Box>
    </Box>
  );
};

export default ModalSignUp;
