// import { useParams } from "react-router-dom";
// import Footer from "../components/common/Footer";
// import { useEffect, useState } from "react";
// import { apiConnector } from "../services/apiConnector";
// import { categories } from "../services/apis";
// import { getCatalogPageData } from "../services/opreations/pageAndComponentData";

// const Catalog = () => {
//   const { catalogName } = useParams();
//   console.log("Catalog Name from URL:", catalogName);
//   const [catalogPageData, setCatalogPageData] = useState(null);
//   const [categoryId, setCategoryId] = useState("");

//   // fetch all categories
//   useEffect(() => {
//     const getCategories = async () => {
//       const res = await apiConnector("GET", categories.CATEGORIES_API);

//       // const category_id = res?.data?.data?.filter((ct)=> ct.name.split(" ").join("-").toLowerCase() === catalogName[0]._id);
//       // console.log("category id" , category_id)
//       // setCategoryId(category_id);

//       //   const categoryMatch = res?.data?.data?.find(
//       //     (ct) =>
//       //       ct.name.split(" ").join("-").toLowerCase() ===
//       //       catalogName.toLowerCase()
//       //   );
//       const categoryMatch = res?.data?.data?.find(
//         (ct) =>
//           ct.name.replace(/[^a-zA-Z0-9]/g, "").toLowerCase() ===
//           catalogName.replace(/[^a-zA-Z0-9]/g, "").toLowerCase()
//       );
//       res?.data?.data?.forEach((ct) => {
//         console.log(
//           "Normalized:",
//           ct.name.replace(/[^a-zA-Z0-9]/g, "").toLowerCase()
//         );
//       });

//       setCategoryId(categoryMatch?._id);
//       console.log("categoryMatch?._id", categoryMatch?._id);
//     };
//     getCategories();
//   }, [catalogName]);

//   useEffect(() => {
//     const getCategoryDetails = async () => {
//       if (!categoryId) return; // prevent empty string from being sent

//       try {
//         const res = await getCatalogPageData(categoryId);
//         console.log("printing the res", res);
//         setCatalogPageData(res);
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     getCategoryDetails();
//   }, [categoryId]);

//   return (
//     <div className="text-white">
//       <div>
//         <p>
//           {`Home/Catalog/`}
//           <span>{catalogPageData?.data?.selectedCategory?.name}</span>
//         </p>
//         <p>{catalogPageData?.data?.selectedCategory?.name}</p>
//         <p>{catalogPageData?.data?.selectedCategory?.description}</p>
//       </div>

//       <div>
//         {/* section1 */}
//         <div>
//           <div>Courses To Get You Started</div>
//           <div className="flex gap-x-3">
//             <p>Most Popular</p>
//             <p>New</p>
//           </div>
//           {/* <CourseSlider/> */}
//         </div>

//         {/* section2 */}
//         <div>
//           <p>Top Courses</p>
//           <div>{/* <CourseSlider/> */}</div>
//         </div>

//         {/* section3 */}
//         <div>
//           <p>Frequently Bought Together</p>
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default Catalog;

import { useParams } from "react-router-dom";
import Footer from "../components/common/Footer";
import { useEffect, useState } from "react";
import { apiConnector } from "../services/apiConnector";
import { categories } from "../services/apis";
import { getCatalogPageData } from "../services/opreations/pageAndComponentData";
import CourseSlider from "../components/core/Catalog/CourseSlider";
import Course_Card from "../components/core/Catalog/Course_Card";

const Catalog = () => {
  const { catalogName } = useParams();
  const [catalogPageData, setCatalogPageData] = useState(null);
  const [categoryId, setCategoryId] = useState("");
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState(1);

  // Normalize helper
  const normalize = (str) => str.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();

  // Fetch category ID from name
  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await apiConnector("GET", categories.CATEGORIES_API);
        const categoryMatch = res?.data?.data?.find(
          (ct) => normalize(ct.name) === normalize(catalogName)
        );
        setCategoryId(categoryMatch?._id || "");
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    getCategories();
  }, [catalogName]);

  // Fetch catalog page data
  useEffect(() => {
    const getCategoryDetails = async () => {
      if (!categoryId) return;
      setLoading(true);
      try {
        const res = await getCatalogPageData(categoryId);
        setCatalogPageData(res);
      } catch (error) {
        console.error("Error fetching catalog page data:", error);
        setCatalogPageData({ success: false, message: error.message });
      }
      setLoading(false);
    };
    if (categoryId) {
      getCategoryDetails();
    }
  }, [categoryId]);

  return (
    <div className="text-white min-h-screen bg-richblack-900">
      <div className="w-11/12 max-w-[1080px] mx-auto py-10">
        {loading ? (
          <p className="text-center text-lg text-richblack-100">Loading...</p>
        ) : catalogPageData?.success === false ? (
          <p className="text-center text-red-500 text-lg">
            {catalogPageData.message}
          </p>
        ) : (
          <>
            <div className=" box-content bg-richblack-800 px-4 rounded-xl">
              <div className="mx-auto flex min-h-[260px] max-w-maxContentTab flex-col justify-center gap-4 lg:max-w-maxContent ">
                <p className="text-sm text-richblack-300">
                  Home / Catalog /{" "}
                  <span className="text-yellow-50 font-semibold">
                    {catalogPageData?.data?.selectedCategory?.name}
                  </span>
                </p>
                <h1 className="text-3xl font-bold text-richblack-5 mt-2">
                  {catalogPageData?.data?.selectedCategory?.name}
                </h1>
                <p className="max-w-[870px] text-richblack-200 mt-2">
                  {catalogPageData?.data?.selectedCategory?.description}
                </p>
              </div>
            </div>

            {/* Section 1 */}
            <div className="mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
              <div className="text-2xl font-semibold text-richblack-5">
                Courses To Get You Started
              </div>
              <div className="my-4 flex border-b border-b-richblack-600 text-sm">
                <p
                  className={`px-4 py-2 ${
                    active === 1
                      ? "border-b border-b-yellow-25 text-yellow-25"
                      : "text-richblack-50"
                  } cursor-pointer`}
                  onClick={() => setActive(1)}
                >
                  Most Popular
                </p>
                <p
                  className={`px-4 py-2 ${
                    active === 2
                      ? "border-b border-b-yellow-25 text-yellow-25"
                      : "text-richblack-50"
                  } cursor-pointer`}
                  onClick={() => setActive(2)}
                >
                  New
                </p>
              </div>

              <div>
                <CourseSlider
                  Courses={catalogPageData?.data?.selectedCategory?.courses}
                />
              </div>
            </div>

            {/* Section 2 */}
            <div className="mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
              <h2 className="text-2xl font-semibold text-richblack-5">
                Top Courses{catalogPageData?.data?.selectedCategory?.name}
              </h2>

              <div className="py-8">
                <CourseSlider
                  Courses={catalogPageData?.data?.differentCategory?.courses}
                />
              </div>
            </div>

            {/* Section 3 */}
            <div className="mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
              <h2 className="text-2xl font-semibold text-richblack-5">
                Frequently Bought
              </h2>

              <div className="py-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 px-1 py-5">
                  {catalogPageData?.data?.mostSellingCourses
                    ?.slice(0, 4)
                    .map((course, index) => (
                      <Course_Card
                        course={course}
                        key={index}
                        height={"h-[400px]"}
                      />
                    ))}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Catalog;
