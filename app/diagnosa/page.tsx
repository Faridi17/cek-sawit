'use client'

import Image from 'next/image'
import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { BsTextParagraph } from "react-icons/bs";

interface FormData {
    status_tanaman: string;
    bagian_terdampak: string;
    tingkat_keparahan: string;
}

const disease = {
    tidak_ada_penyakit: {
        name: "Tidak Ada Penyakit",
    },
    ganoderma: {
        name: "Ganoderma",
        is: "Penyakit Ganoderma merupakan salah satu jenis penyakit yang sangat mematikan bagi tanaman kelapa sawit di perkebunan. Serangan penyakit ini berasal dari jamur Ganoderma sp. Gejalanya meliputi layu, daun menguning, serta busuk pada bagian batang.",
        treatment: [
            "Gunakan fungisida berbasis Trichoderma untuk mengendalikan infeksi.",
            "Lakukan sanitasi kebun secara rutin untuk mencegah penyebaran.",
            "Periksa akar secara berkala dan buang pohon yang terinfeksi."
        ]
    },
    busuk_buah: {
        name: "Busuk Buah",
        is: "Penyebab utama buah sawit busuk sebelum matang adalah serangan jamur patogen Marasmius palmivorus. Infeksi ini menyebabkan buah cepat membusuk dan jatuh, menurunkan produktivitas kebun secara signifikan, terutama saat kondisi lingkungan lembap.",
        treatment: [
            "Pemangkasan buah yang terinfeksi.",
            "Aplikasi fungisida untuk mencegah penyebaran jamur.",
            "Jaga kebersihan kebun dengan memusnahkan buah yang terinfeksi."
        ]
    },
    busuk_akar: {
        name: "Busuk Akar",
        is: "Busuk akar pada kelapa sawit disebabkan oleh infeksi jamur tanah yang menyerang sistem perakaran. Infeksi ini menyebabkan akar membusuk, pohon menjadi kerdil, layu, hingga akhirnya mati karena tidak mampu menyerap air dan nutrisi.",
        treatment: [
            "Gunakan fungisida sistemik yang dapat meresap ke dalam tanah.",
            "Pangkas akar yang terinfeksi untuk menghindari penyebaran lebih lanjut."
        ]
    },
    busuk_pangkal_batang: {
        name: "Busuk Pangkal Batang",
        is: "Busuk pangkal batang terjadi akibat infeksi jamur atau bakteri yang menyerang bagian bawah batang dekat permukaan tanah. Gejalanya berupa jaringan batang yang melembek, berwarna gelap, dan mengeluarkan bau busuk.",
        treatment: [
            "Pangkas bagian batang yang terinfeksi.",
            "Aplikasi fungisida lokal pada bagian yang terkontaminasi.",
            "Perbaiki drainase tanah untuk menghindari kelembapan berlebih."
        ]
    },
    busuk_pangkal_atas: {
        name: "Busuk Pangkal Atas",
        is: "Busuk pangkal atas menyerang bagian atas batang tanaman, biasanya karena infeksi jamur setelah luka mekanis atau akibat kelembapan berlebih. Tanaman menunjukkan tanda-tanda layu dan pertumbuhan terganggu.",
        treatment: [
            "Pangkas bagian yang terinfeksi dan buang bagian tanaman yang terkontaminasi.",
            "Gunakan fungisida untuk mengendalikan penyebaran infeksi.",
            "Perbaiki sirkulasi udara dan hindari kelebihan air di sekitar pangkal tanaman."
        ]
    },
    daun_menguning: {
        name: "Daun Menguning",
        is: "Daun menguning bisa disebabkan oleh kekurangan unsur hara, terutama nitrogen, atau akibat serangan hama dan penyakit. Tanaman yang kekurangan nutrisi akan menunjukkan daun berwarna kuning, kering, dan mudah rontok.",
        treatment: [
            "Berikan pupuk yang mengandung unsur hara lengkap, terutama nitrogen.",
            "Perbaiki sistem irigasi agar tanaman tidak kekurangan air.",
            "Periksa kemungkinan serangan hama atau penyakit lain."
        ]
    },
    bercak_daun: {
        name: "Bercak Daun",
        is: "Bercak daun pada kelapa sawit biasanya disebabkan oleh infeksi jamur. Gejalanya berupa bercak-bercak kecil berwarna cokelat atau hitam pada permukaan daun yang bisa meluas dan menyebabkan daun mati.",
        treatment: [
            "Aplikasi fungisida yang sesuai untuk mengendalikan jamur penyebab bercak.",
            "Lakukan pemangkasan daun yang terinfeksi untuk mengurangi sumber penyakit.",
            "Pastikan kebersihan kebun dengan membuang daun-daun yang terinfeksi."
        ]
    }
} as const;


