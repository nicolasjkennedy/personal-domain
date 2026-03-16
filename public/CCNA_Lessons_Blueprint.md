# CCNA Study Guide - Claude Code Blueprint
## nicolaskennedy.com/lessons/ccna

**Purpose**: Create a comprehensive, free CCNA 200-301 study guide with structured weekly lessons, curated video resources, lab assignments, and practice materials.

**Target Users**: Aspiring network engineers preparing for CCNA certification exam

**Study Duration**: 12-16 weeks of structured learning

---

## SITE STRUCTURE & PAGES

### 1. Main Lessons Hub: `nicolaskennedy.com/lessons`
**Purpose**: Landing page for all study guides and educational content

**Content**:
- Header: "Free Networking Study Guides"
- Tagline: "Structured, resource-curated study guides by a working network engineer"
- Featured guide: CCNA 200-301
- Brief description of each guide
- Navigation to individual courses
- Short bio: "Built by Nicolas Kennedy, Level 2 Network Technician at URI ITS, Python certified"

**Design**:
- Clean, minimal aesthetic
- Dark mode support
- Mobile-responsive
- Card-based layout showing available courses
- CTA: "Start CCNA Study Guide" button

---

### 2. CCNA Course Page: `nicolaskennedy.com/lessons/ccna`

#### PAGE STRUCTURE

**A. Header Section**
- Title: "CCNA 200-301 Study Guide"
- Subtitle: "Free, comprehensive guide to passing Cisco CCNA certification"
- Quick Stats:
  - Duration: 12-16 weeks
  - Exam Cost: ~$330
  - Prerequisites: Basic networking knowledge
  - Success Rate: Designed for real-world success

**B. Navigation/Progress Section**
- Week-by-week navigation menu (sticky sidebar on desktop, collapsible on mobile)
- Progress bar showing current position in course
- Ability to skip to specific weeks
- Bookmark/save current week functionality
- Download progress tracker (PDF)

**C. Study Tips Section (Collapsible)**
- How to use this guide most effectively
- Recommended study pace
- Lab setup instructions
- Practice exam timing advice
- Real-world application tips

**D. Main Content Area**
- Each week displayed in full
- Smooth scroll navigation
- Print-friendly formatting

**E. Footer**
- Resources links
- Community/feedback form
- Social sharing buttons
- "Built with passion by Nicolas Kennedy"

---

## COMPREHENSIVE WEEK-BY-WEEK CURRICULUM

### WEEK 1: Network Fundamentals - The Basics
**Learning Objectives**:
- Understand the role of routers and switches
- Know the OSI model and TCP/IP model
- Understand the difference between Layer 2 and Layer 3 switching
- Know basic network topologies
- Understand network addressing basics

**Video Resources**:

