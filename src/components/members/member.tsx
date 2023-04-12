import useSWR from 'swr';
import styles from './member.module.css';

const Member = ({memberURI}: {memberURI: string}) => {
  console.log({memberURI})
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data, error } = useSWR(encodeURI(memberURI), fetcher);
  
  if (error) return <div>failed to load</div>;
  
  if (!data) return <div>loading...</div>;
  console.log({data})

  const memberInfo = Object.keys(data).map((info) => {
    if (data[info].length < 1) return '';
    return (
    <>
      <label>{info}</label>
      <span>{data[info]}</span>
    </>
  )});

  console.log({memberInfo})
  const infoToBeShown = ['name', 'born', 'died', 'titles', 'aliases']

  return (
  <div className={ styles.memberCard }>
    {
      Object.keys(data).map((info, index) => {
        const hasMultipleFields = Array.isArray(data[info]);
        if (data[info].length < 1 || !infoToBeShown.includes(info) || (hasMultipleFields && data[info][0] == '')) return '';
       
        return (
        <div key={`member-${index}`} className={ styles.memberField }>
          <label className={ styles.memberInfoLabel }>{info}</label>
          <div className={ styles.memberInfoFields }>
            {hasMultipleFields ? data[info].map((field: string, indexField: number) => (<span key={ `member-${index}-${indexField}` }>{field}</span>)) : data[info]}
          </div>
          {/* {
            Array.isArray(data[info])
            ? data[info].map((typeInfo: string, index: number) => <span key={`${info}-${index}`}>{typeInfo}</span>)
            : <span>{data[info]}</span>
          }           */}
        </div>
      )})
    }
  </div>)
}

export default Member;