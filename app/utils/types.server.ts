import { lineage_skill, path_training, skill, training } from "@prisma/client"

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

  export type LSrelations = (lineage_skill & { skill: skill })[];

  export type PTrelations = (path_training & { training: training })[];


  /* vitality: number
    vigor: number
    power: number
    speed: number
    defense: number
    iniciative: number
    size: number
    baseWeight: number
    carryCap: number
    liftCap: number*/