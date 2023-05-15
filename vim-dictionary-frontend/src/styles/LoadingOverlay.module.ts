import styled from "styled-components";

export const LoadingOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const LoadingSpinnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const LoadingSpinner = styled.div`
  border: 4px solid rgba(255, 255, 255, 0.3);
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border-top-color: #3498db;
  animation: spinner 0.8s linear infinite;
`;

export const LoadingText = styled.p`
  margin-top: 16px;
  font-size: 1rem;
  color: #f8f8f2;
`;

export const SpinnerAnimation = styled.div`
  @keyframes spinner {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
