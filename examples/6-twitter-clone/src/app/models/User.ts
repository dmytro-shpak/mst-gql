/* This is a mst-sql generated file */
import { types } from "mobx-state-tree"
import { MSTGQLObject, MSTGQLRef } from "mst-gql"

/* #region type-imports */

/* #endregion */

/* #region fragments */
export const userPrimitives = `
__typename
id
name
avatar
`

/* #endregion */

/* #region type-def */

/**
* User
*/
const User = MSTGQLObject
  .named('User')
  .props({
    id: types.identifier,
    name: types.string,
    avatar: types.string,
  })
/* #endregion */

  .actions(self => ({
    // this is just an auto-generated example action. 
    // Feel free to add your own actions, props, views etc to the model. 
    // Any code outside the '#region mst-gql-*'  regions will be preserved
    log() {
      console.log(JSON.stringify(self))
    }
  }))

export { User }