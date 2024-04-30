import React, { useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const Item = ({ id, text, index, moveItem, type }) => {
  const [{ isDragging }, dragRef] = useDrag({
    type,
    item: { id, index, text },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={dragRef}
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: "move",
        border: "1px solid #ccc",
        padding: "8px",
        marginBottom: "4px",
        backgroundColor: isDragging ? "lightgray" : "white",
      }}
    >
      {text}
    </div>
  );
};

const DropArea = ({
  moveItem,
  droppedItems,
  setDroppedItems,
  menu1Items,
  menu2Items,
}) => {
  const handleMainDrop = (item) => {
    const updatedDroppedItems = [...droppedItems, { ...item, items: [] }];
    setDroppedItems(updatedDroppedItems);
  };

  const handleMenu2Drop = (menu1Id, item) => {
    const updatedDroppedItems = droppedItems.map((droppedItem) => {
      if (droppedItem.id === menu1Id) {
        return {
          ...droppedItem,
          items: [...droppedItem.items, item],
        };
      }
      return droppedItem;
    });
    setDroppedItems(updatedDroppedItems);
  };

  const handleRemoveItem = (menu1Id, itemId) => {
    const updatedDroppedItems = droppedItems.map((droppedItem) => {
      if (droppedItem.id === menu1Id) {
        return {
          ...droppedItem,
          items: droppedItem.items.filter((item) => item.id !== itemId),
        };
      }
      return droppedItem;
    });
    setDroppedItems(updatedDroppedItems);
  };

  return (
    <div>
      <div
        ref={
          useDrop({
            accept: "MENU1_ITEM",
            drop: (item) => handleMainDrop(item),
          })[1]
        }
        style={{
          height: "200px",
          border: "1px dashed #ccc",
          marginTop: "20px",
          backgroundColor: "lightyellow",
          padding: "8px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h2>Main Drop Area</h2>
        {droppedItems.map((droppedItem) => (
          <DropItem
            key={droppedItem.id}
            droppedItem={droppedItem}
            menu2Items={menu2Items}
            handleMenu2Drop={handleMenu2Drop}
            handleRemoveItem={handleRemoveItem}
          />
        ))}
      </div>
    </div>
  );
};

const DropItem = ({
  droppedItem,
  menu2Items,
  handleMenu2Drop,
  handleRemoveItem,
}) => {
  const menu2DropRef = useDrop({
    accept: "MENU2_ITEM",
    drop: (draggedItem) => handleMenu2Drop(droppedItem.id, draggedItem),
  })[1];

  return (
    <div
      key={droppedItem.id}
      style={{
        border: "1px dashed #ccc",
        marginBottom: "20px",
        padding: "8px",
        backgroundColor: "lightyellow",
      }}
    >
      <h3>{droppedItem.text}</h3>
      {droppedItem.items.map((item) => (
        <div
          key={item.id}
          style={{
            margin: "4px 0",
            display: "flex",
            alignItems: "center",
            backgroundColor: "lightblue",
          }}
        >
          <div>{item.text}</div>
          <button
            onClick={() => handleRemoveItem(droppedItem.id, item.id)}
            style={{ marginLeft: "auto" }}
          >
            Remove
          </button>
        </div>
      ))}
      <div
        ref={menu2DropRef}
        style={{ height: "50px", border: "1px dashed #ccc", marginTop: "10px" }}
      >
        Drop Menu 2 Items Here
      </div>
    </div>
  );
};

const Menu = ({ moveItem, items, type }) => {
  return (
    <div>
      {items.map((item, index) => (
        <Item
          key={item.id}
          id={item.id}
          text={item.text}
          index={index}
          moveItem={moveItem}
          type={type}
        />
      ))}
    </div>
  );
};

function Home() {
  const [menu1Items, setMenu1Items] = useState([
    { id: 1, text: "Menu 1 - Item 1" },
    { id: 2, text: "Menu 1 - Item 2" },
    { id: 3, text: "Menu 1 - Item 3" },
  ]);

  const [menu2Items, setMenu2Items] = useState([
    { id: 4, text: "Menu 2 - Item 1" },
    { id: 5, text: "Menu 2 - Item 2" },
    { id: 6, text: "Menu 2 - Item 3" },
  ]);

  const [droppedItems, setDroppedItems] = useState([]);

  const moveItem = (dragIndex, hoverIndex, sourceMenu) => {
    if (sourceMenu === "menu1") {
      const draggedItem = menu1Items[dragIndex];
      const updatedItems = [...menu1Items];
      updatedItems.splice(dragIndex, 1);
      updatedItems.splice(hoverIndex, 0, draggedItem);
      setMenu1Items(updatedItems);
    } else if (sourceMenu === "menu2") {
      const draggedItem = menu2Items[dragIndex];
      const updatedItems = [...menu2Items];
      updatedItems.splice(dragIndex, 1);
      updatedItems.splice(hoverIndex, 0, draggedItem);
      setMenu2Items(updatedItems);
    }
  };

  return (
    <div className="Home">
      <h1>Drag and Drop Menus</h1>
      <DndProvider backend={HTML5Backend}>
        <div style={{ display: "flex" }}>
          <div style={{ marginRight: "20px" }}>
            <h2>Menu 1</h2>
            <Menu
              moveItem={(dragIndex, hoverIndex) =>
                moveItem(dragIndex, hoverIndex, "menu1")
              }
              items={menu1Items}
              type="MENU1_ITEM"
            />
          </div>
          <div>
            <h2>Menu 2</h2>
            <Menu
              moveItem={(dragIndex, hoverIndex) =>
                moveItem(dragIndex, hoverIndex, "menu2")
              }
              items={menu2Items}
              type="MENU2_ITEM"
            />
          </div>
        </div>
        <DropArea
          moveItem={moveItem}
          droppedItems={droppedItems}
          setDroppedItems={setDroppedItems}
          menu1Items={menu1Items}
          menu2Items={menu2Items}
        />
      </DndProvider>
    </div>
  );
}

export default Home;
