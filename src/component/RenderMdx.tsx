import { useEffect, useState } from 'react';
import { compile } from '@mdx-js/mdx';
import * as runtime from 'react/jsx-runtime';
import { MDXProvider } from '@mdx-js/react';
import styles from "./RenderMdx.module.css"

export const RenderMDX = ({ content }: { content: string }) => {
  const [Component, setComponent] = useState<React.ComponentType | null>(null);

  useEffect(() => {
    const compileMDX = async () => {
      const compiled = await compile(content, { outputFormat: 'function-body' });
      const { default: Comp } = new Function(String(compiled))(runtime);
      setComponent(() => Comp);
    };

    compileMDX();
  }, [content]);

  if (!Component) return <p>Loading...</p>;
  // const components = {
  //   p: (props: any) => (
  //     <p
  //       style={{
  //         lineHeight: '.2',
  //         marginBlockStart: '0.1em',
  //         marginBlockEnd: '0.1em',
  //         marginInlineStart: '0px',
  //         marginInlineEnd: '0px',
  //         border: '1px solid black !important' ,
  //       }}
  //       {...props}
  //     />
  //   ),
  // };
  
  
  return (
    <MDXProvider >
      {/* components={components}> */}
      <div className={styles.mdxWrapper}>
      <Component />
      </div>
      
    </MDXProvider>
  );
};