1. **NetworkChuck - What is a Network?** (FREE CCNA // Day 0)
   - Link: YouTube search: "NetworkChuck what is a network ccna"
   - Length: ~10 minutes
   - Topics: Network definition, why networks exist, real-world examples

2. **NetworkChuck - What is a SWITCH?** (FREE CCNA // Day 1)
   - Link: YouTube search: "NetworkChuck what is a switch ccna"
   - Length: ~15 minutes
   - Topics: Switch functionality, MAC addresses, switching domains
   - *Lab Connection*: You'll configure switches starting Week 3

3. **NetworkChuck - What is a ROUTER?** (FREE CCNA // EP 2)
   - Link: YouTube search: "NetworkChuck what is a router ccna"
   - Length: ~15 minutes
   - Topics: Router functionality, IP addressing, routing domains
   - *Lab Connection*: Routing labs in Week 5

4. **NetworkChuck - TCP/IP and OSI** (FREE CCNA // EP 3)
   - Link: YouTube search: "NetworkChuck tcp ip osi ccna"
   - Length: ~20 minutes
   - Topics: 7-layer OSI model, TCP/IP model, protocol layers
   - **CRITICAL**: Master this—foundation for entire course

5. **NetworkChuck - Real Life Example TCP/IP and OSI** (FREE CCNA // EP 4)
   - Link: YouTube search: "NetworkChuck real life example tcp ip osi"
   - Length: ~15 minutes
   - Topics: Practical application of OSI model, real-world packet flow
   - **KEY**: Watch this twice if needed

6. **NetworkChuck - Datacenter Networks** (FREE CCNA // EP 7)
   - Link: YouTube search: "NetworkChuck datacenter networks ccna"
   - Length: ~15 minutes
   - Topics: Data center architecture, scalability, real-world infrastructure
   - *Relevance*: Connects to your interest in infrastructure

**Key Concepts Summary**:
```
OSI MODEL (7 Layers):
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
- Hub: Layer 1 (dumb repeater - don't use)
```

**Lab Exercise**:
- **GNS3 Setup**: Download and install GNS3
- **First Lab**: Create simple 2-router topology with 2 switches
  - Don't worry about configs yet
  - Just understand the physical layout
  - Draw out the topology on paper first
  - Take screenshot for your records

**Practice Questions** (Self-test):
1. Name the 7 layers of the OSI model from bottom to top
2. At what layer do routers operate?
3. What's the difference between a MAC address and an IP address?
4. Explain why we need both Layer 2 and Layer 3
5. A packet is being sent from PC-A to PC-B on different networks. Trace its journey through the OSI model

**Real-World Connection**:
- At URI, routers connect different buildings/networks
- Switches connect computers within buildings
- Data center needs both—lots of switches for internal connectivity, routers for external traffic

---

### WEEK 2: IP Addressing & Subnetting Fundamentals
**Learning Objectives**:
- Understand IPv4 addressing structure (octets, binary, decimal)
- Master decimal-to-binary conversion
- Understand subnet masks and CIDR notation
- Calculate network/broadcast addresses
- Determine usable host addresses

**Video Resources**:

1. **NetworkChuck - What is an IP Address?** (FREE CCNA // EP 15)
   - Link: YouTube search: "NetworkChuck what is an ip address ccna"
   - Length: ~15 minutes
   - Topics: IPv4 structure, octets, public vs private, classes (historical context)

2. **NetworkChuck - You SUCK at Subnetting** (Complete Series - Part 1)
   - Link: YouTube search: "NetworkChuck you suck at subnetting part 1"
   - Length: ~20 minutes per video
   - WATCH ALL PARTS: Part 1, 2, 3, 4, 5
   - **CRITICAL**: This is the most important skill for CCNA
   - Topics: Subnet calculation, magic numbers, practice problems

3. **David Bombal - IP Subnetting** (YouTube)
   - Link: YouTube search: "David Bombal IP subnetting tutorial"
   - Length: ~30 minutes
   - Topics: Visual explanation, different approach if NetworkChuck doesn't click
   - **NOTE**: Watch only if you're struggling with NetworkChuck

4. **NetworkChuck - We Ran OUT of IP Addresses** (FREE CCNA)
   - Link: YouTube search: "NetworkChuck ran out of ip addresses ccna"
   - Length: ~15 minutes
   - Topics: IPv4 exhaustion, IPv6 introduction, CIDR notation

5. **NetworkChuck - Forcing My Kids to Make Ethernet Cables** (EP 11)
   - Link: YouTube search: "NetworkChuck ethernet cables ccna"
   - Length: ~15 minutes
   - Topics: Physical cabling, categories, connectors
   - **Practical**: You'll see this at URI

**Key Concepts Summary**:
```
IPv4 ADDRESSING:
- 4 octets: 192.168.1.5
- Range per octet: 0-255 (8 bits each)
- Total: 32 bits

SUBNET MASKS:
- /24 = 255.255.255.0 (hosts: 254 usable)
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
(Memorize this)
```

**Lab Exercise**:
- **GNS3 Lab**: Assign IP addresses to your Week 1 topology
  - PC-A: 192.168.1.10/24
  - PC-B: 192.168.2.10/24
  - Router interface facing PC-A: 192.168.1.1/24
  - Router interface facing PC-B: 192.168.2.1/24
  - Verify addresses are in correct subnets

**Practice Questions**:
1. Convert 192.168.5.0/25 to binary. What's the broadcast address?
2. How many usable hosts in a /28 network?
3. Given 10.0.0.0/16, create 4 equal subnets. What are the network addresses?
4. What's the /CIDR notation for 255.255.240.0?
5. Subnet 172.16.0.0/12 into /24 networks. How many?

**Real-World Connection**:
- At URI, different departments have different subnets
- You'll see /24 networks for most departments
- /30 networks between routers
- You'll configure these at work

---

### WEEK 3: Network Access - VLANs & Switching
**Learning Objectives**:
- Understand VLAN concepts and benefits
- Configure VLANs on Cisco switches
- Understand trunk ports vs access ports
- Configure access ports
- Understand VLAN routing (inter-VLAN routing)
- Know Spanning Tree Protocol basics

**Video Resources**:

1. **NetworkChuck - VLANs (Virtual LANs)** (YouTube)
   - Link: YouTube search: "NetworkChuck vlans virtual lans"
   - Length: ~20 minutes
   - Topics: VLAN purpose, VLAN IDs, VLAN assignment, benefits
   - **KEY CONCEPT**: VLANs separate broadcast domains

2. **NetworkChuck - How to Configure a VLAN** (YouTube)
   - Link: YouTube search: "NetworkChuck configure vlan cisco switch"
   - Length: ~20 minutes
   - Topics: CLI commands, vlan database, interface assignment
   - **HANDS-ON**: Follow along in GNS3

3. **NetworkChuck - Trunks (Tagged vs Untagged)** (YouTube)
   - Link: YouTube search: "NetworkChuck trunks vlan tagged untagged"
   - Length: ~15 minutes
   - Topics: Trunk ports, 802.1Q tagging, inter-switch VLAN traffic
   - **CRITICAL**: Must understand trunks for real networks

4. **Cisco Learning Network - Spanning Tree Basics** (YouTube)
   - Link: YouTube search: "Cisco spanning tree protocol basic"
   - Length: ~15 minutes
   - Topics: Loop prevention, BPDU, bridge priority, port roles
   - **Why**: Switches create redundancy loops—STP prevents them

5. **NetworkChuck - Port Security** (FREE CCNA // EP 14)
   - Link: YouTube search: "NetworkChuck port security ccna"
   - Length: ~15 minutes
   - Topics: MAC address limiting, security violations, sticky MAC
   - **Real-world**: Prevents unauthorized device connections

6. **David Bombal - VLAN Routing & Inter-VLAN Communication** (YouTube)
   - Link: YouTube search: "David Bombal inter-vlan routing"
   - Length: ~25 minutes
   - Topics: How VLANs communicate, router-on-a-stick, Layer 3 switching

**Key Concepts Summary**:
```
VLAN BASICS:
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
- Blocks ports to create spanning tree
- Reconverges if links fail
- Types: STP, RSTP (802.1w), MSTP (802.1s)

PORT SECURITY:
- Limits MAC addresses per port
- sticky: learns MACs dynamically
- violation action: shutdown, restrict, protect
```

**Lab Exercise**:
- **GNS3 Multi-Switch VLAN Lab**:
  - Create 3 switches connected via trunk
  - Configure VLAN 10 (Engineering) on switches
  - Configure VLAN 20 (Sales) on switches
  - Assign PCs to appropriate VLANs
  - Test connectivity within VLAN, verify no cross-VLAN communication
  - Configure port security on access ports
  - Document topology

**Practice Questions**:
1. What's the default VLAN? Why shouldn't you use it?
2. Explain the difference between access and trunk ports
3. Why do we use Spanning Tree?
4. How would you allow only VLANs 10, 20, 30 on a trunk?
5. What happens if two switches connect with same VLAN without a trunk?

**Real-World Connection**:
- URI uses VLANs to separate departments
- Faculty VLANs, student VLANs, admin VLANs
- You'll configure these when setting up new network segments

---

### WEEK 4: Network Access - Wireless & Ethernet
**Learning Objectives**:
- Understand wireless LAN standards (802.11a/b/g/n/ac/ax)
- Know wireless security (WEP, WPA, WPA2, WPA3)
- Understand SSID, channels, bands
- Know Ethernet cabling standards
- Understand Power over Ethernet (PoE)
- Know wireless access point concepts

**Video Resources**:

1. **NetworkChuck - Wireless (802.11)** (YouTube)
   - Link: YouTube search: "NetworkChuck wireless 802.11 wifi ccna"
   - Length: ~20 minutes
   - Topics: Wireless standards, bands (2.4GHz vs 5GHz), speeds
   - **KEY**: Know which standards are current (802.11ac, 802.11ax)

2. **NetworkChuck - Wireless Security (WPA2 vs WPA3)** (YouTube)
   - Link: YouTube search: "NetworkChuck wireless security wpa2 wpa3"
   - Length: ~15 minutes
   - Topics: Encryption methods, authentication, why WEP is dead
   - **IMPORTANT**: Understand encryption basics

3. **NetworkChuck - Power over Ethernet (PoE)** (EP 12)
   - Link: YouTube search: "NetworkChuck power over ethernet poe amazing"
   - Length: ~15 minutes
   - Topics: PoE standards (802.3at, 802.3bt), power budgets, use cases
   - **Relevant**: URI uses PoE for APs and cameras

4. **NetworkChuck - Ethernet Cables & Cabling** (EP 11)
   - Link: YouTube search: "NetworkChuck ethernet cables ccna"
   - Length: ~15 minutes
   - Topics: Cat5e, Cat6, Cat6a, straight-through vs crossover
   - **HANDS-ON**: You've physically built cables—this validates that

5. **Professor Messer - Wireless Channels & Frequencies** (YouTube)
   - Link: YouTube search: "Professor Messer wireless channels frequencies"
   - Length: ~15 minutes
   - Topics: Channel overlap, channel selection, regulatory domains
   - **Why**: Interference is real problem in wireless

**Key Concepts Summary**:
```
WIRELESS STANDARDS:
802.11a: 5GHz, 54 Mbps (older, less interference)
802.11b: 2.4GHz, 11 Mbps (slow but penetrates well)
802.11g: 2.4GHz, 54 Mbps (improved version of b)
802.11n: 2.4GHz & 5GHz, 600 Mbps (MIMO technology)
802.11ac: 5GHz only, 1.3 Gbps (current standard, good)
802.11ax: 2.4GHz & 5GHz, 10+ Gbps (newest, WiFi 6)

WIRELESS SECURITY (PROGRESSION):
WEP: BROKEN - don't use
WPA: Better but outdated
WPA2: Current standard, good security
WPA3: Newest, even better security

BANDS:
2.4GHz: Better range, more interference, 11 channels (1-11 in US)
5GHz: Less range, less interference, 36+ channels, less congestion

ETHERNET STANDARDS:
Cat5e: 100 Mbps (older)
Cat6: 1 Gbps (most common)
Cat6a: 10 Gbps (future-proofing)

PoE STANDARDS:
802.3at (PoE+): 30W
802.3bt: 60W+ (new)
- Used for: APs, IP cameras, VoIP phones
```

**Lab Exercise**:
- **Wireless Simulation** (conceptual):
  - Document wireless standards you've seen in real networks
  - At URI: What APs do you see? 802.11ac? 802.11ax?
  - Document PoE devices at URI
  - **Practical**: Look at actual switch ports, identify PoE ports (usually button labeled "PoE")

**Practice Questions**:
1. What's the difference between 802.11ac and 802.11n?
2. Which 5GHz channels don't overlap? (Hint: 20MHz separation)
3. Why is 2.4GHz more congested than 5GHz?
4. What's the maximum power output of 802.3at PoE?
5. Explain why WPA3 is more secure than WPA2

**Real-World Connection**:
- URI has both wired and wireless infrastructure
- You'll support WiFi issues, PoE devices, cabling problems
- Understanding these standards helps troubleshoot

---

### WEEK 5: IP Connectivity - Routing Fundamentals
**Learning Objectives**:
- Understand static vs dynamic routing
- Know routing protocol types (IGP, EGP)
- Understand default routes
- Know how routers make forwarding decisions
- Understand routing tables
- Know basic OSPF concepts
- Configure static routes

**Video Resources**:

1. **NetworkChuck - What is Routing?** (YouTube)
   - Link: YouTube search: "NetworkChuck what is routing ccna"
   - Length: ~20 minutes
   - Topics: Routing fundamentals, forwarding decisions, routing tables
   - **FOUNDATION**: Master before diving into protocols

2. **NetworkChuck - Static Routing** (YouTube)
   - Link: YouTube search: "NetworkChuck static routing ccna"
   - Length: ~20 minutes
   - Topics: Static route configuration, default routes, when to use
   - **HANDS-ON**: Configure in lab this week

3. **NetworkChuck - OSPF (Open Shortest Path First)** (YouTube - Multiple Videos)
   - Part 1: Link: YouTube search: "NetworkChuck ospf part 1"
   - Part 2: Link: YouTube search: "NetworkChuck ospf part 2"
   - Length: ~25 minutes each
   - Topics: OSPF basics, areas, cost calculation, neighborships
   - **KEY PROTOCOL**: One of main exam topics

4. **Jeremy Cioara/CBT Nuggets - OSPF Explained** (YouTube)
   - Link: YouTube search: "CBT Nuggets OSPF fundamentals"
   - Length: ~30 minutes
   - Topics: OSPF deep dive, different approach if struggling
   - Alternative view if NetworkChuck doesn't fully click

5. **NetworkChuck - RIP (Routing Information Protocol)** (YouTube)
   - Link: YouTube search: "NetworkChuck RIP routing ccna"
   - Length: ~15 minutes
   - Topics: RIP basics (outdated but tested)
   - **NOTE**: Less important than OSPF but test covers it

6. **NetworkChuck - Routing Table Deep Dive** (YouTube)
   - Link: YouTube search: "NetworkChuck routing table explained"
   - Length: ~15 minutes
   - Topics: Reading routing tables, administrative distance, metrics
   - **CRITICAL SKILL**: Understand how to read "show ip route"

**Key Concepts Summary**:
```
ROUTING BASICS:
- Static: Manually configured routes
- Dynamic: Routes learned automatically via protocols

ROUTING PROTOCOLS (Types):
IGP (Interior Gateway Protocol):
  - RIP: Distance-vector (slow, max 15 hops)
  - OSPF: Link-state (fast, scalable)
  - EIGRP: Cisco proprietary (hybrid)

EGP (Exterior Gateway Protocol):
  - BGP: Used between ISPs (not on CCNA)

OSPF CONCEPTS:
- Link-state routing (knows full topology)
- Administrative distance: 110
- Uses Dijkstra algorithm
- Metric: Cost (based on bandwidth)
- Creates neighborhoods with hello packets
- Supports areas (Area 0 is backbone)

ROUTING TABLE EXAMPLE:
O     10.0.0.0/24 [110/100] via 192.168.1.1, 00:05:12, FastEthernet0/0
^     ^            ^         ^                    ^
|     |            |         |                    |
Proto Dest         AD/Cost   Next-hop             Uptime

Static Route CLI:
conf t
ip route 10.0.0.0 255.255.255.0 192.168.1.1
(destination subnet, mask, next-hop)

OSPF Configuration:
conf t
router ospf 1
network 192.168.1.0 0.0.0.255 area 0
network 10.0.0.0 0.0.0.255 area 0
exit
```

**Lab Exercise**:
- **GNS3 Multi-Router Routing Lab**:
  - Create 3 routers with subnets:
    - Router A: 192.168.1.0/24, 10.0.0.0/24
    - Router B: 192.168.2.0/24, 172.16.0.0/24
    - Router C: 192.168.3.0/24, 203.0.113.0/24
  - Configure static routes between routers first
  - Test connectivity (ping)
  - Then configure OSPF
  - Verify OSPF neighbors: "show ip ospf neighbor"
  - Check routing table: "show ip route"
  - Test connectivity again
  - Document findings

**Practice Questions**:
1. What's the difference between static and dynamic routing?
2. When would you use static routing vs OSPF?
3. Explain administrative distance—why does it matter?
4. Configure a default route to 192.168.1.1
5. In OSPF, what is Area 0? Why does it matter?

**Real-World Connection**:
- At URI, inter-building connectivity likely uses OSPF
- Default routes send traffic to Internet
- You'll troubleshoot routing issues at work
- Understanding routing is critical for datacenters

---

### WEEK 6: IP Connectivity - Advanced Routing & EIGRP
**Learning Objectives**:
- Understand EIGRP (Enhanced IGRP)
- Know difference between OSPF and EIGRP
- Understand administrative distance
- Know default routes vs static routes
- Understand routing convergence
- Configure EIGRP

**Video Resources**:

1. **NetworkChuck - EIGRP (Enhanced IGRP)** (YouTube)
   - Link: YouTube search: "NetworkChuck EIGRP ccna"
   - Length: ~20 minutes
   - Topics: EIGRP basics, Cisco proprietary, hybrid protocol
   - **NOTE**: Less common than OSPF but tested

2. **NetworkChuck - OSPF vs EIGRP vs RIP** (YouTube)
   - Link: YouTube search: "NetworkChuck ospf vs eigrp vs rip comparison"
   - Length: ~20 minutes
   - Topics: Pros/cons of each, when to use
   - **COMPARISON**: Helps understand differences

3. **Professor Messer - Routing Protocols Overview** (YouTube)
   - Link: YouTube search: "Professor Messer routing protocols ccna"
   - Length: ~20 minutes
   - Topics: Different routing protocol explanations
   - Alternative view if struggling

4. **NetworkChuck - Distance Vector vs Link State** (YouTube)
   - Link: YouTube search: "NetworkChuck distance vector link state routing"
   - Length: ~20 minutes
   - Topics: Fundamental difference in routing approaches
   - **CONCEPTUAL**: Important for understanding protocols

5. **NetworkChuck - NAT (Network Address Translation)** (YouTube)
   - Link: YouTube search: "NetworkChuck NAT network address translation"
   - Length: ~20 minutes
   - Topics: Static NAT, dynamic NAT, PAT (Port Address Translation)
   - **RELEVANT**: You see this in production networks

6. **Jeremy Cioara - BGP Basics** (YouTube)
   - Link: YouTube search: "CBT Nuggets BGP basics"
   - Length: ~15 minutes
   - Topics: BGP high-level overview (not deep, but tested)
   - **NOTE**: Not primary focus but exam covers basics

**Key Concepts Summary**:
```
EIGRP CONCEPTS:
- Cisco proprietary (less interoperable)
- Hybrid protocol (combines distance-vector + link-state)
- Fast convergence
- Bandwidth efficient
- Administrative distance: 90 (better than OSPF's 110)
- Uses feasible successor for fast failover

ADMINISTRATIVE DISTANCE (AD):
Connected: 0
Static: 1
EIGRP: 90
OSPF: 110
RIP: 120
(Lower AD = more trusted)

EIGRP CONFIGURATION:
conf t
router eigrp 100
network 192.168.1.0 0.0.0.255
network 10.0.0.0 0.0.0.255
no auto-summary
exit

NAT CONCEPTS:
- Inside local: private IP on inside
- Inside global: public IP representing inside
- Outside local: private IP of outside device
- Outside global: public IP of outside device

STATIC NAT:
ip nat inside source static 10.0.0.5 203.0.113.1

PAT (Port Address Translation):
ip nat inside source list 1 interface Fa0/0 overload
access-list 1 permit 10.0.0.0 0.0.0.255
```

**Lab Exercise**:
- **Advanced Routing Lab**:
  - Build on Week 5 lab
  - Add 4th router with EIGRP
  - Mix OSPF and EIGRP routers
  - Configure default routes
  - Test routing behavior
  - Check AD with "show ip protocols"
  - Perform failover test (shut down link, observe convergence time)

**Practice Questions**:
1. Which protocol has lower AD—OSPF or EIGRP? What does this mean?
2. When would you use EIGRP over OSPF?
3. Explain the difference between distance-vector and link-state routing
4. Configure NAT for 10.0.0.0/24 network to use public IP 203.0.113.1
5. What's PAT and when is it used?

**Real-World Connection**:
- Large networks mix routing protocols
- NAT is standard for connecting to Internet
- Understanding convergence time matters for failover scenarios
- Datacenters carefully design routing hierarchy

---

### WEEK 7: IP Connectivity - BGP Basics & Route Summarization
**Learning Objectives**:
- Understand BGP concepts at high level
- Know when BGP is used
- Understand route summarization
- Know classful vs classless routing
- Configure route summarization (OSPF)

**Video Resources**:

1. **NetworkChuck - BGP (Border Gateway Protocol) Basics** (YouTube)
   - Link: YouTube search: "NetworkChuck BGP basics border gateway protocol"
   - Length: ~20 minutes
   - Topics: BGP purpose, AS numbers, when you use BGP (ISP level)
   - **NOTE**: Deep BGP not on CCNA—just basics

2. **Professor Messer - BGP Fundamentals** (YouTube)
   - Link: YouTube search: "Professor Messer BGP fundamentals"
   - Length: ~20 minutes
   - Topics: Alternative explanation if needed

3. **NetworkChuck - Route Summarization** (YouTube)
   - Link: YouTube search: "NetworkChuck route summarization ccna"
   - Length: ~20 minutes
   - Topics: How to summarize routes, supernetting, benefits
   - **PRACTICAL**: Used to reduce routing table size

4. **Jeremy Cioara - Classless vs Classful Routing** (YouTube)
   - Link: YouTube search: "CBT Nuggets classless classful routing"
   - Length: ~15 minutes
   - Topics: CIDR, routing with netmasks, why classful is obsolete

**Key Concepts Summary**:
```
BGP BASICS:
- Exterior Gateway Protocol (between ASes)
- Autonomous System (AS): Collection of networks under single admin
- BGP uses AS path to prevent loops
- Not commonly used by individual companies (ISP tool)
- Administrative Distance: 20 (external), 200 (internal)

ROUTE SUMMARIZATION:
- Combines multiple routes into single summary
- Reduces routing table size
- Easier to advertise
- Example: 10.0.0.0/24, 10.0.1.0/24, 10.0.2.0/24, 10.0.3.0/24
  Summarizes to: 10.0.0.0/22

CLASSFUL vs CLASSLESS:
Classful (OLD):
- Class A: 1-126 (255.0.0.0)
- Class B: 128-191 (255.255.0.0)
- Class C: 192-223 (255.255.255.0)
- Wasted addresses

Classless (CIDR - Current):
- Any subnet mask /1 to /32
- Efficient use of addresses

OSPF ROUTE SUMMARIZATION:
conf t
router ospf 1
area 0 range 10.0.0.0 255.255.0.0
exit
```

**Lab Exercise**:
- **Route Summarization Lab**:
  - Create network with multiple subnets
  - Calculate summary address
  - Configure OSPF with summarization
  - Verify summary works: "show ip ospf database"
  - Compare routing table size before/after

**Practice Questions**:
1. What is an Autonomous System (AS)?
2. When would you use BGP?
3. Summarize these routes: 192.168.0.0/24, 192.168.1.0/24, 192.168.2.0/24, 192.168.3.0/24
4. What's the benefit of route summarization?
5. Explain CIDR notation and why it's better than classful routing

**Real-World Connection**:
- ISPs use BGP
- Your company gets routes from ISP via BGP
- Large organizations use route summarization
- Datacenters must summarize efficiently

---

### WEEK 8: IP Services (DHCP, DNS, NAT, SNMP, Syslog, NTP)
**Learning Objectives**:
- Understand DHCP (Dynamic Host Configuration Protocol)
- Know DNS (Domain Name System) concepts
- Understand DHCP relay agents
- Know NTP (Network Time Protocol) purpose
- Understand SNMP basics
- Know Syslog for logging
- Configure DHCP on router/switch
- Understand IPv6 basics

**Video Resources**:

1. **NetworkChuck - DHCP** (YouTube)
   - Link: YouTube search: "NetworkChuck DHCP dynamic host configuration"
   - Length: ~20 minutes
   - Topics: DHCP process (DORA), relay agents, DHCP pools
   - **KEY**: Understanding DHCP is important

2. **NetworkChuck - Configure DHCP on Cisco Router** (YouTube)
   - Link: YouTube search: "NetworkChuck configure dhcp cisco router"
   - Length: ~20 minutes
   - Topics: DHCP server on router, excluding addresses, verifying
   - **HANDS-ON**: Lab this week

3. **NetworkChuck - DNS (Domain Name System)** (YouTube)
   - Link: YouTube search: "NetworkChuck DNS domain name system"
   - Length: ~15 minutes
   - Topics: DNS hierarchy, recursive/iterative queries, DNS records
   - **UNDERSTANDING**: Not configuring much, just understanding

4. **NetworkChuck - NTP (Network Time Protocol)** (YouTube)
   - Link: YouTube search: "NetworkChuck NTP network time protocol"
   - Length: ~15 minutes
   - Topics: Why time sync matters, NTP servers, stratum levels
   - **RELEVANT**: Logs need time sync for correlation

5. **NetworkChuck - SNMP (Simple Network Management Protocol)** (YouTube)
   - Link: YouTube search: "NetworkChuck SNMP network management"
   - Length: ~15 minutes
   - Topics: SNMP basics, OIDs, community strings, v1/v2/v3
   - **PRACTICAL**: Monitoring tool

6. **NetworkChuck - Syslog** (YouTube)
   - Link: YouTube search: "NetworkChuck syslog logging"
   - Length: ~15 minutes
   - Topics: Centralized logging, severity levels, syslog servers
   - **IMPORTANT**: Logging for troubleshooting

7. **NetworkChuck - IPv6 Basics** (YouTube)
   - Link: YouTube search: "NetworkChuck IPv6 basics ccna"
   - Length: ~20 minutes
   - Topics: IPv6 address format, why we need it, global/link-local addresses
   - **FUTURE**: IPv4 running out, IPv6 is coming

8. **Professor Messer - IPv6 Addressing** (YouTube)
   - Link: YouTube search: "Professor Messer IPv6 addressing"
   - Length: ~20 minutes
   - Alternative explanation of IPv6

**Key Concepts Summary**:
```
DHCP PROCESS (DORA):
D - Discover: Client broadcasts DHCP request
O - Offer: Server responds with IP offer
R - Request: Client requests offered IP
A - Acknowledge: Server confirms assignment

DHCP CONFIGURATION:
conf t
ip dhcp pool EMPLOYEES
network 10.0.0.0 255.255.255.0
default-router 10.0.0.1
dns-server 8.8.8.8
lease 7
exit
ip dhcp excluded-address 10.0.0.1 10.0.0.10

DHCP RELAY:
- Allows DHCP requests across subnets
- Router interfaces forward DHCP broadcasts
ip helper-address 10.0.1.5 (on interface connecting to subnet)

DNS:
- Translates FQDN (example.com) to IP address
- Recursive query: Client → Resolver (ISP) → Root → TLD → Authoritative
- Iterative: Each server directs to next

NTP:
- Synchronizes time across network
- Stratum 1: Reference clocks (atomic)
- Stratum 2-15: Network devices
- Command: ntp server 132.163.96.1

SNMP:
- Monitors network devices
- Community string: password for SNMP
- v3: Most secure (authentication + encryption)
- OID: Object Identifier (MIB path)

IPv6 ADDRESSING:
- 128-bit address (vs IPv4 32-bit)
- Hexadecimal notation: 2001:0db8:0000:0000:0000:ff00:0042:8329
- Simplified: 2001:db8::ff00:42:8329
- Link-local: fe80:: (automatic, for local communication)
- Global unicast: 2000::/3 (public addresses)
```

**Lab Exercise**:
- **DHCP & Services Lab**:
  - Configure DHCP server on router for specific subnet
  - Exclude administrative address range
  - Configure default router and DNS servers
  - Connect client PC via DHCP
  - Verify IP assignment: "ipconfig /all" (Windows) or "ip addr" (Linux)
  - Configure NTP on router: ntp server [public server]
  - Configure Syslog to external server (in simulation)
  - Configure SNMPv2 with community string

**Practice Questions**:
1. Explain the DORA process step-by-step
2. What's a DHCP relay agent and when do you use it?
3. How does DNS resolution work? (Steps from client to IP)
4. Why is time sync (NTP) important?
5. What's the difference between SNMP v2 and v3?
6. Explain IPv6 address format and link-local addresses
7. What's the purpose of Syslog?

**Real-World Connection**:
- At URI, DHCP assigns IPs to computers
- DNS resolves student portal, email, etc.
- NTP ensures log timestamps match
- SNMP monitors network health
- Syslog centralizes troubleshooting

---

### WEEK 9: Security Fundamentals - Access Control Lists & Device Security
**Learning Objectives**:
- Understand ACLs (Access Control Lists)
- Know numbered vs named ACLs
- Configure standard ACLs
- Configure extended ACLs
- Understand ACL placement/direction
- Know device authentication (SSH, local users)
- Configure password security
- Understand role-based access

**Video Resources**:

1. **NetworkChuck - ACLs (Access Control Lists)** (YouTube)
   - Link: YouTube search: "NetworkChuck ACL access control list"
   - Length: ~20 minutes
   - Topics: ACL purpose, standard vs extended, wildcard masks
   - **CRITICAL**: ACLs are core security topic

2. **NetworkChuck - Configure Standard ACLs** (YouTube)
   - Link: YouTube search: "NetworkChuck configure standard acl"
   - Length: ~20 minutes
   - Topics: Standard ACL syntax, denying/permitting networks
   - **HANDS-ON**: Lab this week

3. **NetworkChuck - Configure Extended ACLs** (YouTube)
   - Link: YouTube search: "NetworkChuck configure extended acl"
   - Length: ~20 minutes
   - Topics: Extended ACL (protocol, port), more granular control
   - **HANDS-ON**: More complex lab

4. **NetworkChuck - Named ACLs** (YouTube)
   - Link: YouTube search: "NetworkChuck named acl"
   - Length: ~15 minutes
   - Topics: Named ACLs vs numbered, readability, easier management

5. **NetworkChuck - SSH (Secure Shell)** (YouTube)
   - Link: YouTube search: "NetworkChuck SSH secure shell ccna"
   - Length: ~15 minutes
   - Topics: SSH vs Telnet, configuring SSH access
   - **CRITICAL**: Never use Telnet in production

6. **NetworkChuck - Device Security** (YouTube)
   - Link: YouTube search: "NetworkChuck device security passwords ccna"
   - Length: ~15 minutes
   - Topics: Local user authentication, enable passwords, service passwords encryption

7. **Professor Messer - ACL Deep Dive** (YouTube)
   - Link: YouTube search: "Professor Messer ACL access lists"
   - Length: ~25 minutes
   - Alternative/deeper explanation if needed

**Key Concepts Summary**:
```
ACL BASICS:
- Filters traffic based on criteria
- Processed top-to-bottom (first match wins)
- Implicit deny at end (anything not permitted is denied)
- Applied to interfaces in/out direction

STANDARD ACL (Layer 3 - IP source only):
1-99: Numbered
1300-1999: Extended range
Named: access-list standard DENY_SALES

Example: access-list 10 permit 10.0.0.0 0.0.0.255
Then: interface fa0/0
      ip access-group 10 in

WILDCARD MASK (inverse of subnet mask):
Subnet: 255.255.255.0 → Wildcard: 0.0.0.255
Subnet: 255.255.240.0 → Wildcard: 0.0.15.255

EXTENDED ACL (Layer 4 - IP, protocol, port):
100-199: Numbered
2000-2699: Named range

Example: access-list 101 permit tcp 10.0.0.0 0.0.0.255 any eq 80
(Allow TCP from 10.0.0.0/24 to any on port 80)

Common ports:
- SSH: 22
- Telnet: 23 (DON'T USE)
- HTTP: 80
- HTTPS: 443
- SNMP: 161/162
- DNS: 53

SSH CONFIGURATION:
conf t
hostname Router1
ip domain-name example.com
crypto key generate rsa 1024
username admin privilege 15 password cisco123
line vty 0 4
transport input ssh
login local
exit

DEVICE PASSWORD SECURITY:
conf t
enable password cisco123
enable secret cisco456 (overrides enable password, encrypted)
service password-encryption
line console 0
password cisco123
login
exit
```

**Lab Exercise**:
- **ACL Security Lab**:
  - Create standard ACL to permit only HR subnet, deny sales
  - Apply to interface
  - Test with ping from different subnets
  - Create extended ACL allowing HTTP from admin, blocking others
  - Configure SSH access to router
  - Remove Telnet access
  - Configure local users with different privilege levels
  - Verify security: "show access-lists", "show users"

**Practice Questions**:
1. Explain "implicit deny" in ACLs
2. Create standard ACL to deny 192.168.5.0/24
3. Create extended ACL to permit SSH from 10.0.0.0/8 to any
4. What's the difference between standard and extended ACLs?
5. Configure SSH access (include all necessary commands)
6. What's wrong with using Telnet?

**Real-World Connection**:
- ACLs are first line of defense
- SSH-only access on production devices
- Port-based access control common in networks
- Device authentication prevents unauthorized access

---

### WEEK 10: Security Fundamentals - Switch Security & Port Security
**Learning Objectives**:
- Configure port security
- Understand MAC address limiting
- Know port security violation modes
- Configure DHCP snooping
- Understand Dynamic ARP Inspection (DAI)
- Know VTP (VLAN Trunking Protocol) security implications
- Configure encrypted community strings

**Video Resources**:

1. **NetworkChuck - Port Security** (FREE CCNA // EP 14)
   - Link: YouTube search: "NetworkChuck port security you need to learn"
   - Length: ~15 minutes
   - Topics: MAC limiting, violation modes, sticky MAC
   - **CRITICAL**: Switch security fundamental

2. **NetworkChuck - Configure Port Security** (YouTube)
   - Link: YouTube search: "NetworkChuck configure port security cisco"
   - Length: ~20 minutes
   - Topics: CLI commands, verification, troubleshooting
   - **HANDS-ON**: Lab this week

3. **NetworkChuck - DHCP Snooping** (YouTube)
   - Link: YouTube search: "NetworkChuck DHCP snooping"
   - Length: ~15 minutes
   - Topics: Rogue DHCP prevention, trusted/untrusted ports
   - **SECURITY**: Prevents unauthorized DHCP servers

4. **Professor Messer - Dynamic ARP Inspection** (YouTube)
   - Link: YouTube search: "Professor Messer dynamic arp inspection"
   - Length: ~15 minutes
   - Topics: ARP spoofing prevention, DAI configuration
   - **SECURITY**: Prevents ARP poisoning attacks

5. **NetworkChuck - VTP (VLAN Trunking Protocol) Basics** (YouTube)
   - Link: YouTube search: "NetworkChuck VTP vlan trunking protocol"
   - Length: ~15 minutes
   - Topics: VTP modes, pruning, security concerns
   - **NOTE**: VTP can be security risk if not configured correctly

6. **NetworkChuck - Encryption & Hashing** (YouTube)
   - Link: YouTube search: "NetworkChuck encryption hashing ccna"
   - Length: ~15 minutes
   - Topics: Encryption vs hashing, use cases, common algorithms
   - **FOUNDATIONAL**: Understand security concepts

**Key Concepts Summary**:
```
PORT SECURITY:
- Limits MAC addresses per port
- Modes: access (single device), trunk (multiple devices)
- Violation actions: shutdown, restrict, protect

CONFIGURATION:
conf t
int fa0/1
switchport port-security
switchport port-security maximum 1
switchport port-security mac-address sticky
switchport port-security violation shutdown
exit

VERIFICATION:
show port-security int fa0/1
show port-security address

DHCP SNOOPING:
conf t
ip dhcp snooping
int fa0/1
ip dhcp snooping trust
exit
int range fa0/2-24
no ip dhcp snooping trust
exit

DYNAMIC ARP INSPECTION:
conf t
ip arp inspection vlan 10
int fa0/1
ip arp inspection trust
exit

VTP MODES:
- Server: Creates/modifies VLANs (sends updates)
- Client: Learns VLANs from server (receives only)
- Transparent: Doesn't participate but forwards updates
- Off: No VTP (best practice)

ENCRYPTION/HASHING:
MD5: 128-bit hash (collisions possible—use with caution)
SHA: Better hashing (160+ bits)
AES: Encryption standard (symmetric)
RSA: Asymmetric encryption (SSH uses this)
```

**Lab Exercise**:
- **Switch Security Lab**:
  - Configure port security on access port
  - Connect device, verify MAC learned
  - Connect unauthorized device, observe shutdown
  - Configure port security with sticky MACs
  - Enable DHCP snooping
  - Test with rogue DHCP server (blocked)
  - Configure port as trusted
  - Verify DHCP works again
  - Document security posture

**Practice Questions**:
1. Configure port security to allow 2 MACs with restrict violation action
2. What's the difference between sticky and static MAC assignment?
3. What does DHCP snooping prevent?
4. Explain Dynamic ARP Inspection
5. Why is VTP in "off" mode recommended?
6. What's the difference between encryption and hashing?

**Real-World Connection**:
- Port security prevents unauthorized access
- DHCP snooping common in enterprise
- ARP inspection prevents spoofing attacks
- Understanding security saves your network

---

### WEEK 11: Wireless & Network Management
**Learning Objectives**:
- Understand wireless access point configuration
- Know wireless SSID concepts
- Understand wireless channels and bands
- Know wireless security best practices
- Understand network management tools
- Know remote management considerations
- Configure wireless basics

**Video Resources**:

1. **NetworkChuck - How to Configure a Wireless Access Point** (YouTube)
   - Link: YouTube search: "NetworkChuck configure wireless access point"
   - Length: ~20 minutes
   - Topics: SSID creation, channel selection, wireless security
   - **HANDS-ON**: Lab this week

2. **NetworkChuck - Wireless Security Best Practices** (YouTube)
   - Link: YouTube search: "NetworkChuck wireless security best practices"
   - Length: ~15 minutes
   - Topics: WPA2/WPA3, SSID broadcasting, MAC filtering
   - **SECURITY**: Protect wireless access

3. **NetworkChuck - Wireless Channels & Interference** (YouTube)
   - Link: YouTube search: "NetworkChuck wireless channels interference"
   - Length: ~15 minutes
   - Topics: Channel selection, overlap, site surveys
   - **PRACTICAL**: Real-world wireless planning

4. **NetworkChuck - Network Management with NetBox/Cisco DNA Center** (YouTube)
   - Link: YouTube search: "NetworkChuck network management tools"
   - Length: ~20 minutes
   - Topics: Centralized management, device discovery, provisioning
   - **OVERVIEW**: Understanding modern management

5. **Professor Messer - Remote Access Security** (YouTube)
   - Link: YouTube search: "Professor Messer remote access security"
   - Length: ~15 minutes
   - Topics: VPN, out-of-band management, secure access
   - **SECURITY**: Remote management considerations

**Key Concepts Summary**:
```
WIRELESS CONFIGURATION:
- SSID: Network name (visible if broadcast enabled)
- Channel: 2.4GHz (1-11 US), 5GHz (36+)
- Power: Transmit power level
- Security: WPA2/WPA3 recommended
- Authentication: PSK (Pre-shared key) or 802.1X

WIRELESS BEST PRACTICES:
1. Use WPA2/WPA3 (never WEP/WPA alone)
2. Strong PSK password (25+ characters)
3. Disable SSID broadcast (security by obscurity—weak but adds layer)
4. Change default admin credentials
5. Update firmware regularly
6. Disable WPS (WiFi Protected Setup—vulnerable)
7. Use 5GHz when possible (less congestion)
8. Survey site for optimal channel/power placement

CHANNEL SELECTION:
2.4GHz: Channels 1, 6, 11 don't overlap (US)
- Choose 1, 6, or 11 (2, 3, 4, 5, 7, 8, 9, 10 = overlapping)
5GHz: 36-165 (less overlapping, many options)

AP CONFIGURATION (Simplified Example):
SSID: CompanyNetwork
Channel: 6 (2.4GHz)
Security: WPA2 Personal
PSK: [Strong_Password_25+_Chars]
Power: Medium
```

**Lab Exercise**:
- **Wireless Management Lab**:
  - Configure AP SSID
  - Set wireless security (WPA2)
  - Select non-overlapping channel
  - Configure transmit power
  - Connect wireless client
  - Verify connection
  - Change security settings, re-verify
  - Document configuration

**Practice Questions**:
1. Which 2.4GHz channels don't overlap?
2. Configure wireless with WPA2 and strong password
3. Why should you not broadcast SSID?
4. What management tools does Cisco offer?
5. Explain VPN use for remote access

**Real-World Connection**:
- University WiFi requires careful planning
- Multiple APs coordinated to prevent interference
- Security essential for guest networks
- Management tools scale across campus

---

### WEEK 12: Network Automation & Programmability
**Learning Objectives**:
- Understand REST APIs and HTTP verbs (CRUD)
- Know JSON and XML data formats
- Understand network programmability concepts
- Know Cisco APIs (Meraki, DNA Center)
- Understand configuration management
- Know YAML basics
- Understand infrastructure-as-code concepts

**Video Resources**:

1. **NetworkChuck - REST APIs & HTTP** (YouTube)
   - Link: YouTube search: "NetworkChuck REST API HTTP"
   - Length: ~20 minutes
   - Topics: HTTP verbs (GET, POST, PUT, DELETE), status codes
   - **FOUNDATION**: Modern networking uses APIs

2. **NetworkChuck - JSON** (YouTube)
   - Link: YouTube search: "NetworkChuck JSON data format"
   - Length: ~15 minutes
   - Topics: JSON structure, parsing, use cases
   - **DATA**: APIs exchange JSON

3. **NetworkChuck - APIs for Network Engineers** (YouTube)
   - Link: YouTube search: "NetworkChuck APIs network engineers"
   - Length: ~20 minutes
   - Topics: Cisco APIs, Meraki API, practical examples
   - **PRACTICAL**: Real-world use

4. **NetworkChuck - Cisco DNA Center Basics** (YouTube)
   - Link: YouTube search: "NetworkChuck Cisco DNA Center"
   - Length: ~20 minutes
   - Topics: Centralized management, automation, analytics
   - **MODERN**: Enterprise management tool

5. **NetworkChuck - Infrastructure as Code (IaC)** (YouTube)
   - Link: YouTube search: "NetworkChuck infrastructure as code"
   - Length: ~20 minutes
   - Topics: Ansible, configuration management, reproducibility
   - **FUTURE**: How automation works

6. **David Bombal - Python for Network Engineers Intro** (YouTube)
   - Link: YouTube search: "David Bombal Python network engineers"
   - Length: ~20 minutes
   - Topics: Why Python, simple network scripts
   - **FOUNDATION**: Python for automation (connects to your cert)

7. **NetworkChuck - YAML Basics** (YouTube)
   - Link: YouTube search: "NetworkChuck YAML basics"
   - Length: ~15 minutes
   - Topics: YAML format, Ansible playbooks structure
   - **ANSIBLE**: YAML is Ansible language

**Key Concepts Summary**:
```
REST API BASICS:
HTTP Verbs (CRUD):
- GET: Retrieve data (Read)
- POST: Create new resource (Create)
- PUT: Update entire resource (Update)
- DELETE: Remove resource (Delete)
- PATCH: Partial update

Status Codes:
200: Success
201: Created
400: Bad request
401: Unauthorized
403: Forbidden
404: Not found
500: Server error

JSON FORMAT:
{
  "device": {
    "hostname": "router1",
    "ip_address": "192.168.1.1",
    "interfaces": [
      {
        "name": "fa0/0",
        "ip": "10.0.0.1",
        "status": "up"
      }
    ]
  }
}

CISCO APIS:
- Meraki API: Cloud-based network management
- DNA Center API: On-prem management and analytics
- NETCONF/YANG: Model-driven networking

CONFIGURATION MANAGEMENT:
Ansible:
- Agentless (SSH-based)
- Playbooks (YAML format)
- Modules (pre-built tasks)

Example playbook:
---
- hosts: routers
  tasks:
    - name: Configure hostname
      ios_command:
        commands:
          - "configure terminal"
          - "hostname router1"

INFRASTRUCTURE AS CODE:
- Treating config like code
- Version control (Git)
- Reproducible deployments
- CI/CD pipelines

YAML FORMAT:
key: value
list:
  - item1
  - item2
dictionary:
  nested_key: nested_value
```

**Lab Exercise**:
- **API & Automation Concepts Lab**:
  - Explore Cisco Meraki API documentation (free tier available)
  - Make REST API call to retrieve device information (curl or Postman)
  - Parse JSON response
  - View Ansible playbook examples (don't need to run)
  - Understand how playbook would configure devices
  - Review DNA Center demo if available
  - Document API concepts

**Practice Questions**:
1. What's the difference between GET and POST?
2. Explain JSON structure with example
3. What's REST API? Why do network engineers need to know it?
4. Describe Ansible and how it's used for network configuration
5. What does "Infrastructure as Code" mean?
6. Explain YAML format with example playbook

**Real-World Connection**:
- Modern networks increasingly use APIs
- Automation saves time and reduces errors
- Your Python cert positions you well for this
- Datacenters heavily use IaC
- Future networking is programmable

---

### WEEK 13: Network Troubleshooting & Diagnostics
**Learning Objectives**:
- Know network troubleshooting methodology
- Understand diagnostic commands (ping, traceroute, netstat, show commands)
- Know packet capture tools (Wireshark)
- Understand common troubleshooting scenarios
- Know performance monitoring
- Understand QoS (Quality of Service) basics

**Video Resources**:

1. **NetworkChuck - Troubleshooting Methodology** (YouTube)
   - Link: YouTube search: "NetworkChuck troubleshooting methodology"
   - Length: ~20 minutes
   - Topics: OSI model troubleshooting approach, step-by-step process
   - **FOUNDATION**: System for solving problems

2. **NetworkChuck - Ping & Traceroute** (YouTube)
   - Link: YouTube search: "NetworkChuck ping traceroute diagnostic tools"
   - Length: ~15 minutes
   - Topics: ICMP, ping, traceroute, understanding output
   - **CRITICAL SKILLS**: Basic diagnostics

3. **NetworkChuck - Show Commands Deep Dive** (YouTube)
   - Link: YouTube search: "NetworkChuck show commands cisco"
   - Length: ~25 minutes
   - Topics: show ip route, show interfaces, show ip protocols, etc.
   - **HANDS-ON**: Use these constantly

4. **NetworkChuck - Wireshark Packet Capture** (YouTube)
   - Link: YouTube search: "NetworkChuck Wireshark packet capture"
   - Length: ~25 minutes
   - Topics: Capturing packets, analyzing traffic, layer-by-layer detail
   - **ADVANCED**: Deep troubleshooting

5. **Professor Messer - QoS (Quality of Service)** (YouTube)
   - Link: YouTube search: "Professor Messer QoS quality of service"
   - Length: ~20 minutes
   - Topics: Traffic prioritization, bandwidth management, marking
   - **SERVICES**: Ensuring performance for critical traffic

6. **NetworkChuck - Network Performance Monitoring** (YouTube)
   - Link: YouTube search: "NetworkChuck network monitoring performance"
   - Length: ~20 minutes
   - Topics: Monitoring tools, baselines, alerts
   - **PROACTIVE**: Preventing problems

**Key Concepts Summary**:
```
TROUBLESHOOTING METHODOLOGY (OSI APPROACH):
Layer 1 (Physical):
- Check cables
- Check switch ports (show int status)
- Check interface status (show ip int brief)

Layer 2 (Data Link):
- Check MAC tables (show mac-address-table)
- Check VLAN assignments (show vlan)
- Check STP (show spanning-tree)

Layer 3 (Network):
- Check IP addresses (show ip int brief)
- Check routing table (show ip route)
- Use ping/traceroute to test connectivity
- Check ACLs (show access-lists)

Layer 4-7 (Transport/Application):
- Check services running
- Check open ports (netstat -an)
- Packet capture for deep analysis

COMMON PING OUTPUT:
Destination host unreachable: No route to host
Request timed out: No response (firewall/ACL/device down)
Reply from X: Successful

TRACEROUTE:
- Shows path to destination
- Each hop numbered
- Identifies where packet gets stuck
- ! indicates successful hop
- * indicates no response

SHOW COMMANDS (Essential):
show ip interface brief: IP addresses + status
show interfaces: Detailed interface stats
show ip route: Routing table
show ip ospf neighbor: OSPF adjacencies
show ip protocols: Which protocols running
show access-lists: Current ACLs
show mac-address-table: Learned MAC addresses
show vlan: VLAN configuration
show spanning-tree: STP status

WIRESHARK ANALYSIS:
- Captures packets at Layer 2
- Displays all protocol layers
- Shows packet details
- Filter for specific traffic
- Analyze application data

QoS CONCEPTS:
- Classification: Mark traffic (DSCP, CoS)
- Queuing: Traffic ordering
- Policing: Rate limiting
- Shaping: Traffic smoothing
- Common: Voice gets priority over data
```

**Lab Exercise**:
- **Troubleshooting Lab**:
  - Create intentional network problem (e.g., remove route)
  - Use ping to identify problem
  - Use traceroute to find where it fails
  - Fix problem
  - Verify with show commands
  - Capture packets with Wireshark
  - Analyze packet contents
  - Document troubleshooting process

**Practice Questions**:
1. Walk through troubleshooting using OSI model
2. What does "Request timed out" in ping indicate?
3. How would you use traceroute to find network problem?
4. Explain key "show" commands for troubleshooting
5. What's packet capture used for?
6. Explain QoS and why it matters

**Real-World Connection**:
- Troubleshooting is daily at URI
- Users call with connectivity issues
- Systematic approach saves time
- Packet capture reveals application problems
- QoS essential in universities (streaming, VoIP)

---

### WEEK 14: Advanced Topics & Emerging Concepts
**Learning Objectives**:
- Understand virtualization (servers, network)
- Know containerization basics
- Understand Software-Defined Networking (SDN)
- Know cloud networking concepts
- Understand hybrid cloud
- Know edge computing basics

**Video Resources**:

1. **NetworkChuck - Virtualization** (YouTube)
   - Link: YouTube search: "NetworkChuck virtualization vmware hyper-v"
   - Length: ~20 minutes
   - Topics: Server virtualization, vSwitches, virtual networking
   - **MODERN**: Most infrastructure is virtualized

2. **NetworkChuck - Containers & Docker** (YouTube)
   - Link: YouTube search: "NetworkChuck containers docker kubernetes"
   - Length: ~20 minutes
   - Topics: Container basics, orchestration, networking implications
   - **EMERGING**: Container networks different than traditional

3. **NetworkChuck - Software-Defined Networking (SDN)** (YouTube)
   - Link: YouTube search: "NetworkChuck SDN software defined networking"
   - Length: ~25 minutes
   - Topics: Separation of control/data plane, OpenFlow, controllers
   - **FUTURE**: How networking is evolving

4. **NetworkChuck - Cloud Networking** (YouTube)
   - Link: YouTube search: "NetworkChuck cloud networking AWS Azure"
   - Length: ~20 minutes
   - Topics: VPCs, subnets, security groups, cloud connectivity
   - **HYBRID**: Connecting to cloud

5. **NetworkChuck - Zero Trust Security** (YouTube)
   - Link: YouTube search: "NetworkChuck zero trust security"
   - Length: ~20 minutes
   - Topics: Modern security model, continuous verification
   - **SECURITY**: Future of network security

6. **Professor Messer - Edge Computing** (YouTube)
   - Link: YouTube search: "Professor Messer edge computing iot"
   - Length: ~15 minutes
   - Topics: Computing closer to data source, IoT networking
   - **EMERGING**: IoT and sensors

**Key Concepts Summary**:
```
VIRTUALIZATION:
- Hypervisor: Software creating VMs (vSphere, Hyper-V)
- vSwitch: Virtual switch (software)
- VLAN tagging: VLANs in virtual environment
- Live migration: Moving VMs between hosts

CONTAINERS:
- Lightweight vs VMs
- Share OS kernel
- Docker: Container platform
- Kubernetes: Orchestration
- Network implications: More connections, faster provisioning

SDN (Software-Defined Networking):
- Control plane: Separated from data plane
- Controller: Central intelligence (OpenDaylight, ONOS)
- OpenFlow: Protocol between switches and controller
- Benefits: Programmability, flexibility, automation

CLOUD NETWORKING:
- VPC: Virtual Private Cloud (isolated network)
- Subnets: Public/Private
- Security Groups: Stateful firewall rules
- NAT Gateway: Outbound Internet access
- VPN/Direct Connect: On-prem to cloud connectivity

ZERO TRUST:
- Never trust, always verify
- Micro-segmentation
- Continuous authentication
- Assume breach mentality
- Future of security

EDGE COMPUTING:
- Processing at network edge (closer to data)
- Reduces latency
- Examples: IoT, 5G edge computing
- Networking challenges: Distributed architecture
```

**Lab Exercise**:
- **Advanced Concepts Lab**:
  - Research local datacenter virtualization setup
  - Understand how VLANs work in virtual environment
  - Review cloud network diagram (AWS/Azure)
  - Understand security groups as firewalls
  - Study SDN controller architecture (conceptual)
  - Document findings

**Practice Questions**:
1. Explain virtualization and why it's important
2. What's difference between VMs and containers?
3. Describe SDN and how it differs from traditional networking
4. Explain zero trust security model
5. How does cloud networking differ from on-premise?

**Real-World Connection**:
- URI likely uses virtualization for servers
- Cloud connectivity for SaaS services
- Security increasingly moving to zero trust
- Modern networks blend on-prem + cloud
- Edge computing gaining importance

---

### WEEK 15: Practice Exams & Weak Area Review
**Learning Objectives**:
- Assess overall readiness for exam
- Identify remaining knowledge gaps
- Focused review of weak areas
- Final skill verification

**Resources**:

1. **Cisco Practice Exams** (Official)
   - Available through Cisco Learning Network
   - Most accurate representation of real exam
   - Cost: ~$50-60 for practice exam bundle
   - Schedule: Full 120-minute timed exam

2. **NetLabs+ Free Practice Exams** (YouTube)
   - Search: "NetLabs free CCNA practice exam"
   - Free tier available
   - Immediate feedback

3. **Professor Messer CCNA Practice Questions** (YouTube)
   - Search: "Professor Messer CCNA practice questions"
   - Free video question reviews
   - Explains correct/incorrect answers

4. **ExamTopics** (YouTube/Website)
   - Community-sourced questions
   - Real exam questions (sometimes)
   - Use as verification, not primary study

5. **Boson ExSim** (Paid)
   - Highly accurate practice exams
   - Cost: ~$60-70
   - Worth investment for final verification

**Week 15 Activities**:
- Take full-length practice exam (120 minutes, timed)
- Score yourself
- Review every wrong answer
- Return to relevant week content for gaps
- Do second practice exam (different questions)
- Compare scores
- Target 80%+ before scheduling real exam

**Scoring Guide**:
- 90%+: Ready to test
- 80-89%: Ready, but review weak areas
- 70-79%: More study needed
- Below 70%: Go back to fundamentals

---

### WEEK 16: Final Review & Exam Preparation
**Learning Objectives**:
- Final knowledge verification
- Test anxiety management
- Exam logistics preparation
- Last-minute tips

**Activities**:

1. **Take final practice exam** (120 minutes, timed)
   - Target: 85%+
   - Review weak areas
   - Focus on topics that appear repeatedly

2. **Review exam format**:
   - Multiple choice
   - Drag-and-drop
   - Simulations (hands-on lab scenarios)
   - Simlets (multi-step simulations)
   - Fill-in-the-blank

3. **Time management practice**:
   - ~60 seconds per question average
   - Flag difficult questions, return later
   - Don't second-guess correct answers

4. **Cheat sheet review**:
   - Create one-page summary of key facts
   - Study night before (not too hard)
   - Focus on: Subnetting, ACLs, OSPF, routing, CLI commands

5. **Exam day prep**:
   - Sleep well night before
   - Eat good breakfast
   - Arrive 15 minutes early
   - Bring ID
   - Clear mind—you've prepared!

6. **Last-minute resources to review**:
   - Subnetting (Week 2) - appears throughout exam
   - Common CLI commands (all weeks)
   - OSI model (Week 1)
   - OSPF concepts (Week 5)
   - ACLs (Week 9)

---

## TECHNICAL IMPLEMENTATION REQUIREMENTS

### Site Architecture
- **Frontend**: HTML/CSS/JavaScript (React optional for interactivity)
- **Responsive**: Mobile, tablet, desktop
- **Dark mode**: CSS variables for theming
- **Accessibility**: WCAG 2.1 AA compliant

### Page Features
1. **Week-by-week navigation** (sidebar or mobile menu)
2. **Progress bar** showing completion percentage
3. **Video embeds** (YouTube iframe embeds)
4. **Print-friendly CSS** for offline study
5. **Bookmark/save** functionality (localStorage)
6. **Search functionality** to find topics
7. **Code/CLI command formatting** (syntax highlighting)
8. **Tables** for comparison (routing protocols, ACL types, etc.)

### Design Elements
- Clean, minimal design
- Consistent color scheme
- Easy-to-scan formatting
- Visual hierarchy (headers, sections)
- Call-to-action buttons
- Social sharing buttons
- Feedback form (link to Google Form or similar)

### Performance
- Fast loading (optimize images)
- Mobile-first approach
- Lazy loading for videos (don't auto-play)

---

## ADDITIONAL RESOURCES TO LINK

**Free Online Tools**:
- GNS3 (network simulator): https://www.gns3.com/
- Cisco Packet Tracer: https://www.netacad.com/
- Wireshark: https://www.wireshark.org/
- Subnetting calculator: https://www.subnet-calculator.com/

**Community Forums**:
- r/ccna (Reddit)
- Cisco Learning Network
- NetworkEngineering subreddit

**Study Materials**:
- Cisco Cert Guide books (Amazon)
- Boson ExSim practice exams
- Cisco Learning Network practice exams

---

## DEPLOYMENT NOTES

**Build order**:
1. Start with Week 1-2 (fundamentals/subnetting)
2. Add 2 weeks per deployment cycle
3. Get feedback from students
4. Iterate and improve
5. Add additional weeks progressively
6. Launch full site when all 16 weeks complete

**Post-launch improvements**:
- Add student testimonials/success stories
- Add discussion forum or comments
- Track analytics (which sections are most popular)
- Update with exam changes
- Add CCNP course extension

---

## CALL TO ACTION (Footer)

"Built by Nicolas Kennedy, Level 2 Network Technician at URI ITS
Python Certified | Aspiring Network Architect | Passionate about Infrastructure

[Share on LinkedIn] [Share on Reddit] [Give Feedback]

Questions? Found an error? Help me improve this guide!
[Feedback Form Link]

© 2026 Nicolas Kennedy - Free for educational use"

---

## SUMMARY

This study guide provides comprehensive CCNA 200-301 preparation with:
- ✓ 16 weeks of structured content
- ✓ Curated video resources (mostly NetworkChuck + alternatives)
- ✓ Weekly learning objectives
- ✓ Hands-on lab exercises using free tools
- ✓ Practice questions for each topic
- ✓ Real-world context from URI/datacenter experience
- ✓ Key concepts summaries with CLI examples
- ✓ Professional design and presentation
- ✓ Scalable framework (foundation for CCNP, Python guides)
- ✓ Community-focused (free, shareable, iterative)

**Estimated study time**: 12-16 weeks of 5-10 hours/week = achievable during summer + early fall

**Success metric**: Pass CCNA by October 2026, build portfolio piece that helps future career advancement.
