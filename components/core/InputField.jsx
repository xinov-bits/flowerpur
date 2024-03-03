import React from 'react'

export const InputField = ({ name, type, placeholder, change }) => {

    return (
        <>
            <label htmlFor={name} className="relative flex flex-col justify-start items-center w-full h-full rounded-md select-none">
                <div className="flex justify-start items-center w-full font-semibold text-[#191919] capitalize">
                    {placeholder}
                </div>

                <input
                    className="flex justify-center items-center w-full h-full p-3 mt-2 rounded-md bg-[#f7f7f7] placeholder:text-[#494949] text-[#494949] font-medium hover:bg-[#eeeeee] outline-none"
                    name={name}
                    placeholder={'Required'}
                    onChange={(e) => {
                        change[1](e.target.value);
                    }}
                    required={true}
                    type={type}
                />
            </label>
        </>
    )
}
