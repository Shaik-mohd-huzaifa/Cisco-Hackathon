import os
from langchain_openai import ChatOpenAI
from langchain.prompts import ChatPromptTemplate
from langchain.schema.output_parser import StrOutputParser
from dotenv import load_dotenv

load_dotenv()

TOGETHER_AI_ENDPOINT = "https://api.together.xyz/v1"
TOGETHER_AI_API_KEY = "bf5252e1770e8558b08dfd2952fa5a9d0e315b84e6b01ff405746d8a26c068b2"


LLM = ChatOpenAI(
    base_url="https://api.together.xyz/v1",
    api_key="bf5252e1770e8558b08dfd2952fa5a9d0e315b84e6b01ff405746d8a26c068b2",
    model="meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo",
    max_tokens=3000,
)


template = """
    You are a Assistant who summarizes the Packet Structure given to you. Highlight the important values present in the packet structure and do not list the values instead summarize what's happening in this packet. And no other talk just summarize and explain
    
    This should be the format Refer the Format: 
    This packet is a Ethernet frame that contains the following information:

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


def getLLMChain():
    chain = prompt | LLM | output_parser
    return chain


packet_data = "### [ Ethernet ] ### dst = 34:29:8f:70:75:96 src = 08:61:95:de:65:0d type = IPv4 ### [ IP ] ### version = 4 ihl = 5 tos = 0x6c len = 436 id = 29476 flags = DF frag = 0 ttl = 64 proto = tcp chksum = 0x41fe src = 192.168.1.100 dst = 192.168.1.1 options = [] ### [ TCP ] ### sport = rockwell_encap dport = 57017 seq = 3886980433 ack = 84908469 dataofs = 5 reserved = 0 flags = PA window = 8192 chksum = 0xc416 urgptr = 0 options = [] ### [ ENIP_TCP ] ### command_id = SendUnitData length = 372 session = 1073850661 status = success sender_context = 0 options = 0 ### [ ENIP_SendUnitData ] ### interface_handle = 0 timeout = 0 count = 2 items = [### [ ENIP_SendUnitData_Item ] ### type_id = conn_address length = 4 ### [ ENIP_ConnectionAddress ] ### connection_id = 2147548663 ### [ ENIP_SendUnitData_Item ] ### type_id = conn_packet length = 352 ### [ ENIP_ConnectionPacket ] ### sequence = 593 ### [ CIP ] ### direction = response service = 0x38 path = [] status = [] ### [ Raw ] ### load = b'\x00\x00\x00\x02\x00\x06\x006\x01\xcc\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x83\x00\x00\x00\x01\x00\x0f\x00\x00\x00\x00\x00O\x02\x00\x00>\x9b\x8bN\xe0\xf0\x99\xe5=\xc6X\x84\x81\x1c[\x17v/\xb7\x00' ENIP_SendUnitData_Item = []"
