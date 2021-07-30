## Description

This is a Blog App API
- The swagger docs is available after `npm start` at [http://localhost:3001/docs](http://localhost:3001/docs) 

## Cache

- All Get APIs are cached for 15 minutes
- If there is a new blog post, blogs cache is deleted
- If there is a new comment on a post, specific posts cache is deleted

## Testing

- APIs can be tested via `npm test` I created a mongo atlas cluster for testing purposes

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the api 
Open [http://localhost:3001](http://localhost:3001) to view it in the browser.



