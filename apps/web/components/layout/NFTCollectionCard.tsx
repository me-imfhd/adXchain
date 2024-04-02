import Image from 'next/image'
import React from 'react'
import Link from 'next/link'

interface NFTCollectionCardProps{
    imgURL: any;
    CollectionName: string;
    CollectionWebsite: string
    CollectionPlatFrom?:string
}

const NFTCollectionCard:React.FC<NFTCollectionCardProps> = ({imgURL, CollectionName, CollectionWebsite, CollectionPlatFrom}) => {
 return (
    <div className=' p-4 border-2 border-[#C2C1FF]  rounded-lg'>
        <div className='h-56 w-full relative'>
            <Image
                src={imgURL}
                alt='img'
                layout="fill" 
                objectFit="cover"
                className='rounded-xl'
            />
        </div>
        <div className='flex flex-col mt-4 items-start justify-between'>
            <span className='text-white text-xl'>Name: {" "} <span className='font-semibold'>{CollectionName}</span></span>
        <span>Website: {" "}<Link href={`${CollectionWebsite}`} className='text-blue-400 hover:underline'>{CollectionWebsite}</Link></span>
        {CollectionPlatFrom && <span>Platform: {" "}<Link href={`${CollectionPlatFrom}`} className='text-blue-300 hover:underline'>{CollectionPlatFrom}</Link></span>}
        </div>
    </div>
 )
}

export default NFTCollectionCard
