What are models

Model is a piece of data of particular type. In our api.

model has properties.

```javascript
{
    id: string,
    type: any, // generally string like 'manga', 'chapter' think __typename in graphql
    attributes: any, // object with info about the object
    relationships: any // array of relations
}
```
