import { AiFillStar } from 'react-icons/ai';

interface StarsProps {
  numberStars: number;
}

export function Stars(props: StarsProps) {
  return (
    <div className="inline-flex">
      {Array.from(Array(props.numberStars)).map((_, index) => {
        return <AiFillStar key={index} color={'FFC72D'} />;
      })}
      {Array.from(Array(5 - props.numberStars)).map((_, index) => {
        return <AiFillStar key={index} color={'CBD5E1'} />;
      })}
    </div>
  );
}
