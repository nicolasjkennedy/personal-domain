import type { Domain, Topic } from "@/src/types/ccna";

// ─── Domains ──────────────────────────────────────────────────────────────────

export const ccnaDomains: Domain[] = [
  {
    id: "net-fundamentals",
    name: "Network Fundamentals",
    examWeight: 20,
    description:
      "OSI and TCP/IP models, IPv4 addressing, subnetting, binary math, and Ethernet cabling standards.",
    topicIds: [
      "osi-tcpip-models",
      "ipv4-addressing",
      "subnetting",
      "network-devices",
      "ethernet-cabling",
    ],
    sourceWeeks: [1, 2],
  },
  {
    id: "net-access",
    name: "Network Access",
    examWeight: 20,
    description:
      "VLANs, trunk ports, 802.1Q tagging, Spanning Tree Protocol, wireless LAN standards, and PoE.",
    topicIds: [
      "vlans",
      "trunk-ports",
      "spanning-tree",
      "wireless-standards",
      "wireless-security",
    ],
    sourceWeeks: [3, 4],
  },
  {
    id: "ip-connectivity",
    name: "IP Connectivity",
    examWeight: 25,
    description:
      "Static and dynamic routing, OSPF, EIGRP, BGP basics, administrative distance, route summarization, and NAT/PAT.",
    topicIds: [
      "static-routing",
      "ospf",
      "eigrp",
      "nat-pat",
      "bgp-summarization",
    ],
    sourceWeeks: [5, 6, 7],
  },
  {
    id: "ip-services",
    name: "IP Services",
    examWeight: 10,
    description:
      "DHCP DORA process, DNS resolution, DHCP relay agents, NTP, SNMP, Syslog, and IPv6 addressing.",
    topicIds: ["dhcp", "dns", "ntp-snmp-syslog", "ipv6-basics", "dhcp-relay"],
    sourceWeeks: [8],
  },
  {
    id: "security",
    name: "Security Fundamentals",
    examWeight: 15,
    description:
      "Standard and extended ACLs, SSH device security, port security violation modes, DHCP snooping, DAI, and VTP.",
    topicIds: [
      "acls",
      "ssh-device-security",
      "port-security",
      "dhcp-snooping-dai",
      "vtp",
    ],
    sourceWeeks: [9, 10],
  },
  {
    id: "automation",
    name: "Automation & Programmability",
    examWeight: 10,
    description:
      "REST APIs, JSON/XML/YAML data formats, Cisco DNA Center, Ansible configuration management, and SDN concepts.",
    topicIds: [
      "rest-apis",
      "data-formats",
      "cisco-apis",
      "ansible-automation",
      "sdn",
    ],
    sourceWeeks: [11, 12],
  },
];

// ─── Topics ───────────────────────────────────────────────────────────────────

