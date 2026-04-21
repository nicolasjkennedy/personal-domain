import type { Flashcard } from "@/src/types/ccna";

export const ccnaFlashcards: Flashcard[] = [
  // ── Network Fundamentals (nf) ─────────────────────────────────────────────

  {
    id: "nf-fc001",
    domainId: "net-fundamentals",
    topicId: "osi-tcpip-models",
    term: "OSI Layer 1 — Physical",
    definition:
      "Responsible for the transmission and reception of raw bit streams over a physical medium. Defines electrical, optical, and mechanical specifications for cables, connectors, and signal encoding. Devices operating at this layer include hubs, repeaters, and cables.",
    context:
      "At URI, Cat6 cable runs, fiber optic trunks, and SFP transceivers are all Layer 1 concerns. When a port shows 'no carrier,' the problem is always at Layer 1 first.",
  },
  {
    id: "nf-fc002",
    domainId: "net-fundamentals",
    topicId: "osi-tcpip-models",
    term: "OSI Layer 2 — Data Link",
    definition:
      "Responsible for node-to-node delivery using MAC addresses. Handles framing, error detection (CRC), and flow control. Ethernet operates at this layer. Switches and bridges make forwarding decisions here.",
    context:
      "At URI, when you plug a device into a switch port, the switch learns the MAC address in its CAM table. VLAN assignment also happens at Layer 2 — a port-security violation is a Layer 2 event.",
  },
  {
    id: "nf-fc003",
    domainId: "net-fundamentals",
    topicId: "osi-tcpip-models",
    term: "OSI Layer 3 — Network",
    definition:
      "Responsible for logical addressing (IP) and path determination (routing) between different networks. Routers operate here, making forwarding decisions based on routing tables. ICMP (ping) and ARP resolution to Layer 2 also involve this layer.",
    context:
      "A packet leaving one building at URI and arriving at another is forwarded by routers at Layer 3 using IP addresses. The routing table is a Layer 3 construct.",
  },
  {
    id: "nf-fc004",
    domainId: "net-fundamentals",
    topicId: "osi-tcpip-models",
    term: "OSI Layer 4 — Transport",
    definition:
      "Provides end-to-end communication between applications on different hosts. TCP provides reliable, ordered delivery with acknowledgments and flow control. UDP provides best-effort, connectionless delivery with no retransmission.",
    context:
      "Port numbers live at Layer 4. SSH (TCP 22), HTTP (TCP 80), DNS (UDP/TCP 53). When an ACL blocks port 443, it is blocking at the Layer 4 level.",
  },
  {
    id: "nf-fc005",
    domainId: "net-fundamentals",
    topicId: "osi-tcpip-models",
    term: "PDU Names by OSI Layer",
    definition:
      "Each OSI layer wraps data in a Protocol Data Unit with its own name. Layer 7-5: Data. Layer 4 (Transport): Segment (TCP) or Datagram (UDP). Layer 3 (Network): Packet. Layer 2 (Data Link): Frame. Layer 1 (Physical): Bits.",
    context:
      "Exam questions often ask which PDU is relevant to a given scenario. Switches process Frames; routers process Packets; firewalls can inspect up to Segments (stateful inspection).",
  },
  {
    id: "nf-fc006",
    domainId: "net-fundamentals",
    topicId: "osi-tcpip-models",
    term: "TCP vs UDP",
    definition:
      "TCP (Transmission Control Protocol) is connection-oriented and provides reliable delivery through a three-way handshake (SYN, SYN-ACK, ACK), sequencing, acknowledgments, and retransmission. UDP (User Datagram Protocol) is connectionless and provides low-latency delivery without guaranteed delivery or ordering — used for voice, video, DNS.",
    context:
      "Exam tip: choose TCP when asked about reliability or ordered delivery (FTP, HTTP, SSH). Choose UDP when asked about speed and latency tolerance (VoIP, streaming, DNS queries).",
  },
  {
    id: "nf-fc007",
    domainId: "net-fundamentals",
    topicId: "ipv4-addressing",
    term: "Private IP Address Ranges (RFC 1918)",
    definition:
      "Three address ranges are reserved for private use and are not routable on the Internet: 10.0.0.0/8 (Class A), 172.16.0.0/12 (172.16.x.x through 172.31.x.x), and 192.168.0.0/16. Devices using these addresses require NAT to communicate across the Internet.",
    context:
      "URI uses 10.x.x.x for internal addressing. 192.168.x.x is common in home networks. If you see a 172.16–172.31 address, it is private — sometimes overlooked as private because the range is less familiar.",
  },
  {
    id: "nf-fc008",
    domainId: "net-fundamentals",
    topicId: "ipv4-addressing",
    term: "APIPA — Automatic Private IP Addressing",
    definition:
      "When a host cannot contact a DHCP server, it self-assigns an address from the 169.254.0.0/16 range. APIPA addresses allow local communication only — they are not routable. The presence of a 169.254.x.x address on a device is a strong indicator that DHCP is failing.",
    context:
      "If a user reports 'no network access' and ipconfig shows 169.254.x.x, check that the VLAN SVI has ip helper-address configured and that the DHCP server is reachable.",
  },
  {
    id: "nf-fc009",
    domainId: "net-fundamentals",
    topicId: "subnetting",
    term: "Usable Hosts Formula",
    definition:
      "The number of usable host addresses in a subnet is 2^(32−prefix) − 2. The two addresses subtracted are the network address (all host bits = 0) and the broadcast address (all host bits = 1). Example: /24 subnet has 2^8 − 2 = 254 usable hosts.",
    context:
      "Memorize the key prefix sizes: /30 = 2, /29 = 6, /28 = 14, /27 = 30, /26 = 62, /25 = 126, /24 = 254. The /30 is the most common router-to-router link subnet.",
  },
  {
    id: "nf-fc010",
    domainId: "net-fundamentals",
    topicId: "subnetting",
    term: "Subnet Mask — /26",
    definition:
      "A /26 subnet mask is 255.255.255.192. There are 64 total addresses per subnet (2^6 = 64 host bits remaining), yielding 62 usable hosts. In a /24 block, a /26 creates exactly 4 equal subnets: .0, .64, .128, and .192.",
    context:
      "Exam tip: to quickly find subnet boundaries for a /26, add 64 to the previous network address. First subnet: .0–.63, second: .64–.127, third: .128–.191, fourth: .192–.255.",
  },
  {
    id: "nf-fc011",
    domainId: "net-fundamentals",
    topicId: "subnetting",
    term: "Wildcard Mask",
    definition:
      "A wildcard mask is the bitwise inverse of a subnet mask and is used in ACLs and OSPF network statements. A 0 bit means 'this bit must match,' and a 1 bit means 'any value.' For a /24 subnet (255.255.255.0), the wildcard mask is 0.0.0.255.",
    context:
      "Quick calculation: subtract the subnet mask from 255.255.255.255 to get the wildcard. /25 = 255.255.255.128 → wildcard = 0.0.0.127. The host wildcard 0.0.0.0 matches exactly one IP.",
  },
  {
    id: "nf-fc012",
    domainId: "net-fundamentals",
    topicId: "network-devices",
    term: "Collision Domain vs Broadcast Domain",
    definition:
      "A collision domain is a network segment where two devices can transmit simultaneously and cause a collision. Each switch port is its own collision domain. A broadcast domain is a group of devices that receive each other's broadcasts. Routers separate broadcast domains; switches do not (VLANs are the switch equivalent).",
    context:
      "Hub: one collision domain, one broadcast domain for all ports. Switch: one collision domain per port, one broadcast domain per VLAN. Router: one collision domain per interface, separates broadcast domains.",
  },
  {
    id: "nf-fc013",
    domainId: "net-fundamentals",
    topicId: "network-devices",
    term: "ARP — Address Resolution Protocol",
    definition:
      "ARP resolves an IPv4 address to a MAC address for delivery within the same Layer 2 network. A device broadcasts an ARP Request asking 'who has IP x.x.x.x?' and the owner of that IP responds with a unicast ARP Reply containing its MAC address. The result is cached in the ARP table.",
    context:
      "`show arp` on a Cisco router displays the ARP table. `show mac address-table` on a switch shows the MAC table. ARP spoofing is countered by Dynamic ARP Inspection on the switch.",
  },
  {
    id: "nf-fc014",
    domainId: "net-fundamentals",
    topicId: "ethernet-cabling",
    term: "Cat6a vs Cat6 — Key Difference",
    definition:
      "Cat6a (Category 6 Augmented) supports 10 Gbps at the full 100-meter channel length, whereas Cat6 is limited to 10 Gbps only up to 55 meters. Cat6a has more stringent crosstalk requirements and is typically thicker. Cat6 remains the most common drop cable for Gigabit Ethernet endpoints.",
    context:
      "When running cable for a new IDF-to-MDF horizontal run at URI that must support 10G uplinks, specify Cat6a. For standard access drops (workstations, APs) running at 1G, Cat6 is sufficient and easier to work with.",
  },
  {
    id: "nf-fc015",
    domainId: "net-fundamentals",
    topicId: "ethernet-cabling",
    term: "PoE Standards — Power Budgets",
    definition:
      "IEEE 802.3af (PoE): up to 15.4W per port. IEEE 802.3at (PoE+): up to 30W per port. IEEE 802.3bt (PoE++): up to 60W (Type 3) or 100W (Type 4) per port. The powered device (PD) negotiates with the switch PSE (Power Sourcing Equipment) to receive the required wattage.",
    context:
      "At URI, standard APs (802.3at) and IP phones (802.3af) are common powered devices. High-density or Wi-Fi 6 APs may require 802.3bt. Always verify your switch PoE budget before deploying a new floor of APs.",
  },
  {
    id: "nf-fc016",
    domainId: "net-fundamentals",
    topicId: "subnetting",
    term: "Binary Conversion — Octet Bit Values",
    definition:
      "Each octet in an IPv4 address is 8 bits. The positional values left-to-right are: 128, 64, 32, 16, 8, 4, 2, 1. To convert binary to decimal, sum the values of positions that are 1. To convert decimal to binary, work from the highest bit downward, subtracting each position value when it fits.",
    context:
      "Example: convert 192 to binary. 192 ≥ 128? Yes → 1, remainder 64. 64 ≥ 64? Yes → 1, remainder 0. All remaining bits are 0. Result: 11000000. Memorize that 192 = /26 boundary and 128 = /25.",
  },

  // ── Network Access (na) ───────────────────────────────────────────────────

  {
    id: "na-fc001",
    domainId: "net-access",
    topicId: "vlans",
    term: "VLAN — Purpose and Function",
    definition:
      "A VLAN (Virtual LAN) creates a logical Layer 2 broadcast domain that is independent of physical switch location. Devices in different VLANs cannot communicate directly — inter-VLAN routing requires a Layer 3 device. VLANs improve security through segmentation and reduce broadcast traffic.",
    context:
      "At URI, a student laptop in VLAN 30 cannot reach a faculty file server in VLAN 10 without passing through the distribution switch performing inter-VLAN routing — the ACLs there enforce what traffic is allowed between segments.",
  },
  {
    id: "na-fc002",
    domainId: "net-access",
    topicId: "vlans",
    term: "VLAN Configuration Commands",
    definition:
      "To create a VLAN and assign it to a port: `vlan <id>` and `name <name>` in global config creates the VLAN. `switchport mode access` and `switchport access vlan <id>` on the interface assigns the port. `show vlan brief` verifies assignments.",
    context:
      "Remember: creating a VLAN in the VLAN database and assigning it to a port are two separate steps. A port that is 'assigned' to a VLAN that does not exist in the VLAN database will not forward traffic in that VLAN.",
  },
  {
    id: "na-fc003",
    domainId: "net-access",
    topicId: "vlans",
    term: "SVI — Switched Virtual Interface",
    definition:
      "An SVI is a virtual Layer 3 interface associated with a VLAN, created with `interface vlan <id>`. It provides an IP address for the VLAN segment — used for management access to the switch and for inter-VLAN routing on multilayer switches.",
    context:
      "Every management VLAN on a URI switch has an SVI with a static IP address. When you configure ip helper-address for DHCP relay, it goes on the SVI of the client VLAN, not on a physical interface.",
  },
  {
    id: "na-fc004",
    domainId: "net-access",
    topicId: "trunk-ports",
    term: "802.1Q Tagging",
    definition:
      "IEEE 802.1Q inserts a 4-byte tag into the Ethernet frame between the Source MAC and EtherType fields. The tag contains: 2-byte TPID (0x8100 identifies a tagged frame), 3-bit PCP (priority), 1-bit DEI (drop eligible), and 12-bit VLAN ID (0–4094).",
    context:
      "The native VLAN is the one VLAN whose frames are sent untagged on a trunk. A native VLAN mismatch between two switch ends of a trunk causes connectivity issues for devices in the native VLAN and can introduce a double-tagging VLAN-hopping vulnerability.",
  },
  {
    id: "na-fc005",
    domainId: "net-access",
    topicId: "trunk-ports",
    term: "Trunk Port Configuration Commands",
    definition:
      "Configure a trunk: `switchport trunk encapsulation dot1q` (required on older IOS), `switchport mode trunk`. Restrict VLANs: `switchport trunk allowed vlan 10,20,30`. Verify: `show interfaces trunk` shows native VLAN, allowed VLANs, and VLANs in the spanning tree.",
    context:
      "At URI, after configuring a new uplink trunk, always run `show interfaces trunk` to confirm the port is actually in trunk mode, the native VLAN matches the distribution switch, and all required VLANs appear in the 'VLANs allowed and active in management domain' column.",
  },
  {
    id: "na-fc006",
    domainId: "net-access",
    topicId: "trunk-ports",
    term: "Inter-VLAN Routing — Router-on-a-Stick",
    definition:
      "Router-on-a-Stick uses a single physical router interface with multiple sub-interfaces, one per VLAN. Each sub-interface uses `encapsulation dot1q <vlan-id>` to tag/untag traffic and has an IP address serving as the default gateway for that VLAN. The switch port connected to the router is configured as a trunk.",
    context:
      "Exam syntax: `interface fa0/0.10` → `encapsulation dot1q 10` → `ip address 10.10.10.1 255.255.255.0`. The sub-interface number does not have to match the VLAN ID, but it is best practice to make them the same.",
  },
  {
    id: "na-fc007",
    domainId: "net-access",
    topicId: "spanning-tree",
    term: "STP Root Bridge Election",
    definition:
      "The root bridge is the switch with the lowest Bridge ID. The Bridge ID is an 8-byte value composed of a 2-byte priority (default 32768 + VLAN ID) and a 6-byte MAC address. The switch with the lowest priority wins; if equal, the switch with the lowest MAC address wins.",
    context:
      "To force a specific switch to be the root bridge, lower its priority: `spanning-tree vlan 1 priority 4096`. Use `spanning-tree vlan 1 root primary` as a shortcut — it automatically sets the priority lower than the current root.",
  },
  {
    id: "na-fc008",
    domainId: "net-access",
    topicId: "spanning-tree",
    term: "STP Port States (802.1D)",
    definition:
      "STP ports cycle through five states. Blocking: receives BPDUs but does not forward frames (20-second max age wait). Listening: receives and sends BPDUs (15-second forwarding delay). Learning: populates MAC table (15-second forwarding delay). Forwarding: passes data traffic. Disabled: administratively shut down.",
    context:
      "The total STP convergence time on 802.1D is 50 seconds (20s max age + 15s listening + 15s learning). RSTP reduces this to near-instant by using proposal/agreement handshakes. PortFast skips listening and learning for access ports, going directly to forwarding.",
  },
  {
    id: "na-fc009",
    domainId: "net-access",
    topicId: "spanning-tree",
    term: "RSTP Port Roles",
    definition:
      "RSTP (802.1w) defines four port roles. Root Port: the best port toward the root bridge (one per non-root switch). Designated Port: best port on each segment to reach the root (forwards traffic). Alternate Port: backup to the root port path (discarding state). Backup Port: redundant path on the same segment (discarding state).",
    context:
      "In RSTP, the Discarding state replaces both Blocking and Listening from 802.1D. RSTP converges in under 1 second on point-to-point links using a proposal/agreement mechanism instead of waiting for timers.",
  },
  {
    id: "na-fc010",
    domainId: "net-access",
    topicId: "spanning-tree",
    term: "PortFast & BPDU Guard",
    definition:
      "PortFast causes a switch port to skip STP listening and learning states and go directly to forwarding — appropriate only on access ports connected to end devices. BPDU Guard places a PortFast-enabled port into err-disabled state if it receives a BPDU, preventing rogue switches from being connected to access ports.",
    context:
      "At URI, PortFast is enabled globally with `spanning-tree portfast default` and BPDU Guard with `spanning-tree portfast bpduguard default`. This is standard practice — it prevents accidental loops from daisy-chained switches without affecting normal end-device connectivity.",
  },
  {
    id: "na-fc011",
    domainId: "net-access",
    topicId: "wireless-standards",
    term: "802.11 Standards Comparison Table",
    definition:
      "802.11b: 2.4 GHz, 11 Mbps. 802.11a: 5 GHz, 54 Mbps. 802.11g: 2.4 GHz, 54 Mbps. 802.11n (Wi-Fi 4): 2.4/5 GHz, up to 600 Mbps, MIMO. 802.11ac (Wi-Fi 5): 5 GHz only, up to 6.9 Gbps, MU-MIMO. 802.11ax (Wi-Fi 6): 2.4/5 GHz, up to 9.6 Gbps, OFDMA.",
    context:
      "Exam tip: 802.11a and 802.11ac both use 5 GHz only. 802.11b, g, and n use 2.4 GHz (n and ax also support 5 GHz). The 'n' in 802.11n stands for better range — it added MIMO. Wi-Fi 5 = ac, Wi-Fi 6 = ax.",
  },
  {
    id: "na-fc012",
    domainId: "net-access",
    topicId: "wireless-standards",
    term: "2.4 GHz Non-Overlapping Channels",
    definition:
      "In the 2.4 GHz band, only channels 1, 6, and 11 are non-overlapping in the US. Each channel is 22 MHz wide, and the band is only 83.5 MHz total. Using adjacent channels (e.g. 1 and 2) causes co-channel interference, degrading performance for all clients.",
    context:
      "When deploying multiple APs in adjacent rooms at URI, assign channels 1, 6, and 11 in a repeating pattern. Use 5 GHz whenever possible since it has far more non-overlapping channels and far less interference from neighboring networks.",
  },
  {
    id: "na-fc013",
    domainId: "net-access",
    topicId: "wireless-security",
    term: "WPA2 vs WPA3 — Key Differences",
    definition:
      "WPA2 uses a 4-way handshake with a Pre-Shared Key (PSK) to derive encryption keys — the handshake can be captured and attacked offline. WPA3 replaces PSK with SAE (Simultaneous Authentication of Equals), which is resistant to dictionary attacks and provides forward secrecy so that captured traffic cannot be decrypted even if the passphrase is later discovered.",
    context:
      "On the CCNA exam, remember that WPA3's key advantage is SAE replacing the 4-way handshake and providing forward secrecy. For enterprise networks, WPA2/WPA3-Enterprise with 802.1X provides per-user authentication.",
  },
  {
    id: "na-fc014",
    domainId: "net-access",
    topicId: "wireless-security",
    term: "802.1X — Port-Based NAC",
    definition:
      "802.1X is an IEEE standard for port-based Network Access Control. Three roles: supplicant (client requesting access), authenticator (the switch or AP that enforces access), and authentication server (typically a RADIUS server that validates credentials). The authenticator blocks all traffic from the supplicant until the RADIUS server grants access.",
    context:
      "URI's enterprise Wi-Fi uses 802.1X so each faculty and staff device authenticates with domain credentials. The RADIUS server checks Active Directory, and only then does the AP allow the device onto the network. This is far more secure than a shared PSK that everyone knows.",
  },
  {
    id: "na-fc015",
    domainId: "net-access",
    topicId: "wireless-security",
    term: "WEP — Why It Is Broken",
    definition:
      "WEP (Wired Equivalent Privacy) uses RC4 stream cipher with static 40-bit or 104-bit keys and a weak 24-bit Initialization Vector (IV). The IVs are reused frequently in busy networks, allowing an attacker to collect enough packets to mathematically recover the key in minutes with readily available tools.",
    context:
      "The CCNA exam tests that WEP is broken and must never be deployed. If you encounter WEP in the field, it is an urgent security finding requiring immediate upgrade to WPA2 or WPA3.",
  },
  {
    id: "na-fc016",
    domainId: "net-access",
    topicId: "wireless-standards",
    term: "CSMA/CA — Wireless Collision Avoidance",
    definition:
      "Unlike Ethernet's CSMA/CD (which detects collisions after they happen), Wi-Fi uses CSMA/CA (Carrier Sense Multiple Access with Collision Avoidance). Before transmitting, a device listens for activity (carrier sense). If the medium is busy, it waits a random backoff time before trying again. This prevents collisions rather than detecting them, because wireless devices cannot hear their own collisions.",
    context:
      "CSMA/CA is why wireless is inherently half-duplex — a device cannot transmit and listen at the same time for collisions. High client density (like a lecture hall) increases contention and reduces effective throughput for all clients.",
  },

  // ── IP Connectivity (ic) ─────────────────────────────────────────────────

  {
    id: "ic-fc001",
    domainId: "ip-connectivity",
    topicId: "static-routing",
    term: "Administrative Distance — All Values",
    definition:
      "AD is a measure of route trustworthiness. Lower is more preferred. Values: Directly Connected = 0, Static = 1, eBGP = 20, EIGRP (internal) = 90, OSPF = 110, IS-IS = 115, RIP = 120, EIGRP (external) = 170, iBGP = 200, Unknown/Unreachable = 255.",
    context:
      "Exam mnemonic: 'Connecting Stinks; Every Organization Is Really Eager In Building' = Connected(0) Static(1) EIGRP(90) OSPF(110) IS-IS(115) RIP(120) EIGRP-ext(170) iBGP(200). When both EIGRP and OSPF know a route, the router installs the EIGRP route (AD 90 < 110).",
  },
  {
    id: "ic-fc002",
    domainId: "ip-connectivity",
    topicId: "static-routing",
    term: "Default Route Configuration",
    definition:
      "A default route, also called the gateway of last resort, matches any destination that has no more-specific route in the routing table. Syntax: `ip route 0.0.0.0 0.0.0.0 <next-hop>`. It appears in the routing table as `S* 0.0.0.0/0` (S = static, * = candidate default).",
    context:
      "Every edge router or border device needs a default route pointing toward the ISP or upstream gateway. On stub networks at URI (e.g. a remote IDF with no local routing), a default static route is the only route needed besides directly connected networks.",
  },
  {
    id: "ic-fc003",
    domainId: "ip-connectivity",
    topicId: "ospf",
    term: "OSPF — Link State vs Distance Vector",
    definition:
      "OSPF is a link-state protocol: every router floods LSAs to build an identical copy of the Link State Database (LSDB). From the LSDB, each router independently runs Dijkstra's SPF algorithm to compute the shortest path tree. Distance-vector protocols (RIP) only know next-hop and distance, not the full topology.",
    context:
      "Because OSPF routers share full topology information, they react faster to failures and never suffer from count-to-infinity problems. The trade-off is higher memory usage (storing the LSDB) and more complex configuration than RIP.",
  },
  {
    id: "ic-fc004",
    domainId: "ip-connectivity",
    topicId: "ospf",
    term: "OSPF Cost Metric",
    definition:
      "OSPF metric is called cost, calculated as 10^8 / interface bandwidth (bps). A 100 Mbps interface has cost 1; a 10 Mbps interface has cost 10. The path with the lowest cumulative cost wins. The reference bandwidth can be changed with `auto-cost reference-bandwidth <Mbps>` to account for Gigabit and 10G links.",
    context:
      "Default reference bandwidth causes all interfaces at 100 Mbps or faster to have cost 1 — a 1 Gbps and a 100 Mbps link look the same to OSPF. In any production network, change the reference bandwidth to 100000 (100 Gbps) so costs scale correctly for modern link speeds.",
  },
  {
    id: "ic-fc005",
    domainId: "ip-connectivity",
    topicId: "ospf",
    term: "OSPF Neighbor States",
    definition:
      "OSPF routers form adjacencies through a sequence of states: Down (no hellos received), Init (hello received but my RID not in it), 2-Way (bidirectional communication, DR/BDR election on MA networks), ExStart (master/slave negotiation), Exchange (DBD exchange), Loading (LSR/LSU), Full (synchronized LSDB).",
    context:
      "If `show ip ospf neighbor` shows a neighbor stuck at 2-Way rather than Full, it often means the routers are DROther on a multiaccess segment and forming a full adjacency only with the DR/BDR. Stuck at ExStart/Exchange usually indicates an MTU mismatch.",
  },
  {
    id: "ic-fc006",
    domainId: "ip-connectivity",
    topicId: "ospf",
    term: "OSPF DR and BDR Election",
    definition:
      "On multi-access networks (Ethernet), OSPF elects a Designated Router (DR) and Backup DR (BDR) to reduce the number of adjacencies. The DR has the highest OSPF priority (default 1, range 0–255; priority 0 = never elected). Tie broken by highest Router ID. All other routers (DROther) form full adjacencies only with the DR and BDR.",
    context:
      "To force a specific router to be DR, set its interface priority: `ip ospf priority 255`. Priority 0 means the router never becomes DR or BDR. The election is non-preemptive — changing priority does not change the existing DR until it fails.",
  },
  {
    id: "ic-fc007",
    domainId: "ip-connectivity",
    topicId: "eigrp",
    term: "EIGRP Successor and Feasible Successor",
    definition:
      "The successor is the best path to a destination — it is installed in the routing table. A feasible successor is a backup path that meets the feasibility condition: its reported distance (RD) must be less than the current successor's feasible distance (FD). When the successor fails, the feasible successor is immediately promoted — no reconvergence needed.",
    context:
      "Exam tip: if there is no feasible successor when the successor fails, EIGRP enters Active state and sends QUERY messages to all neighbors to find an alternative path. This can cause a temporary outage known as SIA (Stuck in Active).",
  },
  {
    id: "ic-fc008",
    domainId: "ip-connectivity",
    topicId: "eigrp",
    term: "EIGRP Configuration",
    definition:
      "Basic EIGRP configuration: `router eigrp <AS>` → `network <network> <wildcard>` → `no auto-summary`. The AS number must match on all EIGRP peers. `no auto-summary` prevents classful summarization, which is essential in discontiguous network designs.",
    context:
      "EIGRP forms neighbor relationships over directly connected interfaces. `show ip eigrp neighbors` shows the neighbor table. If neighbors are not forming, verify the AS number matches, the `network` statement covers the interface IP, and there is no ACL blocking UDP port 88 (EIGRP).",
  },
  {
    id: "ic-fc009",
    domainId: "ip-connectivity",
    topicId: "nat-pat",
    term: "NAT Inside/Outside Terminology",
    definition:
      "Four NAT address types: Inside Local (private IP of inside host), Inside Global (public IP assigned to inside host by NAT), Outside Global (real public IP of destination), Outside Local (how the outside destination appears to inside hosts — usually same as Outside Global in basic NAT).",
    context:
      "When troubleshooting NAT, `show ip nat translations` displays all four address fields. If the Inside Global column is empty, the ACL or pool is not matching. If translations build but traffic fails, check that routing is correct on both inside and outside interfaces.",
  },
  {
    id: "ic-fc010",
    domainId: "ip-connectivity",
    topicId: "nat-pat",
    term: "PAT (Port Address Translation) Configuration",
    definition:
      "PAT (NAT overload) allows many inside hosts to share a single public IP by appending unique source port numbers. Configuration: `access-list 1 permit 10.0.0.0 0.0.0.255` (define inside hosts), `ip nat inside source list 1 interface Serial0/0 overload`, and mark interfaces with `ip nat inside` (LAN) and `ip nat outside` (WAN).",
    context:
      "The `overload` keyword is what makes it PAT rather than dynamic NAT. Without it, you would need one public IP per concurrent inside host. `clear ip nat translation *` clears all dynamic entries when troubleshooting.",
  },
  {
    id: "ic-fc011",
    domainId: "ip-connectivity",
    topicId: "bgp-summarization",
    term: "BGP — Autonomous System and AS Numbers",
    definition:
      "An Autonomous System is a collection of IP networks under common administrative control, identified by a 16-bit (or 32-bit) AS number. AS numbers 1–64511 are publicly assigned; 64512–65535 are private. BGP is the only EGP and is used to exchange routes between ASes across the Internet.",
    context:
      "For the CCNA exam, you do not need to configure full BGP, but you must understand the concept. URI has a registered AS number and public IP block that it advertises to its upstream ISPs via BGP. The concept of 'path selection using AS_PATH to prevent loops' is the key exam point.",
  },
  {
    id: "ic-fc012",
    domainId: "ip-connectivity",
    topicId: "bgp-summarization",
    term: "Route Summarization — Calculation",
    definition:
      "To summarize multiple routes into one: write out the network addresses in binary, find the common leading bits, and the number of common bits is the new prefix. Example: 10.0.0.0/24 through 10.0.3.0/24 — the first two octets are identical, the third octet (0, 1, 2, 3) shares the leading 6 bits (000000), giving a /22 summary: 10.0.0.0/22.",
    context:
      "Summarization reduces routing table entries and CPU overhead. The CCNA exam often presents a range of subnets and asks for the summary address and mask. Always verify that the summary does not inadvertently include prefixes outside the intended range.",
  },
  {
    id: "ic-fc013",
    domainId: "ip-connectivity",
    topicId: "static-routing",
    term: "Floating Static Route",
    definition:
      "A floating static route is a static route configured with a higher administrative distance than the primary dynamic routing protocol. When the primary route (learned via OSPF, for example) disappears, the floating static route becomes active. Example: `ip route 10.0.0.0 255.255.0.0 192.168.1.1 200` sets AD to 200, higher than OSPF's 110.",
    context:
      "Floating static routes are a simple way to implement dial-backup or secondary link failover without additional protocol configuration. The static route is invisible while the preferred dynamic route exists, then activates automatically when the dynamic route is withdrawn.",
  },
  {
    id: "ic-fc014",
    domainId: "ip-connectivity",
    topicId: "ospf",
    term: "OSPF Areas and the Backbone",
    definition:
      "OSPF uses a hierarchical two-level area structure. Area 0 is the backbone area and is mandatory. All other areas must connect to Area 0, either directly or via a virtual link. An ABR (Area Border Router) connects a non-backbone area to Area 0 and maintains separate LSDBs for each connected area.",
    context:
      "For the CCNA exam, the most important rule is: Area 0 must exist and all areas must connect to it. Single-area OSPF (all in Area 0) is the most common exam scenario. Multi-area OSPF reduces LSDB size and limits LSA flooding to within each area.",
  },
  {
    id: "ic-fc015",
    domainId: "ip-connectivity",
    topicId: "bgp-summarization",
    term: "Longest Prefix Match",
    definition:
      "When a router has multiple routes that match a destination IP, it always installs and uses the route with the longest (most specific) prefix. A /28 route is preferred over a /24 route for the same traffic, even if the /24 has a lower administrative distance. This is the fundamental rule of routing table lookups.",
    context:
      "Example: if the routing table has both 10.0.0.0/24 (OSPF) and 10.0.0.0/8 (static), traffic to 10.0.0.5 uses the /24 route because it is more specific. This is how summarization coexists with specific routes — summary handles the general case, specific routes handle exceptions.",
  },

  // ── IP Services (is) ─────────────────────────────────────────────────────

  {
    id: "is-fc001",
    domainId: "ip-services",
    topicId: "dhcp",
    term: "DHCP DORA Process",
    definition:
      "Four messages complete DHCP address assignment. Discover: client broadcasts (src 0.0.0.0, dst 255.255.255.255) to find servers. Offer: server responds with an available IP, lease time, gateway, and DNS. Request: client broadcasts acceptance of a specific offer. Acknowledge: server confirms the lease and all parameters.",
    context:
      "All four DORA messages are broadcasts except in some implementations where the Offer and ACK may be unicast. When multiple DHCP servers respond with Offers, the client takes the first one received and broadcasts its Request to inform all servers of the choice.",
  },
  {
    id: "is-fc002",
    domainId: "ip-services",
    topicId: "dhcp",
    term: "DHCP Configuration — Cisco IOS",
    definition:
      "Configure a DHCP pool: `ip dhcp excluded-address <start> <end>` (exclude static-assigned IPs first), `ip dhcp pool <NAME>`, `network <network> <mask>`, `default-router <gw>`, `dns-server <dns>`, `lease <days>`. Verify with `show ip dhcp binding` and `show ip dhcp pool`.",
    context:
      "Always configure ip dhcp excluded-address before the pool — this excludes router IPs, servers, and printers from the DHCP pool. A common mistake is excluding the range after the pool is created, at which point those IPs may already be leased.",
  },
  {
    id: "is-fc003",
    domainId: "ip-services",
    topicId: "dhcp-relay",
    term: "DHCP Relay — ip helper-address",
    definition:
      "When clients and the DHCP server are on different subnets, the router interface facing the client subnet must have `ip helper-address <server-ip>` configured. This forwards the client's broadcast DHCP Discover as a unicast to the server. The router sets the giaddr field so the server knows which subnet to assign from.",
    context:
      "At URI, every VLAN SVI on the distribution switches has an ip helper-address. If a new VLAN is created and users get 169.254.x.x addresses, the first check is whether ip helper-address exists on that VLAN's SVI and whether the DHCP server has a pool defined for that subnet.",
  },
  {
    id: "is-fc004",
    domainId: "ip-services",
    topicId: "dns",
    term: "DNS Resolution Process",
    definition:
      "Step 1: client checks local cache. Step 2: client checks the hosts file. Step 3: client queries recursive resolver (configured in DHCP or statically). Step 4: resolver contacts root server to find TLD server. Step 5: resolver contacts TLD server (.edu, .com) to find authoritative server. Step 6: resolver queries authoritative server for the final answer and caches it with the TTL.",
    context:
      "Understanding this chain is important for troubleshooting. If ping by hostname fails but ping by IP succeeds, DNS is the issue. Check that DNS servers are reachable (ping them) and that port 53 is not blocked by an ACL.",
  },
  {
    id: "is-fc005",
    domainId: "ip-services",
    topicId: "dns",
    term: "DNS Record Types",
    definition:
      "Common DNS record types: A (maps hostname to IPv4 address), AAAA (maps hostname to IPv6 address), CNAME (canonical name alias — maps one name to another), MX (mail exchanger — identifies email servers for a domain), PTR (reverse lookup — maps IP to hostname), NS (identifies authoritative name servers for a domain).",
    context:
      "For the CCNA exam, focus on A, AAAA, CNAME, MX, and PTR. If `nslookup hostname` returns a CNAME first, that is an alias pointing to the real A record. PTR records are essential for reverse DNS lookups used in logging and spam filtering.",
  },
  {
    id: "is-fc006",
    domainId: "ip-services",
    topicId: "ntp-snmp-syslog",
    term: "NTP Stratum Levels",
    definition:
      "NTP uses a stratum hierarchy to indicate distance from the reference clock. Stratum 0: atomic clock (GPS, cesium). Stratum 1: server directly attached to stratum 0. Stratum 2: synced to stratum 1. Each hop adds a stratum level. Stratum 16 means unsynchronized. A lower stratum is more accurate.",
    context:
      "URI's campus NTP servers are stratum 2 or 3. Network devices that sync to them are stratum 3 or 4. The stratum level doesn't affect exam questions much — the key command is `ntp server <ip>` and the verification is `show ntp status` checking that the clock is 'synchronized.'",
  },
  {
    id: "is-fc007",
    domainId: "ip-services",
    topicId: "ntp-snmp-syslog",
    term: "Syslog Severity Levels",
    definition:
      "Syslog has 8 severity levels (0–7). 0 Emergency, 1 Alert, 2 Critical, 3 Error, 4 Warning, 5 Notice, 6 Informational, 7 Debug. On Cisco devices, `logging buffered 4` captures Warning (4) and more severe messages. The lower the number, the more severe. Debug (7) is the most verbose and should not be left enabled in production.",
    context:
      "Mnemonic: 'Every Awesome Cisco Engineer Will Need Debug' = Emergency, Alert, Critical, Error, Warning, Notice, Informational, Debug. On production devices, logging level 4 (Warning) or lower is typical to avoid filling the buffer with noise.",
  },
  {
    id: "is-fc008",
    domainId: "ip-services",
    topicId: "ntp-snmp-syslog",
    term: "SNMP Versions — v2c vs v3",
    definition:
      "SNMPv2c uses community strings (shared passwords) transmitted in cleartext — the community string is easily intercepted by a packet capture. SNMPv3 adds three security levels: noAuthNoPriv (no security), authNoPriv (authentication only, no encryption), authPriv (authentication + encryption with AES or 3DES). Use SNMPv3 authPriv in production.",
    context:
      "On the CCNA exam, the key point is that SNMPv3 is the only version with authentication and encryption. SNMPv1 and v2c use community strings in cleartext. If a question asks which is most secure, the answer is always SNMPv3.",
  },
  {
    id: "is-fc009",
    domainId: "ip-services",
    topicId: "ipv6-basics",
    term: "IPv6 Address Types",
    definition:
      "Global Unicast (2000::/3): globally routable, equivalent to IPv4 public addresses. Link-Local (fe80::/10): auto-configured, not routable beyond the local link, required for neighbor discovery. Unique Local (fc00::/7): private, similar to RFC 1918. Multicast (ff00::/8): replaces broadcast. Anycast: one address, multiple devices — routed to nearest.",
    context:
      "Link-local addresses are automatically assigned to every IPv6-enabled interface, even without global unicast configuration. They are required for NDP (Neighbor Discovery Protocol) to function. You will always see fe80:: addresses when you run `show ipv6 interface brief`.",
  },
  {
    id: "is-fc010",
    domainId: "ip-services",
    topicId: "ipv6-basics",
    term: "IPv6 Address Abbreviation Rules",
    definition:
      "Rule 1: strip leading zeros in each 16-bit group. Rule 2: replace one or more consecutive all-zero groups with `::` (can only use `::` once per address). Example: 2001:0db8:0000:0000:0000:0000:0000:0001 → 2001:db8::1.",
    context:
      "Exam questions often present a full IPv6 address and ask for the abbreviated form, or give an abbreviated form and ask which IP it represents. The key trap is using `::` twice in one address — that is invalid and undefined.",
  },
  {
    id: "is-fc011",
    domainId: "ip-services",
    topicId: "ipv6-basics",
    term: "SLAAC and EUI-64",
    definition:
      "SLAAC (Stateless Address Autoconfiguration) allows a host to configure its own IPv6 global unicast address. The host uses the /64 prefix from the Router Advertisement and creates the Interface ID using EUI-64: take the 48-bit MAC, split it in the middle, insert FF:FE, and flip bit 7 (the universal/local bit) of the first byte.",
    context:
      "EUI-64 example: MAC 00:1A:2B:3C:4D:5E → 021A:2BFF:FE3C:4D5E (split after 3 bytes, insert FFFE, flip bit 7 of 00 → 02). SLAAC requires the prefix from the router's RA message, which is why `ipv6 unicast-routing` must be enabled on the router.",
  },
  {
    id: "is-fc012",
    domainId: "ip-services",
    topicId: "dhcp",
    term: "DHCP Lease Renewal Process",
    definition:
      "At 50% of the lease time, the client sends a unicast DHCPREQUEST to the original server to renew. If no response, at 87.5% of the lease the client broadcasts a DHCPREQUEST to any server. If the lease expires with no renewal, the client must start the full DORA process again and loses its IP address.",
    context:
      "Understanding lease renewal timing helps troubleshoot intermittent connectivity issues. If users report losing connectivity for a brief period and regaining it, check DHCP lease duration and server availability. Very short lease times increase DHCP traffic; very long leases waste addresses.",
  },
  {
    id: "is-fc013",
    domainId: "ip-services",
    topicId: "ntp-snmp-syslog",
    term: "NTP Configuration — Cisco IOS",
    definition:
      "Configure NTP client: `ntp server <ip>`. Configure a device as NTP master (for lab use): `ntp master <stratum>`. Verify: `show ntp status` shows synchronized/unsynchronized and stratum level. `show ntp associations` shows configured NTP peers and their status.",
    context:
      "If device clocks drift, log timestamps become unreliable — making it nearly impossible to correlate events across devices during an incident. At URI, all devices sync to the campus NTP servers. Confirming NTP sync is part of the new-device build checklist.",
  },
  {
    id: "is-fc014",
    domainId: "ip-services",
    topicId: "ipv6-basics",
    term: "NDP — Neighbor Discovery Protocol",
    definition:
      "NDP is the IPv6 replacement for ARP. It uses ICMPv6 messages: Neighbor Solicitation (NS) to find a MAC for a known IPv6 address, Neighbor Advertisement (NA) to respond. Router Solicitation (RS) asks for a Router Advertisement (RA), which provides the /64 prefix for SLAAC. All NDP uses multicast rather than broadcast.",
    context:
      "Because NDP uses multicast, it is more efficient than IPv4's broadcast-based ARP. `show ipv6 neighbors` on a Cisco device is the IPv6 equivalent of `show arp`. NDP neighbor cache poisoning is addressed by Secure Neighbor Discovery (SEND) — analogous to DHCP snooping and DAI for IPv4.",
  },
  {
    id: "is-fc015",
    domainId: "ip-services",
    topicId: "dhcp-relay",
    term: "ip helper-address — What It Forwards",
    definition:
      "By default, `ip helper-address` forwards eight UDP broadcast types in addition to DHCP: TFTP (69), DNS (53), NTP (123), NetBIOS Name Service (137), NetBIOS Datagram Service (138), Time protocol (37), TACACS (49), and DHCP (67/68). This makes it a general-purpose UDP broadcast relay, not only a DHCP relay.",
    context:
      "This broad forwarding behavior is a security consideration. In environments where you only want DHCP relay and not the other services, you can use an explicit `ip forward-protocol udp <port>` to enable only the protocols you need, and `no ip forward-protocol udp 69` to disable others.",
  },

  // ── Security Fundamentals (sf) ────────────────────────────────────────────

  {
    id: "sf-fc001",
    domainId: "security",
    topicId: "acls",
    term: "Standard ACL — Syntax and Placement",
    definition:
      "Standard ACLs (numbers 1–99) match only on source IP address. Syntax: `access-list <1-99> {permit|deny} <source> <wildcard>`. The host keyword is shorthand for a /32 (0.0.0.0 wildcard). The any keyword matches all addresses. Standard ACLs should be placed as close to the destination as possible to avoid blocking traffic too broadly.",
    context:
      "Standard ACL to permit the 10.1.1.0/24 network: `access-list 10 permit 10.1.1.0 0.0.0.255`. Applied to an interface: `ip access-group 10 in`. Applied to VTY lines for SSH management control: `ip access-class 10 in`.",
  },
  {
    id: "sf-fc002",
    domainId: "security",
    topicId: "acls",
    term: "Extended ACL — Syntax and Placement",
    definition:
      "Extended ACLs (numbers 100–199) match source IP, destination IP, protocol (tcp, udp, ip, icmp), and optionally source and destination ports. Syntax: `access-list <100-199> {permit|deny} <protocol> <src> <src-wild> <dst> <dst-wild> [eq <port>]`. Extended ACLs should be placed as close to the source to stop unwanted traffic early.",
    context:
      "Example: `access-list 110 permit tcp 10.0.0.0 0.0.0.255 any eq 443` — permits HTTPS from the 10.0.0.0/24 subnet to any destination. `eq` matches a specific port; `lt` = less than, `gt` = greater than, `range` = a range of ports.",
  },
  {
    id: "sf-fc003",
    domainId: "security",
    topicId: "acls",
    term: "Implicit Deny and ACL Counters",
    definition:
      "Every ACL ends with an implicit `deny any` (or `deny any any` for extended ACLs) that matches all traffic not explicitly permitted. This rule is not visible in `show access-lists` but it does count dropped packets. The `show access-lists` command also shows a hit count for each explicit entry, indicating how many packets matched.",
    context:
      "The implicit deny means: if you add an ACL to an interface without a permit statement for your own management traffic, you will lock yourself out immediately. Always add a `permit` for management subnets before applying a new ACL to a production interface.",
  },
  {
    id: "sf-fc004",
    domainId: "security",
    topicId: "acls",
    term: "Named ACLs — Advantages",
    definition:
      "Named ACLs use descriptive names instead of numbers and allow individual entries to be deleted and added by sequence number without deleting the entire ACL. Created with `ip access-list standard <NAME>` or `ip access-list extended <NAME>`. Entries are added with sequence numbers (10, 20, 30...) and can be inserted between existing entries.",
    context:
      "Production networks almost exclusively use named ACLs because editing a numbered ACL requires deleting and reapplying the entire list. With a named ACL, `no 20` deletes just that entry, and `15 permit tcp ...` inserts a new entry between entries 10 and 20.",
  },
  {
    id: "sf-fc005",
    domainId: "security",
    topicId: "ssh-device-security",
    term: "SSH Configuration — Required Steps",
    definition:
      "Six steps to configure SSH on Cisco IOS: (1) `hostname <name>`, (2) `ip domain-name <domain>`, (3) `crypto key generate rsa modulus 2048`, (4) `ip ssh version 2`, (5) `username <name> privilege 15 secret <password>`, (6) `line vty 0 4` → `transport input ssh` → `login local`.",
    context:
      "Steps 1 and 2 are required because the RSA key is generated from the combination of hostname and domain name. If you change either after generating the key, you must regenerate with `crypto key generate rsa` (or `crypto key zeroize rsa` first). A minimum of 1024-bit key is needed for SSHv2.",
  },
  {
    id: "sf-fc006",
    domainId: "security",
    topicId: "ssh-device-security",
    term: "Enable Secret vs Enable Password",
    definition:
      "`enable secret <password>` stores the password as an MD5 hash in the configuration and is always preferred. `enable password <password>` stores the password in cleartext (or weak Type 7 encryption with `service password-encryption`). If both are configured, `enable secret` takes precedence. Never use `enable password` alone on a production device.",
    context:
      "During a new switch build at URI, configure `enable secret` first. Run `service password-encryption` to also obscure VTY and console line passwords. Note that Type 7 encryption is reversible — it is obfuscation, not real security. `enable secret` uses MD5 which is a one-way hash.",
  },
  {
    id: "sf-fc007",
    domainId: "security",
    topicId: "port-security",
    term: "Port Security Violation Modes",
    definition:
      "Three violation modes define what happens when an unauthorized MAC is detected. Shutdown (default): err-disables the port, sends Syslog and SNMP trap — most secure. Restrict: drops frames from unauthorized MACs, increments violation counter, logs the event. Protect: silently drops frames, no counter, no log — least visible.",
    context:
      "In most deployments at URI, shutdown is used because it generates an immediate alert and requires deliberate admin intervention to restore the port. Restrict is useful when you want visibility without outright disabling the port (e.g., a high-traffic AP port).",
  },
  {
    id: "sf-fc008",
    domainId: "security",
    topicId: "port-security",
    term: "Sticky MAC Addresses",
    definition:
      "Sticky MAC addresses are dynamically learned MAC addresses that are written to the running configuration and treated as statically configured. Configure with `switchport port-security mac-address sticky`. The learned addresses persist across power cycles only if the running config is saved. This combines ease-of-deployment with persistent security.",
    context:
      "Using sticky MACs on access ports means you do not have to pre-configure each device's MAC manually. The first device to connect has its MAC 'locked in.' Save the config with `write memory` after the device connects, or the sticky address is lost on reboot.",
  },
  {
    id: "sf-fc009",
    domainId: "security",
    topicId: "dhcp-snooping-dai",
    term: "DHCP Snooping — Trusted vs Untrusted Ports",
    definition:
      "DHCP snooping classifies ports as trusted or untrusted. Trusted ports (uplinks to other switches, DHCP server ports) can receive all DHCP messages. Untrusted ports (client-facing access ports) drop DHCP server messages (OFFER, ACK) — preventing rogue DHCP servers from distributing false IP configurations.",
    context:
      "Enable globally: `ip dhcp snooping`. Enable per VLAN: `ip dhcp snooping vlan 10`. Mark uplinks as trusted: `ip dhcp snooping trust` on the uplink interface. Forget to trust the uplink and your switch will drop all DHCP offers from the legitimate server — causing all clients to lose DHCP.",
  },
  {
    id: "sf-fc010",
    domainId: "security",
    topicId: "dhcp-snooping-dai",
    term: "Dynamic ARP Inspection (DAI)",
    definition:
      "DAI validates ARP packets on untrusted switch ports against the DHCP snooping binding table. If a device sends an ARP claiming to be 10.0.0.1 but the binding table maps 10.0.0.1 to a different MAC, DAI drops the packet. This prevents ARP poisoning attacks that redirect traffic through an attacker's device.",
    context:
      "Enable DAI: `ip arp inspection vlan 10`. Mark uplinks as trusted: `ip arp inspection trust`. DAI depends on the DHCP snooping binding table, so DHCP snooping must be configured first. Devices with static IPs (no DHCP entry in the binding table) require static ARP ACL entries.",
  },
  {
    id: "sf-fc011",
    domainId: "security",
    topicId: "vtp",
    term: "VTP — Risk and Best Practice",
    definition:
      "VTP propagates VLAN database changes across switches with matching domain names. The switch with the highest VTP revision number wins — even if it is a new switch being added to the network. A factory-reset switch with a high revision number can instantly delete all VLANs on every VTP client in the domain.",
    context:
      "Best practice: configure all switches with `vtp mode off` or `vtp mode transparent`. This is URI's approach — VLANs are managed locally (or via automation scripts). Before connecting a used switch, set its VTP mode to transparent and reset the revision number by changing the VTP domain name temporarily.",
  },
  {
    id: "sf-fc012",
    domainId: "security",
    topicId: "acls",
    term: "ACL — Inbound vs Outbound Direction",
    definition:
      "An ACL applied `in` filters traffic as it enters the router interface (before the routing table lookup). An ACL applied `out` filters traffic as it exits the interface (after routing). Inbound ACLs are generally more efficient since they drop traffic before routing table processing. `ip access-group <ACL> in|out` applies the ACL to an interface.",
    context:
      "Exam scenario: to block external Internet traffic from reaching an internal server, apply an inbound ACL on the external-facing (WAN) interface. To control what specific internal hosts can reach the Internet, apply an outbound ACL on the WAN interface or an inbound ACL on the internal LAN interface.",
  },
  {
    id: "sf-fc013",
    domainId: "security",
    topicId: "ssh-device-security",
    term: "AAA — Authentication, Authorization, Accounting",
    definition:
      "AAA is a security framework. Authentication verifies identity (who are you?). Authorization determines what the authenticated user is allowed to do. Accounting logs what the user did and for how long. TACACS+ (Cisco proprietary, TCP 49) and RADIUS (standard, UDP 1812/1813) are the two protocols used to implement AAA with external servers.",
    context:
      "For the CCNA exam, understand the difference: TACACS+ encrypts the entire packet, separates authentication and authorization (more flexible). RADIUS encrypts only the password, combines authentication and authorization. RADIUS is the standard for 802.1X wireless authentication.",
  },
  {
    id: "sf-fc014",
    domainId: "security",
    topicId: "vtp",
    term: "VTP Modes Summary",
    definition:
      "Server mode: creates, modifies, deletes VLANs; sends and receives VTP advertisements; stores VLANs in NVRAM. Client mode: receives VTP ads and applies them; cannot create/modify/delete VLANs; stores in NVRAM on newer IOS. Transparent mode: does not participate in VTP; forwards ads; manages its own VLANs locally. Off mode: no VTP at all.",
    context:
      "Default mode is Server. A network with all switches in Server mode is risky because any switch can delete all VLANs. Switching to Transparent removes this risk while still allowing manual VLAN management per switch. The Off mode is the cleanest security choice if VTP automation is not needed.",
  },
  {
    id: "sf-fc015",
    domainId: "security",
    topicId: "dhcp-snooping-dai",
    term: "ARP Spoofing Attack",
    definition:
      "In an ARP spoofing attack (also called ARP poisoning), an attacker sends fake ARP Reply messages claiming that their MAC address is associated with a victim's IP address. Other devices update their ARP cache with the false mapping, causing traffic destined for the victim to flow through the attacker instead — enabling man-in-the-middle interception.",
    context:
      "Dynamic ARP Inspection on the switch blocks ARP packets that do not match the DHCP snooping binding table, preventing this attack at the network layer. Tools like Wireshark can detect ARP spoofing by identifying duplicate ARP replies for the same IP with different MAC addresses.",
  },

  // ── Automation & Programmability (ap) ─────────────────────────────────────

  {
    id: "ap-fc001",
    domainId: "automation",
    topicId: "rest-apis",
    term: "REST API HTTP Verbs (CRUD Mapping)",
    definition:
      "REST operations map to HTTP verbs: GET = Read (retrieve resource, no body, safe and idempotent). POST = Create (submit data, creates new resource, not idempotent). PUT = Update/Replace (replace entire resource, idempotent). PATCH = Partial Update (modify specific fields). DELETE = Remove (delete resource, idempotent).",
    context:
      "In network automation: GET /api/v1/devices retrieves all devices. POST /api/v1/devices with a JSON body creates a new device record. DELETE /api/v1/devices/12 removes device 12. PUT and PATCH are used for modifying device configurations.",
  },
  {
    id: "ap-fc002",
    domainId: "automation",
    topicId: "rest-apis",
    term: "HTTP Status Codes",
    definition:
      "2xx: Success — 200 OK (request succeeded), 201 Created (resource created by POST). 4xx: Client error — 400 Bad Request (malformed request), 401 Unauthorized (missing/invalid credentials), 403 Forbidden (authenticated but not permitted), 404 Not Found. 5xx: Server error — 500 Internal Server Error.",
    context:
      "When scripting API calls, always check the HTTP status code before processing the response body. A 401 means re-authenticate; a 404 means the resource ID is wrong; a 500 means the server has a problem. Catching these codes prevents scripts from silently failing with empty or error responses.",
  },
  {
    id: "ap-fc003",
    domainId: "automation",
    topicId: "data-formats",
    term: "JSON Structure",
    definition:
      "JSON (JavaScript Object Notation) is a text-based data format using key-value pairs. Objects are enclosed in `{}`, arrays in `[]`. Keys must be strings in double quotes. Values can be strings (double-quoted), numbers, booleans (true/false), null, objects, or arrays. JSON is case-sensitive and does not support comments.",
    context:
      "Network automation example: `{\"hostname\": \"sw01\", \"ip\": \"10.1.1.1\", \"vlans\": [10, 20, 30]}`. When a REST API returns JSON, Python's `json.loads()` converts it to a dictionary for processing. The CCNA exam may show a JSON snippet and ask you to identify a value.",
  },
  {
    id: "ap-fc004",
    domainId: "automation",
    topicId: "data-formats",
    term: "YAML Structure",
    definition:
      "YAML (YAML Ain't Markup Language) is a human-readable format commonly used for Ansible playbooks. Uses indentation (spaces, not tabs) for hierarchy. Key-value pairs: `key: value`. Lists: items preceded by `- `. The `---` line starts a YAML document. Strings generally do not require quotes unless they contain special characters.",
    context:
      "An Ansible play for Cisco IOS in YAML: `- hosts: switches` / `  tasks:` / `    - name: Set NTP` / `      cisco.ios.ios_config:` / `        lines:` / `          - ntp server 10.0.0.1`. Incorrect indentation is the most common YAML error — always use spaces, never tabs.",
  },
  {
    id: "ap-fc005",
    domainId: "automation",
    topicId: "data-formats",
    term: "XML vs JSON — NETCONF vs REST",
    definition:
      "XML (eXtensible Markup Language) uses opening and closing tags: `<hostname>Router1</hostname>`. It is more verbose than JSON but supports attributes, namespaces, and schemas. NETCONF uses XML over SSH for network device configuration. REST APIs predominantly use JSON. YANG defines the data model structure for both NETCONF (XML) and RESTCONF (JSON or XML).",
    context:
      "For the CCNA exam: REST APIs use JSON, NETCONF uses XML, Ansible playbooks use YAML. If a question asks about a model-driven configuration protocol using XML, the answer is NETCONF. If the question mentions REST, expect JSON.",
  },
  {
    id: "ap-fc006",
    domainId: "automation",
    topicId: "cisco-apis",
    term: "Cisco DNA Center — Role and Function",
    definition:
      "Cisco DNA Center is an intent-based networking controller for campus networks. It provides: network discovery and inventory, configuration management via templates, network assurance (AI-driven issue detection), policy automation (Cisco SD-Access), and a northbound REST API for integration with other systems.",
    context:
      "At URI, DNA Center provides a single-pane-of-glass view of the campus network — device health, client connectivity, and network topology. The REST API allows scripts to query device inventory and health status without logging into individual devices. The exam expects you to know DNA Center's role but not deep CLI configuration.",
  },
  {
    id: "ap-fc007",
    domainId: "automation",
    topicId: "cisco-apis",
    term: "Meraki Dashboard API",
    definition:
      "The Cisco Meraki Dashboard API is a cloud-based REST API that manages Meraki network devices without on-premises infrastructure. Authentication uses an API key in the `X-Cisco-Meraki-API-Key` header. All requests go to the Meraki cloud (api.meraki.com), not directly to devices. Meraki handles configuration pushes to physical devices.",
    context:
      "Meraki's API enables retrieving organization-wide device inventory, clients, network topology, and pushing policy changes via HTTP. For the exam, understand that Meraki is cloud-managed (no on-prem controller) while DNA Center is an on-premises controller.",
  },
  {
    id: "ap-fc008",
    domainId: "automation",
    topicId: "ansible-automation",
    term: "Ansible Playbook Structure",
    definition:
      "An Ansible playbook is a YAML file containing one or more plays. Each play has: `hosts` (target devices), `gather_facts`, optional `vars`, and `tasks` (list of module calls). Each task has a `name` (description) and a module with its parameters. Playbooks run top-to-bottom, task by task, against all hosts in parallel.",
    context:
      "For Cisco IOS: the `cisco.ios.ios_config` module pushes configuration lines. `cisco.ios.ios_command` runs show commands and registers the output. The inventory file (often hosts.ini) defines device hostnames, IPs, and credentials. Ansible uses SSH to connect — no agent installation needed on the IOS device.",
  },
  {
    id: "ap-fc009",
    domainId: "automation",
    topicId: "ansible-automation",
    term: "Idempotency in Ansible",
    definition:
      "An idempotent operation produces the same result whether executed once or multiple times. Ansible modules are designed to be idempotent — if the desired configuration already exists on the device, the module does not make changes (reported as 'ok' rather than 'changed'). This makes playbooks safe to run repeatedly.",
    context:
      "Idempotency is why you can run an Ansible playbook in a CI/CD pipeline on every code change without fear of duplicating configuration. The ios_config module checks if lines already exist before pushing them. Running `ios_config` with `ntp server 10.0.0.1` twice does not add the line twice.",
  },
  {
    id: "ap-fc010",
    domainId: "automation",
    topicId: "sdn",
    term: "Control Plane vs Data Plane",
    definition:
      "The control plane makes forwarding decisions — it runs routing protocols (OSPF, BGP), builds the routing table, and runs STP. The data plane (forwarding plane) actually moves packets and frames using ASICs, referencing the tables built by the control plane. In SDN, the control plane is separated from devices and centralized in a software controller.",
    context:
      "In traditional networking, both planes run on the same device. In Cisco SD-Access, the DNA Center controller is the centralized control plane while the switches only handle data plane forwarding. This separation enables network-wide policy changes from a single controller rather than per-device configuration.",
  },
  {
    id: "ap-fc011",
    domainId: "automation",
    topicId: "sdn",
    term: "Northbound and Southbound APIs",
    definition:
      "In SDN architecture: Southbound APIs are between the SDN controller and the network devices (e.g. OpenFlow, NETCONF, RESTCONF — the controller programs the data plane). Northbound APIs are between the SDN controller and applications/orchestration systems (typically REST/JSON — applications request network services).",
    context:
      "DNA Center's northbound API is what a Python script or Ansible playbook calls to request network changes. The southbound interface (NETCONF or RESTCONF) is how DNA Center communicates those changes to the actual Cisco switches and routers. The exam uses the term 'northbound' for the management-facing API.",
  },
  {
    id: "ap-fc012",
    domainId: "automation",
    topicId: "sdn",
    term: "Infrastructure as Code (IaC)",
    definition:
      "Infrastructure as Code treats network and system configuration as software — stored in version control (Git), reviewed via pull requests, and deployed through automated pipelines (CI/CD). Changes are documented, reversible, and reproducible. Tools include Ansible, Terraform, Nornir, and Python with Netmiko/NAPALM.",
    context:
      "If URI's network team stored all switch configurations as Ansible playbooks in a Git repository, any configuration change goes through a pull request review before being applied. This provides an audit trail, peer review, and the ability to roll back to a known-good state — the same software engineering practices applied to infrastructure.",
  },
  {
    id: "ap-fc013",
    domainId: "automation",
    topicId: "rest-apis",
    term: "REST API Authentication — Tokens",
    definition:
      "Most network management APIs use token-based authentication. The client sends credentials (username/password) in a POST to an authentication endpoint and receives an access token. The token is then included in subsequent requests (typically in the Authorization: Bearer <token> header). Tokens have expiration times and must be refreshed.",
    context:
      "Cisco DNA Center authentication: POST to `/dna/system/api/v1/auth/token` with Basic Auth credentials. The response includes a `Token` field. Subsequent GET/POST calls include `X-Auth-Token: <token>`. If a script returns 401 errors after working, the token has likely expired and needs to be refreshed.",
  },
  {
    id: "ap-fc014",
    domainId: "automation",
    topicId: "cisco-apis",
    term: "NETCONF and YANG",
    definition:
      "NETCONF (Network Configuration Protocol) uses SSH (port 830) and XML-encoded messages to configure and retrieve state from network devices. YANG (Yet Another Next Generation) is a data modeling language that defines the structure and constraints of configuration data. A YANG model specifies what data can be sent/received via NETCONF.",
    context:
      "NETCONF is model-driven — the YANG model tells you exactly what configuration elements exist and their valid values, unlike CLI configuration which requires reading documentation. For the CCNA, know that NETCONF uses XML over SSH port 830 and that YANG defines the data structure.",
  },
  {
    id: "ap-fc015",
    domainId: "automation",
    topicId: "sdn",
    term: "Cisco SD-Access",
    definition:
      "Cisco SD-Access is Cisco's software-defined campus networking solution built on DNA Center. It uses a fabric architecture with VXLAN for the data plane overlay, LISP for the control plane (endpoint location and identity), and IS-IS for the underlay routing. The result is user/device identity-based policy that follows the user regardless of physical location.",
    context:
      "In SD-Access, policies are defined in DNA Center based on user groups and assigned scalable group tags (SGTs). When a user connects to any access switch in the fabric, their SGT is applied automatically and enforces consistent policy everywhere. This eliminates the need for port-by-port VLAN and ACL configuration.",
  },
];
