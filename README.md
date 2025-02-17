## Todo List App

A simple todo list app that allows of listing and create tasks (Does not support delete and edit)

Usage:

On root

```bash
npm run install:all && cp ./frontend/.env.example ./frontend/.env && npm run dev
```

## Generic Details

- We're using redis to store the tasks, although in reality this should be in a database and redis just cache these and retrieve accordingly
- Some components could be more elaborated like the BaseInput, but kept it simple to some of our needs
- For validation on BE, kept it simple, but usually a library would be utlized, especially with nowadays BE frameworks these are out of the box 
- 

**Note:** I know that we're not using Typescript, but in case the company looking to use it in the future, this could be helpful to assses the ability of using Typescript. In case it would be more ideal to remove Typescript, can do so easily too as well :)
