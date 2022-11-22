import { useRouter } from "next/router";
import styled from "styled-components";
import { NavButton } from "../../components/RoomNav";

function LandingPage() {
  const router = useRouter();

  return (
    <LandingPageContainer>
      <h1>Welcome to Jurassic Talk 2022 Toronto</h1>
      <NavWrapper>
        <NavButton type="button" onClick={() => router.push("/infoPage")}>
          Info
        </NavButton>
        <NavButton type="button" onClick={() => router.push("/greatHall")}>
          Schedule
        </NavButton>
      </NavWrapper>
    </LandingPageContainer>
  );
}

const LandingPageContainer = styled.div`
  text-align: center;
  margin: 0 auto;
  padding: 3em;
`;

const NavWrapper = styled.nav`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1em;
  margin-top: 6em;
`;

export default LandingPage;
