# Description
The microservice which talks to Github API, checks changed files between 2 commits and with one GraphQL api return the array of the affected files.
The example repo is https://github.com/facebook/react

# Run
Before - `npm i`, then run it `node .`,  it will be ready at port `4000`. 

# Use
Use it with this example query
```
{
  files(base: 5, head: 1)
}
```
where `base` - order number of the base commit, `head` - order number of the head commit. 

***Examples:***

Check which files where changed between the 10th and the 8th commits
```
{
  files(base: 10, head: 8)
}
```
Check which files where changed between the second last and the last commits
```
{
  files(base: 1)
}
```
Check changes betwen HEAD and HEAD (ridiculous query), will return []
```
{
  files
}
```
# Used dependencies:
- "apollo-server" as a simple graphql server
- "octokit" to work with the github API
