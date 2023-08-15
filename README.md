# lexical-link-preview-react

![made by Emergence Engineering](https://emergence-engineering.com/ee-logo.svg)


[**Made by Emergence-Engineering**](https://emergence-engineering.com/)

## Features

![feature-gif](https://emergence-engineering.com/lexical-link-preview.gif)


This easy-to-use plugin for lexical editors enhances the user experience by allowing them to see the page behind the link. 

The plugin takes two properties that allow you to:
- set whether to display the inserted link as well, next to the preview, and
- use **your async callback function** to retrieve metadata from the site 

The plugin applies the data to the preview box and shows you the name, the description and, if available, the image of the website.
You can easily customize the preview - use the popular 'card' design, stick to the 'bookmark' style, or create your own - whichever fits better to your UI.

Try it out at http://emergence-engineering.com/blog/lexical-link-preview

## How to use?

1. **Installation**: Install the plugin from your preferred package manager. For example, using npm, run the following command: `npm i -S lexical-link-preview-react`
2. **Import**: Import the node and the plugin into your project. 
```typescript
import { LinkPreviewNode, LinkPreviewPlugin } from "lexical-link-preview-react";
```

3. Don't forget to include the classname in your theme config:  
```html
  linkPreviewContainer: "linkPreviewContainer",
```
???????????????????????? where do I put this component to be editable?
You can use your custom css to style the preview, here is an example(which is the actual css used by default)


   - basic card structure

       ```html
       <BlockWithAlignableContents className={className} nodeKey={nodeKey}>
        <a href={url} target={"_blank"}>
            <div className={"previewBox"}>
            <img className={"previewImage"} src={res.images[0]} alt={""} />
            <div className={"previewText"}>
                <div className={"previewTitle"}>{res.title}</div>
                <div className={"previewDescription"}>{res.description}</div>
            </div>
            </div>
        </a>
        </BlockWithAlignableContents>
       ```

4. Add the node to the nodes array in your config: LinkPreviewNode

    ```typescript
    nodes: [LinkPreviewNode,]   
    ```

5. Initialize the editor with the plugin

   ```typescript
    const Editor = (): JSX.Element => {
        return (
         <LexicalComposer initialConfig={initialConfig}>
            
            <LinkPreviewPlugin
                showLink={false}
                fetchingFunction={fetchingFunction}
            />
   
            <RichTextPlugin
                contentEditable={<ContentEditable />}
                placeholder={placeholder}
                ErrorBoundary={LexicalErrorBoundary}
            />
          </LexicalComposer>
        )
     }
   ```

6. `LinkPreviewPlugin` requires 2 parameters:

- `showLink`: takes a boolean value
    - if true, inserts the link inline and puts the preview to the bottom of the editor
    - if false, inserts the preview as an inline-block element and nothing else
      

   - `fetchingFunction`: `(link: string) => Promise<{url: string, title: string, description: string, images: string[]}>` a function that takes a link and returns a `Promise` that resolves to the link preview data, you can easily do this using next.js API routes
     ??????????????? or just using `link-preview-js` library on your custom backend

       ```typescript
       import type { NextApiRequest, NextApiResponse } from "next";
       import Cors from "cors";
       import { getLinkPreview } from "link-preview-js";
       // Initializing the cors middleware
       // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
       const cors = Cors({
         methods: ["POST", "GET", "HEAD"],
       });
       // Helper method to wait for a middleware to execute before continuing
       // And to throw an error when an error happens in a middleware
       function runMiddleware(
         req: NextApiRequest,
         res: NextApiResponse,
         fn: Function
       ) {
         return new Promise((resolve, reject) => {
           fn(req, res, (result: any) => {
             if (result instanceof Error) {
               return reject(result);
             }
             return resolve(result);
           });
         });
       }
       export default async function handler(
         req: NextApiRequest,
         res: NextApiResponse
       ) {
         // Run the middleware
         await runMiddleware(req, res, cors);
    
         const { link } = JSON.parse(req.body);
         console.log({ link });
    
         const data = await getLinkPreview(link);
    
         // Rest of the API logic
         res.json({ data });
       }
       ```


   

## Fetching preview data

**this does not happen automatically**, you need to handle it yourself by providing the `fetchingFunction` callback function

- this usually requires a backend using a 3rd party library like `link-preview-js`
- you can use `linkpreview.net` API endpoint to fetch your preview data from the frontend
- in case you are using nextjs, you can easily use our example above
- or any other tool you see fit