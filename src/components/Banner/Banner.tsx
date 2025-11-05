import React from 'react'
import heroImage from "@/assets/hero-dubai.jpg";
import { BASE_URL } from '../Helper/Base_Url';

function Banner({ banners = []}) {
  const banner = banners[0]; // 👈 pick the first banner
  return (
   <>
  
    <section className="relative h-96 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={banner?.image ? `${BASE_URL}${banner?.image}/` : 'src/assets/hero-dubai.jpg'} alt={banner?.banner_titile} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="relative z-10 text-center text-white">
          <h1 className="text-5xl font-bold mb-4 animate-fade-in">
            {banner?.banner_titile}
          </h1>
          <p className="text-xl text-white/90">{banner?.banner_sub_titile}</p>
        </div>
      </section>
   
   </>
  )
}

export default Banner
