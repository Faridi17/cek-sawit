'use client'

import Image from 'next/image'
import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { BsTextParagraph } from "react-icons/bs";

interface FormData {
    bercak_daun: 'ya' | 'tidak';
    daun_menguning: 'ya' | 'tidak';
    busuk_pangkal_batang: 'ya' | 'tidak';
    busuk_pangkal_atas: 'ya' | 'tidak';
    busuk_akar: 'ya' | 'tidak';
    ganoderma: 'ya' | 'tidak';
    busuk_buah: 'ya' | 'tidak';
    buah_cacat: 'ya' | 'tidak';
}

const cfRules: Record<string, number> = {
    // Kondisi Daun
    kondisi_daun_ok: 0.0,
    kondisi_daun_not_ok: 0.6,

    // Kondisi Batang
    kondisi_batang_ok: 0.0,
    kondisi_batang_not_ok: 0.65,

    // Kondisi Akar
    kondisi_akar_ok: 0.0,
    kondisi_akar_not_ok: 0.7,

    // Kondisi Buah
    kondisi_buah_ok: 0.0,
    kondisi_buah_not_ok: 0.5,
};

const treatment: string[] = [
    "Periksa tanaman secara menyeluruh untuk mengidentifikasi penyakit spesifik.",
    "Konsultasikan dengan ahli pertanian atau dinas pertanian setempat.",
    "Lakukan sanitasi kebun untuk mencegah penyebaran penyakit."
];


