import { PropsWithChildren, useEffect, useRef } from 'react';

export const SideNavLayout = ({ children }: PropsWithChildren<any>) => {
  return <div className="flex flex-grow min-w-0">{children}</div>;
};

export const SideNavNavigationContainer = ({ children }: PropsWithChildren<any>) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let unmounted = false;
    const resizeListener = () => detectHeight();
    window.addEventListener('scroll', resizeListener);
    window.addEventListener('resize', resizeListener);
    let observer: ResizeObserver;
    if (global.ResizeObserver !== undefined) {
      observer = new ResizeObserver((elements) => detectHeight());
      observer.observe(document.documentElement);
    }

    function detectHeight() {
      const html: HTMLElement = document.documentElement;
      const header: HTMLDivElement | null = document.querySelector('#root > header');
      const footer: HTMLDivElement | null = document.querySelector('#root > footer');
      if (!header || !footer) {
        return;
      }

      if (!unmounted && ref.current) {
        const pixelsOfFooterVisible = Math.max(0, html.clientHeight + html.scrollTop - footer.offsetTop);
        ref.current.style.top = header.clientHeight + 'px';
        ref.current.style.bottom = pixelsOfFooterVisible + 'px';
      }
    }
    return () => {
      unmounted = true;
      window.removeEventListener('scroll', resizeListener);
      window.removeEventListener('resize', resizeListener);
      if (observer) {
        observer.disconnect();
      }
    };
  }, []);

  return (
    <div ref={ref} className="fixed w-52 overflow-auto">
      {children}
    </div>
  );
};

export const SideNavContentContainer = ({ children }: PropsWithChildren<any>) => {
  return <div className="flex-1 pl-52 min-w-0">{children}</div>;
};
