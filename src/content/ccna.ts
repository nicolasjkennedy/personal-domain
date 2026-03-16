export interface CCNAVideo {
  title: string;
  search: string;
  url?: string;  // Direct link — if present, overrides YouTube search
  length: string;
  topics: string;
  note?: string;
}

export interface CCNAWeek {
  week: number;
  title: string;
  slug: string;
  objectives: string[];
  videos: CCNAVideo[];
  conceptsLabel: string;
  concepts: string;
  lab: string;
  practiceQuestions: string[];
  realWorld: string;
}

export const ccnaWeeks: CCNAWeek[] = [
  {
    week: 1,
    title: "Network Fundamentals - The Basics",
    slug: "week-1-network-fundamentals",
    objectives: [
      "Understand the role of routers and switches in a network",
      "Know the OSI model and TCP/IP model layers",
      "Understand Layer 2 vs Layer 3 switching",
      "Know basic network topologies",
      "Understand network addressing basics",
    ],
    videos: [
      {
        title: "NetworkChuck \"What is a Network?\" (Day 0)",
        search: "NetworkChuck What is a Network Day 0 CCNA",
        length: "~10 min",
        topics: "Network basics, overview",
      },
      {
        title: "NetworkChuck \"What is a SWITCH?\" (Day 1)",
        search: "NetworkChuck What is a Switch Day 1 CCNA",
        length: "~15 min",
        topics: "Switches, Layer 2",
      },
      {
        title: "NetworkChuck \"What is a ROUTER?\" (EP 2)",
        search: "NetworkChuck What is a Router EP 2 CCNA",
        length: "~15 min",
        topics: "Routers, Layer 3",
      },
      {
        title: "NetworkChuck \"TCP/IP and OSI\" (EP 3)",
        search: "NetworkChuck TCP IP and OSI EP 3 CCNA",
        length: "~20 min",
        topics: "OSI model, TCP/IP model",
        note: "CRITICAL",
      },
      {
        title: "NetworkChuck \"Real Life Example TCP/IP and OSI\" (EP 4)",
        search: "NetworkChuck Real Life Example TCP IP OSI EP 4 CCNA",
        length: "~15 min",
        topics: "OSI model in practice",
        note: "KEY",
      },
      {
        title: "NetworkChuck \"Datacenter Networks\" (EP 7)",
        search: "NetworkChuck Datacenter Networks EP 7 CCNA",
        length: "~15 min",
        topics: "Datacenter topology",
      },
    ],
    conceptsLabel: "OSI & TCP/IP Models",
    concepts: `OSI MODEL (7 Layers):
7. Application (HTTP, FTP, DNS, SSH)
6. Presentation (Encryption, Compression)
5. Session (Establish/maintain connections)
4. Transport (TCP, UDP - reliability vs speed)
3. Network (IP routing, routers)
2. Data Link (MAC addresses, switches)
1. Physical (Cables, electrical signals)

TCP/IP MODEL (4 Layers):
4. Application (same as OSI 7-5)
3. Transport (TCP, UDP)
2. Internet (IP, ICMP)
1. Link (Ethernet, MAC)

KEY DEVICES:
- Router: Layer 3 (forwards based on IP)
- Switch: Layer 2 (forwards based on MAC)
- Hub: Layer 1 (dumb repeater - don't use)`,
    lab: "GNS3 Setup — Download GNS3, create a simple 2-router topology with 2 switches, draw the topology on paper, and take a screenshot.",
    practiceQuestions: [
      "Name all 7 OSI layers from bottom to top.",
      "At what layer do routers operate?",
      "What is the difference between a MAC address and an IP address?",
      "Why are both Layer 2 and Layer 3 needed in a network?",
      "Trace a packet from PC-A to PC-B on different networks through each OSI layer.",
    ],
    realWorld:
      "At URI, routers connect buildings and separate networks while switches connect computers within a single building. The data center requires both — switches for intra-rack communication and routers for inter-network routing.",
  },
  {
    week: 2,
    title: "IP Addressing & Subnetting Fundamentals",
    slug: "week-2-ip-addressing-subnetting",
    objectives: [
      "Understand IPv4 addressing structure",
      "Master decimal-to-binary conversion",
      "Understand subnet masks and CIDR notation",
      "Calculate network and broadcast addresses",
      "Determine the number of usable host addresses",
    ],
    videos: [
      {
        title: "NetworkChuck \"What is an IP Address?\" (EP 15)",
        search: "NetworkChuck What is an IP Address EP 15 CCNA",
        length: "~15 min",
        topics: "IP addressing basics",
      },
      {
        title: "NetworkChuck \"You SUCK at Subnetting\" Parts 1-5",
        search: "NetworkChuck You SUCK at Subnetting Part 1 CCNA",
        length: "~20 min each",
        topics: "Subnetting deep dive",
        note: "CRITICAL",
      },
      {
        title: "David Bombal \"IP Subnetting\"",
        search: "David Bombal IP Subnetting CCNA",
        length: "~30 min",
        topics: "Subnetting alternative explanation",
        note: "If struggling",
      },
      {
        title: "NetworkChuck \"We Ran OUT of IP Addresses\"",
        search: "NetworkChuck We Ran Out of IP Addresses CCNA",
        length: "~15 min",
        topics: "IPv4 exhaustion, NAT, IPv6",
      },
      {
        title: "NetworkChuck \"Forcing My Kids to Make Ethernet Cables\" (EP 11)",
        search: "NetworkChuck Forcing My Kids Ethernet Cables EP 11 CCNA",
        length: "~15 min",
        topics: "Physical cabling",
      },
    ],
    conceptsLabel: "IPv4 Addressing & Subnetting",
    concepts: `IPv4 ADDRESSING:
- 4 octets: 192.168.1.5
- Range per octet: 0-255 (8 bits each)
- Total: 32 bits

SUBNET MASKS:
- /24 = 255.255.255.0   (hosts: 254 usable)
- /25 = 255.255.255.128 (hosts: 126 usable)
- /26 = 255.255.255.192 (hosts: 62 usable)
- /30 = 255.255.255.252 (hosts: 2 usable) - router-to-router
- /32 = single host

SUBNETTING FORMULA:
- Network address: first address
- Broadcast address: last address
- Usable hosts: 2^(32-prefix) - 2
- Example: /24 = 2^(32-24) - 2 = 2^8 - 2 = 254 hosts

BINARY CONVERSION:
128 | 64 | 32 | 16 | 8 | 4 | 2 | 1
(Memorize this row — it's everything)`,
    lab: "Assign IP addresses to the Week 1 topology. PC-A: 192.168.1.10/24, PC-B: 192.168.2.10/24, Router interface A: 192.168.1.1/24, Router interface B: 192.168.2.1/24.",
    practiceQuestions: [
      "Convert 192.168.5.0/25 to binary — what is the broadcast address?",
      "How many usable hosts are in a /28 subnet?",
      "Create 4 equal subnets from 10.0.0.0/16.",
      "What CIDR notation represents the subnet mask 255.255.240.0?",
      "Subnet 172.16.0.0/12 into /24 networks — how many subnets do you get?",
    ],
    realWorld:
      "URI departments have different subnets for isolation and security. /24 is the most common subnet in enterprise networks. /30 subnets are used between routers to conserve addresses.",
  },
  {
    week: 3,
    title: "Network Access - VLANs & Switching",
    slug: "week-3-vlans-switching",
    objectives: [
      "Understand VLAN concepts and their benefits",
      "Configure VLANs on Cisco switches",
      "Understand trunk ports vs access ports",
      "Configure access ports for VLAN assignment",
      "Understand VLAN routing basics",
      "Understand Spanning Tree Protocol basics",
    ],
    videos: [
      {
        title: "NetworkChuck \"VLANs (Virtual LANs)\"",
        search: "NetworkChuck VLANs Virtual LANs CCNA",
        length: "~20 min",
        topics: "VLAN concepts",
        note: "KEY",
      },
      {
        title: "NetworkChuck \"How to Configure a VLAN\"",
        search: "NetworkChuck How to Configure a VLAN CCNA",
        length: "~20 min",
        topics: "VLAN configuration CLI",
        note: "HANDS-ON",
      },
      {
        title: "NetworkChuck \"Trunks (Tagged vs Untagged)\"",
        search: "NetworkChuck Trunks Tagged vs Untagged CCNA",
        length: "~15 min",
        topics: "Trunk ports, 802.1Q tagging",
        note: "CRITICAL",
      },
      {
        title: "Cisco Learning Network \"Spanning Tree Basics\"",
        search: "Cisco Spanning Tree Protocol Basics CCNA",
        length: "~15 min",
        topics: "STP loop prevention",
      },
      {
        title: "NetworkChuck \"Port Security\" (EP 14)",
        search: "NetworkChuck Port Security EP 14 CCNA",
        length: "~15 min",
        topics: "Port security concepts",
      },
      {
        title: "David Bombal \"VLAN Routing & Inter-VLAN Communication\"",
        search: "David Bombal VLAN Routing Inter-VLAN Communication CCNA",
        length: "~25 min",
        topics: "Inter-VLAN routing",
      },
    ],
    conceptsLabel: "VLANs, Trunks & STP",
    concepts: `VLAN BASICS:
- Separates devices into logical groups
- VLAN 1: Default (don't use for production)
- VLANs 2-1005: Standard range
- VLANs 1006-4094: Extended range

VLAN CONFIGURATION (CLI):
conf t
vlan 10
 name Engineering
vlan 20
 name Sales
exit
int range fa0/1-5
 switchport access vlan 10
 switchport mode access
exit

TRUNK CONFIGURATION:
int fa0/24
 switchport trunk encapsulation dot1q
 switchport mode trunk
 switchport trunk allowed vlan 10,20,30
exit

SPANNING TREE:
- Prevents loops in redundant topologies
- Blocks ports to create a loop-free tree
- Reconverges automatically if a link fails
- Types: STP (802.1D), RSTP (802.1w), MSTP (802.1s)

PORT SECURITY:
- Limits MAC addresses per port
- sticky: learns MACs dynamically
- violation action: shutdown, restrict, protect`,
    lab: "Create 3 switches connected via trunk links. Configure VLAN 10 (Engineering) and VLAN 20 (Sales). Assign PCs to VLANs. Test connectivity within the same VLAN and verify no cross-VLAN traffic. Configure port security on access ports.",
    practiceQuestions: [
      "What is the default VLAN and why should you not use it for production?",
      "What is the difference between an access port and a trunk port?",
      "Why is Spanning Tree Protocol necessary?",
      "Write the commands to allow only VLANs 10, 20, and 30 on a trunk port.",
      "What happens if two switches are connected but the link is not configured as a trunk?",
    ],
    realWorld:
      "URI uses VLANs to logically separate faculty, student, and administrative networks — even on the same physical switch infrastructure. This provides security isolation and broadcast domain control.",
  },
  {
    week: 4,
    title: "Network Access - Wireless & Ethernet",
    slug: "week-4-wireless-ethernet",
    objectives: [
      "Understand wireless LAN standards (802.11 a/b/g/n/ac/ax)",
      "Know wireless security types (WEP, WPA, WPA2, WPA3)",
      "Understand SSIDs, channels, and frequency bands",
      "Know Ethernet cabling standards (Cat5e, Cat6, Cat6a)",
      "Understand Power over Ethernet (PoE)",
      "Know wireless access point concepts",
    ],
    videos: [
      {
        title: "NetworkChuck \"Wireless (802.11)\"",
        search: "NetworkChuck Wireless 802.11 CCNA",
        length: "~20 min",
        topics: "Wireless standards overview",
        note: "KEY",
      },
      {
        title: "NetworkChuck \"Wireless Security (WPA2 vs WPA3)\"",
        search: "NetworkChuck Wireless Security WPA2 vs WPA3 CCNA",
        length: "~15 min",
        topics: "Wireless security protocols",
      },
      {
        title: "NetworkChuck \"Power over Ethernet (PoE)\" (EP 12)",
        search: "NetworkChuck Power over Ethernet PoE EP 12 CCNA",
        length: "~15 min",
        topics: "PoE standards, powered devices",
      },
      {
        title: "NetworkChuck \"Ethernet Cables\" (EP 11)",
        search: "NetworkChuck Ethernet Cables EP 11 CCNA",
        length: "~15 min",
        topics: "Cabling categories",
      },
      {
        title: "Professor Messer \"Wireless Channels & Frequencies\"",
        search: "Professor Messer Wireless Channels Frequencies CCNA",
        length: "~15 min",
        topics: "2.4GHz vs 5GHz channels",
      },
    ],
    conceptsLabel: "Wireless Standards & PoE",
    concepts: `WIRELESS STANDARDS:
802.11a:  5GHz,          54 Mbps
802.11b:  2.4GHz,        11 Mbps
802.11g:  2.4GHz,        54 Mbps
802.11n:  2.4GHz & 5GHz, 600 Mbps (MIMO)
802.11ac: 5GHz only,     1.3 Gbps (WiFi 5)
802.11ax: 2.4GHz & 5GHz, 10+ Gbps (WiFi 6)

WIRELESS SECURITY:
WEP:  BROKEN - do not use
WPA:  Better, but outdated
WPA2: Current standard, strong security
WPA3: Newest, strongest

BANDS:
2.4GHz: Better range, more interference, 11 channels (1-11 US)
5GHz:   Less range, less interference, 36+ channels

ETHERNET CABLING:
Cat5e: 100 Mbps
Cat6:  1 Gbps (most common)
Cat6a: 10 Gbps

PoE STANDARDS:
802.3at (PoE+): 30W
802.3bt:        60W+
Used for: APs, IP cameras, VoIP phones`,
    lab: "Document the wireless standards in use at URI. Identify access points (802.11ac or 802.11ax?). Document PoE-powered devices on the network. Inspect switch ports and identify which are PoE-enabled.",
    practiceQuestions: [
      "What is the difference between 802.11ac and 802.11n?",
      "Which 5GHz channels are non-overlapping?",
      "Why is the 2.4GHz band more congested than 5GHz?",
      "What is the maximum power delivery of 802.3at PoE+?",
      "Why is WPA3 more secure than WPA2?",
    ],
    realWorld:
      "URI has both wired and wireless infrastructure. Network technicians regularly support WiFi connectivity issues, configure PoE-powered devices like IP phones and APs, and run structured cabling.",
  },
  {
    week: 5,
    title: "IP Connectivity - Routing Fundamentals",
    slug: "week-5-routing-fundamentals",
    objectives: [
      "Understand static vs dynamic routing",
      "Know routing protocol types (IGP vs EGP)",
      "Configure and understand default routes",
      "Understand how routers make forwarding decisions",
      "Read and interpret a routing table",
      "Configure basic OSPF",
      "Configure static routes via CLI",
    ],
    videos: [
      {
        title: "NetworkChuck \"What is Routing?\"",
        search: "NetworkChuck What is Routing CCNA",
        length: "~20 min",
        topics: "Routing fundamentals",
        note: "FOUNDATION",
      },
      {
        title: "NetworkChuck \"Static Routing\"",
        search: "NetworkChuck Static Routing CCNA",
        length: "~20 min",
        topics: "Static route configuration",
        note: "HANDS-ON",
      },
      {
        title: "NetworkChuck \"OSPF Part 1\"",
        search: "NetworkChuck OSPF Part 1 CCNA",
        length: "~25 min",
        topics: "OSPF concepts",
        note: "KEY",
      },
      {
        title: "NetworkChuck \"OSPF Part 2\"",
        search: "NetworkChuck OSPF Part 2 CCNA",
        length: "~25 min",
        topics: "OSPF configuration",
      },
      {
        title: "CBT Nuggets \"OSPF Explained\"",
        search: "CBT Nuggets OSPF Explained CCNA",
        length: "~30 min",
        topics: "OSPF alternative explanation",
        note: "If struggling",
      },
      {
        title: "NetworkChuck \"Routing Table Deep Dive\"",
        search: "NetworkChuck Routing Table Deep Dive CCNA",
        length: "~15 min",
        topics: "Reading routing tables",
        note: "CRITICAL",
      },
    ],
    conceptsLabel: "Routing & OSPF",
    concepts: `ROUTING BASICS:
- Static:  Manually configured routes
- Dynamic: Routes learned automatically via protocols

ROUTING PROTOCOLS:
IGP (Interior Gateway Protocol):
  - RIP:   Distance-vector (slow, max 15 hops)
  - OSPF:  Link-state (fast, scalable)
  - EIGRP: Cisco proprietary (hybrid)

EGP (Exterior Gateway Protocol):
  - BGP: Used between ISPs / autonomous systems

OSPF CONCEPTS:
- Link-state routing (knows full topology)
- Administrative distance: 110
- Uses Dijkstra's shortest path algorithm
- Metric: Cost (inversely proportional to bandwidth)
- Area 0 is the backbone area

ROUTING TABLE EXAMPLE:
O 10.0.0.0/24 [110/100] via 192.168.1.1, FastEthernet0/0
^ Protocol    ^ AD/Cost  ^ Next-hop       ^ Interface

Static Route CLI:
ip route 10.0.0.0 255.255.255.0 192.168.1.1

OSPF Configuration:
router ospf 1
 network 192.168.1.0 0.0.0.255 area 0
 network 10.0.0.0 0.0.0.255 area 0`,
    lab: "Create a 3-router topology. Configure static routes between all routers and test with ping. Then reconfigure using OSPF. Verify neighbor relationships with 'show ip ospf neighbor' and confirm routes with 'show ip route'.",
    practiceQuestions: [
      "What is the difference between static and dynamic routing?",
      "When would you prefer static routes over OSPF?",
      "What is administrative distance and why does it matter?",
      "Write the command to configure a default route pointing to 192.168.1.1.",
      "What is OSPF Area 0 and why is it required?",
    ],
    realWorld:
      "Inter-building routing at URI uses OSPF for dynamic convergence. Default routes point to the Internet gateway. When troubleshooting connectivity at work, routing table analysis is often the first step.",
  },
  {
    week: 6,
    title: "IP Connectivity - Advanced Routing & EIGRP",
    slug: "week-6-advanced-routing-eigrp",
    objectives: [
      "Understand EIGRP and how it differs from OSPF",
      "Know administrative distance values for all protocols",
      "Understand default vs static routes",
      "Understand routing convergence",
      "Configure EIGRP on Cisco routers",
      "Configure basic NAT and PAT",
    ],
    videos: [
      {
        title: "NetworkChuck \"EIGRP\"",
        search: "NetworkChuck EIGRP CCNA",
        length: "~20 min",
        topics: "EIGRP concepts and config",
      },
      {
        title: "NetworkChuck \"OSPF vs EIGRP vs RIP\"",
        search: "NetworkChuck OSPF vs EIGRP vs RIP CCNA comparison",
        length: "~20 min",
        topics: "Protocol comparison",
        note: "COMPARISON",
      },
      {
        title: "Professor Messer \"Routing Protocols Overview\"",
        search: "Professor Messer Routing Protocols Overview CCNA",
        length: "~20 min",
        topics: "All routing protocols overview",
      },
      {
        title: "NetworkChuck \"Distance Vector vs Link State\"",
        search: "NetworkChuck Distance Vector vs Link State CCNA",
        length: "~20 min",
        topics: "Protocol type differences",
        note: "CONCEPTUAL",
      },
      {
        title: "NetworkChuck \"NAT (Network Address Translation)\"",
        search: "NetworkChuck NAT Network Address Translation CCNA",
        length: "~20 min",
        topics: "NAT, PAT, static NAT",
        note: "RELEVANT",
      },
    ],
    conceptsLabel: "EIGRP, NAT & Administrative Distance",
    concepts: `EIGRP CONCEPTS:
- Cisco proprietary hybrid protocol
- Fast convergence (DUAL algorithm)
- Administrative distance: 90

ADMINISTRATIVE DISTANCE (AD):
Connected:    0
Static:       1
EIGRP:       90
OSPF:       110
RIP:        120
(Lower AD = more trusted route)

EIGRP CONFIGURATION:
router eigrp 100
 network 192.168.1.0 0.0.0.255
 network 10.0.0.0 0.0.0.255
 no auto-summary

NAT TYPES:
- Inside local:  private IP on inside network
- Inside global: public IP representing inside host

STATIC NAT:
ip nat inside source static 10.0.0.5 203.0.113.1

PAT (Port Address Translation):
ip nat inside source list 1 interface Fa0/0 overload
access-list 1 permit 10.0.0.0 0.0.0.255`,
    lab: "Build on Week 5 lab. Add a 4th router and configure EIGRP. Create a mixed OSPF/EIGRP topology. Configure default routes. Test routing. Check AD values with 'show ip protocols'. Perform a failover test by shutting a link.",
    practiceQuestions: [
      "Which has lower administrative distance — OSPF or EIGRP?",
      "When would you choose EIGRP over OSPF?",
      "What is the key difference between distance-vector and link-state protocols?",
      "Write the commands to configure NAT for a 10.0.0.0/24 inside network.",
      "What is PAT and how does it differ from static NAT?",
    ],
    realWorld:
      "Large enterprise networks often run multiple routing protocols. NAT is standard for connecting private networks to the Internet. Convergence time matters for failover — a slow protocol means longer outages.",
  },
  {
    week: 7,
    title: "IP Connectivity - BGP Basics & Route Summarization",
    slug: "week-7-bgp-route-summarization",
    objectives: [
      "Understand BGP concepts and when it is used",
      "Know what an Autonomous System (AS) is",
      "Understand route summarization and its benefits",
      "Know classful vs classless routing",
      "Configure route summarization in OSPF",
    ],
    videos: [
      {
        title: "NetworkChuck \"BGP Basics\"",
        search: "NetworkChuck BGP Basics CCNA",
        length: "~20 min",
        topics: "BGP overview",
      },
      {
        title: "Professor Messer \"BGP Fundamentals\"",
        search: "Professor Messer BGP Fundamentals CCNA",
        length: "~20 min",
        topics: "BGP concepts",
      },
      {
        title: "NetworkChuck \"Route Summarization\"",
        search: "NetworkChuck Route Summarization CCNA",
        length: "~20 min",
        topics: "Summarizing routes",
        note: "PRACTICAL",
      },
      {
        title: "CBT Nuggets \"Classless vs Classful Routing\"",
        search: "CBT Nuggets Classless vs Classful Routing CCNA",
        length: "~15 min",
        topics: "CIDR vs classful",
      },
    ],
    conceptsLabel: "BGP & Route Summarization",
    concepts: `BGP BASICS:
- Exterior Gateway Protocol (runs between ASes)
- AS (Autonomous System): networks under single admin
- Uses AS path attribute to prevent routing loops
- Administrative Distance: 20 (external), 200 (internal)

ROUTE SUMMARIZATION:
- Combines multiple routes into a single summary route
- Reduces routing table size and CPU overhead
- Example: 10.0.0.0/24 through 10.0.3.0/24
  Summarizes to: 10.0.0.0/22

CLASSFUL vs CLASSLESS:
Classful (OLD):
- Class A: 1-126   (255.0.0.0)
- Class B: 128-191 (255.255.0.0)
- Class C: 192-223 (255.255.255.0)

Classless CIDR (Current):
- Any prefix /1 to /32
- Efficient address utilization

OSPF ROUTE SUMMARIZATION:
router ospf 1
 area 0 range 10.0.0.0 255.255.0.0`,
    lab: "Create a network with multiple subnets. Calculate the summary address manually. Configure OSPF with summarization enabled. Verify with 'show ip ospf database' and compare routing table size before and after summarization.",
    practiceQuestions: [
      "What is an Autonomous System (AS)?",
      "When would an organization use BGP?",
      "What summary address covers 192.168.0.0/24 through 192.168.3.0/24?",
      "What are the benefits of route summarization?",
      "Explain the difference between CIDR and classful addressing.",
    ],
    realWorld:
      "ISPs use BGP to exchange routes globally. A company receives routes from its ISP via BGP. Large organizations use summarization to keep routing tables manageable and reduce convergence time.",
  },
  {
    week: 8,
    title: "IP Services - DHCP, DNS, NAT, SNMP, Syslog, NTP",
    slug: "week-8-ip-services",
    objectives: [
      "Understand DHCP and the DORA process",
      "Know DNS concepts and resolution",
      "Understand DHCP relay agents (ip helper-address)",
      "Know NTP purpose and stratum levels",
      "Understand SNMP basics and versions",
      "Know Syslog severity levels",
      "Configure DHCP on a Cisco router",
      "Understand IPv6 addressing basics",
    ],
    videos: [
      {
        title: "NetworkChuck \"DHCP\"",
        search: "NetworkChuck DHCP CCNA",
        length: "~20 min",
        topics: "DHCP process, DORA",
        note: "KEY",
      },
      {
        title: "NetworkChuck \"Configure DHCP on Cisco Router\"",
        search: "NetworkChuck Configure DHCP Cisco Router CCNA",
        length: "~20 min",
        topics: "DHCP configuration CLI",
        note: "HANDS-ON",
      },
      {
        title: "NetworkChuck \"DNS\"",
        search: "NetworkChuck DNS CCNA",
        length: "~15 min",
        topics: "DNS resolution process",
      },
      {
        title: "NetworkChuck \"NTP\"",
        search: "NetworkChuck NTP Network Time Protocol CCNA",
        length: "~15 min",
        topics: "NTP, stratum levels",
        note: "RELEVANT",
      },
      {
        title: "NetworkChuck \"SNMP\"",
        search: "NetworkChuck SNMP Simple Network Management Protocol CCNA",
        length: "~15 min",
        topics: "SNMP monitoring",
        note: "PRACTICAL",
      },
      {
        title: "NetworkChuck \"Syslog\"",
        search: "NetworkChuck Syslog CCNA",
        length: "~15 min",
        topics: "Syslog severity levels",
      },
      {
        title: "NetworkChuck \"IPv6 Basics\"",
        search: "NetworkChuck IPv6 Basics CCNA",
        length: "~20 min",
        topics: "IPv6 addressing",
      },
    ],
    conceptsLabel: "DHCP, DNS, NTP, SNMP & IPv6",
    concepts: `DHCP PROCESS (DORA):
D - Discover:     Client broadcasts to find DHCP server
O - Offer:        Server responds with IP address offer
R - Request:      Client requests the offered address
A - Acknowledge:  Server confirms the assignment

DHCP CONFIGURATION:
ip dhcp pool EMPLOYEES
 network 10.0.0.0 255.255.255.0
 default-router 10.0.0.1
 dns-server 8.8.8.8
 lease 7
exit
ip dhcp excluded-address 10.0.0.1 10.0.0.10

DHCP RELAY:
ip helper-address 10.0.1.5

NTP:
- Synchronizes clocks across the network
- Stratum 1: Directly connected reference clock
- Command: ntp server 132.163.96.1

SNMP:
- Monitors network device health and metrics
- Community string: password for SNMP access
- v3: Most secure (authentication + encryption)

IPv6 ADDRESSING:
- 128-bit address (vs IPv4 32-bit)
- Example: 2001:0db8::ff00:42:8329
- Link-local: fe80:: (automatic, not routable)
- Global unicast: 2000::/3`,
    lab: "Configure a DHCP server on a router. Exclude admin addresses. Set default router and DNS. Connect a client and verify with 'ipconfig /all'. Configure NTP synchronization. Configure Syslog to an external server. Configure SNMPv2 with community string.",
    practiceQuestions: [
      "Explain the DORA process step by step.",
      "What is a DHCP relay agent and when is it needed?",
      "How does DNS resolution work from client to authoritative server?",
      "Why is NTP important in a network environment?",
      "What is the difference between SNMP v2 and v3?",
      "What is the format of an IPv6 address?",
      "What is the purpose of Syslog?",
    ],
    realWorld:
      "At URI, DHCP automatically assigns IPs to student and staff devices. DNS resolves portal hostnames to IPs. NTP ensures log timestamps across devices match — critical for incident analysis. SNMP monitors device health in the NOC.",
  },
  {
    week: 9,
    title: "Security - Access Control Lists & Device Security",
    slug: "week-9-acls-device-security",
    objectives: [
      "Understand ACL concepts and processing order",
      "Know the difference between numbered and named ACLs",
      "Configure standard ACLs (source IP only)",
      "Configure extended ACLs (IP, protocol, port)",
      "Understand ACL placement and direction (in/out)",
      "Configure SSH for secure device management",
      "Configure device password security",
    ],
    videos: [
      {
        title: "NetworkChuck \"ACLs\"",
        search: "NetworkChuck ACLs Access Control Lists CCNA",
        length: "~20 min",
        topics: "ACL concepts",
        note: "CRITICAL",
      },
      {
        title: "NetworkChuck \"Configure Standard ACLs\"",
        search: "NetworkChuck Configure Standard ACLs CCNA",
        length: "~20 min",
        topics: "Standard ACL configuration",
        note: "HANDS-ON",
      },
      {
        title: "NetworkChuck \"Configure Extended ACLs\"",
        search: "NetworkChuck Configure Extended ACLs CCNA",
        length: "~20 min",
        topics: "Extended ACL configuration",
        note: "HANDS-ON",
      },
      {
        title: "NetworkChuck \"Named ACLs\"",
        search: "NetworkChuck Named ACLs CCNA",
        length: "~15 min",
        topics: "Named vs numbered ACLs",
      },
      {
        title: "NetworkChuck \"SSH (Secure Shell)\"",
        search: "NetworkChuck SSH Secure Shell CCNA",
        length: "~15 min",
        topics: "SSH configuration",
        note: "CRITICAL",
      },
      {
        title: "Professor Messer \"ACL Deep Dive\"",
        search: "Professor Messer ACL Deep Dive CCNA",
        length: "~25 min",
        topics: "Advanced ACL concepts",
      },
    ],
    conceptsLabel: "ACLs & SSH Security",
    concepts: `ACL BASICS:
- Filters traffic based on defined criteria
- Processed top-to-bottom (first match wins)
- Implicit deny all at the end of every ACL
- Applied to interfaces in inbound or outbound direction

STANDARD ACL (source IP only):
access-list 10 permit 10.0.0.0 0.0.0.255
interface fa0/0
 ip access-group 10 in

WILDCARD MASK:
Subnet: 255.255.255.0 -> Wildcard: 0.0.0.255
Subnet: 255.255.240.0 -> Wildcard: 0.0.15.255

EXTENDED ACL (IP, protocol, port):
access-list 101 permit tcp 10.0.0.0 0.0.0.255 any eq 80

COMMON PORTS:
SSH:   22
HTTP:  80
HTTPS: 443
DNS:   53
SNMP:  161

SSH CONFIGURATION:
hostname Router1
ip domain-name example.com
crypto key generate rsa 1024
username admin privilege 15 password cisco123
line vty 0 4
 transport input ssh
 login local

DEVICE PASSWORDS:
enable secret cisco456
service password-encryption`,
    lab: "Create a standard ACL to permit only the HR subnet. Apply it to an interface. Test with ping. Create an extended ACL to permit HTTP only from the admin subnet. Configure SSH access on vty lines. Remove Telnet access. Configure local user accounts.",
    practiceQuestions: [
      "Explain the implicit deny at the end of every ACL.",
      "Write a standard ACL to deny the 192.168.5.0/24 network.",
      "Write an extended ACL to permit SSH from the 10.0.0.0/8 network.",
      "What is the difference between a standard and an extended ACL?",
      "Write all commands required to configure SSH on a Cisco router.",
      "Why should Telnet never be used on production devices?",
    ],
    realWorld:
      "ACLs are the first line of defense on network devices. All production Cisco devices at URI ITS use SSH-only management — Telnet transmits credentials in plaintext. Port-based access control is standard practice.",
  },
  {
    week: 10,
    title: "Security - Switch Security & Port Security",
    slug: "week-10-switch-security",
    objectives: [
      "Configure port security on Cisco switches",
      "Understand MAC address limiting",
      "Know port security violation modes (shutdown, restrict, protect)",
      "Configure DHCP snooping",
      "Understand Dynamic ARP Inspection (DAI)",
      "Understand VTP modes and security implications",
    ],
    videos: [
      {
        title: "NetworkChuck \"Port Security\" (EP 14)",
        search: "NetworkChuck Port Security EP 14 CCNA",
        length: "~15 min",
        topics: "Port security concepts",
        note: "CRITICAL",
      },
      {
        title: "NetworkChuck \"Configure Port Security\"",
        search: "NetworkChuck Configure Port Security CCNA",
        length: "~20 min",
        topics: "Port security CLI",
        note: "HANDS-ON",
      },
      {
        title: "NetworkChuck \"DHCP Snooping\"",
        search: "NetworkChuck DHCP Snooping CCNA",
        length: "~15 min",
        topics: "DHCP snooping configuration",
        note: "SECURITY",
      },
      {
        title: "Professor Messer \"Dynamic ARP Inspection\"",
        search: "Professor Messer Dynamic ARP Inspection CCNA",
        length: "~15 min",
        topics: "DAI concepts",
      },
      {
        title: "NetworkChuck \"VTP Basics\"",
        search: "NetworkChuck VTP Basics CCNA",
        length: "~15 min",
        topics: "VTP modes",
      },
      {
        title: "NetworkChuck \"Encryption & Hashing\"",
        search: "NetworkChuck Encryption and Hashing CCNA",
        length: "~15 min",
        topics: "Cryptography basics",
      },
    ],
    conceptsLabel: "Port Security, DHCP Snooping & DAI",
    concepts: `PORT SECURITY CONFIGURATION:
int fa0/1
 switchport port-security
 switchport port-security maximum 1
 switchport port-security mac-address sticky
 switchport port-security violation shutdown

VERIFICATION:
show port-security int fa0/1
show port-security address

DHCP SNOOPING:
ip dhcp snooping
int fa0/1
 ip dhcp snooping trust
exit
int range fa0/2-24
 no ip dhcp snooping trust

DYNAMIC ARP INSPECTION:
ip arp inspection vlan 10
int fa0/1
 ip arp inspection trust

VTP MODES:
- Server:      Creates and modifies VLANs
- Client:      Receives VLAN info from server
- Transparent: Doesn't participate in VTP
- Off:         No VTP at all (best practice)

ENCRYPTION vs HASHING:
MD5:  128-bit hash (weak, avoid)
SHA:  Stronger hashing (160+ bits)
AES:  Symmetric encryption (fast, strong)
RSA:  Asymmetric encryption (used in SSH)`,
    lab: "Configure port security on an access port. Connect an authorized device and verify the MAC address is learned. Connect an unauthorized device and observe the port shutdown. Enable DHCP snooping. Test with a rogue DHCP server. Configure the uplink as a trusted port.",
    practiceQuestions: [
      "Write the commands to configure port security for a maximum of 2 MACs with restrict violation.",
      "What is the difference between sticky and statically configured MAC addresses?",
      "What attack does DHCP snooping prevent?",
      "Explain Dynamic ARP Inspection and what it protects against.",
      "Why is VTP mode 'off' recommended as a best practice?",
      "What is the difference between encryption and hashing?",
    ],
    realWorld:
      "Port security prevents unauthorized devices from connecting to the network. DHCP snooping is standard in enterprise environments to block rogue DHCP servers. ARP inspection prevents man-in-the-middle attacks on Layer 2.",
  },
  {
    week: 11,
    title: "Wireless & Network Management",
    slug: "week-11-wireless-network-management",
    objectives: [
      "Understand wireless AP configuration",
      "Know SSID concepts and best practices",
      "Understand wireless channel planning and interference",
      "Know wireless security best practices",
      "Understand network management tools",
      "Know remote management security considerations",
    ],
    videos: [
      {
        title: "NetworkChuck \"Configure Wireless Access Point\"",
        search: "NetworkChuck Configure Wireless Access Point CCNA",
        length: "~20 min",
        topics: "AP configuration",
        note: "HANDS-ON",
      },
      {
        title: "NetworkChuck \"Wireless Security Best Practices\"",
        search: "NetworkChuck Wireless Security Best Practices CCNA",
        length: "~15 min",
        topics: "Wireless hardening",
      },
      {
        title: "NetworkChuck \"Wireless Channels & Interference\"",
        search: "NetworkChuck Wireless Channels Interference CCNA",
        length: "~15 min",
        topics: "Channel planning",
      },
      {
        title: "NetworkChuck \"Network Management Tools\"",
        search: "NetworkChuck Network Management Tools CCNA",
        length: "~20 min",
        topics: "Management platforms",
      },
      {
        title: "Professor Messer \"Remote Access Security\"",
        search: "Professor Messer Remote Access Security CCNA",
        length: "~15 min",
        topics: "VPN, remote management",
      },
    ],
    conceptsLabel: "Wireless Configuration & Best Practices",
    concepts: `WIRELESS CONFIGURATION:
- SSID: Network name (broadcast or hidden)
- Channel: 2.4GHz (1-11 US), 5GHz (36+)
- Security: WPA2/WPA3 recommended
- Authentication: PSK (personal) or 802.1X (enterprise)

WIRELESS BEST PRACTICES:
1. Use WPA2 or WPA3
2. Strong PSK (25+ characters)
3. Disable SSID broadcast (minor deterrent)
4. Change default admin credentials
5. Update firmware regularly
6. Disable WPS (known vulnerabilities)
7. Prefer 5GHz when possible

NON-OVERLAPPING CHANNELS:
2.4GHz: Channels 1, 6, 11 (US)
5GHz:   36, 40, 44, 48... (many options)

AP CONFIGURATION EXAMPLE:
SSID: CompanyNetwork
Channel: 6 (2.4GHz)
Security: WPA2 Personal
PSK: [Strong_Password_25+_Chars]`,
    lab: "Configure an AP SSID. Set WPA2 security. Select a non-overlapping channel. Adjust transmit power. Connect a wireless client and verify connectivity.",
    practiceQuestions: [
      "Which 2.4GHz channels are non-overlapping in the US?",
      "Write a wireless configuration using WPA2 with a strong passphrase.",
      "Why does disabling SSID broadcast provide only minor security?",
      "What management tools does Cisco offer for wireless infrastructure?",
      "Explain how a VPN is used for secure remote access.",
    ],
    realWorld:
      "University WiFi requires careful channel planning to prevent co-channel interference between adjacent APs. Multiple APs must be coordinated. Guest networks need security isolation from internal resources.",
  },
  {
    week: 12,
    title: "Network Automation & Programmability",
    slug: "week-12-automation-programmability",
    objectives: [
      "Understand REST APIs and HTTP verbs (CRUD)",
      "Know JSON and XML data formats",
      "Understand network programmability concepts",
      "Know Cisco APIs (Meraki, DNA Center)",
      "Understand configuration management tools",
      "Understand YAML basics",
      "Understand Infrastructure-as-Code concepts",
    ],
    videos: [
      {
        title: "NetworkChuck \"REST APIs & HTTP\"",
        search: "NetworkChuck REST APIs HTTP CCNA automation",
        length: "~20 min",
        topics: "REST API concepts",
        note: "FOUNDATION",
      },
      {
        title: "NetworkChuck \"JSON\"",
        search: "NetworkChuck JSON CCNA network automation",
        length: "~15 min",
        topics: "JSON data format",
        note: "DATA",
      },
      {
        title: "NetworkChuck \"APIs for Network Engineers\"",
        search: "NetworkChuck APIs for Network Engineers CCNA",
        length: "~20 min",
        topics: "Using APIs in networking",
        note: "PRACTICAL",
      },
      {
        title: "NetworkChuck \"Cisco DNA Center Basics\"",
        search: "NetworkChuck Cisco DNA Center Basics CCNA",
        length: "~20 min",
        topics: "DNA Center overview",
      },
      {
        title: "NetworkChuck \"Infrastructure as Code\"",
        search: "NetworkChuck Infrastructure as Code CCNA",
        length: "~20 min",
        topics: "IaC concepts",
      },
      {
        title: "David Bombal \"Python for Network Engineers\"",
        search: "David Bombal Python for Network Engineers CCNA",
        length: "~20 min",
        topics: "Python networking foundation",
        note: "FOUNDATION",
      },
    ],
    conceptsLabel: "REST APIs, JSON & Ansible",
    concepts: `REST API HTTP VERBS (CRUD):
GET:    Retrieve data     (Read)
POST:   Create new resource
PUT:    Update entire resource
DELETE: Remove resource
PATCH:  Partial update

HTTP STATUS CODES:
200: OK - Success
201: Created
400: Bad Request
401: Unauthorized
404: Not Found
500: Internal Server Error

JSON FORMAT:
{
  "device": {
    "hostname": "router1",
    "ip": "192.168.1.1",
    "interfaces": [
      {"name": "fa0/0", "status": "up"}
    ]
  }
}

ANSIBLE PLAYBOOK (YAML):
---
- hosts: routers
  tasks:
    - name: Configure hostname
      ios_command:
        commands:
          - "configure terminal"
          - "hostname router1"

CISCO APIS:
- Meraki API:       Cloud-based management
- DNA Center API:   On-prem analytics/config
- NETCONF/YANG:     Model-driven networking`,
    lab: "Explore the Cisco Meraki API documentation. Make a REST API call to retrieve device info using curl or Postman. Parse the JSON response. Review an Ansible playbook example for Cisco IOS. Review a DNA Center sandbox demo.",
    practiceQuestions: [
      "What is the difference between GET and POST in a REST API?",
      "Explain JSON structure with a practical network example.",
      "What is a REST API and why do network engineers need to understand it?",
      "Describe how Ansible could be used to configure 100 Cisco switches.",
      "What does Infrastructure as Code mean in a network context?",
      "Explain YAML syntax with a simple example.",
    ],
    realWorld:
      "Modern networks increasingly use APIs for automation. Python scripting and API knowledge are becoming expected skills. Infrastructure as Code reduces manual errors and enables version-controlled network configurations. Datacenters rely on IaC for reproducibility.",
  },
  {
    week: 13,
    title: "Network Troubleshooting & Diagnostics",
    slug: "week-13-troubleshooting",
    objectives: [
      "Apply a systematic network troubleshooting methodology",
      "Use diagnostic commands (ping, traceroute, show commands)",
      "Understand packet capture with Wireshark",
      "Work through common troubleshooting scenarios",
      "Understand performance monitoring tools",
      "Know QoS basics",
    ],
    videos: [
      {
        title: "NetworkChuck \"Troubleshooting Methodology\"",
        search: "NetworkChuck Troubleshooting Methodology CCNA",
        length: "~20 min",
        topics: "OSI-based troubleshooting",
        note: "FOUNDATION",
      },
      {
        title: "NetworkChuck \"Ping & Traceroute\"",
        search: "NetworkChuck Ping and Traceroute CCNA",
        length: "~15 min",
        topics: "Diagnostic commands",
        note: "CRITICAL",
      },
      {
        title: "NetworkChuck \"Show Commands Deep Dive\"",
        search: "NetworkChuck Show Commands Deep Dive CCNA",
        length: "~25 min",
        topics: "Essential show commands",
        note: "HANDS-ON",
      },
      {
        title: "NetworkChuck \"Wireshark Packet Capture\"",
        search: "NetworkChuck Wireshark Packet Capture CCNA",
        length: "~25 min",
        topics: "Wireshark analysis",
        note: "ADVANCED",
      },
      {
        title: "Professor Messer \"QoS\"",
        search: "Professor Messer QoS Quality of Service CCNA",
        length: "~20 min",
        topics: "Quality of Service",
      },
    ],
    conceptsLabel: "Troubleshooting Commands & QoS",
    concepts: `TROUBLESHOOTING BY OSI LAYER:
Layer 1 (Physical):
- Check cables and physical connections
- show int status
- show ip int brief

Layer 2 (Data Link):
- show mac-address-table
- show vlan
- show spanning-tree

Layer 3 (Network):
- show ip int brief
- show ip route
- ping / traceroute
- show access-lists

ESSENTIAL SHOW COMMANDS:
show ip interface brief   # IP addresses + status
show interfaces           # Detailed stats + errors
show ip route             # Full routing table
show ip ospf neighbor     # OSPF adjacencies
show ip protocols         # Routing protocols running
show access-lists         # Current ACL entries
show mac-address-table    # Learned MAC addresses
show vlan                 # VLAN assignments
show spanning-tree        # STP topology

PING OUTPUT INTERPRETATION:
Destination host unreachable: No route to host
Request timed out: ACL/firewall blocking, or host down
Reply from X.X.X.X: Successful

TRACEROUTE:
- Shows each hop on the path to destination
- ! = successful response from hop
- * = no response (timeout or filtered)

QoS CONCEPTS:
- Classification: Mark traffic (DSCP, CoS)
- Queuing:        Priority ordering of traffic
- Policing:       Drop traffic exceeding rate limit
- Shaping:        Buffer and delay excess traffic`,
    lab: "Create an intentional network problem by removing a route. Use ping to identify the failure. Use traceroute to find exactly where it fails. Fix the problem. Verify with show commands. Capture the fix in Wireshark to see the traffic flow restore.",
    practiceQuestions: [
      "Describe the OSI-layer approach to troubleshooting a connectivity problem.",
      "What does 'Request timed out' mean in a ping output?",
      "How do you use traceroute to locate a network problem?",
      "What are the key show commands for troubleshooting a routing issue?",
      "What is a packet capture used for and when would you use it?",
      "Explain QoS and why it matters for voice and video traffic.",
    ],
    realWorld:
      "Troubleshooting is a daily activity at URI ITS. Users call with connectivity issues and a systematic OSI-layer approach saves time. 'show ip route' and 'ping' resolve the majority of routing issues quickly.",
  },
  {
    week: 14,
    title: "Advanced Topics & Emerging Concepts",
    slug: "week-14-advanced-emerging",
    objectives: [
      "Understand server and network virtualization",
      "Understand containerization and Docker basics",
      "Understand SDN (Software-Defined Networking)",
      "Know cloud networking concepts (VPC, subnets, security groups)",
      "Understand hybrid cloud architecture",
      "Know edge computing basics",
    ],
    videos: [
      {
        title: "NetworkChuck \"Virtualization\"",
        search: "NetworkChuck Virtualization CCNA modern networking",
        length: "~20 min",
        topics: "Hypervisors, vSwitches, VMs",
        note: "MODERN",
      },
      {
        title: "NetworkChuck \"Containers & Docker\"",
        search: "NetworkChuck Containers and Docker CCNA",
        length: "~20 min",
        topics: "Containers vs VMs",
        note: "EMERGING",
      },
      {
        title: "NetworkChuck \"Software-Defined Networking (SDN)\"",
        search: "NetworkChuck Software Defined Networking SDN CCNA",
        length: "~25 min",
        topics: "SDN, control/data plane separation",
        note: "FUTURE",
      },
      {
        title: "NetworkChuck \"Cloud Networking\"",
        search: "NetworkChuck Cloud Networking AWS Azure CCNA",
        length: "~20 min",
        topics: "VPC, cloud subnets",
        note: "HYBRID",
      },
      {
        title: "NetworkChuck \"Zero Trust Security\"",
        search: "NetworkChuck Zero Trust Security CCNA",
        length: "~20 min",
        topics: "Zero Trust model",
      },
      {
        title: "Professor Messer \"Edge Computing\"",
        search: "Professor Messer Edge Computing CCNA",
        length: "~15 min",
        topics: "Edge, IoT, 5G",
      },
    ],
    conceptsLabel: "Virtualization, SDN & Cloud",
    concepts: `VIRTUALIZATION:
- Hypervisor: Software creating VMs (vSphere, Hyper-V)
- vSwitch: Virtual switch in software
- VLAN tagging works the same in virtual environments
- Live migration: Moving running VMs between hosts

CONTAINERS vs VMs:
- VMs:        Full OS per instance (more isolated)
- Containers: Share OS kernel (lighter, faster)
- Docker:     Container platform
- Kubernetes: Container orchestration at scale

SDN (Software-Defined Networking):
- Control plane: Separated from the data plane
- Controller:    Central intelligence (Cisco APIC, OpenDaylight)
- OpenFlow:      Protocol between controller and switches
- Benefits: Programmability, automation, flexibility

CLOUD NETWORKING:
- VPC:             Virtual Private Cloud (isolated network)
- Subnets:         Public (Internet-facing) / Private
- Security Groups: Stateful firewall rules
- NAT Gateway:     Outbound Internet for private subnets
- VPN/Direct Connect: On-premises to cloud connectivity

ZERO TRUST:
- Never trust, always verify
- Micro-segmentation of networks
- Continuous authentication
- Assume breach mentality

EDGE COMPUTING:
- Processing closer to data source
- Reduces latency vs centralized cloud
- Examples: IoT devices, 5G edge, CDNs`,
    lab: "Research your organization's virtualization setup. Understand how VLANs map to virtual switches. Review a cloud network diagram (AWS VPC or Azure VNet). Study an SDN controller architecture conceptually.",
    practiceQuestions: [
      "Explain virtualization and why it is important for modern networks.",
      "What is the difference between virtual machines and containers?",
      "How does SDN differ from traditional networking?",
      "Explain the Zero Trust security model.",
      "How does cloud networking differ from on-premises networking?",
    ],
    realWorld:
      "URI likely uses server virtualization for infrastructure consolidation. Cloud connectivity handles SaaS applications. Security is increasingly moving to a Zero Trust model. Modern networks blend on-premises and cloud resources.",
  },
  {
    week: 15,
    title: "Practice Exams & Weak Area Review",
    slug: "week-15-practice-exams",
    objectives: [
      "Assess overall exam readiness with a full-length practice exam",
      "Identify remaining knowledge gaps by topic",
      "Perform focused review of weak areas",
      "Verify hands-on CLI skills from memory",
    ],
    videos: [
      {
        title: "Cisco Official Practice Exams",
        search: "Cisco CCNA 200-301 official practice exam",
        url: "https://learningnetwork.cisco.com/s/",
        length: "~$50-60",
        topics: "Official Cisco practice questions",
        note: "RECOMMENDED",
      },
      {
        title: "NetLabs+ Free Practice Exams",
        search: "NetLabs CCNA free practice exam 200-301",
        length: "Free tier",
        topics: "Community practice questions",
      },
      {
        title: "Professor Messer CCNA Practice Questions",
        search: "Professor Messer CCNA 200-301 practice questions review",
        url: "https://www.professormesser.com/",
        length: "Free video reviews",
        topics: "Question walkthroughs",
      },
      {
        title: "Boson ExSim for CCNA",
        search: "Boson ExSim CCNA 200-301 practice exam",
        url: "https://www.boson.com/practice-exam/200-301-cisco-ccna-practice-exam",
        length: "~$60-70",
        topics: "Highly accurate simulation",
        note: "HIGHLY ACCURATE",
      },
    ],
    conceptsLabel: "Exam Readiness & Scoring Guide",
    concepts: `SCORING GUIDE:
90%+:     Ready to schedule the exam
80-89%:   Ready, but review weak areas first
70-79%:   More study needed (1-2 more weeks)
Below 70%: Return to fundamentals

EXAM FORMAT:
- Multiple choice (single and multiple answer)
- Drag-and-drop
- Simulations (hands-on IOS scenarios)
- Simlets (multi-step simulations)
- Fill-in-the-blank
- Total time: ~120 minutes

HIGHEST-VALUE TOPICS:
1. Subnetting (appears throughout the exam)
2. OSPF configuration and concepts
3. ACLs (standard and extended)
4. VLANs and trunking
5. Routing protocols and AD values
6. DHCP/DNS/NTP services
7. Switch security (port security)
8. Wireless standards and security`,
    lab: "Take a full-length timed practice exam (120 minutes). Score yourself honestly. Review every wrong answer and return to the relevant week's content. Take a second practice exam and compare scores. Target 80%+ before scheduling the real exam.",
    practiceQuestions: [
      "Comprehensive review — target all weak areas from your practice exam results.",
      "Subnetting speed drills — calculate /24, /25, /26, /27, /28, /30 from memory.",
      "CLI command review — write all OSPF, ACL, VLAN, SSH, and DHCP commands from memory.",
      "OSI model explanation — explain each layer with a real-world example.",
      "Protocol comparison — OSPF vs EIGRP vs RIP: AD, type, metric, use case.",
    ],
    realWorld:
      "The exam is 120 minutes. Time management is critical — do not spend too long on any single question. Aim for 80%+ on practice exams consistently before scheduling the real exam.",
  },
  {
    week: 16,
    title: "Final Review & Exam Preparation",
    slug: "week-16-final-review",
    objectives: [
      "Final knowledge verification across all topics",
      "Manage test anxiety with preparation strategies",
      "Confirm exam logistics (ID, location, time)",
      "Apply last-minute review tips",
    ],
    videos: [
      {
        title: "Review all previous weeks' key videos",
        search: "NetworkChuck CCNA 200-301 full course review",
        length: "Variable",
        topics: "Full course review",
        note: "Focus on Weeks 2, 3, 5, 6, 9",
      },
      {
        title: "Subnetting Speed Drills (Week 2)",
        search: "NetworkChuck You SUCK at Subnetting final review",
        length: "~20 min",
        topics: "Subnetting under time pressure",
        note: "CRITICAL REVIEW",
      },
      {
        title: "OSPF Configuration Review (Week 5)",
        search: "NetworkChuck OSPF configuration review CCNA",
        length: "~25 min",
        topics: "OSPF from memory",
      },
      {
        title: "ACL Review (Week 9)",
        search: "NetworkChuck ACL review standard extended CCNA",
        length: "~20 min",
        topics: "ACL syntax from memory",
      },
      {
        title: "VLAN and Routing Protocol Review (Weeks 3 & 6)",
        search: "NetworkChuck VLAN routing protocol review CCNA",
        length: "~20 min",
        topics: "VLAN config, routing AD values",
      },
    ],
    conceptsLabel: "Last-Minute Review Checklist",
    concepts: `LAST-MINUTE REVIEW CHECKLIST:
[ ] Subnetting: Can calculate any /prefix in under 2 minutes
[ ] OSI Model: Know all 7 layers and example protocols
[ ] OSPF config: Can write complete config from memory
[ ] ACL syntax: Standard (1-99) and extended (100-199)
[ ] VLAN/Trunk config: Complete commands from memory
[ ] EIGRP/OSPF AD: 90 vs 110 — EIGRP wins
[ ] DHCP DORA: All 4 steps named correctly
[ ] SSH config: All 6+ required commands
[ ] Routing table: Can read and interpret output

EXAM DAY:
- Sleep well the night before
- Eat a good breakfast
- Arrive 15 minutes early
- Bring valid government-issued ID
- Flag difficult questions and return later
- ~60 seconds per question on average
- Do not second-guess your first correct answer

QUICK REFERENCE:
AD:          Connected=0, Static=1, EIGRP=90, OSPF=110, RIP=120
ACL Numbers: Standard=1-99, Extended=100-199
Ports:       SSH=22, HTTP=80, HTTPS=443, DNS=53
Subnetting:  usable hosts = 2^(32-prefix) - 2`,
    lab: "Take a final timed practice exam targeting 85%+. Create your personal one-page quick reference sheet. Review weak areas from Week 15 results. Confirm exam registration, testing center location, and required identification.",
    practiceQuestions: [
      "Walk through every topic from Weeks 1-14 systematically.",
      "Final subnetting speed drills — /24 through /30 in under 2 minutes each.",
      "Write CLI commands from memory: OSPF, ACL, VLAN, DHCP, SSH configuration.",
      "Interpret a routing table output — identify protocol, AD, metric, next-hop.",
      "Calculate ACL wildcard masks for /24, /25, /28, /30 subnets.",
    ],
    realWorld:
      "You have prepared for 16 weeks. The CCNA certifies that you understand enterprise networking fundamentals — the same skills used daily at URI ITS. Trust your preparation, apply your methodology, and you will pass.",
  },
];
