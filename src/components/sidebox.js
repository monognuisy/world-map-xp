import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { polyColors } from '../utils/colors';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { addDays, differenceInDays } from 'date-fns';
import { worldFlag } from '../assets/worldAssets';

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
      <PostWrapper>
        <PictureHeader src={tokyoAsakusa} alt="tokyo-asakusa" />
        <PostContainer>
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
        </PostContainer>
      </PostWrapper>
    </>
  );
};

export default Sidebox;

// Styled-components

const PostWrapper = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  width: calc(33% - 20px);
  height: calc(100% - 20px);
  z-index: 10;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  overflow-y: scroll;
`;

const PostContainer = styled.div`
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
  return (
    <textarea
      style={{
        display: `block`,
        height: `50%`,
        width: `100%`,
        margin: `0 auto`,
        border: `2px solid`,
        borderRadius: `5px`,
        padding: `10px`,
      }}
    ></textarea>
  );
};
