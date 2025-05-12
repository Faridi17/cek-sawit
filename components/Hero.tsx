import Image from 'next/image'
import Button from './Button'

const Hero = () => {
  return (
    <section className="max-container padding-container flex flex-col gap-20 py-10 pb-32 md:gap-28 lg:py-20 xl:flex-row">
      <div className="" />

      <div className="relative z-20 flex flex-1 flex-col xl:w-1/2">
        <Image
          src="/palm.svg"
          alt="palm"
          width={50}
          height={50}
          className="absolute left-[-5px] top-[-30px] w-10 lg:w-[50px]"
        />

        <h1 className="bold-48 lg:bold-72">Sistem Pakar Penyakit Tanaman Sawit</h1>
        <div className="my-2 flex flex-wrap gap-5">

          <p className="bold-16 lg:bold-20 text-green-50">
            Powered by <span className='text-gray-800'>Kaspar Sinaga</span>
          </p>
        </div>
        <p className="regular-16 mt-4 text-gray-30 xl:max-w-[520px] mb-8">
          Solusi cepat untuk mengidentifikasi penyakit pada tanaman sawit dan mendapatkan saran perawatan yang tepat. Dengan antarmuka yang mudah digunakan dan rekomendasi tindakan lapangan yang praktis.
        </p>



        <div className="flex flex-col w-full gap-3 sm:flex-row">
          <Button
            type="button"
            title="Mulai Diagnosa"
            variant="btn_green"
            href='diagnosa'
          />

        </div>
      </div>

      <div className="relative flex flex-1 items-start bg-feature-bg">
        <div className="relative z-20 flex w-[268px] flex-col gap-4 rounded-3xl bg-green-90 px-7 py-8">

          <div className="flex flex-col">
            <div className="flexBetween">
              <p className="regular-16 text-gray-20">Hasil Diagnosa</p>
              <Image src="/close.svg" alt="close" width={24} height={24} />
            </div>
            <p className="bold-20 text-white">Terserang Penyakit</p>
          </div>
          <div className="flex flex-col">
            <p className="regular-16 block text-gray-20">Tingkat Kepastian</p>
            <p className="bold-20 text-white">90%</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
