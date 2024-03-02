'use client'

import React, { useEffect, useState } from 'react'
import { Suspense } from 'react'

// NEXT JS
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation';

// FRAMER MOTION
import { AnimatePresence, motion } from 'framer-motion';

// COMPONENTS
import ProductCart from '@/components/sections/ProductCart';

// AXIOS
import axios from 'axios';

export const Search = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const keyword = (searchParams.get('keyword'))?.toLowerCase();

    // GET COURSES
    const [courses, setCourses] = useState([]);

    const fetchData = async () => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/getcourses`, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            setCourses(response.data);
        } catch (error) {
            console.error('There was a problem with your fetch operation:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);


    // SEARCH
    const [searchKeyword, setSearchKeyword] = useState(keyword);

    const handleSearchSubmit = async (event) => {
        event.preventDefault();

        router.push(`/search?keyword=${searchKeyword}`)
    }

    useEffect(() => {
        setSearchKeyword(keyword);
    }, [keyword])

    const filteredCourses = Object.keys(courses).filter((item) => {
        if ((JSON.stringify(courses[item].slug)?.toLowerCase().includes(searchKeyword)
            || JSON.stringify(courses[item].title)?.toLowerCase().includes(searchKeyword)
            || JSON.stringify(courses[item].price)?.toLowerCase().includes(searchKeyword)
            || JSON.stringify(courses[item].desc)?.toLowerCase().includes(searchKeyword)
            || JSON.stringify(courses[item].category)?.toLowerCase().includes(searchKeyword)
            || JSON.stringify(courses[item].duration)?.toLowerCase().includes(searchKeyword))) {
            return courses[item];
        }
    }).map((item) => courses[item]);

    return (
        <>
            <div className="flex flex-col justify-start items-center w-full h-full">
                <div className="flex justify-start items-center w-full text-2xl font-semibold leading-none">
                    Search results for &#34;{searchKeyword}&#34;
                </div>

                <div className="hidden sm:hidden md:flex lg:flex xl:flex justify-start items-center w-full mt-4 text-base leading-none text-[#767676]">
                    <form className="relative flex justify-center items-center w-full h-full bg-white" htmlFor="search_inp_keyw" onSubmit={handleSearchSubmit}>
                        <div className="absolute left-0 flex justify-center items-center w-8 h-full pointer-events-none">
                            <svg className="flex justify-center items-center w-4 h-4" width={16} height={16}>
                                <use
                                    xmlnsXlink="http://www.w3.org/1999/xlink"
                                    xlinkHref="/on/demandware/svg/non-critical.svg#icon-search"
                                ></use>
                            </svg>
                        </div>

                        <input className="flex justify-center items-center w-full h-full pl-8 p-2 border border-[#e5e5e5] hover:bg-[#f7f7f7] active:border-[#c0c0c0] focus:border-[#c0c0c0] focus:ring-[2.5px] focus:ring-[#f1f1f1] rounded leading-none text-sm font-medium duration-100 bg-transparent placeholder:text-[#767676]  no-outline" placeholder="Search for courses, skills, anything" type="text" name="search_inp_keyw"
                            onChange={(event) => {
                                setSearchKeyword(event.target.value);
                            }}
                        />
                    </form>
                </div>


                <div className="flex justify-start items-center w-full mt-6">
                    {filteredCourses.length > 0 ? <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-x-4 gap-y-8 justify-center items-center w-full">
                        {Object.keys(filteredCourses).map((k) => {
                            return <ProductCart key={filteredCourses[k]._id}
                                url={filteredCourses[k].slug}
                                name={filteredCourses[k].title}
                                image={filteredCourses[k].dimg}
                                price={filteredCourses[k].price}
                                description={filteredCourses[k].desc}
                                category={filteredCourses[k].category}
                                duration={filteredCourses[k].duration}
                            />
                        })}
                    </div> : <div className="flex justify-start items-center w-full">
                        <div className="flex justify-start items-center w-full text-lg font-medium text-[#767676] leading-none">
                            &#40; No results for the search &#41;
                        </div>
                    </div>}
                </div>
            </div>
        </>
    )
}