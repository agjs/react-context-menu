# react-right-click-menu

<p align="center">
  <img width="150" height="150" src="./assets/images/react-context-menu.svg">
</p>

Minimalistic provider built around native [Contextmenu Event](https://developer.mozilla.org/en-US/docs/Web/API/Element/contextmenu_event).

Unlike many similar libraries, react-right-click-menu simply provides a context environment, where consumer provides an actual DOM node (a reference) to an element that should trigger the menu and the component that should be rendered when the event occurs.

This makes it easy to intergrate your own UI library and show your own UI Components when a context menu is triggered. That being said, react-right-click-menu doesn't carry over any content or styling, nor it installs any additional dependencies.

## [CodeSandbox Demo](https://codesandbox.io/s/elegant-tharp-2vhjg?file=/src/App.js)

## Install

#### NPM

> npm i @agjs/react-right-click-menu

#### YARN

> yarn add @agjs/react-right-click-menu

## Props

| Props                  | Description                                                                                                                                                                                                                       | Default |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| trigger                | A react reference to an element that will trigger the menu on right click                                                                                                                                                         | null    |
| component              | A component to show when trigger is right clicked                                                                                                                                                                                 | null    |
| isOpenAfterInteraction | Determines if a menu should remain open after user interacts with it. For instance, maybe you will render a list of checkboxes that user has to interact with, and you don't want menu to close it after each interaction (click) | true    |
| className              | A custom className in case you want to apply custom styling to the context wrapper                                                                                                                                                | null    |
| isOpen                 | Self-explanatory                                                                                                                                                                                                                  | false   |
| setIsOpen              | Self-explanatory                                                                                                                                                                                                                  | -       |

## Use

```js
import React, { useRef, useState } from "react";
import ContextMenu from "@agjs/react-right-click-menu";
import SomeUiComponent from "somewhere";

export const ExampleComponent = () => {
  const [isMenuShown, setIsMenuShown] = useState(false);
  const ref = useRef();
  return (
    <>
      <ContextMenu
        isOpenAfterInteraction={false}
        trigger={ref}
        component={<SomeUiComponent />}
        isOpen={isMenuShown}
        setIsOpen={setIsMenuShown}
      />
      <div className="foo" ref={ref}>
        Once someone right-clicks inside of me, I will trigger some content!
      </div>
    </>
  );
};
```

## Transitions

#### Example using [react-motion](https://github.com/chenglou/react-motion)

To keep the minimal footprint, react-right-click-menu doesn't apply any transitions to the component triggered. This decision was made in order to keep minimal amount of external dependencies and to allow a consumer to add them if they wish.

In the showcase below, we can see how we used a [render-prop](https://reactpatterns.com/#render-prop) from [react-motion](https://github.com/chenglou/react-motion) to generate some inline-styles and pass them down to the ContextMenu.

```js
import React, { useRef, useState } from "react";
import ContextMenu from "@agjs/react-right-click-menu";
import { Motion, spring } from "react-motion";
import ContextMenu from "./index";
import Foo from "somewhere";

export const ExampleComponent = () => {
  const [isMenuShown, setIsMenuShown] = useState(false);
  const ref = useRef();
  return (
    <>
      <Motion
        defaultStyle={{ opacity: 0 }}
        style={{
          opacity: !isMenuShown ? spring(0) : spring(1),
        }}
      >
        {(interpolatedStyle) => {
          return (
            <ContextMenu
              trigger={ref}
              component={<Foo />}
              isOpen={isMenuShown}
              setIsOpen={setIsMenuShown}
              style={{ opacity: interpolatedStyle.opacity }}
            />
          );
        }}
      </Motion>
      <div ref={ref} style={customStyles}>
        Right click inside of me!
      </div>
    </>
  );
};
```
