import LocomotiveScroll, {
  type ILocomotiveScrollOptions,
} from "locomotive-scroll";
import { useEffect } from "react";
interface CustomLocomotiveScrollOptions extends ILocomotiveScrollOptions {
  el?: HTMLElement | null;
}

export function useSmoothScroll(ref: React.RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    if (!ref.current) return;

    const scroll = new LocomotiveScroll({
      el: ref.current,
      smooth: true,
    } as CustomLocomotiveScrollOptions);

    return () => scroll.destroy();
  }, [ref]);
}
