import Joyride from "react-joyride";
import React from "react";

export default function TourPage() {
  const tour = [
    {
      target: ".my-first-step",
      content: "You can find anything location",
      disableBeacon: true, // This makes the tour to start automatically without clicking
      hideCloseButton: true,
    },
  ];

  return (
    <div>
      <Joyride
        steps={tour}
        continuous={true}
        showSkipButton={true}
        styles={{
          tooltipContainer: {
            textAlign: "left",
          },
          buttonBack: {
            marginRight: 10,
          },
          buttonNext: {
            display: "none",
          },
          options: {
            zIndex: 1000,
          },
        }}
        locale={{
          last: "End tour",
        }}
      />
    </div>
  );
}
