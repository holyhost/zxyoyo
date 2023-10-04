# issue detail

```
 ⨯ Error: Cannot access Card.Section on the server. You cannot dot into a client module from a server component. You can only pass the imported name through.     
    at FileCard (./components/FileUpload/FileCard.tsx:20:137)
    at stringify (<anonymous>)
```

# background

page.tsx: server rendered.
FileCard.tsx: a component in page.tsx.

# solve
add 'use client' in the top of 'FileCard.tsx' file.
```
"use client"
import React from 'react'
```