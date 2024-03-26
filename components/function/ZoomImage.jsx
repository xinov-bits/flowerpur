import React, { useEffect, useState } from 'react'
import Image from 'next/image'

import InnerImageZoom from 'react-inner-image-zoom'
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.min.css';


const ZoomImage = ({ src, alt, width, height }) => {
    return (
        <>
            <div className="flex justify-center items-center overflow-hidden">
                <div className="flex justify-center items-center overflow-hidden duration-200 origin-center">
                    <InnerImageZoom
                        src={src}
                        alt={alt}
                        width={width}
                        height={height}
                        hasSpacer={true}
                        zoomSrc={src}
                        zoomType="hover"
                        zoomPreload={true}
                        fullscreenOnMobile={true}
                    />
                </div>
            </div>
        </>
    )
}

export default ZoomImage