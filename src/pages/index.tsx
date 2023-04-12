import Filters from '@/components/filter/filter';
import Houses from '../components/Houses/houses';

import styles from '../styles/index.module.css';


export default function Home() {
  return (
    <main className={ styles.homePage }>
      <div className={ styles.homeHero }>
        <h1 className={ styles.heroHeader }>Game of Thrones</h1>
        <h2 className={ styles.heroSubtitle }>All Houses and Characters</h2>
      </div>
        {Filters()}
        {Houses()}
    </main>
  )
}
