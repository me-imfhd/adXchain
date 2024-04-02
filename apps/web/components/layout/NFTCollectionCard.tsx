import Image from 'next/image'
import React from 'react'
import Link from 'next/link'

interface NFTCollectionCardProps{
    imgURL: any;
    CollectionName: string;
    CollectionWebsite: string
}

const NFTCollectionCard:React.FC<NFTCollectionCardProps> = ({imgURL, CollectionName, CollectionWebsite}) => {
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
            <span className='text-white font-semibold text-xl'>{CollectionName}'s Collection</span>
        <Link href={`${CollectionWebsite}`} className='text-blue-400 hover:underline'>{CollectionWebsite}</Link>
        </div>
    </div>
 )
}

export default NFTCollectionCard
