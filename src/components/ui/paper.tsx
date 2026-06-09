import { forwardRef, ReactNode, Ref } from "react";

//==== TYPES ====//
interface IPaper {
  children?: ReactNode;
  onClick?: () => void;
}

function Paper(props: IPaper, ref: Ref<HTMLDivElement>) {
  //==== CONSTANTS ====//

  //==== RENDER ====//
  return (
    <div ref={ref} onClick={props.onClick}>
      {props.children}
    </div>
  );
}

export default forwardRef(Paper);
