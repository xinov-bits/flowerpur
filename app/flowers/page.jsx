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
            url: '/flowers/kinds/lilies'
        },
        {
            name: 'Orchids',
            image: 'https://imgcdn.floweraura.com/orchids_5.jpg',
            url: '/flowers/kinds/orchids'
        },
        {
            name: 'Carnations',
            image: 'https://imgcdn.floweraura.com/carnations_15.jpg',
            url: '/flowers/kinds/carnations'
        },
        {
            name: 'Gerberas',
            image: 'https://imgcdn.floweraura.com/gerberas_5.jpg',
            url: '/flowers/kinds/gerberas'
        },
    ]

    return (
        <>
            <div className="block justify-start items-start w-full h-auto bg-white py-8 text-[#494949]">
                <div className="block w-full h-auto px-10">
                    <div className="flex flex-col justify-start items-center w-full">
                        <div className="flex justify-start items-center w-full text-4xl font-bold text-[#191919]">
                            Flowers
                        </div>
                        <div className="flex justify-start items-center w-full text-xl font-medium text-[#797979]">
                            Select from categories
                        </div>
                    </div>

                    <div className="flex justify-start items-center w-auto h-auto mt-4 select-none space-x-6">
                        {flowerCategories.map((item) => (<Link className="flex justify-start items-center w-auto h-full" href={item.url} key={item.name}>
                            <div className="flex flex-col justify-center items-center w-full h-full hover:text-[#191919]">
                                <div className="flex justify-center items-center w-44">
                                    <Image className="flex justify-center items-center w-full h-full rounded-full hover:ring-2 hover:ring-[#e5e5e5] ring-offset-2 duration-100"
                                        src={item.image}
                                        alt={item.name}
                                        width={1080}
                                        height={1080}
                                    />
                                </div>
                                <div className="flex justify-center items-center w-full text-lg font-semibold">
                                    {item.name}
                                </div>
                            </div>
                        </Link>))}
                    </div>
                </div>

                <div className="block w-full h-auto my-10 py-10 px-10 border-y-[1.5px] border-[#e5e5e5]">
                    <div className="flex flex-col justify-start items-center w-full">
                        <div className="flex justify-start items-center w-full text-4xl font-bold text-[#191919]">
                            Flowers
                        </div>
                        <div className="flex justify-start items-center w-full text-xl font-medium text-[#797979]">
                            Select from different kinds
                        </div>
                    </div>

                    <div className="flex justify-start items-center w-auto h-auto mt-4 select-none space-x-6">
                        {flowerKinds.map((item) => (<Link className="flex justify-start items-center w-auto h-full" href={item.url} key={item.name}>
                            <div className="flex flex-col justify-center items-center w-full h-full hover:text-[#191919]">
                                <div className="flex justify-center items-center w-44">
                                    <Image className="flex justify-center items-center w-full h-full rounded-full hover:ring-2 hover:ring-[#e5e5e5] ring-offset-2 duration-100"
                                        src={item.image}
                                        alt={item.name}
                                        width={1080}
                                        height={1080}
                                    />
                                </div>
                                <div className="flex justify-center items-center w-full text-lg font-semibold">
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