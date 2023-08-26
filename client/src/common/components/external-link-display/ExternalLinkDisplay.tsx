interface ExternalLinkDisplayProps {
  href?: string;
  children?: React.ReactNode | string;
}
export const ExternalLinkDisplay = ({ href, children }: ExternalLinkDisplayProps) => {
  if (!href) return null;

  let fullURL = undefined;

  if (/^https?:\/\//i.test(href as string)) {
    fullURL = href;
  } else {
    fullURL = 'https://' + href;
  }

  return (
    <a href={fullURL} target="_blank" rel="noreferrer">
      {children}
    </a>
  );
};
