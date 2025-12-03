import { Repository } from "./repo"

export interface issues {
    id: number
     repo: Repository
     repoId        :number
     label         ?:string
     description   ?:string
     approach      ?:string
     recommended   ?:string
}