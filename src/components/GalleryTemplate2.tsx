import React from "react";
import Image from "next/image";

type GalleryTemplate3Props = {
  images: string[];
  onImageUpload: (event: React.ChangeEvent<HTMLInputElement>, index: number) => void;
};

const GalleryTemplate3 = ({ images = [], onImageUpload }: GalleryTemplate3Props) => {
  return (
    <div className="container mx-auto p-4 lg:p-6 rounded-3xl shadow-[0_1px_5px_rgba(0,0,0,0.2)]">
      <div className="flex gap-4 items-stretch min-h-full h-full">
        {/* Left Column - 2/3 Width with 2 Rows */}
        <div className="flex w-2/3 flex-wrap gap-4">
          <div className="w-full flex gap-4">
            {/* Column 1 */}
            <div className="flex h-[250px] w-1/3 rounded-lg bg-gray-300 items-center justify-center relative">
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
            {/* Column 2 */}
            <div className="flex h-[250px] w-1/3 rounded-lg bg-gray-300 items-center justify-center relative">
              {images[1] ? (
                <Image src={images[1]} alt="Frame 2" layout="fill" objectFit="cover" />
              ) : (
                <p className="text-black text-2xl font-bold">+</p> // Changed here to show "+"
              )}
              <input
                type="file"
                accept="image/*"
                className="absolute inset-0 opacity-0 cursor-pointer"
                onChange={(event) => onImageUpload(event, 1)}
              />
            </div>
            {/* Column 3 */}
            <div className="flex h-[250px] w-1/3 rounded-lg bg-gray-300 items-center justify-center relative">
              {images[2] ? (
                <Image src={images[2]} alt="Frame 3" layout="fill" objectFit="cover" />
              ) : (
                <p className="text-black text-2xl font-bold">+</p> // Changed here to show "+"
              )}
              <input
                type="file"
                accept="image/*"
                className="absolute inset-0 opacity-0 cursor-pointer"
                onChange={(event) => onImageUpload(event, 2)}
              />
            </div>
          </div>
          <div className="w-full flex gap-4">
            {/* 1/3 Column */}
            <div className="flex h-[410px] w-1/3 rounded-lg bg-gray-300 items-center justify-center relative">
              {images[3] ? (
                <Image src={images[3]} alt="Frame 4" layout="fill" objectFit="cover" />
              ) : (
                <p className="text-black text-2xl font-bold">+</p> // Changed here to show "+"
              )}
              <input
                type="file"
                accept="image/*"
                className="absolute inset-0 opacity-0 cursor-pointer"
                onChange={(event) => onImageUpload(event, 3)}
              />
            </div>
            {/* 2/3 Column - Two Rows */}
            <div className="flex flex-col h-[410px] w-2/3 gap-4">
              {/* Top Row - Two Images */}
              <div className="flex gap-4 h-1/2">
                <div className="flex w-1/2 rounded-lg bg-gray-300 items-center justify-center relative">
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
                <div className="flex w-1/2 rounded-lg bg-gray-300 items-center justify-center relative">
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
              {/* Bottom Row - Three Images */}
              <div className="flex gap-4 h-1/2">
                <div className="flex w-1/3 rounded-lg bg-gray-300 items-center justify-center relative">
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
                <div className="flex w-1/3 rounded-lg bg-gray-300 items-center justify-center relative">
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
                <div className="flex w-1/3 rounded-lg bg-gray-300 items-center justify-center relative">
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
          </div>
        </div>
        {/* Right Column - 1/3 Width */}
        <div className="flex w-1/3 flex-wrap gap-4">
          <div className="w-full">
            <div className="flex h-[670px] w-full rounded-lg bg-gray-300 items-center justify-center relative">
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

export default GalleryTemplate3;
