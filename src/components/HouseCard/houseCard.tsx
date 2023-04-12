import { HouseInterface } from "@/components/Houses/houses.interface"
import Link from "next/link"
import styles from './houseCard.module.css'
import classNames from 'classnames';

export const HouseCard  = ({house}: {house: HouseInterface}) => {
  return (
    <li className={ styles.houseCard }>
      <Link href={`/houses/${house.name}`}>
        <div className={ classNames(styles.houseName) }>{house.name}</div>
        <div className={ styles.houseInfo }>
          <span className={ styles.houseFieldLabel }>Coat of Arms</span> <span className={ styles.houseField}>{house.coatOfArms}</span>
          <span className={ styles.houseFieldLabel }>Words</span> <span className={ styles.houseField}>{house.words}</span>
          <span className={ styles.houseFieldLabel }>Region</span> <span className={ styles.houseField}>{house.region}</span>
        </div>
      </Link>
    </li>
 );
}