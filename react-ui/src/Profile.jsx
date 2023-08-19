import imgURL from './assets/react.svg';
import State from './State';

function Avatar({ person, size = 100 }) {
  return (
    <img
      className="avatar"
      src={imgURL}
      alt={person.name}
      width={size}
      height={size}
    />
  );
}

function Card({ children }) {
  return <div className="card">{children}</div>;
}

function Item({ name, isPacked }) {
  let item = name;
  if (isPacked) {
    item = <del>{name + '✔'}</del>;
  }
  return <li>{item}</li>;
  // return <li className="item">{isPacked ? <del>name + '✔'</del> : name}</li>;
  // return (
  //   <li>
  //     {name} {isPacked && '✔'}
  //   </li>
  // );
}

const people = [
  '凯瑟琳·约翰逊: 数学家',
  '马里奥·莫利纳: 化学家',
  '穆罕默德·阿卜杜勒·萨拉姆: 物理学家',
  '珀西·莱温·朱利亚: 化学家',
  '苏布拉马尼扬·钱德拉塞卡: 天体物理学家',
];
function List({ list }) {
  return (
    <ol>
      {/* 不写{}可省略return */}
      {list.map((i) => {
        return <li key={i}>{i}</li>;
      })}
    </ol>
  );
}

export default function Profile() {
  return (
    <Card>
      <Avatar person={{ name: 'Lin Lanying' }} size={100} />
      <ul>
        <Item isPacked={true} name={'react'}></Item>
        <Item isPacked={false} name={'vue'}></Item>
      </ul>
      <List list={people} />
      <State />
    </Card>
  );
}
