import React from "react";
import { Menu, MenuBtn } from "./style";

type SmallMenuProps = {
  itemList: { name: string; handleClick: () => void }[];
  top: string;
  right: string;
  dropMenu?: boolean;
};

function SmallMenu(props: SmallMenuProps) {
  const menuItemList = props.itemList.map((item: any) => (
    <MenuBtn
      dropMenu={props.dropMenu}
      key={item.name}
      color={item.color}
      onClick={item.handleClick}
    >
      {item.name}
    </MenuBtn>
  ));

  return (
    <>
      {props.dropMenu && (
        <Menu dropMenu={props.dropMenu} top={props.top} right={props.right}>
          {menuItemList}
        </Menu>
      )}
      {!props.dropMenu && (
        <Menu top={props.top} right={props.right}>
          {menuItemList}
        </Menu>
      )}
    </>
  );
}

export default SmallMenu;
