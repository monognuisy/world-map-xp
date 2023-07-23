import React, { useCallback, useEffect, useState } from 'react';
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

  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 1),
      key: 'selection',
    },
  ]);

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
          {/* <DateRange
            editableDateInputs={true}
            onChange={(item) => setDate([item.selection])}
            moveRangeOnFirstSelection={false}
            ranges={date}
            months={2}
            direction="horizontal"
          />
          {calcDate(date[0])} */}
          {/* <Post /> */}
          <PostContainer>
            <Post />
            {/* <Post /> */}
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

const Post = () => {
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 1),
      key: 'selection',
    },
  ]);

  const [calendar, setCalendar] = useState('');
  const handleSelect = (date) => {
    // console.log(date);
    setCalendar(format(date, 'MM/dd/yyyy'));
  };

  return (
    <div
      style={{
        margin: `1rem 0`,
        padding: `10px`,
        border: `1.5px solid ${LightGray}`,
        borderRadius: `10px`,
      }}
    >
      <header
        style={{
          display: `flex`,
          flexDirection: `row`,
          justifyContent: `space-between`,
        }}
      >
        <div
          className="Profile"
          style={{
            display: `flex`,
          }}
        >
          <img
            src={tokyoAsakusa}
            alt="profile"
            style={{
              display: `block`,
              height: `2rem`,
              objectFit: `cover`,
              width: `2rem`,
              borderRadius: `1rem`,
              marginRight: `0.5rem`,
            }}
          ></img>
          <div>
            <h2
              style={{
                margin: 0,
                fontWeight: 600,
              }}
            >
              monognuisy
            </h2>
            <p
              style={{
                margin: 0,
              }}
            >
              Parisien
            </p>
          </div>
        </div>
        <div>
          <input
            value={calendar}
            readOnly
            className="inputBox"
            style={{
              border: `1px solid`,
            }}
          />
          <DateRange
            editableDateInputs={true}
            onChange={(item) => setDate([item.selection])}
            moveRangeOnFirstSelection={false}
            ranges={date}
            months={1}
            direction="horizontal"
          />
        </div>
      </header>
      <textarea
        style={{
          display: `block`,
          // height: `50%`,
          minHeight: `10rem`,
          border: `none`,
          width: `100%`,
          marginTop: `1rem`,
        }}
      ></textarea>
      <div>
        <></>
        <button
          style={{
            padding: `5px 10px`,
            fontWeight: 600,
            fontSize: `1rem`,
            color: `white`,
            backgroundColor: `#48B6F4`,
            borderRadius: `5px`,
            boxShadow: `rgba(99, 99, 99, 0.2) 0px 2px 8px 0px`,
          }}
        >
          POST↗
        </button>
      </div>
    </div>
  );
};
