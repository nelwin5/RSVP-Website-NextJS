import React from "react";
import Image from "next/image";

type GalleryTemplate1Props = {
  images: string[];
  onImageUpload: (event: React.ChangeEvent<HTMLInputElement>, index: number) => void;
};

const GalleryTemplate1 = ({ images = [], onImageUpload }: GalleryTemplate1Props) => {
  return (
    <div className="container mx-auto p-4 lg:p-6 rounded-3xl shadow-[0_1px_5px_rgba(0,0,0,0.2)]">
      <div className="flex flex-wrap gap-4 items-stretch min-h-full h-full">
        {/* Column 1 */}
        <div className="flex w-1/2 flex-wrap gap-4 flex-1">
          <div className="w-full">
            <div className="flex h-[300px] w-full rounded-lg bg-gray-300 items-center justify-center relative">
              {images[0] ? (
                <Image src={images[0]} alt="Frame 1" layout="fill" objectFit="cover" />
              ) : (
                <p className="text-black text-2xl font-bold">+</p> // Changed here to show "+"
              )}
              <input
                type="file"
                accept="image/*"
                className="absolute inset-0 opacity-0 cursor-pointer"
                onChange={(event) => onImageUpload(event, 0)}
              />
            </div>
          </div>
          <div className="flex w-full gap-4">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index + 1} className="w-1/3">
                <div className="flex h-[170px] w-full rounded-lg bg-gray-400 items-center justify-center relative">
                  {images[index + 1] ? (
                    <Image src={images[index + 1]} alt={`Frame ${index + 2}`} layout="fill" objectFit="cover" />
                  ) : (
                    <p className="text-black text-2xl font-bold">+</p> // Changed here to show "+"
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    onChange={(event) => onImageUpload(event, index + 1)}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="flex w-full gap-4">
            <div className="w-1/2">
              <div className="flex h-[190px] w-full rounded-lg bg-gray-700 items-center justify-center relative">
                {images[4] ? (
                  <Image src={images[4]} alt="Frame 5" layout="fill" objectFit="cover" />
                ) : (
                  <p className="text-black text-2xl font-bold">+</p> // Changed here to show "+"
                )}
                <input
                  type="file"
                  accept="image/*"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  onChange={(event) => onImageUpload(event, 4)}
                />
              </div>
            </div>
            <div className="w-1/2">
              <div className="flex h-[190px] w-full rounded-lg bg-gray-800 items-center justify-center relative">
                {images[5] ? (
                  <Image src={images[5]} alt="Frame 6" layout="fill" objectFit="cover" />
                ) : (
                  <p className="text-black text-2xl font-bold">+</p> // Changed here to show "+"
                )}
                <input
                  type="file"
                  accept="image/*"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  onChange={(event) => onImageUpload(event, 5)}
                />
              </div>
            </div>
          </div>
        </div>
        {/* Column 2 */}
        <div className="flex w-1/2 flex-wrap gap-4 flex-1">
          <div className="w-full">
            <div className="flex h-[220px] w-full rounded-lg bg-gray-500 items-center justify-center relative">
              {images[6] ? (
                <Image src={images[6]} alt="Frame 7" layout="fill" objectFit="cover" />
              ) : (
                <p className="text-black text-2xl font-bold">+</p> // Changed here to show "+"
              )}
              <input
                type="file"
                accept="image/*"
                className="absolute inset-0 opacity-0 cursor-pointer"
                onChange={(event) => onImageUpload(event, 6)}
              />
            </div>
          </div>
          <div className="flex w-full gap-4">
            <div className="w-1/2">
              <div className="flex h-[190px] w-full rounded-lg bg-gray-600 items-center justify-center relative">
                {images[7] ? (
                  <Image src={images[7]} alt="Frame 8" layout="fill" objectFit="cover" />
                ) : (
                  <p className="text-black text-2xl font-bold">+</p> // Changed here to show "+"
                )}
                <input
                  type="file"
                  accept="image/*"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  onChange={(event) => onImageUpload(event, 7)}
                />
              </div>
            </div>
            <div className="w-1/2">
              <div className="flex h-[190px] w-full rounded-lg bg-gray-700 items-center justify-center relative">
                {images[8] ? (
                  <Image src={images[8]} alt="Frame 9" layout="fill" objectFit="cover" />
                ) : (
                  <p className="text-black text-2xl font-bold">+</p> // Changed here to show "+"
                )}
                <input
                  type="file"
                  accept="image/*"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  onChange={(event) => onImageUpload(event, 8)}
                />
              </div>
            </div>
          </div>
          <div className="w-full">
            <div className="flex h-[250px] w-full rounded-lg bg-gray-800 items-center justify-center relative">
              {images[9] ? (
                <Image src={images[9]} alt="Frame 10" layout="fill" objectFit="cover" />
              ) : (
                <p className="text-black text-2xl font-bold">+</p> // Changed here to show "+"
              )}
              <input
                type="file"
                accept="image/*"
                className="absolute inset-0 opacity-0 cursor-pointer"
                onChange={(event) => onImageUpload(event, 9)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GalleryTemplate1;
