import os
from langchain_ollama import OllamaLLM  # Use the local Ollama LLM class
from langchain.prompts import ChatPromptTemplate
from langchain.schema.output_parser import StrOutputParser
from dotenv import load_dotenv

load_dotenv()

# Set up LLaMA model through Ollama
LLM = OllamaLLM(
    model="meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo",
    max_tokens=3000,
)

# Define prompt template with packet structure summarization instructions
template = """
    You are an Assistant who summarizes the Packet Structure given to you. Highlight the important values present in the packet structure and do not list the values instead summarize what's happening in this packet. And no other talk, just summarize and explain.

    This should be the format: 
    This packet is an Ethernet frame that contains the following information:

- It is an IP packet with a destination address of 192.168.1.100 and a source address of 192.168.1.1.
- The packet is being sent over a TCP connection with a source port of 57017 and a destination port of an unknown value (rockwell_encap).
- The packet is part of a larger Enip (EtherNet/IP) communication, which is used for industrial automation.
- The packet contains two ENIP_SendUnitData items, each with a different type_id.
- The first ENIP_SendUnitData item is of type conn_address, which is a connection address.
- The second ENIP_SendUnitData item is of type conn_packet, which is a connection packet.
- This connection packet has a sequence number of 593 and a direction of response.
- The packet also contains a raw payload, which is a binary string of 372 bytes.

    Packet Details:
    {Packet}
"""

prompt = ChatPromptTemplate.from_template(template=template)
output_parser = StrOutputParser()


# Chain function to process with LLaMA via Ollama
def getLLMChain():
    chain = prompt | LLM | output_parser
    return chain
