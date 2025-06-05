import {QueryEngineTool, Settings, VectorStoreIndex} from "llamaindex";
import {agent} from "@llamaindex/workflow";
import {openai} from "@llamaindex/openai";
import {HuggingFaceEmbedding} from "@llamaindex/huggingface";
import {SimpleDirectoryReader} from "@llamaindex/readers/directory";
import {vectorDir} from "../constants";
import path from "path";


Settings.embedModel = new HuggingFaceEmbedding({
  modelType: "BAAI/bge-small-en-v1.5",
  quantized: false,
});
const tools = []
let ragAgent = null


// metadata
// {
//   name: "san_francisco_budget_tool",
//   description: `This tool can answer detailed questions about the individual components of the budget of San Francisco in 2023-2024.`,
// }
export async function createIndexFromFile(filename, metadata) {
  const reader = new SimpleDirectoryReader();
  const filePath = path.join(vectorDir, filename)
  const documents = await reader.loadData(filePath);
  const index = await VectorStoreIndex.fromDocuments(documents)

  tools.push(
    index.queryTool({
      metadata,
      options: {similarityTopK: 10}
    })
  )

  ragAgent = agent({tools})
}

export async function ask(question: string) {
  const toolResponse = await ragAgent.run(question)
  console.log(toolResponse);
}



