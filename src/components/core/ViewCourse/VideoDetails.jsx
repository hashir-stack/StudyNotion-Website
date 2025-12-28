import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { markLectureAsComplete } from "../../../services/opreations/courseDetailsAPI";
import { updateCompletedLectures } from "../../../slices/viewCourseSlice";
import { FaPlay } from "react-icons/fa";
import ReactPlayer from "react-player";
import {
  MediaController,
  MediaControlBar,
  MediaTimeRange,
  MediaTimeDisplay,
  MediaVolumeRange,
  MediaPlaybackRateButton,
  MediaPlayButton,
  MediaSeekBackwardButton,
  MediaSeekForwardButton,
  MediaMuteButton,
  MediaFullscreenButton,
} from "media-chrome/react";
import IconBtn from "../../common/IconBtn";

const VideoDetails = () => {
  const { courseId, sectionId, subSectionId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const playerRef = useRef();
  const location = useLocation();
  const { token } = useSelector((state) => state.auth);
  const { courseSectionData, courseEntireData, completedLectures } =
    useSelector((state) => state.viewCourse);

  const [videoData, setVideoData] = useState([]);
  const [videoEnded, setVideoEnded] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const setVideoSpecificDetails = async () => {
      if (!courseSectionData.length) {
        return;
      }

      if (!courseId && !sectionId && !subSectionId) {
        navigate("/dashboard/enrolled-courses");
      } else {
        const filteredData = courseSectionData.filter(
          (course) => course._id === sectionId
        );

        // if (!filteredData.length || !filteredData[0]?.subSection) {
        //   setVideoData(null);
        //   return;
        // }

        const filteredVideoData = filteredData?.[0]?.subSection.filter(
          (data) => data._id === subSectionId
        );

        setVideoData(filteredVideoData[0]);
        setVideoEnded(false);
      }
    };
    setVideoSpecificDetails();
  }, [courseSectionData, courseEntireData, location.pathname]);

  const isFirstVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex(
      (data) => data._id === sectionId
    );

    const currentSubSectionIndex = courseSectionData[
      currentSectionIndex
    ].subSection.findIndex((data) => data._id === subSectionId);

    if (currentSectionIndex === 0 && currentSubSectionIndex === 0) {
      return true;
    } else {
      return false;
    }
  };

  const isLastVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex(
      (data) => data._id === sectionId
    );

    const noOfSubSections =
      courseSectionData[currentSectionIndex].subSection.length;

    const currentSubSectionIndex = courseSectionData[
      currentSectionIndex
    ].subSection.findIndex((data) => data._id === subSectionId);

    if (
      currentSectionIndex === courseSectionData.length - 1 &&
      currentSubSectionIndex === noOfSubSections - 1
    ) {
      return true;
    } else {
      return false;
    }
  };

  const goToNextVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex(
      (data) => data._id === sectionId
    );

    const noOfSubSections =
      courseSectionData[currentSectionIndex].subSection.length;

    const currentSubSectionIndex = courseSectionData[
      currentSectionIndex
    ].subSection.findIndex((data) => data._id === subSectionId);

    // same subSection ki next video
    if (currentSubSectionIndex !== noOfSubSections - 1) {
      const nextSubSectionId =
        courseSectionData[currentSectionIndex].subSection[
          currentSubSectionIndex + 1
        ]._id;

      navigate(
        `/view-course/${courseId}/section/${sectionId}/sub-section/${nextSubSectionId}`
      );
    } else {
      // different section ki first video
      const nextSectionId = courseSectionData[currentSectionIndex + 1]._id;
      const nextSubSectionId =
        courseSectionData[currentSectionIndex + 1].sebSection[0]._id;

      navigate(
        `/view-course/${courseId}/section/${nextSectionId}/sub-section/${nextSubSectionId}`
      );
    }
  };

  const goToPrevVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex(
      (data) => data._id === sectionId
    );

    const noOfSubSections =
      courseSectionData[currentSectionIndex].subSection.length;

    const currentSubSectionIndex = courseSectionData[
      currentSectionIndex
    ].subSection.findIndex((data) => data._id === subSectionId);

    if (currentSubSectionIndex != 0) {
      // same section prev video
      const prevSubSectionId =
        courseSectionData[currentSectionIndex].subSection[
          currentSubSectionIndex - 1
        ]._id;

      navigate(
        `/view-course/${courseId}/section/${sectionId}/sub-section/${prevSubSectionId}`
      );
    } else {
      // diffrent section last video
      const prevSectionId = courseSectionData[currentSectionIndex - 1]._id;
      const prevSubSectionLength =
        courseSectionData[currentSectionIndex - 1].subSection.length;
      const prevSubSectionId =
        courseSectionData[currentSectionIndex - 1].sebSection[
          prevSubSectionLength - 1
        ]._id;

      navigate(
        `/view-course/${courseId}/section/${prevSectionId}/sub-section/${prevSubSectionId}`
      );
    }
  };

  const handleLectureCompleted = async () => {
    // ToDo more code
    setLoading(true);

    const res = await markLectureAsComplete({ courseId, subSectionId }, token);
    // state update
    if (res) {
      dispatch(updateCompletedLectures(subSectionId));
    }
    setLoading(false);
  };

  return (
    <div className="text-white relative">
      {!videoData ? (
        <div>No Data Found....</div>
      ) : (
        <div>
          <MediaController
            style={{
              width: "100%",
              aspectRatio: "16/9",
            }}
          >
            <ReactPlayer
              ref={playerRef}
              slot="media"
              src={videoData?.videoUrl}
              controls={false}
              onEnded={() => setVideoEnded(true)}
              style={{
                width: "100%",
                height: "100%",
                "--controls": "none",
              }}
            ></ReactPlayer>

            <MediaControlBar>
              <MediaPlayButton />
              <MediaSeekBackwardButton seekOffset={10} />
              <MediaSeekForwardButton seekOffset={10} />
              <MediaTimeRange />
              <MediaTimeDisplay showDuration />
              <MediaMuteButton />
              <MediaVolumeRange />
              <MediaPlaybackRateButton />
              <MediaFullscreenButton />
            </MediaControlBar>
          </MediaController>

          {/* <FaPlay className="z-50" /> */}

          {videoEnded && (
            <div className="z-50">
              {!completedLectures.includes(subSectionId) && (
                <IconBtn
                  disabled={loading}
                  onclick={() => handleLectureCompleted()}
                  text={!loading ? "Mark As Completed" : "Loading . . ."}
                />
              )}

              {/* <IconBtn
                disabled={loading}
                onclick={() => {
                  if (playerRef?.current) {
                    playerRef.current.seek(0);
                    setVideoEnded(false);
                  }
                }}
                text={"Rewatch"}
                customClasses={"text-xl"}
              /> */}

              <div>
                {!isFirstVideo() && (
                  <button
                    disabled={loading}
                    onClick={goToPrevVideo}
                    className="text-yellow-100"
                  >
                    Prev
                  </button>
                )}

                {!isLastVideo() && (
                  <button
                    disabled={loading}
                    onClick={goToNextVideo}
                    className="text-yellow-100"
                  >
                    Next
                  </button>
                )}
              </div>
            </div>
          )}

          <h1>{videoData?.title}</h1>
          <p>{videoData?.description}</p>
        </div>
      )}
    </div>
  );
};

export default VideoDetails;