export const ccnaTopics: Topic[] = [
  // ── Network Fundamentals ──────────────────────────────────────────────────

  {
    id: "osi-tcpip-models",
    domainId: "net-fundamentals",
    name: "OSI & TCP/IP Models",
    summary:
      "The OSI model is a 7-layer conceptual framework describing how data travels from application to physical medium, while the TCP/IP model condenses this into 4 practical layers. Each layer adds a header (encapsulation) as data travels down the stack and strips it on the receiving side (de-encapsulation). Understanding the models lets you pinpoint exactly which layer a problem lives on when troubleshooting.",
    labConnection:
      "At URI, when you plug a laptop into an access switch and it cannot reach the domain controller, you start at Layer 1 (is the port up?), move to Layer 2 (is the VLAN correct?), then Layer 3 (does it have an IP and gateway?). The OSI model gives that troubleshooting ladder structure.",
    keyConcepts: [
      "Layer 7 — Application: HTTP, FTP, DNS, SSH, SMTP",
      "Layer 6 — Presentation: Encryption, compression, data translation",
      "Layer 5 — Session: Establish, maintain, and terminate sessions",
      "Layer 4 — Transport: TCP (reliable) and UDP (best-effort), port numbers",
      "Layer 3 — Network: IP addressing, routing between networks",
      "Layer 2 — Data Link: MAC addresses, framing, error detection (CRC)",
      "Layer 1 — Physical: Electrical signals, cables, connectors",
      "TCP/IP Layer 4 — Application (OSI 5-7)",
      "TCP/IP Layer 3 — Transport (TCP/UDP)",
      "TCP/IP Layer 2 — Internet (IP, ICMP, ARP)",
      "TCP/IP Layer 1 — Network Access / Link (Ethernet, MAC)",
      "PDU names by layer: Data (7-5), Segment (4), Packet (3), Frame (2), Bit (1)",
    ],
  },
  {
    id: "ipv4-addressing",
    domainId: "net-fundamentals",
    name: "IPv4 Addressing Structure",
    summary:
      "An IPv4 address is a 32-bit number written in dotted-decimal notation (four octets, each 0–255). Addresses are divided into a network portion (identified by the subnet mask) and a host portion. Private address ranges (RFC 1918) — 10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16 — are not routable on the public Internet and require NAT at the edge.",
    labConnection:
      "Every switch and AP deployed at URI sits in a specific subnet assigned by the network team. When you image a new access switch, the management VLAN interface gets a static IP from the management subnet (often a /24 from the 10.x.x.x space), a gateway pointing to the distribution layer, and DNS servers pointing to the campus resolvers.",
    keyConcepts: [
      "32-bit address in 4 octets: e.g. 192.168.10.5",
      "Binary position values per octet: 128, 64, 32, 16, 8, 4, 2, 1",
      "Private ranges: 10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16",
      "Loopback: 127.0.0.1 (local host test)",
      "APIPA: 169.254.0.0/16 (assigned when DHCP fails)",
      "Network address: first address in a subnet (all host bits = 0)",
      "Broadcast address: last address in a subnet (all host bits = 1)",
      "Class A: 1–126 first octet, default /8 mask",
      "Class B: 128–191 first octet, default /16 mask",
      "Class C: 192–223 first octet, default /24 mask",
    ],
  },
  {
    id: "subnetting",
    domainId: "net-fundamentals",
    name: "Subnetting & CIDR",
    summary:
      "Subnetting divides a large address block into smaller networks by borrowing host bits for the network portion. CIDR (Classless Inter-Domain Routing) notation uses a slash prefix to indicate the number of network bits (e.g. /26). The number of usable host addresses in any subnet is 2^(32−prefix) − 2, subtracting the network and broadcast addresses.",
    labConnection:
      "When provisioning a new building at URI, the network team requests a block from central IT and further subnets it — /24 for access VLANs, /30 for router-to-router links. Being able to quickly confirm that an IP address fits in the right subnet avoids misconfigurations that bring down connectivity for an entire floor.",
    keyConcepts: [
      "Subnet mask identifies the network portion of an address",
      "CIDR prefix /24 = 255.255.255.0; 256 addresses, 254 usable hosts",
      "Usable hosts = 2^(32−prefix) − 2",
      "/30: 4 addresses, 2 usable — standard for point-to-point router links",
      "/28: 16 addresses, 14 usable hosts",
      "/27: 32 addresses, 30 usable hosts",
      "/26: 64 addresses, 62 usable hosts",
      "/25: 128 addresses, 126 usable hosts",
      "Wildcard mask = 255.255.255.255 minus the subnet mask",
      "Finding network address: AND the IP with the subnet mask",
      "Subnetting borrows host bits, creating 2^n subnets per borrow",
      "VLSM: Variable Length Subnet Masking — different prefix lengths in the same space",
    ],
  },
  {
    id: "network-devices",
    domainId: "net-fundamentals",
    name: "Network Device Roles",
    summary:
      "Routers operate at Layer 3, forwarding packets between different networks based on IP addresses and routing tables. Switches operate at Layer 2, forwarding Ethernet frames within a network based on MAC address tables. Hubs are Layer 1 devices that repeat signals to all ports simultaneously, creating a single collision domain — they are obsolete in modern networks.",
    labConnection:
      "At URI, each building has at least one distribution switch and multiple access switches. The distribution switch is Layer 3 (routing between VLANs), while access switches are Layer 2 (connecting endpoints). When a new AP is added, it connects to an access switch port configured for the correct VLAN.",
    keyConcepts: [
      "Router: Layer 3, forwards packets based on IP, separates broadcast domains",
      "Switch: Layer 2, forwards frames based on MAC address table",
      "Hub: Layer 1, half-duplex, single collision domain — never use today",
      "MAC address table: dynamically learned by observing source MAC of incoming frames",
      "ARP: resolves IP addresses to MAC addresses at Layer 2",
      "Multilayer switch: can do Layer 2 switching AND Layer 3 routing",
      "Firewall: filters traffic between networks, often stateful",
      "Access point: bridges wireless clients to the wired network at Layer 2",
      "Collision domain: one per switch port; hubs share one domain for all ports",
      "Broadcast domain: separated only by routers or Layer 3 VLANs",
    ],
  },
  {
    id: "ethernet-cabling",
    domainId: "net-fundamentals",
    name: "Ethernet Cabling Standards",
    summary:
      "Ethernet cabling categories define the maximum supported speed and distance. Cat5e supports Gigabit Ethernet up to 100 meters, Cat6 supports 10 Gbps up to 55 meters, and Cat6a supports 10 Gbps at the full 100-meter channel length. Fiber optic cabling uses either multimode (OM-type, shorter distance, LED/VCSEL source) or single-mode (OS-type, long-haul, laser source).",
    labConnection:
      "Structured cabling work at URI follows TIA-568 standards — 100-meter channel runs, Cat6 patch panels in IDFs, and fiber runs between buildings. When running a new drop for an AP, you pull Cat6, terminate both ends with 568-B pinout, and test with a cable certifier before patching.",
    keyConcepts: [
      "Cat5e: up to 1 Gbps, 100-meter max distance",
      "Cat6: up to 10 Gbps at 55m, 1 Gbps at 100m",
      "Cat6a: up to 10 Gbps at 100m, augmented shielding",
      "568-B wiring standard: orange/white, orange, green/white, blue, blue/white, green, brown/white, brown",
      "Straight-through cable: same pinout both ends, connects unlike devices (PC to switch)",
      "Crossover cable: 568-A one end, 568-B the other — was needed to connect like devices; MDI-X eliminates this need",
      "Multimode fiber (OM1–OM5): LED/VCSEL light source, shorter runs, orange or aqua jacket",
      "Single-mode fiber (OS1/OS2): laser light source, long-haul, yellow jacket",
      "SFP (Small Form-factor Pluggable): hot-swappable transceiver for fiber or copper",
      "802.3af PoE: 15.4W per port; 802.3at PoE+: 30W; 802.3bt PoE++: 60–100W",
    ],
  },

  // ── Network Access ────────────────────────────────────────────────────────

  {
    id: "vlans",
    domainId: "net-access",
    name: "VLAN Concepts & Configuration",
    summary:
      "A VLAN (Virtual LAN) logically segments a physical switch into multiple broadcast domains. Devices in different VLANs cannot communicate directly without a Layer 3 device routing between them. VLANs improve security, reduce broadcast traffic, and enable flexible network design that is independent of physical switch location.",
    labConnection:
      "At URI, configuring a new access switch starts with creating the required VLANs (faculty, student, VoIP, management) and assigning the uplink trunk. Access ports face endpoints and are assigned a single untagged VLAN. The management VLAN gets an SVI with the switch's management IP.",
    keyConcepts: [
      "VLAN 1: default VLAN — do not use for production traffic",
      "VLANs 2–1005: standard range, stored in flash:vlan.dat",
      "VLANs 1006–4094: extended range, requires VTP transparent or off mode",
      "Access port: carries traffic for one VLAN, untagged",
      "SVI (Switched Virtual Interface): Layer 3 interface for a VLAN — `interface vlan 10`",
      "VLAN database: `show vlan brief` shows all VLANs and their assigned ports",
      "Creating VLANs: `vlan 10` then `name Engineering` in global config",
      "Assigning access port: `switchport mode access` + `switchport access vlan 10`",
      "Native VLAN: untagged VLAN on a trunk (default is VLAN 1)",
      "Benefit: isolation — a broadcast in VLAN 10 never reaches VLAN 20",
    ],
  },
  {
    id: "trunk-ports",
    domainId: "net-access",
    name: "Trunk Ports & 802.1Q Tagging",
    summary:
      "A trunk port carries multiple VLANs simultaneously between switches or from a switch to a router by inserting an 802.1Q tag into each Ethernet frame. The tag contains a 12-bit VLAN ID, allowing the receiving device to know which VLAN the frame belongs to. Frames from the native VLAN are sent untagged across the trunk.",
    labConnection:
      "Every uplink between access switches and the distribution switch at URI is a trunk carrying all production VLANs. When deploying a new access switch, you configure the uplink as a trunk, set the allowed VLAN list, and verify with `show interfaces trunk`. A missing VLAN on the allowed list is the most common cause of an entire VLAN going dark.",
    keyConcepts: [
      "802.1Q: IEEE standard for VLAN tagging — inserts a 4-byte tag into the Ethernet frame",
      "VLAN tag: 16-bit TPID (0x8100) + 3-bit PCP + 1-bit DEI + 12-bit VLAN ID",
      "`switchport trunk encapsulation dot1q` — required on older IOS before setting trunk mode",
      "`switchport mode trunk` — forces port into trunk mode",
      "`switchport trunk allowed vlan 10,20,30` — restricts which VLANs cross the trunk",
      "Native VLAN mismatch is a security risk — a frame can 'hop' between VLANs",
      "`show interfaces trunk` — verifies trunk status, native VLAN, and allowed/active VLANs",
      "DTP (Dynamic Trunking Protocol): Cisco proprietary — disable with `switchport nonegotiate` on production links",
      "Router-on-a-Stick: single physical link with sub-interfaces per VLAN for inter-VLAN routing",
      "Sub-interface: `interface fa0/0.10` + `encapsulation dot1q 10`",
    ],
  },
  {
    id: "spanning-tree",
    domainId: "net-access",
    name: "Spanning Tree Protocol (STP/RSTP)",
    summary:
      "Spanning Tree Protocol (802.1D) prevents Layer 2 loops in redundant switched networks by placing certain ports in a blocking state. A root bridge is elected based on the lowest bridge ID (priority + MAC address), and all other switches calculate the shortest path to the root. RSTP (802.1w) dramatically speeds up convergence from up to 50 seconds to near-instant by using port roles and link-type negotiations.",
    labConnection:
      "At URI, when connecting two distribution switches with redundant uplinks, STP ensures only one active path exists at any given time — preventing the broadcast storm that would otherwise crash the segment. You can verify the root bridge with `show spanning-tree` and confirm which ports are in forwarding vs blocking.",
    keyConcepts: [
      "Root bridge: switch with the lowest bridge ID (priority 0–61440 in increments of 4096, then MAC address)",
      "Default STP priority: 32768",
      "Bridge ID = priority (32768 + VLAN ID) + MAC address",
      "Port states (802.1D): Blocking → Listening → Learning → Forwarding → Disabled",
      "Forwarding delay: 15 seconds per state (Listening and Learning)",
      "Max age: 20 seconds (how long a switch stores BPDU info)",
      "RSTP (802.1w): replaces Blocking/Listening with Discarding; uses edge ports and link negotiation",
      "RSTP port roles: Root Port, Designated Port, Alternate Port, Backup Port",
      "PortFast: skips STP states on access ports; configure with `spanning-tree portfast`",
      "BPDU Guard: shuts down a PortFast port if a BPDU is received (prevents rogue switches)",
      "`spanning-tree vlan 1 priority 4096` — manually set root bridge priority",
      "Per-VLAN STP (PVST+): Cisco implementation runs a separate STP instance per VLAN",
    ],
  },
  {
    id: "wireless-standards",
    domainId: "net-access",
    name: "Wireless LAN Standards (802.11)",
    summary:
      "The IEEE 802.11 family of standards defines wireless LAN operation across different frequency bands and modulation techniques. Each generation increases throughput, introduces multi-antenna techniques (MIMO), and improves spectrum efficiency. The key standards for the CCNA exam are 802.11a, b, g, n (Wi-Fi 4), ac (Wi-Fi 5), and ax (Wi-Fi 6).",
    labConnection:
      "At URI, the AP fleet is a mix of 802.11ac (Wi-Fi 5) and 802.11ax (Wi-Fi 6) units deployed in classrooms, labs, and residence halls. When you deploy a new AP, you verify it associates with the correct WLC SSID and confirm clients can connect at the expected data rate. PoE from the access switch powers the unit — no separate power brick needed.",
    keyConcepts: [
      "802.11a: 5 GHz only, up to 54 Mbps, OFDM modulation",
      "802.11b: 2.4 GHz only, up to 11 Mbps, DSSS modulation",
      "802.11g: 2.4 GHz only, up to 54 Mbps, backward-compatible with 802.11b",
      "802.11n (Wi-Fi 4): 2.4 GHz and 5 GHz, up to 600 Mbps, MIMO (multiple antennas)",
      "802.11ac (Wi-Fi 5): 5 GHz only, up to 6.9 Gbps, MU-MIMO, beamforming",
      "802.11ax (Wi-Fi 6): 2.4 GHz and 5 GHz, up to 9.6 Gbps, OFDMA, BSS Coloring",
      "2.4 GHz non-overlapping channels in the US: 1, 6, 11",
      "5 GHz: many non-overlapping channels (36, 40, 44, 48...); less interference",
      "SSID: Service Set Identifier — the network name",
      "BSS: Basic Service Set (one AP + clients); ESS: multiple APs forming one logical network",
      "CSMA/CA: 802.11 collision avoidance (listen before transmitting, random backoff)",
    ],
  },
  {
    id: "wireless-security",
    domainId: "net-access",
    name: "Wireless Security (WEP, WPA, WPA2, WPA3)",
    summary:
      "Wireless security protocols protect over-the-air data from eavesdropping and unauthorized access. WEP is cryptographically broken and must never be used. WPA2 with AES-CCMP is the current enterprise standard, and WPA3 adds Simultaneous Authentication of Equals (SAE) to replace the PSK handshake and forward secrecy for all connections.",
    labConnection:
      "At URI, the enterprise SSIDs use WPA2/WPA3 with 802.1X (EAP) authentication tied to the campus RADIUS server — laptops authenticate with domain credentials. Guest SSIDs use WPA2-PSK with a rotating passphrase and are isolated to their own VLAN with restricted Internet-only access.",
    keyConcepts: [
      "WEP: uses RC4, 40/104-bit key — broken in minutes; never deploy",
      "WPA: uses TKIP (RC4-based), improved over WEP but still weak",
      "WPA2 Personal (PSK): AES-CCMP encryption, pre-shared key for authentication",
      "WPA2 Enterprise: 802.1X + RADIUS server; users authenticate individually",
      "WPA3 Personal: SAE (Simultaneous Authentication of Equals) replaces 4-way PSK handshake",
      "WPA3 Enterprise: 192-bit cryptographic strength, mandatory for classified environments",
      "802.1X: port-based NAC; supplicant (client), authenticator (AP/switch), authentication server (RADIUS)",
      "EAP types: EAP-TLS (certificates), PEAP (password inside TLS tunnel), EAP-FAST",
      "Forward secrecy: WPA3 ensures past sessions cannot be decrypted even if key is later compromised",
      "4-way handshake (WPA2): derives PTK (Pairwise Transient Key) from PMK and nonces",
    ],
  },

  // ── IP Connectivity ───────────────────────────────────────────────────────

  {
    id: "static-routing",
    domainId: "ip-connectivity",
    name: "Static Routes & Default Routes",
    summary:
      "Static routes are manually configured entries in the routing table that tell a router where to forward packets for a specific destination network. A default route (`0.0.0.0/0`) is a catch-all route used when no more-specific match exists — it sends traffic toward the Internet gateway. Static routes have an administrative distance of 1, making them highly trusted but not automatically updated when topology changes.",
    labConnection:
      "In a small IDF at URI that has a single uplink, a static default route pointing to the distribution switch is all that is needed for reachability. On core routers, dynamic routing handles the campus topology, but edge devices commonly use a static default to the ISP gateway.",
    keyConcepts: [
      "`ip route <network> <mask> <next-hop-ip>` — basic static route",
      "`ip route 0.0.0.0 0.0.0.0 <next-hop>` — default route",
      "Administrative distance of static routes: 1 (second only to directly connected at 0)",
      "Floating static route: higher AD than the dynamic protocol — acts as a backup route",
      "Next-hop can be an IP address or an exit interface",
      "Recursive lookup: if next-hop is specified, the router looks up that IP in the table to find the exit interface",
      "`show ip route static` — view only static entries in the routing table",
      "Directly connected route: AD = 0, automatically installed when an interface comes up with an IP",
      "Limitation: static routes do not adapt to topology changes; require manual updates",
    ],
  },
  {
    id: "ospf",
    domainId: "ip-connectivity",
    name: "OSPF Concepts & Configuration",
    summary:
      "OSPF (Open Shortest Path First) is a link-state interior gateway protocol that builds a complete map of the network topology using LSAs (Link State Advertisements) and calculates the shortest path with Dijkstra's algorithm. OSPF routers form adjacencies with neighbors, exchange LSA databases, and recalculate routes rapidly when the topology changes. It uses cost (inversely proportional to bandwidth) as its metric.",
    labConnection:
      "Inter-building routing at URI runs OSPF, so all distribution and core switches know every campus subnet automatically. When you add a new access switch with a new subnet, the distribution switch OSPF configuration advertises that prefix into the campus topology within seconds — no manual static routes needed on every other router.",
    keyConcepts: [
      "Link-state protocol: every router builds an identical LSDB (Link State Database)",
      "Dijkstra's SPF algorithm calculates the shortest (lowest cost) path to each destination",
      "Administrative distance: 110",
      "Metric = cost = 10^8 / bandwidth (in bps); a 100 Mbps link has cost 1 by default",
      "Area 0: backbone area — all other areas must connect to Area 0",
      "Router types: internal, backbone, ABR (Area Border Router), ASBR",
      "Neighbor adjacency states: Down → Init → 2-Way → ExStart → Exchange → Loading → Full",
      "DR/BDR election on multi-access networks (Ethernet): highest priority (default 1) wins, then highest router ID",
      "Hello interval: 10s on point-to-point and broadcast; Dead interval: 40s (4x hello)",
      "`router ospf <process-id>` — enter OSPF config; process ID is local only",
      "`network <network> <wildcard> area <area>` — advertises interfaces matching the range",
      "`show ip ospf neighbor` — verify adjacencies; `show ip ospf database` — view LSDB",
    ],
  },
  {
    id: "eigrp",
    domainId: "ip-connectivity",
    name: "EIGRP & Administrative Distance",
    summary:
      "EIGRP (Enhanced Interior Gateway Routing Protocol) is a Cisco-developed advanced distance-vector protocol that uses the DUAL (Diffusing Update Algorithm) to guarantee loop-free paths and enable fast convergence. Unlike pure distance-vector protocols, EIGRP maintains a topology table with successor and feasible successor routes for fast failover without re-convergence. Its composite metric uses bandwidth and delay by default.",
    labConnection:
      "On mixed-vendor campuses, OSPF is typically preferred, but legacy Cisco-only networks may still run EIGRP. Understanding EIGRP is essential for the exam and for reading routing tables where `D` routes appear. When comparing EIGRP (AD 90) to OSPF (AD 110), the router always prefers the EIGRP route if both protocols know the same destination.",
    keyConcepts: [
      "Advanced distance-vector (hybrid): sends partial updates, not full routing tables",
      "Administrative distance: 90 (internal), 170 (external)",
      "DUAL algorithm ensures loop-free, fast convergence using successor and feasible successor",
      "Successor: best route to a destination (installed in routing table)",
      "Feasible successor: backup route meeting the feasibility condition (FD > RD of successor)",
      "Composite metric: K1×BW + K3×Delay (K2, K4, K5 = 0 by default)",
      "`router eigrp <AS-number>` — AS number must match on all EIGRP neighbors",
      "`network <network> <wildcard>` — advertises interfaces",
      "`no auto-summary` — disables classful summarization (important in modern networks)",
      "`show ip eigrp neighbors` — verify neighbor adjacencies",
      "`show ip eigrp topology` — view full DUAL topology table",
      "AD values to memorize: Connected=0, Static=1, EIGRP=90, OSPF=110, RIP=120, eBGP=20, iBGP=200",
    ],
  },
  {
    id: "nat-pat",
    domainId: "ip-connectivity",
    name: "NAT & PAT",
    summary:
      "Network Address Translation (NAT) allows private IP addresses (RFC 1918) to communicate on the public Internet by replacing the source IP with a routable address. PAT (Port Address Translation), also called NAT overload, extends this by also translating the source port number, allowing many private hosts to share a single public IP address. This is how virtually all home and small-business Internet connections work.",
    labConnection:
      "The URI campus border routers perform NAT/PAT to translate all internal RFC 1918 addresses to the university's registered public IP range for outbound Internet traffic. Understanding NAT is critical for troubleshooting: if an inside host can ping the NAT router but not the Internet, check the NAT translation table with `show ip nat translations`.",
    keyConcepts: [
      "Inside local: private IP of the source host",
      "Inside global: public IP representing the source host after translation",
      "Outside local: destination IP as seen from inside the network",
      "Outside global: actual public IP of the destination",
      "Static NAT: one-to-one mapping — one private IP permanently maps to one public IP",
      "Dynamic NAT: pool of public IPs shared among inside hosts (not overloaded)",
      "PAT (NAT overload): many-to-one using port numbers — `overload` keyword",
      "`ip nat inside source list <ACL> interface <exit-int> overload` — PAT config",
      "`ip nat inside` / `ip nat outside` — applied to interfaces",
      "`show ip nat translations` — view active translation table",
      "`clear ip nat translation *` — clear all dynamic translations",
    ],
  },
  {
    id: "bgp-summarization",
    domainId: "ip-connectivity",
    name: "BGP Basics & Route Summarization",
    summary:
      "BGP (Border Gateway Protocol) is the Exterior Gateway Protocol that connects Autonomous Systems (AS) on the Internet. It uses path attributes — especially AS_PATH — to make routing decisions and prevent loops. Route summarization combines multiple specific prefixes into a single aggregate advertisement, reducing routing table size and improving convergence time in large networks.",
    labConnection:
      "URI connects to the Internet through a commercial ISP using BGP. The campus AS number and public prefix block are advertised to the ISP. For the CCNA exam, you need to understand BGP concepts and AS numbers rather than full configuration; route summarization math is tested in the context of OSPF and EIGRP.",
    keyConcepts: [
      "BGP: Exterior Gateway Protocol — runs between Autonomous Systems",
      "Autonomous System (AS): a network under a single administrative authority with a unique AS number",
      "eBGP: BGP between different ASes (AD = 20)",
      "iBGP: BGP within the same AS (AD = 200)",
      "BGP uses TCP port 179 for neighbor sessions",
      "AS_PATH: list of ASes a route has traversed — primary loop prevention mechanism",
      "Route summarization: combine /24 routes into a /22 to reduce the routing table",
      "Example: 10.0.0.0/24 through 10.0.3.0/24 summarizes to 10.0.0.0/22",
      "OSPF summarization: `area <id> range <network> <mask>` on the ABR",
      "Classful: Class A/B/C fixed boundaries (legacy)",
      "Classless (CIDR): any prefix length — current standard",
      "Longest prefix match: routers always forward based on the most specific (longest) matching route",
    ],
  },

  // ── IP Services ───────────────────────────────────────────────────────────

  {
    id: "dhcp",
    domainId: "ip-services",
    name: "DHCP & the DORA Process",
    summary:
      "DHCP (Dynamic Host Configuration Protocol) automatically assigns IP addresses and network parameters to clients using a four-step exchange called DORA: Discover, Offer, Request, Acknowledge. The client broadcasts a Discover, the server responds with an Offer containing an available IP, the client broadcasts a Request to accept the offer, and the server sends an Acknowledge to confirm the lease.",
    labConnection:
      "At URI, the DHCP servers are centralized, so when a client connects to an access switch in any building, the DHCP Discover broadcast hits the switch and gets forwarded via the ip helper-address on the SVI to the central DHCP server. If a user in a new VLAN gets an APIPA address (169.254.x.x), the first thing to check is whether ip helper-address is configured on that VLAN's SVI.",
    keyConcepts: [
      "D — Discover: client broadcasts (destination 255.255.255.255, source 0.0.0.0)",
      "O — Offer: server unicasts or broadcasts an available IP address offer",
      "R — Request: client broadcasts acceptance of the offered address",
      "A — Acknowledge: server confirms the lease and sends lease duration, gateway, DNS",
      "DHCP lease: typically 24 hours to 8 days; client renews at 50% of lease time",
      "`ip dhcp pool <NAME>` — define a DHCP pool",
      "`network <network> <mask>` — range to hand out",
      "`default-router <ip>` — default gateway sent to clients",
      "`dns-server <ip>` — DNS server sent to clients",
      "`ip dhcp excluded-address <start> <end>` — reserve IPs for static assignment",
      "`show ip dhcp binding` — view active leases",
      "`show ip dhcp conflict` — view addresses that had conflicts",
    ],
  },
  {
    id: "dns",
    domainId: "ip-services",
    name: "DNS Resolution",
    summary:
      "DNS (Domain Name System) translates human-readable hostnames into IP addresses. The resolution process starts at the client's local cache, checks the hosts file, then queries a recursive resolver, which contacts root servers, TLD servers, and authoritative name servers as needed. DNS uses UDP port 53 for standard queries and TCP port 53 for large responses or zone transfers.",
    labConnection:
      "When a student at URI accesses the student information system by name, DNS resolves the campus FQDN to an internal IP. Network technicians use `nslookup` or `dig` to verify resolution is working. If an ACL blocks port 53 traffic, all name resolution fails — a subtle misconfiguration that breaks seemingly everything.",
    keyConcepts: [
      "DNS uses UDP port 53 (standard queries); TCP port 53 (zone transfers, large responses)",
      "Recursive resolver: accepts queries from clients and does the full lookup on their behalf",
      "Root servers: 13 root server clusters (a.root-servers.net through m.root-servers.net)",
      "TLD servers: handle .com, .edu, .org, etc.",
      "Authoritative server: holds the definitive records for a domain",
      "DNS record types: A (IPv4), AAAA (IPv6), CNAME (alias), MX (mail), PTR (reverse lookup), NS (name server)",
      "TTL (Time To Live): how long a DNS record is cached before re-querying",
      "FQDN (Fully Qualified Domain Name): hostname + domain, e.g. router1.uri.edu",
      "`ip name-server <ip>` — configure DNS server on a Cisco device",
      "`ip domain-lookup` — enables DNS lookups on the device (enabled by default)",
    ],
  },
  {
    id: "ntp-snmp-syslog",
    domainId: "ip-services",
    name: "NTP, SNMP & Syslog",
    summary:
      "NTP (Network Time Protocol) synchronizes clocks across network devices using a hierarchical stratum model. SNMP (Simple Network Management Protocol) allows a network management system to monitor and configure devices using Get and Set operations and Trap notifications. Syslog provides a standard way to send event messages from devices to a centralized log server, with severity levels from 0 (emergency) to 7 (debug).",
    labConnection:
      "At URI, all network devices point to the campus NTP servers so log timestamps are consistent — accurate timestamps are essential for correlating events during incident analysis. SNMP traps from switches and routers flow to the NOC monitoring platform, alerting on interface flaps or high CPU. Syslog messages stream to a centralized server for archival.",
    keyConcepts: [
      "NTP: UDP port 123; stratum 0 = atomic clock reference, stratum 1 = directly connected, stratum 2 = synced to stratum 1",
      "`ntp server <ip>` — configure device as an NTP client",
      "`show ntp status` — verify sync status and stratum level",
      "SNMP versions: v1 (community strings, insecure), v2c (bulk reads, still community strings), v3 (authentication + encryption)",
      "SNMP community string: acts as a password; read-only vs read-write",
      "SNMP Trap: unsolicited alert from agent to NMS (e.g. link down)",
      "SNMP Get: NMS polls agent for specific OID value",
      "MIB (Management Information Base): database of objects an agent can report",
      "Syslog severity levels: 0=Emergency, 1=Alert, 2=Critical, 3=Error, 4=Warning, 5=Notice, 6=Informational, 7=Debug",
      "`logging host <ip>` — send syslog messages to an external server",
      "`logging buffered 4` — log Warning and more severe messages to local buffer",
    ],
  },
  {
    id: "ipv6-basics",
    domainId: "ip-services",
    name: "IPv6 Addressing",
    summary:
      "IPv6 addresses are 128 bits long, written as eight groups of four hexadecimal digits separated by colons. Two rules allow abbreviation: consecutive groups of all zeros can be replaced with `::` (only once per address), and leading zeros in any group can be omitted. IPv6 eliminates NAT (every device gets a globally unique address), includes IPsec natively, and uses stateless address autoconfiguration (SLAAC) for plug-and-play addressing.",
    labConnection:
      "URI is dual-stacked on portions of the network, meaning both IPv4 and IPv6 run simultaneously. When configuring IPv6 on a Cisco interface, you assign a global unicast address and enable IPv6 routing with `ipv6 unicast-routing`. Link-local addresses (fe80::/10) are automatically generated and required for neighbor discovery to work.",
    keyConcepts: [
      "128-bit address, 8 groups of 4 hex digits: 2001:0db8:0000:0000:0000:ff00:0042:8329",
      "Abbreviation rule 1: omit leading zeros in each group",
      "Abbreviation rule 2: replace one sequence of consecutive all-zero groups with `::` (only once)",
      "Global unicast: 2000::/3 — routable on the Internet (like IPv4 public addresses)",
      "Link-local: fe80::/10 — auto-configured, not routable, required for NDP",
      "Unique local (ULA): fc00::/7 — similar to RFC 1918 private ranges",
      "Multicast: ff00::/8 — replaces IPv4 broadcast",
      "Anycast: one address assigned to multiple devices — routed to the nearest one",
      "SLAAC: Stateless Address Autoconfiguration — client builds its own address from the prefix in Router Advertisement + EUI-64",
      "EUI-64: derive the interface ID from the 48-bit MAC address (insert fffe in the middle, flip bit 7)",
      "`ipv6 unicast-routing` — enable IPv6 routing on a Cisco router",
      "NDP (Neighbor Discovery Protocol): replaces ARP in IPv6 — uses ICMPv6 NS and NA messages",
    ],
  },
  {
    id: "dhcp-relay",
    domainId: "ip-services",
    name: "DHCP Relay (ip helper-address)",
    summary:
      "A DHCP relay agent forwards DHCP broadcast packets from a client subnet to a unicast-reachable DHCP server on another subnet or VLAN. Because DHCP Discover messages are Layer 2 broadcasts, they cannot cross a router — the relay agent intercepts the broadcast and re-sends it as a directed unicast to the configured server IP. On Cisco IOS, the relay is configured with `ip helper-address` on the SVI or routed interface facing the client subnet.",
    labConnection:
      "Every access VLAN SVI at URI has an ip helper-address pointing to the central DHCP server. When you create a new VLAN and stand up its SVI, adding ip helper-address is always on the checklist — without it, clients in that VLAN get APIPA addresses and nothing works. After adding it, `show ip dhcp binding` on the DHCP server should show new leases appearing.",
    keyConcepts: [
      "`ip helper-address <dhcp-server-ip>` — configured on the interface facing the client side",
      "The helper address converts the DHCP broadcast into a unicast directed to the server",
      "The relay also sets the giaddr (gateway IP) field in the DHCP packet so the server knows which subnet to assign from",
      "Multiple helper addresses can be configured on one interface (for redundant servers)",
      "ip helper-address also forwards other UDP broadcasts: TFTP (69), NTP (123), NetBIOS (137/138)",
      "`show running-config interface vlan <id>` — verify helper address is present",
      "Missing helper address is the most common reason a new VLAN subnet does not receive DHCP addresses",
    ],
  },

  // ── Security Fundamentals ─────────────────────────────────────────────────

  {
    id: "acls",
    domainId: "security",
    name: "Access Control Lists (Standard & Extended)",
    summary:
      "ACLs are ordered lists of permit and deny statements that filter traffic on a router or switch interface. Standard ACLs (numbers 1–99) filter only on source IP address and should be placed close to the destination. Extended ACLs (numbers 100–199) can match source IP, destination IP, protocol, and port numbers — they should be placed close to the source to stop traffic early.",
    labConnection:
      "At URI ITS, ACLs on VTY lines restrict SSH management access to authorized management workstations only. Extended ACLs on distribution layer SVIs can block student VLAN traffic from reaching server VLANs on specific ports. Named ACLs make it easy to add or remove individual entries without renumbering.",
    keyConcepts: [
      "Standard ACL: matches source IP only; numbers 1–99 and 1300–1999",
      "Extended ACL: matches source IP, destination IP, protocol, port; numbers 100–199 and 2000–2699",
      "Named ACL: created with `ip access-list standard <NAME>` or `ip access-list extended <NAME>`",
      "Implicit deny: every ACL ends with an invisible `deny any` — if nothing matches, traffic is dropped",
      "Processing order: top-to-bottom, first match wins — order of entries matters",
      "Wildcard mask: inverse of subnet mask; 0 = must match, 255 = don't care",
      "`access-list 10 permit 10.0.0.0 0.0.0.255` — standard ACL permitting the 10.0.0.0/24 network",
      "`access-list 101 permit tcp 10.0.0.0 0.0.0.255 any eq 80` — extended ACL permitting HTTP",
      "`ip access-group <ACL> in|out` — apply to an interface",
      "`ip access-class <ACL> in` — apply to VTY lines for management access control",
      "`show access-lists` — view all ACLs and hit counts",
      "Standard ACL placement: close to the destination; Extended ACL placement: close to the source",
    ],
  },
  {
    id: "ssh-device-security",
    domainId: "security",
    name: "SSH & Device Password Security",
    summary:
      "SSH (Secure Shell) provides encrypted, authenticated remote management of Cisco devices — it replaces Telnet, which transmits all data including passwords in plaintext. Configuring SSH requires setting a hostname, domain name, generating RSA keys, and configuring VTY lines to accept only SSH. Device hardening includes enabling `service password-encryption`, setting `enable secret`, and disabling unused services.",
    labConnection:
      "Every network device at URI is managed exclusively via SSH — Telnet is disabled on all VTY lines. When imaging a new switch, the first console-cable tasks are setting the hostname, domain name, generating a 2048-bit RSA key pair, creating a local admin account, and locking the VTY lines to SSH-only before the switch goes into production.",
    keyConcepts: [
      "`hostname <name>` — required before generating RSA keys",
      "`ip domain-name <domain>` — required before generating RSA keys",
      "`crypto key generate rsa modulus 2048` — generate RSA key pair; minimum 1024 bits for SSHv2",
      "`ip ssh version 2` — explicitly enable SSHv2",
      "`username <name> privilege 15 secret <password>` — local user with full privileges",
      "`line vty 0 4` + `transport input ssh` + `login local` — VTY SSH-only with local auth",
      "`enable secret <password>` — hashed (MD5) privileged exec password; never use `enable password`",
      "`service password-encryption` — applies weak Type 7 encryption to plaintext passwords in config",
      "`no ip http server` / `no ip http secure-server` — disable web management if not needed",
      "`banner motd` — display a legal warning banner before login",
      "`exec-timeout 5 0` — auto-logout after 5 minutes of inactivity on VTY/console",
      "SSH uses TCP port 22; Telnet uses TCP port 23",
    ],
  },
  {
    id: "port-security",
    domainId: "security",
    name: "Port Security & Violation Modes",
    summary:
      "Port security limits the number of MAC addresses allowed on a switch access port, preventing unauthorized devices from connecting. When the MAC address limit is exceeded, the port takes action according to the configured violation mode: shutdown (default, disables the port), restrict (drops frames and increments violation counter), or protect (silently drops frames with no notification). Sticky MAC addresses are dynamically learned and saved to the running config.",
    labConnection:
      "At URI, port security is configured on access ports in areas where unknown devices pose a risk — such as open network jacks in hallways or conference rooms. The most common configuration is `maximum 1` with `violation shutdown` — any unauthorized device immediately disables the port, generating a Syslog alert. After an incident, `shutdown` then `no shutdown` clears the error-disabled state.",
    keyConcepts: [
      "`switchport mode access` — required before enabling port security",
      "`switchport port-security` — enables port security with defaults",
      "`switchport port-security maximum <N>` — max allowed MAC addresses (default 1)",
      "`switchport port-security mac-address sticky` — dynamically learn and save MACs to config",
      "`switchport port-security mac-address <MAC>` — statically configure an allowed MAC",
      "Violation mode shutdown: port goes to err-disabled state, must be manually re-enabled",
      "Violation mode restrict: drops frames from unauthorized MACs, increments violation counter",
      "Violation mode protect: silently drops frames, no counter increment, no log",
      "`show port-security interface <int>` — view port security status and violation count",
      "`show port-security address` — view all secured MAC addresses",
      "Error-disabled recovery: `shutdown` then `no shutdown` on the interface, or `errdisable recovery cause psecure-violation`",
    ],
  },
  {
    id: "dhcp-snooping-dai",
    domainId: "security",
    name: "DHCP Snooping & Dynamic ARP Inspection",
    summary:
      "DHCP snooping prevents rogue DHCP servers from distributing incorrect IP configuration by classifying switch ports as trusted (connected to legitimate DHCP servers) or untrusted (connected to clients). DAI (Dynamic ARP Inspection) uses the DHCP snooping binding table to validate ARP packets on untrusted ports, blocking ARP spoofing attacks that enable man-in-the-middle interception.",
    labConnection:
      "On production access switches at URI, DHCP snooping is enabled on all client VLANs with the uplink trunk configured as trusted. This prevents a rogue laptop from running a DHCP server and handing out a default gateway pointing to itself. DAI is layered on top to prevent ARP cache poisoning attacks on the same segments.",
    keyConcepts: [
      "`ip dhcp snooping` — globally enable DHCP snooping",
      "`ip dhcp snooping vlan <id>` — enable per VLAN",
      "`ip dhcp snooping trust` — on uplink/server-facing interfaces only",
      "Untrusted ports drop DHCP server messages (DHCPOFFER, DHCPACK from servers)",
      "Binding table: maps client MAC, IP, VLAN, and interface — used by DAI",
      "`show ip dhcp snooping binding` — view the snooping binding table",
      "`ip arp inspection vlan <id>` — enable DAI for specified VLANs",
      "`ip arp inspection trust` — on trusted uplinks only",
      "DAI validates ARP against the snooping binding table on untrusted ports",
      "ARP spoofing: attacker sends fake ARP replies to poison other devices' ARP caches",
      "`show ip arp inspection statistics` — view DAI drop and forward counts",
    ],
  },
  {
    id: "vtp",
    domainId: "security",
    name: "VTP Modes & Security",
    summary:
      "VTP (VLAN Trunking Protocol) is a Cisco proprietary Layer 2 protocol that propagates VLAN database changes from a VTP server to all VTP clients in the same domain across trunk links. While convenient in small environments, VTP is considered a security risk in production because a misconfigured switch can overwrite the VLAN database of an entire domain. Best practice is to use VTP mode transparent or off.",
    labConnection:
      "At URI, VTP is disabled (mode off) on all switches — VLANs are configured manually and consistently using automation scripts. This is safer because adding a second-hand switch with a higher VTP revision number to the network can wipe out all VLANs domain-wide — a major outage that has caught many networks off-guard.",
    keyConcepts: [
      "VTP Server: creates, modifies, deletes VLANs; propagates changes to clients",
      "VTP Client: receives VLAN config from server; cannot make local VLAN changes",
      "VTP Transparent: forwards VTP advertisements but does not participate; manages its own VLANs locally",
      "VTP Off: completely disables VTP (recommended for production)",
      "VTP revision number: monotonically increasing; the switch with the highest revision wins",
      "VTP domain: must match on all switches to exchange VLAN information",
      "VTP password: adds a layer of authentication for the domain (but still use mode off in production)",
      "Risk: a switch with high revision number plugged into the network can erase all VLANs on every client",
      "`show vtp status` — view VTP mode, domain, and current revision number",
      "`vtp mode transparent` or `vtp mode off` — recommended configuration",
    ],
  },

  // ── Automation & Programmability ──────────────────────────────────────────

  {
    id: "rest-apis",
    domainId: "automation",
    name: "REST APIs & HTTP Verbs",
    summary:
      "REST (Representational State Transfer) is an architectural style for APIs that uses standard HTTP methods to create, read, update, and delete resources. Network engineers use REST APIs to programmatically configure and query network devices and management platforms like Cisco DNA Center and Meraki. Requests and responses are typically formatted in JSON.",
    labConnection:
      "When URI's network team wants to query all switch interfaces via the DNA Center API rather than logging into each device individually, they send HTTP GET requests with an authentication token. Building familiarity with REST means you can script bulk configuration changes that would take hours of console work in minutes.",
    keyConcepts: [
      "REST: Representational State Transfer — stateless, client-server, uniform interface",
      "GET: retrieve a resource (read-only, no body)",
      "POST: create a new resource (body contains new data)",
      "PUT: replace an entire resource with new data",
      "PATCH: partially update a resource",
      "DELETE: remove a resource",
      "HTTP status codes: 200 OK, 201 Created, 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found, 500 Internal Server Error",
      "URI (Uniform Resource Identifier): the URL that identifies the resource",
      "Headers: Content-Type (application/json), Authorization (Bearer token), Accept",
      "Authentication: API key, Basic Auth, OAuth 2.0 tokens",
      "Idempotent: GET, PUT, DELETE produce the same result if called multiple times; POST is not idempotent",
    ],
  },
  {
    id: "data-formats",
    domainId: "automation",
    name: "JSON, XML & YAML",
    summary:
      "JSON (JavaScript Object Notation), XML (eXtensible Markup Language), and YAML (YAML Ain't Markup Language) are human-readable data serialization formats used to exchange structured data between systems and automation tools. JSON is the dominant format for REST APIs, XML is used by NETCONF, and YAML is the native format for Ansible playbooks.",
    labConnection:
      "When pulling device data from the Cisco DNA Center API, the response arrives as JSON. Ansible playbooks that configure Cisco IOS devices are written in YAML. Understanding these formats lets you write Python scripts or Ansible tasks that parse API responses and drive configuration changes without touching a CLI.",
    keyConcepts: [
      "JSON: key-value pairs, arrays, strings (quoted), numbers, booleans, null",
      "JSON object: `{ \"key\": \"value\" }`; JSON array: `[\"item1\", \"item2\"]`",
      "JSON is case-sensitive; strings use double quotes only",
      "XML: hierarchical, tag-based — `<hostname>Router1</hostname>`",
      "XML attributes: `<interface name=\"GigabitEthernet0/0\">`",
      "YAML: indentation-based (2 spaces standard), no curly braces for basic structures",
      "YAML list: items prefixed with `- `",
      "YAML key-value: `hostname: Router1`",
      "NETCONF: network configuration protocol using XML over SSH (port 830)",
      "YANG: data modeling language defining the structure of NETCONF data",
      "REST APIs use JSON; NETCONF uses XML; Ansible playbooks use YAML",
    ],
  },
  {
    id: "cisco-apis",
    domainId: "automation",
    name: "Cisco APIs (Meraki, DNA Center)",
    summary:
      "Cisco provides platform-specific APIs for managing network infrastructure. The Meraki Dashboard API is a cloud-based REST API for managing Meraki devices. Cisco DNA Center provides a northbound REST API for intent-based networking, offering device discovery, policy management, and assurance. Both use JSON and require authentication tokens rather than username/password per request.",
    labConnection:
      "URI ITS uses Cisco DNA Center for network assurance and device management across the campus. The DNA Center API lets automation scripts query device health, retrieve interface statistics, and push templates to devices — tasks that would otherwise require individual SSH sessions to dozens of switches.",
    keyConcepts: [
      "Meraki Dashboard API: REST, cloud-based, uses API key in X-Cisco-Meraki-API-Key header",
      "Meraki API base URL: https://api.meraki.com/api/v1",
      "DNA Center API: REST, on-premises, uses Bearer token after authenticating to /dna/system/api/v1/auth/token",
      "Intent-based networking: express desired network state; system figures out how to achieve it",
      "DNA Center functions: Discovery, Inventory, Policy, Assurance, Automation",
      "RESTCONF: REST-based protocol for YANG data models (alternative to NETCONF)",
      "NETCONF: XML-based management protocol using YANG models over SSH",
      "Sandbox environments: Cisco DevNet provides always-on sandboxes for practicing API calls",
      "Postman: popular GUI tool for crafting and testing REST API requests",
      "Authentication flow: POST credentials → receive token → include token in subsequent request headers",
    ],
  },
  {
    id: "ansible-automation",
    domainId: "automation",
    name: "Ansible & Configuration Management",
    summary:
      "Ansible is an agentless automation tool that uses SSH to execute tasks defined in YAML playbooks against inventory hosts. For network automation, Ansible modules like `ios_config`, `ios_command`, and `ios_facts` push configuration changes and retrieve data from Cisco IOS devices without installing any software on the devices. Configuration management ensures all devices maintain a known, consistent state.",
    labConnection:
      "If URI needed to update the NTP server configuration on 50 access switches simultaneously, an Ansible playbook with the `ios_config` module and the new NTP commands could complete that change in under a minute — with an audit trail — instead of logging into each switch individually. Version-controlled playbooks in a Git repository also serve as documentation.",
    keyConcepts: [
      "Agentless: Ansible uses SSH (or APIs) — no agent software installed on network devices",
      "Control node: the machine running Ansible (your workstation or a server)",
      "Inventory: file listing managed hosts, optionally grouped (e.g. [switches], [routers])",
      "Playbook: YAML file defining plays → tasks → modules to execute",
      "Play: maps a group of hosts to a set of tasks",
      "Module: unit of work (e.g. `cisco.ios.ios_config`, `cisco.ios.ios_command`)",
      "`ios_config`: push configuration lines to IOS devices",
      "`ios_command`: run show commands and capture output",
      "`ios_facts`: gather device facts (hostname, interfaces, version)",
      "Idempotent: running the same playbook multiple times produces the same result without duplicate changes",
      "Variables: defined in `vars`, host_vars, or group_vars for per-device customization",
      "Ansible Vault: encrypts sensitive data (passwords, API keys) stored in playbooks",
    ],
  },
  {
    id: "sdn",
    domainId: "automation",
    name: "Software-Defined Networking & IaC",
    summary:
      "Software-Defined Networking (SDN) separates the control plane (routing/switching decisions) from the data plane (packet forwarding), centralizing intelligence in a software controller. This enables programmatic control of the entire network from a single point. Infrastructure as Code (IaC) extends this idea by treating network configurations as version-controlled code — reproducible, testable, and deployable through automated pipelines.",
    labConnection:
      "URI's evolution toward Cisco DNA Center is a step toward SDN — centralized intent-based policy flows down to switches and APs automatically rather than being configured device-by-device. Understanding the data plane vs control plane separation helps you explain why DNA Center can push a policy change across the entire campus in seconds.",
    keyConcepts: [
      "Control plane: makes forwarding decisions (routing protocols, STP, ARP)",
      "Data plane (forwarding plane): actually moves packets/frames based on control plane decisions",
      "Management plane: out-of-band management (SSH, SNMP, APIs)",
      "SDN controller: centralized software that programs the data plane of many devices (e.g. Cisco APIC, OpenDaylight)",
      "Southbound API: communication from SDN controller to network devices (e.g. OpenFlow, NETCONF)",
      "Northbound API: communication from applications to the SDN controller (typically REST/JSON)",
      "OpenFlow: southbound protocol that programs flow tables in OpenFlow-enabled switches",
      "Infrastructure as Code (IaC): network config stored in version control (Git), deployed via pipelines",
      "Benefits of IaC: consistency, repeatability, rollback capability, peer review via pull requests",
      "Cisco SD-Access: Cisco's SDN solution for campus networks using DNA Center as the controller",
      "Overlay/Underlay: SDN often uses a physical underlay (IP routed network) carrying a virtual overlay (VXLAN tunnels)",
    ],
  },
];
