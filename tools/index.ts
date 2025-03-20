import { automation } from "./automation"
import { media } from "./media"
import { management } from "./managment"
import { databases } from "./database"
import { monitoring } from "./monitoring"
import { other } from "./other"

export const tools = [
  ...automation,
  ...monitoring,
  ...media,
  ...management,
  ...databases,
  ...other,
]
