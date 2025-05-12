import Image from 'next/image'
import React from 'react'

const Guide = () => {
  return (
    <section className="flexCenter flex-col">
      <div className="padding-container max-container w-full pb-24">
        <Image src="/palm.svg" alt="palm" width={50} height={50} />
        <p className="uppercase regular-18 -mt-1 mb-3 text-green-50">
          Pakar Sawit
        </p>
        <div className="flex flex-wrap justify-between gap-5 lg:gap-10">
          <h2 className="bold-40 lg:bold-64 xl:max-w-[390px]">Pak Kaspar Sinaga</h2>
          <p className="regular-16 text-gray-30 xl:max-w-[520px]">Pak Kaspar adalah seorang pakar di bidang kelapa sawit. Dengan pengalaman lebih dari 15 tahun mengelola dan meneliti perkebunan sawit, ia sangat paham tentang kebutuhan tanaman, mulai dari tahap pembibitan, perawatan harian, hingga penanganan penyakit yang menyerang. Pak Kaspar mampu mengidentifikasi gejala penyakit sawit hanya dengan melihat perubahan kecil pada daun atau batang. Ia juga sering memberikan solusi praktis kepada para petani untuk meningkatkan hasil panen mereka.</p>
        </div>
      </div>

      <div className="flexCenter max-container relative w-full">
        <div className="relative w-[1440px] h-[580px] 2xl:rounded-5xl overflow-hidden">
          <Image
            src="/sawit-3.jpg"
            alt="boat"
            fill
            className="object-cover object-center"
          />
        </div>



        <div className="absolute flex bg-white py-8 pl-5 pr-7 gap-3 rounded-3xl border shadow-md md:left-[5%] lg:top-20">
          <div className="rounded-full bg-green-50 p-4">
            <Image
              src="/location.svg"
              alt="map"
              width={28}
              height={28}
            />
          </div>
          <div className="flexBetween flex-col">
            <div className='flex w-full flex-col'>
              <p className="bold-16 text-green-50">Sekayu, Sumatera Selatan</p>
              <p className="bold-20 mt-2">Koperasi Cinta Alam Semesta</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Guide