/*
import DotsIcon from '../icons/dotsIcon';
import React from 'react';
// TODO não tem necessidade de usar a tag <a>

/!*
<ActionItem
  items={[
    {
      name: 'Editar',
      action: () => handleClickEditar(row),
      icon: () => <ProfileIcon />,
    },
    {
      name: 'Deletar',
      action: () => handleClickDeletar(row),
      icon: () => <TrashIcon />,
    },
  ]}
/>
* *!/

function ActionItem(props) {
  return (
    <div className="group flex h-full w-full grow cursor-pointer items-center justify-center hover:bg-gray-500">
      <DotsIcon />
      <div className="absolute right-0 z-10 hidden origin-top-right rounded-md bg-white shadow-lg group-hover:block">
        <div
          className="w-40"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu">
          {props.items.map((item) => {
            const Icon = item.icon;
            return (
              <a
                href="#"
                className="text-md block px-4 py-2 text-gray-700 md:hover:bg-gray-100 md:hover:text-gray-900"
                role="menuitem"
                key={item.name}
                onClick={item.action}>
                <span className="flex flex-col">
                  <span>
                    <Icon className="float-left mr-3" />
                    {item.name}
                  </span>
                </span>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}
export default ActionItem;
*/
