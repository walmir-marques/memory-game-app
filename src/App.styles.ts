import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  max-width: 1050px;
  margin: auto;

  @media (max-width: 750px) {
    flex-direction: column;
  }
`;

export const InfoContainer = styled.div`
  width: 100%;
  max-width: 1050px;
  margin: auto;
  display: flex;

  @media (max-width: 750px) {
    flex-direction: column;
  }
`;

export const Header = styled.div`
  width: 100%;
  max-width: 750px;
  margin: auto;
  padding: 30px 0;

  @media (max-width: 750px) {
    flex-direction: column;
  }
`;

export const Info = styled.div`
  display: flex;
  flex-direction: column;
  width: auto;
  justify-content: center;

  @media (max-width: 750px) {
    margin-bottom: 50px;
    align-items: center;
  }
`;

export const InfoArea = styled.div`
  width: 100%;
  margin: 10px 0;

  @media (max-width: 750px) {
    display: flex;
    justify-content: space-around;
    text-align: center;
  }
`;
export const LogoLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const GridArea = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;

  @media (max-width: 750px) {
    justify-content: center;
    margin: 0 20px;
  }
`;

export const Grid = styled.div`
  width: 700px;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 10px;

  @media (max-width: 750px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;
