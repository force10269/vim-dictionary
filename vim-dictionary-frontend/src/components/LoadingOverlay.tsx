import React from "react";
import {
  LoadingOverlay as Overlay,
  LoadingSpinnerContainer,
  LoadingSpinner,
  LoadingText,
  SpinnerAnimation,
} from "@/styles/LoadingOverlay.module";

interface LoadingMessage {
  message: string;
}

const LoadingOverlay = (props: LoadingMessage) => {
  return (
    <Overlay>
      <LoadingSpinnerContainer>
        <LoadingSpinner />
        <LoadingText>{props.message}</LoadingText>
        <SpinnerAnimation />
      </LoadingSpinnerContainer>
    </Overlay>
  );
};

export default LoadingOverlay;
