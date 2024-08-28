import { openAiCompatibleChat } from "../../../utils/utils"

export default function deepseekChat ({ apiKey }, ...args) {
  return openAiCompatibleChat('https://api.deepseek.com', apiKey, null, ...args)
}