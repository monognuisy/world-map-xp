import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { polyColors } from '../utils/colors';
import { DateRange, Calendar } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { addDays, differenceInDays } from 'date-fns';
import format from 'date-fns/format';
import { worldFlag } from '../assets/worldAssets';
import './sidebox.css';

import tokyoAsakusa from '../images/tokyo_asakusa.jpg';

const STATUSHEIGHT = `calc((100% - 4rem) / 5)`;
const LightGray = `#D9D9D9`;

const Sidebox = ({ countryName, countryProperty }) => {
  const statusColors = [
    polyColors.lightBlue,
    polyColors.green,
    polyColors.yellow,
    polyColors.red,
    polyColors.purple,
  ];

  // 총 여행 일 수
  const [totalDate, setTotalDate] = useState(0);
  const [flag, setFlag] = useState('🏴');

  const calcDate = useCallback((date) => {
    return differenceInDays(date.endDate, date.startDate) + 1;
  }, []);

  useEffect(() => {
    const cname = countryName;
    const cnameShort = countryProperty.name;
    const cnameLong = countryProperty.name_long;
    const cnameFormal = countryProperty.formal_en;
    const cnameSovereignt = countryProperty.sovereient;

    setFlag(
      () =>
        worldFlag[cname] ??
        worldFlag[cnameShort] ??
        worldFlag[cnameLong] ??
        worldFlag[cnameFormal] ??
        worldFlag[cnameSovereignt],
    );
  }, [countryName, countryProperty]);

  return (
    <>
      <SideboxWrapper>
        <PictureHeader src={tokyoAsakusa} alt="tokyo-asakusa" />
        <PostWrapper>
          <NameWrapper>
            <CountryName>
              {countryName} {flag}
            </CountryName>
            {console.log(countryProperty)}
          </NameWrapper>
          <StatusWrapper>
            <div
              style={{
                display: `flex`,
                padding: `0 ${STATUSHEIGHT}`,
                marginBottom: `10px`,
                justifyContent: `space-between`,
              }}
            >
              <code>1D</code>
              <code>1W</code>
              <code>1M</code>
              <code>1Y</code>
            </div>
            <div
              style={{
                display: `flex`,
                flexDirection: `row`,
                justifyContent: `space-between`,
              }}
            >
              <StatusBlock />
              <StatusBlock />
              <StatusBlock />
              <StatusBlock />
              <StatusBlock />
            </div>
            <div></div>
          </StatusWrapper>
          <PostContainer>
            <Post countryName={countryName} />
          </PostContainer>
        </PostWrapper>
      </SideboxWrapper>
    </>
  );
};

export default Sidebox;

// Styled-components

const SideboxWrapper = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  width: calc(34% - 20px);
  height: calc(100% - 20px);
  z-index: 10;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  overflow-y: scroll;
`;

const PostWrapper = styled.div`
  padding: 10px;
`;

const PictureHeader = styled.img`
  height: 200px;
  width: 100%;
  object-fit: cover;
`;

const NameWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

const CountryName = styled.h1`
  margin: 0;
  font-size: 2.25rem;
  font-weight: 700;
`;

const StatusWrapper = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const PostContainer = styled.div`
  margin-top: 1rem;
  width: 100%;
`;

const StatusBlock = ({ color = LightGray }) => {
  return (
    <div
      style={{
        width: STATUSHEIGHT,
        height: `1rem`,
        // borderRadius: `5px`,
        backgroundColor: color,
      }}
    ></div>
  );
};

const Post = ({ countryName }) => {
  // date state
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 1),
      key: 'selection',
    },
  ]);

  // is open or close?
  const [open, setOpen] = useState(false);

  // get the target element to toggle
  const refOne = useRef(null);

  // content of the post
  const postRef = useRef(null);

  useEffect(() => {
    document.addEventListener('keydown', hideOnEscape, true);
    document.addEventListener('click', hideOnClickOutside, true);
  }, []);

  // hide calendar dropdown on ESC press
  const hideOnEscape = (e) => {
    console.log(e.key);
    if (e.key === 'Escape') {
      setOpen(false);
    }
  };

  // hide calendar dropdown on Outside click
  const hideOnClickOutside = (e) => {
    if (refOne.current && !refOne.current.contains(e.target)) {
      setOpen(false);
    }
  };

  // handle post button
  const handlePost = (e) => {
    e.preventDefault();
    alert(postRef.current.value);
  };

  const formatDate = (date) => format(date, 'yyyy/MM/dd');

  return (
    <PostInnerWrapper>
      <ProfileHeader>
        <Profile />
        <div>
          <input
            value={`${formatDate(date[0].startDate)} ~ ${formatDate(
              date[0].endDate,
            )}`}
            readOnly
            className="inputBox"
            style={{
              textAlign: `right`,
            }}
            onClick={() => setOpen((open) => !open)}
          />
          <div ref={refOne}>
            {open && (
              <DateRange
                editableDateInputs={true}
                onChange={(item) => setDate([item.selection])}
                moveRangeOnFirstSelection={false}
                ranges={date}
                months={1}
                direction="horizontal"
              />
            )}
          </div>
        </div>
      </ProfileHeader>
      <WriteBox
        ref={postRef}
        placeholder={`Write down your experience at ${countryName}`}
      />
      <footer
        style={{
          display: `flex`,
          justifyContent: `space-between`,
        }}
      >
        <div></div>
        <PostButton onClick={handlePost}>POST↗</PostButton>
      </footer>
    </PostInnerWrapper>
  );
};

const PostInnerWrapper = styled.div`
  margin: 1rem 0;
  padding: 10px;
  border: 1.5px solid ${LightGray};
  border-radius: 10px;
`;

const ProfileHeader = styled.header`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const PostButton = styled.button`
  padding: 5px 10px;
  font-weight: 600;
  font-size: 1rem;
  color: white;
  background-color: #48b6f4;
  border-radius: 5px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  margin-top: 1rem;
`;

const WriteBox = styled.textarea`
  display: block;
  min-height: 10rem;
  border: none;
  width: calc(100% - 20px);
  margin-top: 1rem;
  padding: 10px;
`;

// Profile Image, Name, Description and status.
const Profile = ({
  userName = 'Anonymous',
  userState,
  userImage = tokyoAsakusa,
}) => {
  return (
    <div
      className="Profile"
      style={{
        display: `flex`,
      }}
    >
      <ProfileImage src={userImage} alt="profile" />
      <div>
        <h2>monognuisy</h2>
        <p>Parisien</p>
      </div>
    </div>
  );
};

const ProfileImage = styled.img`
  display: block;
  height: 2rem;
  object-fit: cover;
  width: 2rem;
  border-radius: 1rem;
  margin-right: 0.5rem;
`;
