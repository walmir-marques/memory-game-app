import { GridItemType } from "../../types/GridItemType";
import cardGame from "../../svgs/memory-game.png";
import { items } from "../../data/items";

import * as C from "./styles";

type Props = {
  item: GridItemType;
  onClick: () => void;
};

export const GridItem = ({ item, onClick }: Props) => {
  return (
    <C.Container
      showBackground={item.permanentShown || item.shown === true}
      onClick={onClick}
    >
      {item.permanentShown === false && item.shown === false && (
        <C.Icon src={cardGame} width={100} />
      )}
      {(item.permanentShown || item.shown === true) && item.item !== null && (
        <C.Icon src={items[item.item].icon} alt="" width={100} />
      )}
    </C.Container>
  );
};
