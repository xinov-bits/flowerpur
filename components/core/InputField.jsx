import React, { useEffect, useState } from 'react'

export const InputField = ({ name, type, placeholder, change }) => {
    const [inputError, setInputError] = useState(false);

    useEffect(() => {
        const handleInvalidInput = (e) => {
            e.target.setCustomValidity('');
            if (!e.target.validity.valid) {
                setInputError(true);
            }
        };

        const handleInput = (e) => {
            e.target.setCustomValidity('');
            setInputError(false);
        };

        const inputElement = document.getElementById(name);

        inputElement.addEventListener('invalid', handleInvalidInput);
        inputElement.addEventListener('input', handleInput);

        return () => {
            inputElement.removeEventListener('invalid', handleInvalidInput);
            inputElement.removeEventListener('input', handleInput);
        };
    }, [name]);

    return (
        <>
            <label htmlFor={name} className="relative block justify-start items-center w-full h-full rounded-md select-none">
                <div className={`flex justify-start items-center w-full ${name === 'promo_code' ? 'font-bold' : 'font-semibold'} text-[#191919] capitalize`}>
                    {name === 'promo_code' && 'Enter'} {placeholder}
                </div>

                <input
                    className={
                        `
                        flex justify-center items-center w-full h-full p-3 rounded-md ${inputError ? 'bg-[#fff0ed] hover:bg-[#fff0ed] ring-2 ring-[#b71000]' : 'bg-[#f7f7f7] ring-0'} placeholder:text-[#494949] text-[#494949] font-medium ${name === 'promo_code' ? '' : 'hover:bg-[#eeeeee]'} outline-none
                        `
                    }
                    id={name}
                    name={name}
                    placeholder={name === 'promo_code' ? '' : 'Required'}
                    onChange={(e) => {
                        change[1](e.target.value);
                    }}
                    required={true}
                    type={type}
                />

                {inputError && <div className="flex justify-start items-center w-auto mt-1.5 space-x-1 leading-none">
                    <svg className="flex justify-center items-center w-3.5 h-3.5" width={16} height={16}>
                        <use
                            xmlnsXlink="http://www.w3.org/1999/xlink"
                            xlinkHref="/on/demandware/svg/non-critical.svg#icon-error_dd"
                        ></use>
                    </svg>

                    <div> {placeholder} is required </div>
                </div>}
            </label>
        </>
    )
}
