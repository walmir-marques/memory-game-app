import { useEffect, useState } from "react";
import * as C from "./App.styles";
import Logo from "./assets/memoryLogo.png";
import { Button } from "./components/Button";
import { InfoItem } from "./components/infoItem";
import restartIcon from "./svgs/restart.svg";
import { GridItemType } from "./types/GridItemType";
import { items } from "./data/items";
import { GridItem } from "./components/GridItem";
import { formatTimeElapsed } from "./utils/formatTimeElapsed";

function App() {
  const [timeElapsed, setTimeElapsed] = useState<number>(0);
  const [moves, setMoves] = useState<number>(0);
  const [shownCount, setShownCount] = useState<number>(0);
  const [playing, setPlaying] = useState<boolean>(false);
  const [gridItems, setGridItems] = useState<GridItemType[]>([]);

  const resetAndCreateGrid = () => {
    // Step 1 - Reset Game
    setMoves(0);
    setShownCount(0);
    setTimeElapsed(0);
    //Step 2 - Start Grid
    let tmpGrid: GridItemType[] = [];
    for (let i = 0; i < items.length * 2; i++) {
      tmpGrid.push({
        item: null,
        shown: false,
        permanentShown: false,
      });
    }
    // Fill Grid
    for (let w = 0; w < 2; w++) {
      for (let i = 0; i < items.length; i++) {
        let pos = -1;
        while (pos < 0 || tmpGrid[pos].item !== null) {
          pos = Math.floor(Math.random() * (items.length * 2));
        }
        tmpGrid[pos].item = i;
      }
    }

    setGridItems(tmpGrid);
    //Step 3 - Start Game
    setPlaying(true);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      if (playing) {
        setTimeElapsed(timeElapsed + 1);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [playing, timeElapsed]);

  useEffect(() => {
    resetAndCreateGrid();
  }, []);

  useEffect(() => {
    if (shownCount === 2) {
      let opened = gridItems.filter((item) => item.shown === true);
      if (opened.length === 2) {
        if (opened[0].item === opened[1].item) {
          let tmpGrid = [...gridItems];
          for (let i in tmpGrid) {
            if (tmpGrid[i].shown) {
              tmpGrid[i].permanentShown = true;
              tmpGrid[i].shown = false;
            }
          }
          setGridItems(tmpGrid);
          setShownCount(0);
        } else {
          setTimeout(() => {
            let tmpGrid = [...gridItems];
            for (let i in tmpGrid) {
              tmpGrid[i].shown = false;
            }
            setGridItems(tmpGrid);
            setShownCount(0);
          }, 1000);
        }
        setMoves((moves) => moves + 1);
      }
    }
  }, [shownCount, gridItems]);

  const handleItemClick = (index: number) => {
    if (playing && index !== null && shownCount < 2) {
      let tmpGrid = [...gridItems];

      if (
        tmpGrid[index].permanentShown === false &&
        tmpGrid[index].shown === false
      ) {
        tmpGrid[index].shown = true;
        setShownCount(shownCount + 1);
      }
      setGridItems(tmpGrid);
    }
  };

  useEffect(() => {
    if (moves > 0 && gridItems.every((item) => item.permanentShown === true)) {
      setPlaying(false);
    }
  }, [moves, gridItems]);

  return (
    <C.Container>
      <C.Header>
        <C.LogoLink href="">
          <img src={Logo} width="300" alt="My App Logo" />
        </C.LogoLink>
      </C.Header>
      <C.InfoContainer>
        <C.Info>
          <C.InfoArea>
            <InfoItem label="Time" value={formatTimeElapsed(timeElapsed)} />
            <InfoItem label="Moviments" value={moves.toString()} />
          </C.InfoArea>
          <Button
            label="Restart"
            icon={restartIcon}
            onClick={resetAndCreateGrid}
          />
        </C.Info>
        <C.GridArea>
          <C.Grid>
            {gridItems.map((item, index) => (
              <GridItem
                key={index}
                item={item}
                onClick={() => handleItemClick(index)}
              />
            ))}
          </C.Grid>
        </C.GridArea>
      </C.InfoContainer>
    </C.Container>
  );
}

export default App;