type DiseaseKey = keyof typeof disease;


const DiagnosaPage = () => {
    const [detectedDisease, setDetectedDisease] = useState<DiseaseKey | "">('');
    const [loading, setLoading] = useState(false)
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<FormData>()

    console.log(disease);


    const onSubmit: SubmitHandler<FormData> = (data, e) => {
        e?.preventDefault();
        setLoading(true);

        const { status_tanaman, bagian_terdampak, tingkat_keparahan } = data;
        let result: keyof typeof disease | "" = "";


        if (status_tanaman === "bercak_cokelat" && bagian_terdampak === "daun") result = "bercak_daun";
        else if (status_tanaman === "bercak_cokelat" && bagian_terdampak === "buah") result = "busuk_buah";
        else if (status_tanaman === "bercak_cokelat" && bagian_terdampak === "akar" && tingkat_keparahan === "ringan") result = "tidak_ada_penyakit";
        else if (status_tanaman === "bercak_cokelat" && bagian_terdampak === "akar" && tingkat_keparahan === "parah") result = "busuk_akar";
        else if (status_tanaman === "bercak_cokelat" && bagian_terdampak === "batang") result = "busuk_pangkal_batang";

        else if (status_tanaman === "menguning" && bagian_terdampak === "daun") result = "daun_menguning";
        else if (status_tanaman === "menguning" && bagian_terdampak === "buah" && tingkat_keparahan === "ringan") result = "tidak_ada_penyakit";
        else if (status_tanaman === "menguning" && bagian_terdampak === "buah" && tingkat_keparahan === "parah") result = "busuk_buah";
        else if (status_tanaman === "menguning" && bagian_terdampak === "akar") result = "ganoderma";
        else if (status_tanaman === "menguning" && bagian_terdampak === "batang") result = "busuk_pangkal_atas";

        else if ((status_tanaman === "layu" && bagian_terdampak === "buah") || (status_tanaman === "pembusukan" && bagian_terdampak === "buah")) result = "busuk_buah";
        else if ((status_tanaman === "layu" && bagian_terdampak === "akar") || (status_tanaman === "pembusukan" && bagian_terdampak === "akar")) result = "busuk_akar";
        else if ((status_tanaman === "layu" && bagian_terdampak === "batang" && tingkat_keparahan === "ringan") || (status_tanaman === "pembusukan" && bagian_terdampak === "batang" && tingkat_keparahan === "ringan")) result = "busuk_pangkal_atas";
        else if ((status_tanaman === "layu" && bagian_terdampak === "batang" && tingkat_keparahan === "parah") || (status_tanaman === "pembusukan" && bagian_terdampak === "batang" && tingkat_keparahan === "parah")) result = "busuk_pangkal_batang";

        else if ((status_tanaman === "layu" && bagian_terdampak === "daun" && tingkat_keparahan === "ringan") || (status_tanaman === "pembusukan" && bagian_terdampak === "daun")) result = "bercak_daun";
        else if (status_tanaman === "layu" && bagian_terdampak === "daun" && tingkat_keparahan === "parah") result = "daun_menguning";

        else if (status_tanaman === "pertumbuhan_lambat" && bagian_terdampak === "daun") result = "daun_menguning";
        else if (status_tanaman === "pertumbuhan_lambat" && bagian_terdampak === "buah") result = "tidak_ada_penyakit";
        else if (status_tanaman === "pertumbuhan_lambat" && bagian_terdampak === "akar") result = "ganoderma";
        else if (status_tanaman === "pertumbuhan_lambat" && bagian_terdampak === "batang") result = "busuk_pangkal_batang";


        setDetectedDisease(result);
        setLoading(false);
    };

    return (
        <div className="max-container padding-container flex flex-col gap-14 py-10 pb-32 xl:gap-32 lg:py-20 xl:flex-row">
            <div className='xl:w-1/2'>
                <form onSubmit={handleSubmit(onSubmit)} >
                    <div className='relative'>
                        <Image
                            src="/palm.svg"
                            alt="palm"
                            width={50}
                            height={50}
                            className="absolute left-[-10px] top-[-28px] w-10 lg:w-[50px] opacity-95"
                        />
                        <h2 className="bold-40 lg:bold-64">Mulai Diagnosa</h2>
                    </div>
                    <div className='my-7 space-y-2'>
                        <label className='text-lg text-green-50 font-semibold'>Status Tanaman</label>
                        <select
                            id="status_tanaman"
                            {...register('status_tanaman', { required: true })}
                            className="outline-none h-[3.4rem] border-4 bg-white font-medium text-lg text-gray-800 rounded-xl border-gray-300 block w-full p-2.5 focus:outline-none focus:ring-green-50 focus:border-green-50"
                        >
                            <option value="bercak_cokelat">Bercak Cokelat</option>
                            <option value="menguning">Menguning</option>
                            <option value="layu">Layu</option>
                            <option value="pertumbuhan_lambat">Pertumbuhan Lambat</option>
                            <option value="pembusukan">Pembusukan</option>
                        </select>
                    </div>

                    <div className='my-7 space-y-2'>
                        <label className='text-lg text-green-50 font-semibold'>Bagian Terdampak</label>
                        <select
                            id="bagian_terdampak"
                            {...register('bagian_terdampak', { required: true })}
                            className="outline-none h-[3.4rem] border-4 bg-white font-medium text-lg text-gray-800 rounded-xl border-gray-300 block w-full p-2.5 focus:outline-none focus:ring-green-50 focus:border-green-50"
                        >
                            <option value="daun">Daun</option>
                            <option value="buah">Buah</option>
                            <option value="akar">Akar</option>
                            <option value="batang">Batang</option>
                        </select>
                    </div>

                    <div className='my-7 space-y-2'>
                        <label className='text-lg text-green-50 font-semibold'>Tingkat Keparahan</label>
                        <select
                            id="tingkat_keparahan"
                            {...register('tingkat_keparahan', { required: true })}
                            className="outline-none h-[3.4rem] border-4 bg-white font-medium text-lg text-gray-800 rounded-xl border-gray-300 block w-full p-2.5 focus:outline-none focus:ring-green-50 focus:border-green-50"
                        >
                            <option value="ringan">Ringan</option>
                            <option value="parah">Parah</option>
                        </select>
                    </div>

                    <div className='mt-12'>
                        {loading ?
                            <button type='submit' disabled className='w-full bold-20 bg-green-50 rounded-xl text-white py-3'>Loading...</button>
                            :
                            <button type='submit' className='w-full bold-20 bg-green-50 rounded-xl text-white py-3'>Diagnosa</button>
                        }
                    </div>
                </form>
            </div>
            <div className='xl:w-1/2 2xl:w-7/12 py-6'>
                <h1 className='lg:bold-40 bold-32 text-gray-800 px-3'>Hasil Diagnosa</h1>
                {detectedDisease ? (
                    <div className="mt-4 xl:mt-8 xl:p-9 p-5 xl:border-4 rounded-lg">
                        {detectedDisease === "tidak_ada_penyakit" ? (
                            <div className='mb-4'>
                                <h2 className="bold-24">{disease[detectedDisease]?.name || "Tidak Diketahui"}</h2>
                            </div>
                        ) : (
                            <>
                                <div className='space-y-8 mb-8'>
                                    <h2 className="lg:bold-32 bold-24">{disease[detectedDisease]?.name || "Tidak Diketahui"}</h2>
                                    <p className='text-gray-50'>{disease[detectedDisease]?.is}</p>
                                </div>
                                <div className="space-y-8">
                                    <h2 className='lg:bold-32 bold-24 text-gray-800'>Penanganan</h2>
                                    <ul className="mt-4 space-y-4">
                                        {disease[detectedDisease]?.treatment?.map((treatment, index) => (
                                            <li key={index} className="flex items-start gap-3">
                                                <div className="h-8 w-8 px-3 flex items-center justify-center bg-green-50 text-white rounded-full font-bold flex-shrink-0">
                                                    {index + 1}
                                                </div>
                                                <p className="text-gray-50 xl:mt-1">{treatment}</p>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </>
                        )}
                    </div>
                ) : (
                    <div className='mt-4 xl:mt-8 border-dashed border-4 rounded-lg flex flex-col items-center justify-center h-[22rem]'>
                        <BsTextParagraph className='text-gray-600' size={70} />
                        <p className='text-gray-500 mt-4'>Belum ada hasil diagnosa</p>
                    </div>
                )}

            </div>
        </div>
    )
}

export default DiagnosaPage