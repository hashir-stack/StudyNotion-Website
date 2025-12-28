import  { useState } from 'react';
import { Chart,registerables } from 'chart.js';
import { Pie } from 'react-chartjs-2';

Chart.register(...registerables);

const InstructorChart = ({courses}) => {

  const[currChart,setCurrChart] = useState("students");

  // function for the random colors
  const getRandomColor=(numColor)=>{
    const colors = [];
    for(let i=0; i<numColor;i++){

      const color =`rgb(${Math.floor( Math.random() * 256 )},${Math.floor( Math.random() * 256 )},${Math.floor( Math.random() * 256 )})`;

      colors.push(color);
    }
    return colors;
  }

  // create data for the chart of students info
  const chartDataForStudents = {
    labels:courses.map((course)=>course.courseName),
    datasets:[
      {
        data:courses.map((course)=>course.totalStudentsEnrolled),
        backgroundColor: getRandomColor(courses.length),
      }
    ]
  }

  // create data for the chart of income info
  const chartDataForIncome ={
    labels:courses.map((course)=>course.courseName),
    datasets:[
      {
        data:courses.map((course)=>course.totalAmountGenerated),
        backgroundColor: getRandomColor(courses.length),
      }
    ]
  }

  // create options
  const options = {}

  // maintainAspectRatio: false

  return (
    // 
    <div className="flex flex-1 flex-col gap-y-4 rounded-2xl bg-richblack-800 p-6 mt-10 md:p-8 lg:p-10">
    <p className="text-xl md:text-2xl font-bold text-richblack-5 font-sans">Visualise</p>

    <div className="flex flex-wrap gap-2 font-semibold">
      <button
        className={`rounded-sm p-1 px-3 transition-all duration-200 ${
          currChart === "students"
            ? "bg-richblack-700 text-yellow-50"
            : "text-yellow-400"
        }`}
        onClick={() => setCurrChart("students")}
      >
        Students
      </button>
      <button
        className={`rounded-sm p-1 px-3 transition-all duration-200 ${
          currChart === "income"
            ? "bg-richblack-700 text-yellow-50"
            : "text-yellow-400"
        }`}
        onClick={() => setCurrChart("income")}
      >
        Income
      </button>
    </div>

    <div className="relative mx-auto aspect-square w-full max-w-[300px] sm:max-w-[400px] md:max-w-[500px] lg:max-w-[600px]">
      <Pie
        data={currChart === "students" ? chartDataForStudents : chartDataForIncome}
        options={options}
      />
    </div>
  </div>

  )
}

export default InstructorChart;