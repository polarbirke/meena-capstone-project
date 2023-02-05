import GlobalStyles from "../components/GlobalStyles";
import { data, rooms } from "../helpers/data";
import { dateFromNormalizedString } from "../helpers/normalize";
import { useLocalStorage } from "../helpers/hooks";

function MyApp({ Component, pageProps }) {
  const [talks, setTalks] = useLocalStorage("talks", data);

  const conferenceDays = Array.from(new Set(talks.map((talk) => talk.date)))
    .map((date) => dateFromNormalizedString(date))
    .sort((a, b) => a - b);

  function handleBookmarkToggle(id) {
    const updatedTalks = talks.map((talk) =>
      talk.id === id ? { ...talk, isBookmarked: !talk.isBookmarked } : talk
    );
    setTalks(updatedTalks);
  }

  return (
    <>
      <GlobalStyles />
      <Component
        {...pageProps}
        conferenceDays={conferenceDays}
        conferenceRooms={rooms}
        talks={talks}
        onBookmarkToggle={handleBookmarkToggle}
      />
    </>
  );
}

export default MyApp;
