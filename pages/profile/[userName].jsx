import { Box, Container, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import profile from "../profile/Profile.module.css";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/feature/auth/auth.slice";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { app } from "../../lib/firebase";

const Profile = () => {
  const user = useSelector(selectUser);
  const [bill, setBill] = useState([]);
  const checkoutRef = collection(getFirestore(app), "checkout");
  const convertVnd = (item) => {
    return Intl.NumberFormat().format(item).split(".").join(",") + " đ";
  };
  useEffect(() => {
    const getChekout = async () => {
      const data = await getDocs(checkoutRef);
      const checkout = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setBill(
        checkout.filter(
          (item) => item.uid == (user == null ? "default" : user.uid)
        )
      );
    };
    getChekout();
  }, []);

  return (
    <div>
      <Box
        sx={{
          width: "100%",
          textAlign: "center",
          padding: " 70px 0",
          backgroundColor: "var(--dark)",
          color: "white",
        }}
      >
        <Grid
          fontFamily={"var(--font-title)"}
          fontSize={{
            xs: "24px",
            sm: "40px",
          }}
          fontWeight="bold"
          color={"white"}
        >
          <p>Profile</p>
        </Grid>
        <Grid
          sx={{
            fontFamily: "var(--font-default)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "500",
            gap: "16px",
          }}
        >
          <Grid color={"var(--gray)"}>My Account</Grid>

          <KeyboardArrowRightIcon></KeyboardArrowRightIcon>

          <Grid color={"var(--blue)"}>Profile</Grid>
        </Grid>
      </Box>

      <section className={profile["section-profile"]}>
        <Container
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "48px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "16px",
            }}
          >
            <p className={profile.title}>My profile</p>
            <form
              action=""
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "16px",
                maxWidth: "600px",
                margin: "0 auto",
              }}
            >
              <div className="form-control">
                <p>Email:</p>
                <input
                  type="text"
                  placeholder="Your Email"
                  className="input"
                  value={user == null ? "" : user.email}
                  readOnly
                />
              </div>
              <div className="form-control">
                <p>Name:</p>
                <input
                  type="text"
                  placeholder="Your Password"
                  className="input"
                  value={user == null ? "" : user.displayName}
                  readOnly
                />
              </div>
            </form>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "16px",
            }}
          >
            <p className={profile.title}>Purchase history </p>

            <Box
              textAlign={"center"}
              width={"100%"}
              border={"1px solid var(--gray)"}
            >
              <Grid container>
                <Grid item={true} padding={"10px"} xs={3}>
                  Date
                </Grid>
                <Grid item={true} padding={"10px"} xs={6}>
                  Game
                </Grid>
                <Grid item={true} padding={"10px"} xs={3}>
                  Total
                </Grid>
              </Grid>

              {bill.map((i) => (
                <Grid
                  key={i}
                  container
                  sx={{
                    borderTop: "1px solid var(--gray)",
                  }}
                >
                  <Grid
                    item={true}
                    padding={"10px"}
                    xs={3}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      letterSpacing: "1.5px",
                    }}
                  >
                    {i.date}
                  </Grid>
                  <Grid item={true} padding={"10px"} xs={6}>
                    {i.payment.map((item) => (
                      <Box key={item == null ? null : item.id}>
                        <strong>
                          {item == null ? null : item.product.name}
                        </strong>{" "}
                        {item == null ? null : "x"}{" "}
                        <span
                          style={{
                            color: "var(--blue)",
                          }}
                        >
                          {item == null ? null : item.quantity}
                        </span>
                      </Box>
                    ))}
                  </Grid>
                  <Grid
                    item={true}
                    padding={"10px"}
                    xs={3}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {i.total == null ? null : convertVnd(i.total)}
                  </Grid>
                </Grid>
              ))}
            </Box>
          </Box>
        </Container>
      </section>
    </div>
  );
};

export default Profile;
