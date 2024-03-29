import Image from 'next/image';
import Link from 'next/link';
import React, { useContext } from 'react';
import { XCircleIcon } from '@heroicons/react/outline';
import Layout2 from '../components/Layout2';
import { Store } from '../utils/Store';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { toast } from 'react-toastify';

function FavoritesScreen() {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const {
    favorites: { favoritesItems },
  } = state;

  const removeItemHandler = (item) => {
    dispatch({ type: 'FAVORITES_REMOVE_ITEM', payload: item });
    return toast.success('Succesfully Removed from Favorites');
  };

  return (
    <Layout2 title="Favorites">
      <div className="">
        <h1 className="mb-4 text-2xl font-bold text-sky-600">Favorites</h1>
        {favoritesItems.length === 0 ? (
          <div>
            Favorites list is empty.{' '}
            <Link href="/">
              <span className="text-sky-600 hover:text-sky-800">
                Browse More Sign translators
              </span>
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-4 md:gap-5">
            <div className="overflow-x-auto md:col-span-3">
              <table className="min-w-full ">
                <thead className="border-b mb-2">
                  <tr>
                    <th className="font-bold text-left">Sign Translator</th>
                    <th className="font-bold p-9 text-right">Price</th>
                    <th className="font-bold p-5">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {favoritesItems.map((item) => (
                    <tr key={item.slug} className="border-b mb-2">
                      <td>
                        <Link href={`/translator/${item.slug}`}>
                          <a className="flex items-center">
                            <Image
                              src={item.image}
                              alt={item.name}
                              width={60}
                              height={50}
                            ></Image>
                            &nbsp;
                            {item.name}
                          </a>
                        </Link>
                      </td>
                      <td className="font-bold text-sky-600 p-5 text-right">
                        Ksh {item.price}
                      </td>
                      <td className="p-5 text-center">
                        <button onClick={() => removeItemHandler(item)}>
                          <XCircleIcon className="h-5 w-5"></XCircleIcon>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="card p-5">
              <ul>
                <li>
                  <div className="text-center pb-3 text-2xl">Proceed to</div>
                </li>
                <li>
                  <button
                    onClick={() => router.push('login?redirect=/payment')}
                    className="rounded bg-sky-600 hover:bg-sky-700 text-white font-bold py-2 px-4 w-full"
                  >
                    Check Out
                  </button>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </Layout2>
  );
}

export default dynamic(() => Promise.resolve(FavoritesScreen), { ssr: false });
