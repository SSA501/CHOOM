import React from "react";
import { Menu, MenuBtn } from "./style";

type SmallMenuProps = {
  itemList: { name: string; handleClick: () => void }[];
};

function SmallMenu(props: SmallMenuProps) {
  const menuItemList = props.itemList.map((item: any) => (
    <MenuBtn key={item.name} onClick={item.handleClick}>
      {item.name}
    </MenuBtn>
  ));

  return <Menu>{menuItemList}</Menu>;
}

export default SmallMenu;
