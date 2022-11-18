import { data } from "../../components/utils/data";
import TalkList from "../../components/TalkList";
import TalkItem from "../../components/TalkItem";
import TalkInfoWrapper from "../../components/TalkInfoWrapper";
import RoomNav, { NavBar, NavButton } from "../../components/RoomNav";
import Link from "next/link";

function MetroEastRoom() {
  return (
    <>
      <h2>Metro East</h2>
      <TalkList>
        {data
          .filter((talk) => talk.room === "Metro East")
          .map((talk) => (
            <TalkItem key={talk.id}>
              <h4>{talk.title}</h4>
              <h5>{talk.authors[0]}</h5>
              <TalkInfoWrapper>
                <p>{talk.session}</p>
                <p>{talk.time}</p>
              </TalkInfoWrapper>
            </TalkItem>
          ))}
      </TalkList>
      <NavBar>
        <Link href="../greatHall">
          <NavButton>Prev</NavButton>
        </Link>
        <Link href="../libertyHall">
          <NavButton>Next</NavButton>
        </Link>
      </NavBar>
    </>
  );
}

export default MetroEastRoom;
