import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import Layout from '../../components/Layout';
import data from '../../utils/data';

export default function TranslatorScreen() {
  const { query } = useRouter();
  const { slug } = query;
  const translator = data.translators.find((x) => x.slug === slug);
  if (!translator) {
    return <div>Translator Not Found</div>;
  }
  return (
    <Layout title={translator.name}>
      <div className="py-2">
        <Link href="/">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10 stroke-sky-600 hover:stroke-sky-900"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </Link>
      </div>

      <div className="grid md:grid-cols-5 md:gap-3">
        <div className="md:col-span-2 ">
          <h1 className="text-2xl font-extrabold text-sky-600">
            {translator.description}
          </h1>
          <div className="border-b-4 border-sky-600 border-l-4 border-sky-600">
            <Image
              src={translator.image}
              alt={translator.name}
              width={8}
              height={5}
              layout="responsive"
            ></Image>
          </div>
          <div className="mb-2 font-light tracking-wide text-justify text-slate-700">
            <p>
              <b className="font-bold"> Why choose me?</b>
            </p>
            <ul className="list-inside list-disc">
              <li>High-quality translation, not word-for-word.</li>
              <li>Delivery on or before time.</li>
              <li>
                Pro lighting, camera and green-screen for best video quality.
              </li>
            </ul>

            <p className="pt-4">
              <b className="font-bold "> Additional services:</b>
            </p>
            <ul className="list-inside text-justify list-disc">
              <li>English subtitling for reaching a wider audience.</li>
              <li>
                Professional editing with custom Splash screen, On-Screen Text,
                Credits and Logo.
              </li>
              <li>Professional voice narration in English or Kiswahili.</li>
            </ul>
          </div>
        </div>
        <div className="md:col-span-2">
          <ul className="flex flex-col items-center justify-center">
            <li className="border-b-2 border-sky-600 mb-2">
              <b font-bold>Category: </b>
              {translator.category}
            </li>

            <li className="border-b-2 border-sky-600 mb-2">
              <b font-bold>Translator: </b> {translator.name}
            </li>
            <li className="border-b-2 border-sky-600 mb-2">
              {translator.rating} of {translator.numReviews} reviews
            </li>
            <li className="mb-2 font-light text-justify text-slate-700">
              <p>
                <b className="font-bold">Work History:</b> Get your text
                translated into Sign Language quickly and easily.
              </p>
              <p>
                I have Worked as a volunteer sign translator from March 2016
                through September 2021, mainly {translator.category} material to
                Sign-language and back to English as well. Some smaller projects
                were English to Hindi and Hindi to English.
              </p>
              <p>
                Just tell me what you need! We will discuss the schedule and the
                price, and I will translate to you via zoom which is suitable
                for sign translation.
              </p>{' '}
            </li>
          </ul>
        </div>
        <div>
          <div className="card p-5">
            <div className="mb-2 flex justify-between">
              <div>Price</div>
              <div>Ksh {translator.price}/Hr</div>
            </div>
            <div className="mb-2 flex justify-between"></div>
            <button className="rounded bg-sky-600 hover:bg-sky-700 text-white font-bold py-2 px-4 w-full">
              Hire
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}