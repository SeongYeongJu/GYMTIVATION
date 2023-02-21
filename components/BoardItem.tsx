import styled from 'styled-components';
import BoardPost from './BoardPost';
import type { BoardPostType } from '@/pages/type';

interface BoardItemProps {
  boardPosts: BoardPostType[];
  category?: string;
}

const BoardItem = ({ boardPosts, category }: BoardItemProps) => {
  // const [category, setCategory] = useState('');

  const filteredCategory = boardPosts?.filter(
    (item) => item.category === category,
  );
  return (
    <BoardList>
      {filteredCategory.map((boardPost) => {
        return (
          <BoardPost
            key={boardPost.id}
            item={boardPost.item}
            title={boardPost.title}
            id={boardPost.id}
            content={boardPost.content}
          />
        );
      })}
    </BoardList>
  );
};

const BoardList = styled.div`
  width: 95%;
  height: 100%;
  border: 1px solid black;
  margin: 0.5rem;
  background-color: white;
  border-radius: 0.5rem;
  overflow: scroll;
`;

export default BoardItem;
