import { useEffect, useState } from 'react';

const SafeHTML = ({ html, className, tag = 'div', ...props }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const Tag = tag;
  const normalizedHTML = html ? String(html).trim() : '';

  if (!isClient) {
    return <Tag className={className} {...props} suppressHydrationWarning />;
  }

  return (
    <Tag
      className={className}
      {...props}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: normalizedHTML }}
    />
  );
};

export default SafeHTML;




