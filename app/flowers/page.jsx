import React from 'react'

// NEXT JS
import Image from 'next/image'
import Link from 'next/link'

const Page = () => {
    const flowerCategories = [
        {
            name: 'Flower in Vase',
            image: 'https://imgcdn.floweraura.com/vase_0_3.jpg',
            url: '/flowers'
        },
        {
            name: 'Birthday',
            image: 'https://imgcdn.floweraura.com/birthday_44.jpg',
            url: '/flowers'
        },
        {
            name: 'Anniversary',
            image: 'https://imgcdn.floweraura.com/anniversary_38.jpg',
            url: '/flowers'
        },
        {
            name: 'Love & Affection',
            image: 'https://imgcdn.floweraura.com/love_and_romance_6.jpg',
            url: '/flowers'
        },
        {
            name: 'Flower Hampers',
            image: 'https://imgcdn.floweraura.com/hampers_36.jpg',
            url: '/flowers'
        },
        {
            name: 'Flower Gift Boxes',
            image: 'https://imgcdn.floweraura.com/box_0.jpg',
            url: '/flowers'
        },
    ]

    const flowerKinds = [
        {
            name: 'Roses',
            image: 'https://imgcdn.floweraura.com/rose_12.jpg',
            url: '/flowers/kinds/roses'
        },
        {
            name: 'Lilies',
            image: 'https://imgcdn.floweraura.com/lilies_14.jpg',
            url: '/flowers/kinds/roses'
        },
        {
            name: 'Orchids',
            image: 'https://imgcdn.floweraura.com/orchids_5.jpg',
            url: '/flowers/kinds/roses'
        },
        {
            name: 'Carnations',
            image: 'https://imgcdn.floweraura.com/carnations_15.jpg',
            url: '/flowers/kinds/roses'
        },
        {
            name: 'Gerberas',
            image: 'https://imgcdn.floweraura.com/gerberas_5.jpg',
            url: '/flowers/kinds/roses'
        },
    ]
    
    return (
        <>
            <div className="block justify-start items-start w-screen h-auto bg-white py-4 sm:py-4 md:py-8 lg:py-8 xl:py-8 text-[#494949] overflow-x-hidden">
                <div className="block w-full h-auto px-6 sm:px-6 md:px-10 lg:px-10 xl:px-10">
                    <div className="flex flex-col justify-start items-center w-full">
                        <div className="flex justify-start items-center w-full text-2xl sm:text-2xl md:text-4xl lg:text-4xl xl:text-4xl font-bold text-[#191919]">
                            Flowers
                        </div>
                        <div className="flex justify-start items-center w-full text-lg sm:text-lg md:text-xl lg:text-xl xl:text-xl font-medium text-[#797979]">
                            Select from categories
                        </div>
                    </div>

                    <div className="flex justify-start items-center w-auto h-auto mt-1 sm:mt-1 md:mt-4 lg:mt-4 xl:mt-4 pb-4 px-1 select-none space-x-6 overflow-x-scroll sm:overflow-x-scroll md:overflow-x-auto lg:overflow-x-auto xl:overflow-x-auto overflow-y-hidden">
                        {flowerCategories.map((item) => (<Link className="flex justify-start items-center w-auto h-full  no-outline" href={item.url} key={item.name}>
                            <div className="flex flex-col justify-center items-center w-full h-full hover:text-[#191919]">
                                <div className="flex justify-center items-center w-32 sm:w-32 md:w-44 lg:w-44 xl:w-44">
                                    <Image className="flex justify-center items-center w-full h-full rounded-full hover:ring-2 hover:ring-[#e5e5e5] ring-offset-2 duration-100"
                                        src={item.image}
                                        alt={item.name}
                                        width={1080}
                                        height={1080}
                                    />
                                </div>
                                <div className="flex justify-center items-center w-full mt-1 text-base sm:text-base md:text-lg lg:text-lg xl:text-lg text-center font-semibold leading-none">
                                    {item.name}
                                </div>
                            </div>
                        </Link>))}
                    </div>
                </div>

                <div className="block w-full h-auto my-2 sm:my-2 md:my-10 lg:my-10 xl:my-10 py-6 sm:py-6 md:py-10 lg:py-10 xl:py-10 px-6 sm:px-6 md:px-10 lg:px-10 xl:px-10 border-y-[1.5px] border-[#e5e5e5]">
                    <div className="flex flex-col justify-start items-center w-full">
                        <div className="flex justify-start items-center w-full text-2xl sm:text-2xl md:text-4xl lg:text-4xl xl:text-4xl font-bold text-[#191919]">
                            Flowers
                        </div>
                        <div className="flex justify-start items-center w-full text-lg sm:text-lg md:text-xl lg:text-xl xl:text-xl font-medium text-[#797979]">
                            Select from different kinds
                        </div>
                    </div>

                    <div className="flex justify-start items-center w-auto h-auto mt-2 pb-4 px-1 select-none space-x-6 overflow-x-scroll sm:overflow-x-scroll md:overflow-x-auto lg:overflow-x-auto xl:overflow-x-auto overflow-y-hidden">
                        {flowerKinds.map((item) => (<Link className="flex justify-start items-center w-auto h-full pt-2  no-outline" href={item.url} key={item.name}>
                            <div className="flex flex-col justify-center items-center w-full h-full hover:text-[#191919]">
                                <div className="flex justify-center items-center w-32 sm:w-32 md:w-44 lg:w-44 xl:w-44">
                                    <Image className="flex justify-center items-center w-full h-full rounded-full hover:ring-2 hover:ring-[#e5e5e5] ring-offset-2 duration-100"
                                        src={item.image}
                                        alt={item.name}
                                        width={1080}
                                        height={1080}
                                    />
                                </div>
                                <div className="flex justify-center items-center w-full mt-1 text-base sm:text-base md:text-lg lg:text-lg xl:text-lg text-center font-semibold leading-none">
                                    {item.name}
                                </div>
                            </div>
                        </Link>))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Page