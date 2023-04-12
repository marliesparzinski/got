import { HouseCard } from '@/components/HouseCard/houseCard';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { HouseInterface } from './houses.interface';
import styles from './houses.module.css'

export default function Houses() {
  const { asPath } = useRouter();
  const searchParameters = asPath.length > 1 ? `&${asPath.replace('/?', '').replace('/', '')}` : '';

  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const gotURL = `https://www.anapioficeandfire.com/api/houses?pageSize=50${searchParameters}`;
  const { data, error } = useSWR(gotURL, fetcher);

  if (error) return <div>failed to load</div>;

  if (!data) return <div>loading...</div>;
  
  return (
    <ul className={ styles.houses }>
      {data.map((house: HouseInterface, index: number) => <HouseCard key={`house-${house.name}`} house={house} index={index}/>)}
    </ul>
  );
}


