import React from 'react';

const stats = [
    {count:"5K",label:"Active Students"},
    {count:"10+",label:"Mentors"},
    {count:"200+",label:"Courses"},
    {count:"50+",label:"Awards"},
]

const StatsComponent = () => {
  return (
    <section className='bg-richblack-700 mb-32 mt-16 mx-auto'>
        <div>
            <div className='text-white lg:flex gap-32 items-center justify-center'>
                {
                    stats.map((data,index)=>{
                        return (
                            <div key={index} >
                                <p className='text-center text-4xl font-semibold font-sans py-2'>{data.count}</p>
                                <p className='text-center text-lg text-richblack-100 py-2'>{data.label}</p>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    </section>
  )
}

export default StatsComponent;
