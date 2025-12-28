import { useState } from "react";
import { HomePageExplore } from "../../../data/homepage-explore";
import HighLightText from "./HighLightText";
import Cards from "./Cards";

const tabsName = [
  "Free",
  "New to coding",
  "Most popular",
  "Skills paths",
  "Career paths",
];

const ExploreMore = () => {
  const [currentTab, setCurrentTab] = useState(tabsName[0]);
  const [courses, setCourses] = useState(HomePageExplore[0].courses);
  const [currentCard, setCurrentCard] = useState(
    HomePageExplore[0].courses[0].heading
  );

  const setMyCard = (value) => {
    setCurrentTab(value);
    const result = HomePageExplore.filter((course) => course.tag === value);
    setCourses(result[0].courses);
    setCurrentCard(result[0].courses[0].heading);
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="text-2xl sm:text-3xl md:text-4xl font-semibold text-center font-mono">
        Unlock the
        <HighLightText text={" Power of Code "} />
      </div>

      <div className="text-sm sm:text-base md:text-[15px] text-center text-richblack-300 mt-3 font-mono">
        Learn to build anything you can imagine
      </div>

      <div className="flex justify-evenly overflow-x-auto no-scrollbar mt-5 rounded-full bg-richblack-800 mb-5 border-richblack-100 px-1 py-1">
        {tabsName.map((elem, index) => {
          return (
            <div
              key={index}
              onClick={() => setMyCard(elem)}
              className={`text-sm sm:text-base flex items-center gap-2
  ${
    currentTab === elem
      ? "bg-richblack-900 text-richblack-5 font-medium"
      : "text-richblack-200"
  }
  rounded-full transition-all duration-200 cursor-pointer
  hover:bg-richblack-900 hover:text-richblack-5 px-5 sm:px-7 py-2`}
            >
              {elem}
            </div>
          );
        })}
      </div>

      <div className="relative lg:h-[150px]">
        <div className="flex flex-col sm:flex-row flex-wrap gap-6 sm:gap-10 justify-center sm:justify-between w-full px-2 sm:px-0">
          {courses.map((element, index) => {
            return (
              <Cards
                key={index}
                cardData={element}
                currentCard={currentCard}
                setCurrentCard={setCurrentCard}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ExploreMore;
