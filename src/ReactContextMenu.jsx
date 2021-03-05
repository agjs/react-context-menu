import React, { useState, useEffect, useCallback } from "react";

/**
 * A helper function that determines if a ContextMenu component has been clicked.
 * This is achieved by recursively looping through event.target and examining
 * if any parent node has a className of react-context-menu.
 * @param {*} element
 * @return {boolean}
 */

const isReactContextClick = (element) => {
  if (!element) {
    return false;
  }

  if (
    element.className === "react-context-menu" ||
    element?.parentNode?.className === "react-context-menu"
  ) {
    return true;
  }

  return isReactContextClick(element?.parentNode);
};

const getClassName = (className) => {
  return className ? `react-context-menu ${className}` : "react-context-menu";
};

const useContextMenu = (
  trigger,
  isOpenAfterInteraction = true,
  isOpen,
  setIsOpen
) => {
  const [xMouse, setXMouse] = useState(0);
  const [yMouse, setYMouse] = useState(0);

  const handleContextMenu = useCallback(
    (e) => {
      e.preventDefault();

      const {
        x: triggerX,
        y: triggerY,
        width: triggerWidth,
        height: triggerHeight,
      } = trigger?.current?.getBoundingClientRect();

      const mouseCursorX = e.pageX;
      const mouseCursorY = e.pageY;

      setXMouse(e.pageX);
      setYMouse(e.pageY);

      const isWithinBoundary =
        triggerX + triggerWidth > mouseCursorX &&
        triggerX < mouseCursorX &&
        triggerY + triggerHeight > mouseCursorY &&
        triggerY < mouseCursorY;

      isWithinBoundary ? setIsOpen(true) : setIsOpen(false);
    },
    [setXMouse, setYMouse, trigger]
  );

  const handleClick = useCallback(
    (event) => {
      if (!isOpenAfterInteraction || !isReactContextClick(event.target)) {
        isOpen && setIsOpen(false);
      }
    },
    [isOpen, isOpenAfterInteraction]
  );

  useEffect(() => {
    document.addEventListener("click", handleClick);
    trigger.current.addEventListener("contextmenu", handleContextMenu);
    return () => {
      document.removeEventListener("click", handleClick);
      trigger.current.removeEventListener("contextmenu", handleContextMenu);
    };
  });

  return { xMouse, yMouse, isOpen };
};

const ContextMenu = ({
  style,
  className,
  isOpenAfterInteraction,
  trigger,
  component,
  isOpen,
  setIsOpen,
}) => {
  const { xMouse, yMouse } = useContextMenu(
    trigger,
    isOpenAfterInteraction,
    isOpen,
    setIsOpen
  );

  return (
    <>
      {isOpen && (
        <div
          className={getClassName(className)}
          style={{
            position: "fixed",
            top: yMouse,
            left: xMouse,
            ...style,
          }}
        >
          {component}
        </div>
      )}
    </>
  );
};

export default ContextMenu;
