import { useRouter } from "next/router";
import {
  normalizeDate,
  dateFromNormalizedString,
} from "../../../helpers/normalize";
import {getRoomBySlug} from "../../../helpers/get";
import styled from "styled-components";
import Link from "next/link";
import TalkCard from "../../../components/TalkCard";
import StyledList from "../../../components/StyledList";
import StyledMain from "../../../components/StyledMain";
import {
  FooterNav,
  FooterLink,
  LinkText,
  HomeIcon,
  BookmarkIcon,
  PrevRoomIcon,
  NextRoomIcon,
} from "../../../components/StyledFooter";

function Room({ conferenceDays, conferenceRooms, talks, onBookmarkToggle }) {
  const router = useRouter();
  const { date, room: roomSlug } = router.query;
  const pathname = router.asPath;

  if (!roomSlug || !date) return;

  const currentRoom = getRoomBySlug(conferenceRooms, roomSlug);
  const indexOfCurrentRoom = conferenceRooms.findIndex(room => room.slug === roomSlug);
  const indexOfPrevRoom = indexOfCurrentRoom === 0 ? conferenceRooms.length - 1 : indexOfCurrentRoom - 1;
  const indexOfNextRoom = indexOfCurrentRoom === conferenceRooms.length - 1 ? 0 : indexOfCurrentRoom + 1;
  const prevRoomSlug = conferenceRooms[indexOfPrevRoom].slug;
  const nextRoomSlug = conferenceRooms[indexOfNextRoom].slug;

  const conferenceDaysLinks = conferenceDays.map((day) => {
    return (
      <DateItem>
      <DateLink
        key={`${day}`}
        href={`/${normalizeDate(day)}/${roomSlug}`}
        active={pathname === `/${normalizeDate(day)}/${roomSlug}` ? 1 : 0}
      >
        <Weekday>
          {day
            .toLocaleDateString("en-EN", {
              weekday: "short",
            })
            .toUpperCase()}
        </Weekday>
        <p>
          {day.toLocaleDateString("en-EN", {
            day: "numeric",
            month: "numeric",
          })}
        </p>
      </DateLink>
      </DateItem>
    );
  });

  const filteredTalks = talks
    .filter((talk) => {
      const newDate = dateFromNormalizedString(talk.date);
      return normalizeDate(newDate) === date;
    })
    .filter((talk) => talk.room === currentRoom.id);

  return (
    <>
      <Header>{conferenceDaysLinks}</Header>
      <>
        <RoomHeadlineContainer>
          <RoomHeadline>{currentRoom.name}</RoomHeadline>
        </RoomHeadlineContainer>
        <StyledMain>
          <StyledList>
            {filteredTalks.map((talk) => (
              <TalkCard
                talk={talk}
                onBookmarkToggle={onBookmarkToggle}
                date={date}
                room={roomSlug}
              />
            ))}
          </StyledList>
        </StyledMain>
      </>

      <FooterNav>
        <FooterLink href={`/${date}/${prevRoomSlug}`}>
          <PrevRoomIcon aria-label="previous room button" />
          <LinkText>Room</LinkText>
        </FooterLink>
        <FooterLink href={"/"}>
          <HomeIcon />
          <LinkText>Home</LinkText>
        </FooterLink>
        <FooterLink href={"/bookmarks"}>
          <BookmarkIcon />
          <LinkText>Bookmarks</LinkText>
        </FooterLink>
        <FooterLink href={`/${date}/${nextRoomSlug}`}>
          <NextRoomIcon aria-label="next room button" />
          <LinkText>Room</LinkText>
        </FooterLink>
      </FooterNav>
    </>
  );
}

const Header = styled.ul`
  display: flex;
  scroll-snap-align: initial;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  margin: 0;
  padding: 0;
  list-style: none;
  width: 100%;
  position: fixed;
  top: 0;
`

const DateItem = styled.li`
  scroll-snap-align: start;
  width: 33.33333%;
`


const DateLink = styled(Link)`
  color: #616161;
  text-decoration: none;
  height: 3.5em;
  padding: 1em;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: OpenSans-SemiBold, sans-serif;

  background: ${(props) => (props.active ? "#787272" : "#f9f9f9")};
  color: ${(props) => (props.active ? "#fafafa" : "#616161")};
`;

const Weekday = styled.p`
  margin-right: 0.2em;
`;

const RoomHeadlineContainer = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  top: 3.5em;
  height: 4em;
  background: rgb(230, 228, 229);
  background: linear-gradient(
    0deg,
    rgba(230, 228, 229, 0.05646008403361347) 0%,
    rgba(230, 228, 229, 1) 77%
  );
`;

const RoomHeadline = styled.h1`
  width: 50%;
  max-width: 250px;
  min-width: 150px;
  padding: 0.3em 0;
  border-radius: 10px;
  background: var(--aubergine);
  color: #fff;
  font-size: 1.1rem;
  font-weight: 400;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
`;

export default Room;
