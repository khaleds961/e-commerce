import Image from 'next/image';

export default function Subscribe() {
  return (
    <div className="relative h-auto min-h-[400px] md:h-[440px] overflow-hidden bg-[#121535] rounded-[8px] md:rounded-[16px] w-full">
      {/* Background Image */}
      <div className="absolute inset-0 z-0 opacity-10">
        <Image
          src="/images/newsletter-bg.png"
          alt="Background"
          layout="fill"
          objectFit="cover"
          priority
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 py-8 md:py-0 flex items-center">
        <div className="flex flex-col md:flex-row justify-between items-center w-full gap-6 md:gap-8">
          
          {/* Left Text Section */}
          <div className="text-white text-center md:text-left w-full max-w-2xl order-2 md:order-1">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2 md:mb-4">
              Don't Miss Out on Grocery Deals
            </h2>
            <p className="text-sm md:text-base lg:text-lg mb-4 md:mb-6">
              SIGN UP FOR THE UPDATE NEWSLETTER
            </p>

            <form className="relative w-full mt-4 md:mt-6 max-w-[753px]">
              <input
                type="email"
                className="w-full h-[50px] md:h-[60px] lg:h-[67px] pl-4 md:pl-6 pr-32 md:pr-40 text-white bg-[#1e293b] border border-gray-600 rounded-full focus:outline-none placeholder:text-white text-sm md:text-base"
                placeholder="Your email address..."
              />
              <button
                type="submit"
                className="absolute top-1/2 -translate-y-1/2 right-1 md:right-2 bg-[#ff8c00] hover:bg-[#e67e00] text-white px-4 py-2 md:px-6 md:py-3 rounded-full transition-colors text-xs md:text-sm font-semibold"
              >
                Subscribe
              </button>
            </form>
          </div>

          {/* Right Image Section - Hidden on small screens if needed */}
          <div className="w-full md:w-[300px] lg:w-[400px] xl:w-[581px] h-[200px] md:h-[300px] lg:h-[383px] flex justify-center items-center order-1 md:order-2">
            <Image
              src="/images/newsletter-img.png"
              alt="Newsletter"
              width={581}
              height={383}
              className="object-contain w-full h-full"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
}