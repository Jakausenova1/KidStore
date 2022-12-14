import * as React from "react";
import { useTheme } from "@mui/material/styles";
import { Box, MobileStepper, Paper, Button, Theme } from "@mui/material";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { makeStyles } from "@mui/styles";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const images = [
  {
    id: "1",
    imgPath:
      "https://mdk.ru.net/image/banners/NY.jpg",
  },
  {
    id: "2",
    imgPath:
      "https://mykaleidoscope.ru/uploads/posts/2021-10/1633721020_24-mykaleidoscope-ru-p-detskaya-komnata-v-stile-minimalizm-intere-25.jpg",
  },
];

function Carousel() {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = images.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step: number) => {
    setActiveStep(step);
  };

  const classes = useStyles();

  return (
    <Box sx={CarouselAdapter}>
      <Paper
        square
        elevation={5}
        sx={{
          padding: "1px",
          marginBottom: "50px",
        }}
      >
        <AutoPlaySwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={activeStep}
          onChangeIndex={handleStepChange}
          enableMouseEvents
        >
          {images.map((step, index) => (
            <div key={step.id}>
              {Math.abs(activeStep - index) <= 2 ? (
                <Box
                  component="img"
                  sx={{
                    height: 550,
                    display: "block",
                    maxWidth: 1000,
                    overflow: "hidden",
                    width: "100%",
                  }}
                  src={step.imgPath}
                />
              ) : null}
            </div>
          ))}
        </AutoPlaySwipeableViews>
        <MobileStepper
          steps={maxSteps}
          position="static"
          activeStep={activeStep}
          nextButton={
            <Button
              size="small"
              onClick={handleNext}
              disabled={activeStep === maxSteps - 1}
            >
              {theme.direction === "rtl" ? (
                <ChevronLeftIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </Button>
          }
          backButton={
            <Button
              size="small"
              onClick={handleBack}
              disabled={activeStep === 0}
            >
              {theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </Button>
          }
        />
      </Paper>
    </Box>
  );
}

export default Carousel;

const useStyles = makeStyles({
  boxx: {
    height: 550,
    display: "block",
    maxWidth: 1000,
    overflow: "hidden",
    width: "100%",
  },
});

const CarouselAdapter = (theme: Theme) => ({
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
  [theme.breakpoints.up("md")]: {
    maxWidth: 1000,
    flexGrow: 1,
    marginLeft: 10,
    marginTop: 5,
  },
});
