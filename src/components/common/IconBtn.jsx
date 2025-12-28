

const IconBtn = ({
    text,onclick,children,disabled,outline=false,customClasses,type
}) => {
  return (
    <button
    disabled={disabled}
    onClick={onclick}
    type={type}
    className="bg-yellow-100 w-fit p-2 rounded-md text-lg text-black font-bold font-sans cursor-pointer"
    >
        {
            children ? (<>
                    <span>
                        {text}
                    </span>
                    {children}
            </>) : (text)
        }
    </button>
  )
}

export default IconBtn