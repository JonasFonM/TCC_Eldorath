import { lineage_skill, skill } from "@prisma/client"

export type RegisterForm = {
  email: string
  password: string
  username: string
}

export type LoginForm = {
  email: string
  password: string
}

export type CharacterForm = {
  name: string
  level: number
  tier: number
  agility: number
  body: number
  mind: number
  authorId: number
}

export type CampaignForm = {
  title: string
  description: string,
  masterId: number,
  era: number,
  year: number,
  month: number,
  monthDay: number,
  weekDay: number,

}
export type SceneForm = {
  era: number,
  year: number,
  month: number,
  monthDay: number,
  weekDay: number,
}