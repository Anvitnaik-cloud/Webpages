'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { useInView } from 'framer-motion';
import { AspectRatio } from '@/components/ui/aspect-ratio';

interface GalleryItem {
  src: string;
  alt: string;
  ratio: number;
  objectFit?: 'cover' | 'contain';
  containerClassName?: string;
}

const GALLERY_COLUMNS: GalleryItem[][] = [
  [
    {
      src: '/images/masonry/masonry-1.png',
      alt: 'Pluckk Product Showcase 1',
      ratio: 1,
    },
    {
      src: '/images/masonry/masonry-2.jpg',
      alt: 'Pluckk Product Showcase 2',
      ratio: 335 / 597,
    },
    {
      src: '/images/masonry/masonry-5.webp',
      alt: 'Pluckk Valencia Orange',
      ratio: 1035 / 1473,
    },
  ],
  [
    {
      src: '/images/masonry/masonry-3.png',
      alt: 'Pluckk Category Showcase 3',
      ratio: 1,
    },
    {
      src: '/images/masonry/masonry-6.jpg',
      alt: 'Pluckk Fresh Fruit 6',
      ratio: 684 / 448,
    },
  ],
  [
    {
      src: '/images/masonry/masonry-7.webp',
      alt: 'Pluckk Aam Panna',
      ratio: 1,
    },
    {
      src: '/images/masonry/masonry-4.jpg',
      alt: 'Pluckk Fresh Harvest',
      ratio: 2.2,
    },
    {
      src: '/images/masonry/berry-smoothie.avif',
      alt: 'Vibrant Berry Smoothie',
      ratio: 740 / 415,
    },
  ],
];

export function ImageGallery() {
	return (
		<div className="relative flex w-full flex-col items-center justify-center py-6 sm:py-12 px-4 sm:px-6">
			<div className="mx-auto grid w-full max-w-6xl gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
				{GALLERY_COLUMNS.map((col, colIdx) => (
					<div key={colIdx} className="grid gap-4 sm:gap-6">
						{col.map((item, index) => (
							<AnimatedImage
								key={`${colIdx}-${index}`}
								alt={item.alt}
								src={item.src}
								ratio={item.ratio}
								objectFit={item.objectFit}
								containerClassName={item.containerClassName}
							/>
						))}
					</div>
				))}
			</div>
		</div>
	);
}

interface AnimatedImageProps {
	alt: string;
	src: string;
	placeholder?: string;
	ratio: number;
	objectFit?: 'cover' | 'contain';
	containerClassName?: string;
}

function AnimatedImage({
	alt,
	src,
	ratio,
	placeholder,
	objectFit = 'cover',
	containerClassName,
}: AnimatedImageProps) {
	const ref = React.useRef(null);
	const isInView = useInView(ref, { once: true });
	const [isLoading, setIsLoading] = React.useState(true);
	const [imgSrc, setImgSrc] = React.useState(src);

	const handleError = () => {
		if (placeholder) {
			setImgSrc(placeholder);
		}
	};

	return (
		<div className={cn('w-full flex justify-center', containerClassName)}>
			<AspectRatio
				ref={ref}
				ratio={ratio}
				className="bg-accent relative size-full rounded-xl border border-zinc-200/80 shadow-sm overflow-hidden"
			>
				<img
					alt={alt}
					src={imgSrc}
					className={cn(
						'size-full rounded-xl opacity-0 transition-all duration-700 ease-in-out hover:scale-105',
						objectFit === 'contain' ? 'object-contain p-2 bg-white' : 'object-cover',
						{
							'opacity-100': isInView && !isLoading,
						},
					)}
					onLoad={() => setIsLoading(false)}
					loading="lazy"
					onError={handleError}
				/>
			</AspectRatio>
		</div>
	);
}
