import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import InputMultiline from "../../common/InputText";
import DeleteIcon from "@mui/icons-material/Delete";
import NumberInputAdornments from "../../common/InputNumber";
import ShareIcon from "@mui/icons-material/Share";
import { Colors } from "../../common/Colors";

const Item = ({ id, text, index, moveItem, type, menu }) => {
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
        width: "200px",
        height: "32px",
        padding: "8px",
        marginBottom: "4px",
        borderRadius: "5px",
        backgroundColor:
          menu === "menu1" ? "rgba(5, 4, 18, 0.7)" : "rgba(252, 251, 255, 0.7)",
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
          minHeight: "550px",
          width: "500px",
          alignItems: "center",
          padding: "8px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h3>Workout Plan</h3>
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
        display: "flex",
        alignItems: "center",
        marginBottom: "20px",

        padding: "10px",
        width: "700px",
        flexDirection: "column",
        borderRadius: "5px",
        backgroundColor: "#050412",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          width: "550px",
        }}
      >
        <h3>{droppedItem.text}</h3>
        <DeleteIcon
          onClick={() => handleRemoveItem(droppedItem.id, item.id)}
          style={{
            marginLeft: "auto",
            cursor: "pointer",
            color: "#FB5B21",
          }}
        />
      </div>
      {droppedItem.items.map((item) => (
        <div
          style={{
            margin: "4px 0",
            display: "flex",
            padding: "8px",
            alignItems: "flex-center",
            flexDirection: "column",
            borderRadius: "5px",
            backgroundColor: "rgba(252, 251, 255, 0.7)",
            color: "black",
            width: "650px",
          }}
        >
          <div style={{ display: "flex", flexDirection: "row" }}>
            <div style={{}}>{item.text}</div>
            <DeleteIcon
              onClick={() => handleRemoveItem(droppedItem.id, item.id)}
              style={{
                marginLeft: "auto",
                cursor: "pointer",
                color: "black",
              }}
            />
          </div>
          <div
            key={item.id}
            style={{
              margin: "4px 0",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                gap: 2,
              }}
            >
              <NumberInputAdornments unit="sets" />

              <NumberInputAdornments unit="repetition" />

              <NumberInputAdornments unit="kg" />

              <InputMultiline
                aria-label="Demo input"
                multiline
                placeholder="Type something…"
              />
            </Box>
          </div>
        </div>
      ))}
      <div ref={menu2DropRef} style={{ height: "50px", marginTop: "10px" }}>
        Drop Exercises here
      </div>
    </div>
  );
};

const Menu = ({ moveItem, items, type, menu }) => {
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
          menu={menu}
        />
      ))}
    </div>
  );
};

function CreatePlan() {
  const [backgroundHeight, setBackgroundHeight] = useState("auto");

  const [menu1Items, setMenu1Items] = useState([
    { id: 1, text: "Upper Body" },
    { id: 2, text: "Lower Body" },
    { id: 3, text: "Core" },
  ]);

  const [menu2Items, setMenu2Items] = useState([
    { id: 4, text: "Bench Press" },
    { id: 5, text: "Bent-Over Rows" },
    { id: 6, text: "Shoulder Press" },
  ]);

  const [droppedItems, setDroppedItems] = useState([]);

  useEffect(() => {
    const maxHeight = Math.max(
      document.getElementById("drop-area").scrollHeight,
      document.getElementById("menu-1").scrollHeight,
      document.getElementById("menu-2").scrollHeight
    );
    setBackgroundHeight(maxHeight + "px");
  }, [droppedItems, menu1Items, menu2Items]);

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
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        backgroundImage: `url(/src/assets/a.jpg)`,
        backgroundSize: "cover",
        backgroundBlendMode: "overlay",
        backgroundPosition: "center",
        margin: "-8px",
        position: "relative",
        minHeight: "120vh",
        height: backgroundHeight, // Set the height of the background image dynamically
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "row",
          position: "absolute",
          width: "100%",
          height: "100%",
          padding: "20px",
        }}
      >
        <Card
          id="menu-1"
          sx={{
            display: "flex",
            width: "20%",
            minHeight: "80%",
            marginRight: "20px",
            backgroundColor: "rgba(5, 4, 18, 0.3)",
            justifyContent: "flex-start",
            alignItems: "center",
            color: "white",
            flexDirection: "column",
          }}
        >
          <DndProvider backend={HTML5Backend}>
            <h3>Routines</h3>
            <Menu
              moveItem={(dragIndex, hoverIndex) =>
                moveItem(dragIndex, hoverIndex, "menu1")
              }
              items={menu1Items}
              type="MENU1_ITEM"
              menu="menu1"
            />
          </DndProvider>
        </Card>
        <Card
          id="drop-area"
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            flexDirection: "column",
            width: "45%",
            minHeight: "80%",
            marginRight: "20px",
            color: "white",
            fontSize: "medium",
            backgroundColor: "rgba(5, 4, 18, 0.5)",
          }}
        >
          <DndProvider backend={HTML5Backend}>
            <DropArea
              moveItem={moveItem}
              droppedItems={droppedItems}
              setDroppedItems={setDroppedItems}
              menu1Items={menu1Items}
              menu2Items={menu2Items}
            />
          </DndProvider>
          <Box
            sx={{
              display: "inline-block",
              backgroundColor: Colors.primary,
              padding: "12px",
              borderRadius: "5px",
              marginBottom: "20px",
            }}
          >
            <ShareIcon sx={{ color: "white" }} />
          </Box>
        </Card>
        <Card
          id="menu-2"
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            flexDirection: "column",
            width: "20%",
            minHeight: "80%",
            backgroundColor: "rgba(252, 251, 255, 0.3)",
          }}
        >
          <DndProvider backend={HTML5Backend}>
            <h3>Exercises</h3>
            <Menu
              moveItem={(dragIndex, hoverIndex) =>
                moveItem(dragIndex, hoverIndex, "menu2")
              }
              items={menu2Items}
              type="MENU2_ITEM"
              menu="menu2"
            />
          </DndProvider>
        </Card>
      </Box>
    </Box>
  );
}

export default CreatePlan;