const DiagnosaPage = () => {
    const [detectedDisease, setDetectedDisease] = useState<"terserang" | "tidak_terserang" | "">("");
    const [loading, setLoading] = useState(false)
    const [CertaintyFactor, setCertaintyFactor] = useState(0)
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<FormData>()



    const onSubmit: SubmitHandler<FormData> = (data, e) => {
        e?.preventDefault();
        setLoading(true);

        // Cek apakah ada gejala yang terdeteksi (nilai "ya")
        const isSick = Object.values(data).some((val) => val === 'ya');

        // Cek kondisi daun
        const isDaunNotOk = data.bercak_daun === 'ya' || data.daun_menguning === 'ya';

        // Cek kondisi batang
        const isBatangNotOk = data.busuk_pangkal_batang === 'ya' || data.busuk_pangkal_atas === 'ya';

        // Cek kondisi akar
        const isAkarNotOk = data.busuk_akar === 'ya' || data.ganoderma === 'ya';

        // Cek kondisi buah
        const isBuahNotOk = data.busuk_buah === 'ya' || data.buah_cacat === 'ya';

        // Kumpulkan nilai CF dari kondisi yang tidak OK
        const cfList: number[] = [];
        if (isDaunNotOk) cfList.push(cfRules.kondisi_daun_not_ok);
        if (isBatangNotOk) cfList.push(cfRules.kondisi_batang_not_ok);
        if (isAkarNotOk) cfList.push(cfRules.kondisi_akar_not_ok);
        if (isBuahNotOk) cfList.push(cfRules.kondisi_buah_not_ok);

        // Hitung total CF menggunakan metode kombinasi CF
        let totalCF = 0;
        if (cfList.length > 0) {
            totalCF = cfList[0];
            for (let i = 1; i < cfList.length; i++) {
                totalCF = totalCF + cfList[i] * (1 - totalCF);
            }
        }

        // Tentukan hasil diagnosa berdasarkan apakah ada gejala (sakit atau tidak)
        const result = isSick ? "terserang" : "tidak_terserang";

        // Set hasil diagnosa dan nilai CF
        setDetectedDisease(result);
        setCertaintyFactor(Number(totalCF.toFixed(2))); // misalnya: 0.88
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
                    <div className="my-7 space-y-6">

                        {/* KONDISI DAUN */}
                        <div className="space-y-2">
                            <label className="text-lg text-green-50 font-semibold">Kondisi Daun</label>
                            <div className="grid xl:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-600">Bercak Daun</label>
                                    <select
                                        {...register('bercak_daun', { required: true })}
                                        className="w-full h-[3.4rem] border-4 rounded-xl bg-white text-gray-800 font-medium text-lg p-2.5 border-gray-300 focus:outline-none focus:ring-green-50 focus:border-green-50"
                                    >
                                        <option value="ya">Ya</option>
                                        <option value="tidak">Tidak</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-600 mb-1">Daun Menguning</label>
                                    <select
                                        {...register('daun_menguning', { required: true })}
                                        className="w-full h-[3.4rem] border-4 rounded-xl bg-white text-gray-800 font-medium text-lg p-2.5 border-gray-300 focus:outline-none focus:ring-green-50 focus:border-green-50"
                                    >
                                        <option value="ya">Ya</option>
                                        <option value="tidak">Tidak</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* KONDISI BATANG */}
                        <div className="space-y-2">
                            <label className="text-lg text-green-50 font-semibold">Kondisi Batang</label>
                            <div className="grid xl:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-600 mb-1">Busuk Pangkal Batang</label>
                                    <select
                                        {...register('busuk_pangkal_batang', { required: true })}
                                        className="w-full h-[3.4rem] border-4 rounded-xl bg-white text-gray-800 font-medium text-lg p-2.5 border-gray-300 focus:outline-none focus:ring-green-50 focus:border-green-50"
                                    >
                                        <option value="ya">Ya</option>
                                        <option value="tidak">Tidak</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-600 mb-1">Busuk Pangkal Atas</label>
                                    <select
                                        {...register('busuk_pangkal_atas', { required: true })}
                                        className="w-full h-[3.4rem] border-4 rounded-xl bg-white text-gray-800 font-medium text-lg p-2.5 border-gray-300 focus:outline-none focus:ring-green-50 focus:border-green-50"
                                    >
                                        <option value="ya">Ya</option>
                                        <option value="tidak">Tidak</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* KONDISI AKAR */}
                        <div className="space-y-2">
                            <label className="text-lg text-green-50 font-semibold">Kondisi Akar</label>
                            <div className="grid xl:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-600 mb-1">Busuk Akar</label>
                                    <select
                                        {...register('busuk_akar', { required: true })}
                                        className="w-full h-[3.4rem] border-4 rounded-xl bg-white text-gray-800 font-medium text-lg p-2.5 border-gray-300 focus:outline-none focus:ring-green-50 focus:border-green-50"
                                    >
                                        <option value="ya">Ya</option>
                                        <option value="tidak">Tidak</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-600 mb-1">Ganoderma</label>
                                    <select
                                        {...register('ganoderma', { required: true })}
                                        className="w-full h-[3.4rem] border-4 rounded-xl bg-white text-gray-800 font-medium text-lg p-2.5 border-gray-300 focus:outline-none focus:ring-green-50 focus:border-green-50"
                                    >
                                        <option value="ya">Ya</option>
                                        <option value="tidak">Tidak</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* KONDISI BUAH */}
                        <div className="space-y-2">
                            <label className="text-lg text-green-50 font-semibold">Kondisi Buah</label>
                            <div className="grid xl:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-600 mb-1">Busuk Buah</label>
                                    <select
                                        {...register('busuk_buah', { required: true })}
                                        className="w-full h-[3.4rem] border-4 rounded-xl bg-white text-gray-800 font-medium text-lg p-2.5 border-gray-300 focus:outline-none focus:ring-green-50 focus:border-green-50"
                                    >
                                        <option value="ya">Ya</option>
                                        <option value="tidak">Tidak</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-600 mb-1">Buah Kecil / Cacat</label>
                                    <select
                                        {...register('buah_cacat', { required: true })}
                                        className="w-full h-[3.4rem] border-4 rounded-xl bg-white text-gray-800 font-medium text-lg p-2.5 border-gray-300 focus:outline-none focus:ring-green-50 focus:border-green-50"
                                    >
                                        <option value="ya">Ya</option>
                                        <option value="tidak">Tidak</option>
                                    </select>
                                </div>
                            </div>
                        </div>

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
                        {detectedDisease === 'terserang' ? (
                            <div className='mb-4'>
                                <div className="space-y-4 mb-8">
                                    <h2 className="lg:bold-32 bold-24">
                                        Terserang Penyakit
                                    </h2>
                                    <p className='text-gray-50'>Tanaman menunjukkan gejala penyakit berdasarkan kondisi yang diamati. Silakan konsultasikan dengan ahli pertanian untuk diagnosis lebih lanjut.</p>
                                </div>
                                <div className="space-y-4">
                                    <h2 className='lg:bold-32 bold-24 text-gray-800'>Penanganan</h2>
                                    <ul className="mt-4 space-y-4">
                                        {treatment?.map((treatment, index) => (
                                            <li key={index} className="flex items-start gap-3">
                                                <div className="h-8 w-8 px-3 flex items-center justify-center bg-green-50 text-white rounded-full font-bold flex-shrink-0">
                                                    {index + 1}
                                                </div>
                                                <p className="text-gray-50 xl:mt-1">{treatment}</p>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className='mt-8 bg-green-500 px-5 py-3 rounded-lg'>
                                    <h2 className='text-white xl:text-lg text-md font-semibold'>Tingkat Kepastian: {Math.round(CertaintyFactor * 100)}%</h2>
                                </div>
                            </div>
                        ) : (
                            <div className='mb-4'>
                                <h2 className="bold-24">Tidak Terserang Penyakit</h2>
                            </div>
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