import Typography from "@mui/material/Typography";
import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import { Colors } from "../../common/Colors";

function MyWorkoutPlans() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        backgroundColor: Colors.secondary,
        height: "100vh",
        margin: "-8px",
      }}
    >
      <Typography variant="h2" component="h2" color={Colors.white}>
        My Workout Plans
      </Typography>
      <Card
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          flexDirection: "column",
          width: "80%",
          minHeight: "40%",
          backgroundColor: Colors.primary,
        }}
      >
        <EditIcon
          sx={{
            marginLeft: "1300px",
            mt: "10px",
            color: Colors.white,
            fontSize: "400",
          }}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          {" "}
          <Typography variant="h4" component="h4" color={Colors.white}>
            Strength Training Workout Plan
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "90%",
            alignItems: "flex-start",
          }}
        >
          <Typography variant="h5" component="h5" color={Colors.white}>
            Upper body
          </Typography>
          <Typography variant="h6" component="h6" color={Colors.white}>
            Bench Press
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            {" "}
            <Typography
              variant="subtitle1"
              component="h6"
              mr="20px"
              color={Colors.white}
            >
              5 sets
            </Typography>{" "}
            <Typography
              variant="subtitle1"
              component="h6"
              mr="20px"
              color={Colors.white}
            >
              8-10 repetitions
            </Typography>{" "}
            <Typography
              variant="subtitle1"
              component="h6"
              mr="20px"
              color={Colors.white}
            >
              weight moderate to heavy
            </Typography>{" "}
            <Typography
              variant="subtitle1"
              component="h6"
              mr="20px"
              color={Colors.white}
            >
              Focus on keeping your back straight and lowering your hips until
              your thighs are parallel to the floor.
            </Typography>
          </Box>{" "}
          <Typography variant="h6" component="h6" color={Colors.white}>
            Bench Press
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            {" "}
            <Typography
              variant="subtitle1"
              component="h6"
              mr="20px"
              color={Colors.white}
            >
              5 sets
            </Typography>{" "}
            <Typography
              variant="subtitle1"
              component="h6"
              mr="20px"
              color={Colors.white}
            >
              8-10 repetitions
            </Typography>{" "}
            <Typography
              variant="subtitle1"
              component="h6"
              mr="20px"
              color={Colors.white}
            >
              weight moderate to heavy
            </Typography>{" "}
            <Typography
              variant="subtitle1"
              component="h6"
              mr="20px"
              color={Colors.white}
            >
              Focus on keeping your back straight and lowering your hips until
              your thighs are parallel to the floor.
            </Typography>
          </Box>{" "}
          <Typography variant="h6" component="h6" color={Colors.white}>
            Bench Press
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            {" "}
            <Typography
              variant="subtitle1"
              component="h6"
              mr="20px"
              color={Colors.white}
            >
              5 sets
            </Typography>{" "}
            <Typography
              variant="subtitle1"
              component="h6"
              mr="20px"
              color={Colors.white}
            >
              8-10 repetitions
            </Typography>{" "}
            <Typography
              variant="subtitle1"
              component="h6"
              mr="20px"
              color={Colors.white}
            >
              weight moderate to heavy
            </Typography>{" "}
            <Typography
              variant="subtitle1"
              component="h6"
              mr="20px"
              color={Colors.white}
            >
              Focus on keeping your back straight and lowering your hips until
              your thighs are parallel to the floor.
            </Typography>
          </Box>
        </Box>
      </Card>
    </Box>
  );
}

export default MyWorkoutPlans;
