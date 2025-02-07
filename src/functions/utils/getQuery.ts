import { slugify } from "./slugify"

export const getQuery = (name:string) =>  {
    let data = ''
    const obj:{[id:string]: boolean} = {}
    slugify(name,'-').split('-').map(value => {
      data = `${data}${value}`
      obj[data] = true
      obj[value] = true
    })
    return obj
  }
  