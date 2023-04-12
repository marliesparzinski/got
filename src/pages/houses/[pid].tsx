import Member from '@/components/members/member';
import { useRouter } from 'next/router'
import useSWR from 'swr';
import styles from './housePage.module.css'

const House = () => {
  const router = useRouter()
  const { pid } = router.query
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data, error } = useSWR(encodeURI(`https://www.anapioficeandfire.com/api/houses?name=${pid}`), fetcher);
  
  if (error) return <div>failed to load</div>;
  
  if (!data) return <div>loading...</div>;
  
  // Because there is no unique ID I'm simply assuming here there will be no houses with the same name
  const houseData = data[0]
  console.log(houseData)

  return (
    <div className={ styles.housePage }>
      <div className={ styles.houseHero }>
        <h1 className={ styles.houseTitle }>{data[0].name}</h1>
        { houseData?.words.length > 0 && (<h2 className={ styles.houseSubtitle }>{ houseData.words }</h2>)}
      </div>
      <div className={ styles.houseMembers }>
        {
          houseData?.swornMembers.map((member: string, index: number) => <Member key={`member-${index}`} memberURI={member}/>)
        }
      </div>
    </div>)
}

export default House;