import { useState } from 'react';
import Image from 'next/image';

interface CustomImageProps {
    src: string;
    alt: string;
    width: number;
    height: number;
    className?: string;
}

const CustomImage: React.FC<CustomImageProps> = ({ src, alt, width, height, className }) => {
    const [imageSrc, setImageSrc] = useState(src);

    const handleError = () => {
        setImageSrc('/images/no-image.png'); // Path to your default image
    };

    return (
        <Image 
            src={imageSrc} 
            alt={alt} 
            width={width} 
            height={height} 
            className={className} 
            onError={handleError} 
        />
    );
};

export default CustomImage;