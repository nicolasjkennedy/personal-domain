import type { Question } from "@/src/types/ccna";

export const ccnaQuestions: Question[] = [
  // ── Network Fundamentals (nf-q) ───────────────────────────────────────────

  {
    id: "nf-q001",
    domainId: "net-fundamentals",
    topicId: "subnetting",
    type: "multiple-choice",
    question: "How many usable host addresses are available in a /28 subnet?",
    options: ["A. 14", "B. 16", "C. 30", "D. 32"],
    correct: 0,
    explanation:
      "A /28 subnet has 4 host bits (32 − 28 = 4), giving 2^4 = 16 total addresses. Two are reserved: the network address (all host bits = 0) and the broadcast address (all host bits = 1), leaving 14 usable host addresses. Option B (16) counts all addresses including the two reserved ones. Options C (30) and D (32) correspond to /27 and /26 subnets respectively.",
  },
  {
    id: "nf-q002",
    domainId: "net-fundamentals",
    topicId: "osi-tcpip-models",
    type: "multiple-choice",
    question:
      "A network engineer captures a Wireshark trace and sees a PDU with source and destination MAC addresses but no IP header. At which OSI layer is this PDU operating?",
    options: [
      "A. Layer 1 — Physical",
      "B. Layer 2 — Data Link",
      "C. Layer 3 — Network",
      "D. Layer 4 — Transport",
    ],
    correct: 1,
    explanation:
      "A PDU with MAC addresses but no IP header is a Layer 2 frame. The Data Link layer uses MAC addresses for node-to-node delivery within a local network segment. Layer 1 deals with raw bit streams and has no addressing. Layer 3 uses IP addresses in packets. Layer 4 uses port numbers in segments.",
  },
  {
    id: "nf-q003",
    domainId: "net-fundamentals",
    topicId: "ipv4-addressing",
    type: "multiple-choice",
    question:
      "A host receives the IP address 169.254.45.10/16. What is the most likely cause?",
    options: [
      "A. The host has a statically assigned APIPA address",
      "B. The host could not contact a DHCP server and self-assigned an address",
      "C. The DHCP server assigned this address from the management pool",
      "D. The host is using a link-local IPv6 address mapped to IPv4",
    ],
    correct: 1,
    explanation:
      "The 169.254.0.0/16 range is the APIPA (Automatic Private IP Addressing) range. When a DHCP client cannot reach a DHCP server after multiple attempts, it self-assigns an address from this range to allow local communication. APIPA addresses are not routable. Options A, C, and D are incorrect because APIPA is automatically assigned by the OS — not statically by an administrator, not by a DHCP server, and not related to IPv6.",
  },
  {
    id: "nf-q004",
    domainId: "net-fundamentals",
    topicId: "subnetting",
    type: "multiple-choice",
    question:
      "You are given the network 192.168.10.0/24 and need to create subnets that each support at least 50 hosts. Which subnet mask should you use?",
    options: [
      "A. /26 (255.255.255.192)",
      "B. /27 (255.255.255.224)",
      "C. /28 (255.255.255.240)",
      "D. /25 (255.255.255.128)",
    ],
    correct: 0,
    explanation:
      "A /26 subnet provides 2^6 − 2 = 62 usable host addresses, which satisfies the requirement of at least 50 hosts while using the smallest possible block (least address waste). A /25 also works (126 usable hosts) but wastes roughly twice as many addresses. A /27 provides only 30 usable hosts — insufficient. A /28 provides only 14 usable hosts — also insufficient. The best fit for 'at least 50 hosts' is /26, which gives 62 usable addresses with minimal waste.",
  },
  {
    id: "nf-q005",
    domainId: "net-fundamentals",
    topicId: "subnetting",
    type: "multiple-choice",
    question:
      "What is the network address of the host 172.16.45.200/20?",
    options: [
      "A. 172.16.45.0",
      "B. 172.16.32.0",
      "C. 172.16.44.0",
      "D. 172.16.40.0",
    ],
    correct: 1,
    explanation:
      "A /20 mask means the first 20 bits are the network portion. In the third octet, the subnet increments are 2^4 = 16. The subnets in the 172.16.x.x range at /20 are: 172.16.0.0, 172.16.16.0, 172.16.32.0, 172.16.48.0... Since 45 falls between 32 and 48, the network address is 172.16.32.0. The broadcast for this subnet is 172.16.47.255. Options A and C are not valid /20 subnet boundaries. Option D (172.16.40.0) is not a valid /20 boundary — the valid boundaries in this range are 32 and 48.",
  },
  {
    id: "nf-q006",
    domainId: "net-fundamentals",
    topicId: "osi-tcpip-models",
    type: "multiple-choice",
    question:
      "Which statement correctly describes the encapsulation process as data travels from the application layer to the physical layer?",
    options: [
      "A. Each layer removes a header added by the layer above it",
      "B. Each layer adds its own header (and sometimes trailer) to the data passed from the layer above",
      "C. Only Layer 3 and Layer 2 add headers; other layers pass data unchanged",
      "D. Headers are only added by the sending device; the receiving device passes data up unchanged",
    ],
    correct: 1,
    explanation:
      "Encapsulation is the process of each layer adding control information (headers, and at Layer 2 a trailer) to the data received from the layer above. The Transport layer adds a segment header, the Network layer adds an IP packet header, the Data Link layer adds a frame header and trailer (with CRC), and the Physical layer converts to bits. Option A describes de-encapsulation (the receiving side). Options C and D are incorrect descriptions of the process.",
  },
  {
    id: "nf-q007",
    domainId: "net-fundamentals",
    topicId: "network-devices",
    type: "multiple-choice",
    question:
      "A switch receives a frame destined for MAC address 00:1A:2B:3C:4D:5E. The switch's MAC address table does not contain an entry for this address. What does the switch do?",
    options: [
      "A. Drops the frame and sends an ICMP unreachable message to the source",
      "B. Floods the frame out all ports except the port it was received on",
      "C. Forwards the frame to the default gateway for resolution",
      "D. Sends an ARP request for the destination MAC address",
    ],
    correct: 1,
    explanation:
      "When a switch receives a frame with an unknown destination MAC address, it floods the frame out all ports except the ingress port — this is called 'unknown unicast flooding.' The switch is hoping the destination device will respond, at which point the switch learns the device's MAC address and port. Option A is router behavior for unknown IP addresses (not switch behavior for unknown MACs). Options C and D are incorrect — switches do not use default gateways or ARP for MAC forwarding decisions.",
  },
  {
    id: "nf-q008",
    domainId: "net-fundamentals",
    topicId: "ethernet-cabling",
    type: "multiple-choice",
    question:
      "A technician needs to connect a switch 80 meters away using copper Ethernet at 10 Gbps. Which cable standard should they use?",
    options: [
      "A. Cat5e, because it supports Gigabit Ethernet",
      "B. Cat6, because it supports 10 Gbps at any distance",
      "C. Cat6a, because it supports 10 Gbps at up to 100 meters",
      "D. Cat7, because it is the only standard supporting 10 Gbps",
    ],
    correct: 2,
    explanation:
      "Cat6a (Augmented Category 6) supports 10 Gbps at the full 100-meter channel length, making it suitable for an 80-meter run. Cat6 can support 10 Gbps but only up to 55 meters — the 80-meter run would require Cat6a. Cat5e supports up to 1 Gbps. Cat7 is not an IEEE standard referenced in the CCNA exam and is not needed here.",
  },
  {
    id: "nf-q009",
    domainId: "net-fundamentals",
    topicId: "ipv4-addressing",
    type: "multiple-choice",
    question:
      "Which of the following IP addresses is NOT a valid private address according to RFC 1918?",
    options: [
      "A. 10.255.255.254",
      "B. 172.32.1.1",
      "C. 192.168.100.50",
      "D. 172.16.0.1",
    ],
    correct: 1,
    explanation:
      "The RFC 1918 private ranges are: 10.0.0.0/8 (10.0.0.0–10.255.255.255), 172.16.0.0/12 (172.16.0.0–172.31.255.255), and 192.168.0.0/16 (192.168.0.0–192.168.255.255). 172.32.1.1 falls outside the 172.16.0.0/12 range (which ends at 172.31.255.255) and is therefore a public address. Option A is in the 10.0.0.0/8 range. Option C is in 192.168.0.0/16. Option D is in 172.16.0.0/12.",
  },
  {
    id: "nf-q010",
    domainId: "net-fundamentals",
    topicId: "osi-tcpip-models",
    type: "multiple-choice",
    question:
      "An administrator is troubleshooting a connectivity issue. The host can ping its default gateway but cannot ping a remote host. Which layer of the OSI model should the administrator investigate next?",
    options: [
      "A. Layer 1 — Physical",
      "B. Layer 2 — Data Link",
      "C. Layer 3 — Network",
      "D. Layer 4 — Transport",
    ],
    correct: 2,
    explanation:
      "The ability to ping the default gateway confirms that Layers 1 (physical), 2 (data link), and the local Layer 3 (IP address and gateway config) are functioning correctly. The failure to reach a remote host indicates a Layer 3 routing problem — either the routing table is missing a path to the remote network, or an ACL is blocking the traffic. The administrator should check the routing table and any access lists with `show ip route` and `show access-lists`.",
  },
  {
    id: "nf-q011",
    domainId: "net-fundamentals",
    topicId: "subnetting",
    type: "multiple-choice",
    question:
      "How many /27 subnets can be created from the 192.168.5.0/24 address space?",
    options: ["A. 4", "B. 6", "C. 8", "D. 16"],
    correct: 2,
    explanation:
      "Going from /24 to /27 borrows 3 additional bits (27 − 24 = 3). The number of subnets created is 2^3 = 8. Each /27 subnet contains 32 addresses (30 usable hosts), and 8 × 32 = 256 addresses, which exactly fills the /24 space. The eight subnets would be: .0, .32, .64, .96, .128, .160, .192, .224.",
  },
  {
    id: "nf-q012",
    domainId: "net-fundamentals",
    topicId: "network-devices",
    type: "multiple-choice",
    question:
      "What is the primary difference between a Layer 2 switch and a multilayer (Layer 3) switch?",
    options: [
      "A. Layer 2 switches support VLANs; Layer 3 switches do not",
      "B. Layer 3 switches can route traffic between VLANs without a separate router",
      "C. Layer 3 switches use MAC addresses; Layer 2 switches use IP addresses",
      "D. Layer 2 switches operate faster because they do not process IP headers",
    ],
    correct: 1,
    explanation:
      "A multilayer (Layer 3) switch can perform IP routing between VLANs using SVIs (Switched Virtual Interfaces) or routed ports in addition to all Layer 2 switching functions. This eliminates the need for a dedicated router for inter-VLAN routing. Both Layer 2 and Layer 3 switches support VLANs. Layer 3 switches use IP addresses for routing and MAC addresses for switching — not one or the other. While Layer 3 switches add routing overhead, modern ASICs make performance comparable.",
  },
  {
    id: "nf-q013",
    domainId: "net-fundamentals",
    topicId: "ipv4-addressing",
    type: "multiple-choice",
    question:
      "Which IPv4 address class has a default subnet mask of 255.255.0.0?",
    options: ["A. Class A", "B. Class B", "C. Class C", "D. Class D"],
    correct: 1,
    explanation:
      "Class B addresses have a first octet range of 128–191 and a default subnet mask of 255.255.0.0 (/16), providing 65,534 usable host addresses per network. Class A (1–126) has a default mask of 255.0.0.0 (/8). Class C (192–223) has a default mask of 255.255.255.0 (/24). Class D (224–239) is reserved for multicast and has no subnet mask.",
  },
  {
    id: "nf-q014",
    domainId: "net-fundamentals",
    topicId: "osi-tcpip-models",
    type: "multiple-choice",
    question:
      "Which protocol operates at the Transport layer and provides reliable, connection-oriented delivery?",
    options: [
      "A. UDP — User Datagram Protocol",
      "B. IP — Internet Protocol",
      "C. TCP — Transmission Control Protocol",
      "D. ICMP — Internet Control Message Protocol",
    ],
    correct: 2,
    explanation:
      "TCP operates at Layer 4 (Transport) and provides reliable, connection-oriented delivery through a three-way handshake, sequencing, acknowledgments, and retransmission of lost segments. UDP also operates at Layer 4 but is connectionless and unreliable. IP operates at Layer 3 (Network). ICMP also operates at Layer 3 and is used for diagnostic messages like ping.",
  },

  // ── Network Access (na-q) ─────────────────────────────────────────────────

  {
    id: "na-q001",
    domainId: "net-access",
    topicId: "vlans",
    type: "multiple-choice",
    question:
      "A switch has VLANs 10, 20, and 30 configured. A host in VLAN 10 cannot communicate with a host in VLAN 20. Both hosts have correct IP configurations. What is required to enable communication between the two VLANs?",
    options: [
      "A. Configure a trunk port between the two hosts",
      "B. Add both hosts to VLAN 1 (the native VLAN)",
      "C. Configure inter-VLAN routing on a Layer 3 device",
      "D. Enable VTP on the switch to propagate VLAN information",
    ],
    correct: 2,
    explanation:
      "VLANs create separate Layer 2 broadcast domains. Traffic between VLANs cannot flow without a Layer 3 routing device (a router or multilayer switch) to route packets between the two subnets. A trunk port carries multiple VLANs but does not route between them. Placing both hosts in VLAN 1 would defeat the purpose of VLANs. VTP only propagates VLAN database information between switches and has no role in inter-VLAN routing.",
  },
  {
    id: "na-q002",
    domainId: "net-access",
    topicId: "vlans",
    type: "multiple-choice",
    question:
      "Which command assigns interface Gi0/1 to VLAN 20 as an access port?",
    options: [
      "A. `switchport access vlan 20` only",
      "B. `switchport mode access` then `switchport access vlan 20`",
      "C. `switchport mode trunk` then `switchport trunk allowed vlan 20`",
      "D. `vlan 20` then `interface gi0/1`",
    ],
    correct: 1,
    explanation:
      "To configure an access port, you must first set the port mode with `switchport mode access` and then assign the VLAN with `switchport access vlan 20`. Using only the VLAN assignment command without the mode command leaves the port in dynamic mode, which may or may not result in access mode depending on the DTP negotiation. Option C configures a trunk port, not an access port. Option D enters VLAN configuration and then interface configuration mode — these commands do not assign a port to a VLAN.",
  },
  {
    id: "na-q003",
    domainId: "net-access",
    topicId: "trunk-ports",
    type: "multiple-choice",
    question:
      "A trunk link between two Cisco switches is configured. Switch A has native VLAN 1 and Switch B has native VLAN 99. What is the impact of this mismatch?",
    options: [
      "A. The trunk will not form; both switches will revert to access mode",
      "B. Traffic in the native VLAN will be tagged incorrectly on one side and can cause VLAN-hopping",
      "C. CDP will disable the trunk automatically to prevent a loop",
      "D. Only VLANs 1 and 99 will be blocked; all other VLANs will function normally",
    ],
    correct: 1,
    explanation:
      "A native VLAN mismatch means that untagged frames sent by Switch A (in VLAN 1) arrive at Switch B and are placed in VLAN 99, and vice versa. This breaks communication for devices in both native VLANs and introduces a double-tagging VLAN-hopping security vulnerability where an attacker on the native VLAN can inject frames into another VLAN. CDP will generate a mismatch warning but will not disable the trunk. All VLANs including 1 and 99 are affected, not only those two.",
  },
  {
    id: "na-q004",
    domainId: "net-access",
    topicId: "trunk-ports",
    type: "multiple-choice",
    question:
      "Which command verifies which VLANs are currently active and forwarding on a trunk port?",
    options: [
      "A. `show vlan brief`",
      "B. `show interfaces switchport`",
      "C. `show interfaces trunk`",
      "D. `show spanning-tree vlan`",
    ],
    correct: 2,
    explanation:
      "`show interfaces trunk` displays all trunk ports and shows three VLAN lists per trunk: VLANs allowed on the trunk, VLANs allowed and active in the management domain (exist in the VLAN database), and VLANs in the spanning tree forwarding state. This is the correct command to verify which VLANs are actively forwarding on a trunk. `show vlan brief` shows VLAN assignments for access ports but does not show trunk detail. `show interfaces switchport` shows mode and config but not the active VLAN forwarding status.",
  },
  {
    id: "na-q005",
    domainId: "net-access",
    topicId: "spanning-tree",
    type: "multiple-choice",
    question:
      "Two switches are connected with two redundant links. STP is running. After convergence, what is the state of the redundant link's port on the non-root switch?",
    options: [
      "A. Forwarding — both links will forward traffic in a load-balanced manner",
      "B. Blocking — one port is placed in blocking state to prevent a loop",
      "C. Disabled — the port is administratively shut down by STP",
      "D. Learning — the port continuously learns MAC addresses but never forwards",
    ],
    correct: 1,
    explanation:
      "STP prevents Layer 2 loops by placing one of the redundant ports in the Blocking state. The Blocking port still receives BPDUs to monitor topology changes but does not forward user traffic. If the forwarding link fails, the blocked port transitions to Forwarding after convergence. 'Forwarding' simultaneously on both redundant ports would create a loop. 'Disabled' means administratively shut down, not an STP state. 'Learning' is a transitional state, not a stable STP state for redundant links.",
  },
  {
    id: "na-q006",
    domainId: "net-access",
    topicId: "spanning-tree",
    type: "multiple-choice",
    question:
      "A network engineer needs to ensure that SW-CORE is always elected as the root bridge for VLAN 10. What command should they configure on SW-CORE?",
    options: [
      "A. `spanning-tree vlan 10 root primary`",
      "B. `spanning-tree vlan 10 priority 0`",
      "C. Both A and B would work correctly",
      "D. `spanning-tree mode rapid-pvst`",
    ],
    correct: 2,
    explanation:
      "Both options A and B achieve the same goal of making SW-CORE the root bridge for VLAN 10. `spanning-tree vlan 10 root primary` is a macro that automatically sets the priority to a value lower than the current root bridge (typically 24576 or lower). `spanning-tree vlan 10 priority 0` explicitly sets the lowest possible priority (0), guaranteeing this switch wins any root election. Both are valid methods and the question asks which would work — both would. Option D enables RSTP but does not address root bridge election.",
  },
  {
    id: "na-q007",
    domainId: "net-access",
    topicId: "spanning-tree",
    type: "multiple-choice",
    question:
      "PortFast is configured on a switch access port. A rogue hub is connected to this port. What security risk does this introduce, and what feature prevents it?",
    options: [
      "A. MAC flooding; mitigated by port security",
      "B. Layer 2 loop; mitigated by BPDU Guard",
      "C. VLAN hopping; mitigated by native VLAN change",
      "D. DHCP starvation; mitigated by DHCP snooping",
    ],
    correct: 1,
    explanation:
      "PortFast causes a port to skip STP's listening and learning states and immediately forward traffic — this is appropriate for end devices but creates a loop risk if another switch or hub with downstream redundant links is connected. BPDU Guard protects against this: if a BPDU is received on a PortFast port, BPDU Guard immediately err-disables the port, preventing a rogue switch from introducing a loop into the network. Port security addresses MAC flooding. Native VLAN changes address VLAN hopping. DHCP snooping addresses DHCP starvation.",
  },
  {
    id: "na-q008",
    domainId: "net-access",
    topicId: "wireless-standards",
    type: "multiple-choice",
    question:
      "A company is deploying access points in a high-density conference center. They want maximum throughput, support for both 2.4 GHz and 5 GHz clients, and the ability to serve multiple clients simultaneously. Which 802.11 standard best meets these requirements?",
    options: [
      "A. 802.11g",
      "B. 802.11n",
      "C. 802.11ac",
      "D. 802.11ax",
    ],
    correct: 3,
    explanation:
      "802.11ax (Wi-Fi 6) provides the highest throughput (up to 9.6 Gbps), supports both 2.4 GHz and 5 GHz bands, and introduces OFDMA (Orthogonal Frequency Division Multiple Access) which allows simultaneous communication with multiple clients — specifically designed for high-density environments. 802.11ac (Wi-Fi 5) is 5 GHz only and does not support 2.4 GHz clients. 802.11n supports both bands but has lower throughput and lacks OFDMA. 802.11g is 2.4 GHz only with only 54 Mbps maximum.",
  },
  {
    id: "na-q009",
    domainId: "net-access",
    topicId: "wireless-standards",
    type: "multiple-choice",
    question:
      "Three access points are being deployed in adjacent rooms. To minimize co-channel interference on the 2.4 GHz band, which channel assignments should be used?",
    options: [
      "A. Channels 1, 2, and 3",
      "B. Channels 1, 5, and 10",
      "C. Channels 1, 6, and 11",
      "D. Channels 2, 7, and 12",
    ],
    correct: 2,
    explanation:
      "In the 2.4 GHz band (US), channels 1, 6, and 11 are the only three non-overlapping channels. Each channel occupies 22 MHz of spectrum. The 2.4 GHz band is 83.5 MHz wide, providing room for exactly three non-overlapping channels. Using adjacent channels (such as 1, 2, 3) results in severe co-channel interference, reducing throughput for all APs. Channels 2, 7, and 12 would not be valid as channel 12 is not available in the US.",
  },
  {
    id: "na-q010",
    domainId: "net-access",
    topicId: "wireless-security",
    type: "multiple-choice",
    question:
      "An enterprise needs to deploy wireless with individual user authentication using domain credentials. Each user's session uses unique encryption keys. Which wireless security implementation meets this requirement?",
    options: [
      "A. WPA2-Personal with a strong passphrase",
      "B. WPA2-Enterprise with 802.1X and a RADIUS server",
      "C. WPA3-Personal with SAE",
      "D. WEP with 128-bit keys",
    ],
    correct: 1,
    explanation:
      "WPA2-Enterprise uses 802.1X for per-user authentication against a RADIUS server (which can integrate with Active Directory). Each authenticated user receives a unique PMK (Pairwise Master Key), resulting in unique per-session encryption keys. WPA2-Personal uses a shared PSK — all users use the same credentials and derived keys. WPA3-Personal uses SAE which is better than WPA2-PSK but still uses a shared passphrase, not individual credentials. WEP is broken and must never be deployed.",
  },
  {
    id: "na-q011",
    domainId: "net-access",
    topicId: "wireless-security",
    type: "multiple-choice",
    question:
      "What key security improvement does WPA3-Personal provide over WPA2-Personal?",
    options: [
      "A. WPA3 uses AES-256 instead of AES-128 for data encryption",
      "B. WPA3 uses SAE which provides forward secrecy and resistance to offline dictionary attacks",
      "C. WPA3 requires a RADIUS server for authentication",
      "D. WPA3 eliminates the need for any passphrase by using certificate-based authentication",
    ],
    correct: 1,
    explanation:
      "WPA3-Personal replaces the WPA2 4-way PSK handshake with SAE (Simultaneous Authentication of Equals). SAE is a Dragonfly key exchange that provides forward secrecy (past session traffic cannot be decrypted even if the passphrase is later compromised) and resistance to offline dictionary attacks (an attacker cannot capture the handshake and brute-force the passphrase offline). Both WPA2 and WPA3 Personal use AES for data encryption. WPA3 does not require RADIUS — that is Enterprise mode. WPA3 Personal still uses a passphrase.",
  },
  {
    id: "na-q012",
    domainId: "net-access",
    topicId: "vlans",
    type: "multiple-choice",
    question:
      "Which VLAN range requires VTP transparent or off mode to be configured before extended-range VLANs can be created?",
    options: [
      "A. VLANs 1–99",
      "B. VLANs 100–999",
      "C. VLANs 1006–4094",
      "D. VLANs 1–1005",
    ],
    correct: 2,
    explanation:
      "Extended-range VLANs (1006–4094) require the switch to be in VTP transparent or off mode on older IOS versions because extended VLANs are not stored in the vlan.dat file and cannot be propagated by VTP. Standard-range VLANs (2–1005) can be created in any VTP mode. VLAN 1 is the default VLAN and cannot be deleted. In newer IOS versions, VTP version 3 supports extended VLANs, but the CCNA exam focuses on the restriction of requiring transparent mode.",
  },
  {
    id: "na-q013",
    domainId: "net-access",
    topicId: "trunk-ports",
    type: "multiple-choice",
    question:
      "A router-on-a-stick configuration uses sub-interfaces for inter-VLAN routing. Which command configures sub-interface Gi0/0.30 to handle traffic for VLAN 30?",
    options: [
      "A. `switchport trunk allowed vlan 30`",
      "B. `encapsulation dot1q 30`",
      "C. `vlan 30` followed by `ip address`",
      "D. `switchport access vlan 30`",
    ],
    correct: 1,
    explanation:
      "`encapsulation dot1q 30` is configured on the sub-interface (`interface Gi0/0.30`) to associate that sub-interface with VLAN 30. The router will then tag outbound frames with VLAN 30 and accept tagged frames with VLAN 30 on the parent interface. `switchport trunk allowed vlan 30` is a switch command, not a router sub-interface command. `vlan 30` followed by `ip address` is for SVIs on a switch. `switchport access vlan 30` is also a switch command.",
  },
  {
    id: "na-q014",
    domainId: "net-access",
    topicId: "spanning-tree",
    type: "multiple-choice",
    question:
      "A network administrator runs `show spanning-tree vlan 10` and notices that a port on SW2 is in the Alternate role. What does this mean?",
    options: [
      "A. The port has a hardware failure and is not available",
      "B. The port is the best path to the root bridge and is currently forwarding",
      "C. The port is an RSTP backup path to the root that is currently in Discarding state",
      "D. The port is a designated port that is learning MAC addresses",
    ],
    correct: 2,
    explanation:
      "In RSTP (802.1w), the Alternate port role is the backup to the Root Port — it provides an alternative path to the root bridge. The Alternate port is in the Discarding state (it neither learns MAC addresses nor forwards traffic) and becomes the new Root Port immediately if the primary Root Port fails. Option B describes the Root Port role. Option D describes a Designated Port in Learning state. Option A is a hardware issue, not an RSTP state.",
  },
  {
    id: "na-q015",
    domainId: "net-access",
    topicId: "wireless-standards",
    type: "multiple-choice",
    question:
      "Which wireless standard was the first to introduce MIMO (Multiple-Input Multiple-Output) technology?",
    options: ["A. 802.11a", "B. 802.11g", "C. 802.11n", "D. 802.11ac"],
    correct: 2,
    explanation:
      "802.11n (Wi-Fi 4) was the first wireless standard to introduce MIMO, which uses multiple antennas for transmission and reception to increase throughput and range. 802.11a and 802.11g use single-input single-output (SISO) with one antenna. 802.11ac introduced MU-MIMO (Multi-User MIMO), which is an enhancement of MIMO allowing simultaneous transmissions to multiple clients.",
  },

  // ── IP Connectivity (ic-q) ────────────────────────────────────────────────

  {
    id: "ic-q001",
    domainId: "ip-connectivity",
    topicId: "ospf",
    type: "multiple-choice",
    question:
      "A router running OSPF shows a neighbor relationship stuck in the EXSTART state. What is the most likely cause?",
    options: [
      "A. The OSPF process IDs do not match between the two routers",
      "B. The Hello and Dead intervals do not match between the two routers",
      "C. The MTU sizes are mismatched between the two routers",
      "D. The routers are in different areas",
    ],
    correct: 2,
    explanation:
      "OSPF neighbors stuck in EXSTART (or Exchange) typically indicates an MTU mismatch. The two routers begin to exchange DBD (Database Description) packets but the receiving router cannot process an oversized packet, causing the adjacency to fail at this stage. OSPF process IDs are locally significant and do not need to match. Hello/Dead timer mismatch prevents the adjacency from forming at all (stays at Init or 2-Way). Being in different areas prevents reaching Full state but not for the EXSTART reason.",
  },
  {
    id: "ic-q002",
    domainId: "ip-connectivity",
    topicId: "ospf",
    type: "multiple-choice",
    question:
      "Which command configures OSPF to advertise the 10.1.1.0/24 network in Area 0?",
    options: [
      "A. `network 10.1.1.0 255.255.255.0 area 0`",
      "B. `network 10.1.1.0 0.0.0.255 area 0`",
      "C. `network 10.0.0.0 0.255.255.255 area 0`",
      "D. `advertise 10.1.1.0 /24 area 0`",
    ],
    correct: 1,
    explanation:
      "The OSPF `network` command uses a wildcard mask (the inverse of the subnet mask), not the subnet mask itself. For a /24 network (255.255.255.0), the wildcard mask is 0.0.0.255. Therefore, `network 10.1.1.0 0.0.0.255 area 0` is correct. Option A uses the subnet mask instead of the wildcard — a common mistake. Option C uses a wildcard of 0.255.255.255, which matches any address starting with 10 — too broad. `advertise` is not a valid IOS command.",
  },
  {
    id: "ic-q003",
    domainId: "ip-connectivity",
    topicId: "eigrp",
    type: "multiple-choice",
    question:
      "A router has two paths to the 192.168.50.0/24 network: one learned via OSPF and one via EIGRP. Assuming both paths have equal metric values within their respective protocols, which route does the router install in the routing table?",
    options: [
      "A. OSPF route (AD 110), because it is a link-state protocol",
      "B. EIGRP route (AD 90), because it has a lower administrative distance",
      "C. Both routes are installed; the router load-balances between them",
      "D. The route with the lower hop count is preferred",
    ],
    correct: 1,
    explanation:
      "Administrative distance is the first criteria used to select which route to install when multiple routing protocols know the same destination. EIGRP has an AD of 90, which is lower (more trusted) than OSPF's AD of 110. Therefore, the EIGRP route is installed. Both routes would not be installed unless they were from the same protocol with equal AD. Hop count is RIP's metric, not a universal tiebreaker. The protocol type (link-state vs distance-vector) does not factor into the AD-based selection.",
  },
  {
    id: "ic-q004",
    domainId: "ip-connectivity",
    topicId: "static-routing",
    type: "multiple-choice",
    question:
      "An administrator wants to configure a backup static route to 10.5.0.0/16 via 172.16.1.1 that only activates if the primary OSPF route disappears. OSPF is running with default settings. What is the correct command?",
    options: [
      "A. `ip route 10.5.0.0 255.255.0.0 172.16.1.1`",
      "B. `ip route 10.5.0.0 255.255.0.0 172.16.1.1 90`",
      "C. `ip route 10.5.0.0 255.255.0.0 172.16.1.1 111`",
      "D. `ip route 10.5.0.0 255.255.0.0 172.16.1.1 200`",
    ],
    correct: 2,
    explanation:
      "A floating static route is a static route with a manually configured administrative distance higher than the primary routing protocol. OSPF has a default AD of 110. To create a floating static that only activates when the OSPF route is gone, set the static route's AD to 111 or higher (just above 110). Option A uses the default static AD of 1, which would be preferred over OSPF (not a backup). Option B uses AD 90, which would be preferred over OSPF (AD 110). Option D (200) would also work but is unnecessarily high — 111 is the most commonly used value.",
  },
  {
    id: "ic-q005",
    domainId: "ip-connectivity",
    topicId: "nat-pat",
    type: "multiple-choice",
    question:
      "A company has 200 internal hosts using 192.168.1.0/24 addresses that need to access the Internet through a single public IP on interface Serial0/0. Which NAT configuration is correct?",
    options: [
      "A. `ip nat inside source static 192.168.1.0 203.0.113.1`",
      "B. `ip nat inside source list 1 interface Serial0/0 overload`",
      "C. `ip nat pool INET 203.0.113.1 203.0.113.200 netmask 255.255.255.0`",
      "D. `ip nat inside source list 1 pool INET`",
    ],
    correct: 1,
    explanation:
      "When many hosts share a single public IP using port address translation (PAT), the correct command is `ip nat inside source list <ACL> interface <outside-int> overload`. The `overload` keyword enables PAT. The ACL (list 1) defines which internal hosts are translated. This is the standard PAT configuration. Option A is static NAT (one-to-one) for a single host, not a /24. Option C creates a NAT pool but without `overload`, it would not handle 200 hosts on one public IP. Option D uses a pool without overload — a pool of one IP without overload cannot handle more than one simultaneous translation.",
  },
  {
    id: "ic-q006",
    domainId: "ip-connectivity",
    topicId: "ospf",
    type: "multiple-choice",
    question:
      "Two OSPF routers are connected via an Ethernet link. After checking `show ip ospf neighbor`, the neighbor is not present. Both routers have OSPF configured on the correct interfaces. Which parameter mismatch would prevent neighbor formation?",
    options: [
      "A. Different OSPF process IDs",
      "B. Different router IDs",
      "C. Different Hello timer values",
      "D. Different OSPF costs on the interface",
    ],
    correct: 2,
    explanation:
      "OSPF requires that Hello and Dead timers match between neighboring routers. If one router has a Hello interval of 10 seconds and the other has 30 seconds, they will not form a neighbor relationship. OSPF process IDs are locally significant and do not need to match. Different router IDs are required for OSPF — routers must have unique RIDs, and mismatched RIDs do not prevent adjacency. Different interface costs affect path selection but not neighbor formation.",
  },
  {
    id: "ic-q007",
    domainId: "ip-connectivity",
    topicId: "bgp-summarization",
    type: "multiple-choice",
    question:
      "A network administrator needs to summarize the routes 10.0.0.0/24, 10.0.1.0/24, 10.0.2.0/24, and 10.0.3.0/24 into a single advertisement. What is the correct summary route?",
    options: [
      "A. 10.0.0.0/22",
      "B. 10.0.0.0/23",
      "C. 10.0.0.0/21",
      "D. 10.0.0.0/24",
    ],
    correct: 0,
    explanation:
      "To find the summary: the four networks differ in the last two bits of the third octet (0=00, 1=01, 2=10, 3=11 in binary). The first 22 bits (10.0.00xxxxx) are identical across all four networks, making the summary a /22. The result is 10.0.0.0/22, which covers 10.0.0.0 through 10.0.3.255. A /23 would only cover two of the four networks. A /21 would be too broad (covering 10.0.0.0 through 10.0.7.255, accidentally advertising 4 more networks).",
  },
  {
    id: "ic-q008",
    domainId: "ip-connectivity",
    topicId: "eigrp",
    type: "multiple-choice",
    question:
      "An EIGRP neighbor relationship fails to form between two routers. `show ip eigrp neighbors` shows no entries. Both routers have `router eigrp 100` configured. What is the most likely cause if they are directly connected?",
    options: [
      "A. The network statements do not include the connecting interface subnet",
      "B. EIGRP requires a separate hello-interval configuration",
      "C. The two routers have different router IDs",
      "D. EIGRP requires area configuration like OSPF",
    ],
    correct: 0,
    explanation:
      "EIGRP forms neighbor relationships only on interfaces that are matched by a `network` statement. If the network statement does not include the IP address of the directly connected interface, EIGRP will not send Hellos on that interface and no neighbor relationship will form. EIGRP hello intervals have default values and do not require manual configuration. EIGRP uses autonomous system numbers, not router IDs for neighbor matching — and router IDs do not prevent EIGRP adjacency. EIGRP does not use areas.",
  },
  {
    id: "ic-q009",
    domainId: "ip-connectivity",
    topicId: "nat-pat",
    type: "multiple-choice",
    question:
      "Which command displays the current active NAT translations on a Cisco router?",
    options: [
      "A. `show ip nat bindings`",
      "B. `show ip nat translations`",
      "C. `show ip nat table`",
      "D. `show ip nat statistics`",
    ],
    correct: 1,
    explanation:
      "`show ip nat translations` displays the active NAT translation table, showing inside local, inside global, outside local, and outside global addresses for each active translation. `show ip nat statistics` shows NAT counters and pool usage statistics but not individual translation entries. `show ip nat bindings` and `show ip nat table` are not valid Cisco IOS commands.",
  },
  {
    id: "ic-q010",
    domainId: "ip-connectivity",
    topicId: "static-routing",
    type: "multiple-choice",
    question:
      "A routing table shows: `S* 0.0.0.0/0 [1/0] via 203.0.113.1`. What does the `1/0` in brackets represent?",
    options: [
      "A. Administrative distance 1, metric 0",
      "B. Metric 1, hop count 0",
      "C. OSPF cost 1, route age 0",
      "D. Subnet mask /1, next-hop ID 0",
    ],
    correct: 0,
    explanation:
      "In Cisco IOS routing table output, the format `[AD/metric]` shows the administrative distance followed by the metric. For a static route, the default administrative distance is 1 (highly trusted, second only to directly connected at 0). The metric for a static route is 0 (no calculated cost). The `S*` prefix indicates it is a static route and it is a candidate for the default route (gateway of last resort).",
  },
  {
    id: "ic-q011",
    domainId: "ip-connectivity",
    topicId: "ospf",
    type: "multiple-choice",
    question:
      "An OSPF network has three routers connected to the same Ethernet segment. After convergence, which statement is true about the adjacencies on this segment?",
    options: [
      "A. All three routers form full adjacencies with each other (3 adjacencies total)",
      "B. The DR and BDR form full adjacencies with each other and with all DROther routers",
      "C. Only the DR forms adjacencies; BDR and DROther routers are passive",
      "D. No adjacencies form on Ethernet because OSPF uses point-to-point links",
    ],
    correct: 1,
    explanation:
      "On a multi-access Ethernet segment, OSPF elects a Designated Router (DR) and Backup DR (BDR). The DR and BDR form full adjacencies with each other and with all DROther routers. DROther routers form only 2-Way relationships with each other — not full adjacencies. This reduces the number of LSA exchanges from n(n-1)/2 (full mesh) to 2(n-2)+1. OSPF absolutely operates on Ethernet segments — it uses the multicast address 224.0.0.5 (all OSPF routers) and 224.0.0.6 (DR/BDR).",
  },
  {
    id: "ic-q012",
    domainId: "ip-connectivity",
    topicId: "nat-pat",
    type: "multiple-choice",
    question:
      "Which NAT type creates a permanent, one-to-one mapping between a private IP address and a public IP address?",
    options: [
      "A. Dynamic NAT",
      "B. PAT (NAT overload)",
      "C. Static NAT",
      "D. Bidirectional NAT",
    ],
    correct: 2,
    explanation:
      "Static NAT creates a permanent, one-to-one mapping between a specific private (inside local) IP address and a specific public (inside global) IP address. This is configured with `ip nat inside source static <inside-local> <inside-global>`. It is commonly used for servers that must be reachable from the Internet with a consistent public IP. Dynamic NAT uses a pool but the mapping is temporary. PAT maps many private IPs to one public IP using port numbers. Bidirectional NAT is not a standard Cisco NAT type.",
  },
  {
    id: "ic-q013",
    domainId: "ip-connectivity",
    topicId: "bgp-summarization",
    type: "multiple-choice",
    question:
      "What is the primary purpose of BGP's AS_PATH attribute?",
    options: [
      "A. To calculate the best path using bandwidth and delay",
      "B. To prevent routing loops by recording each AS a route passes through",
      "C. To assign administrative distance values to BGP routes",
      "D. To identify the OSPF area where the route originated",
    ],
    correct: 1,
    explanation:
      "The BGP AS_PATH attribute is a list of all the Autonomous System numbers that a route advertisement has traversed. Loop prevention works by a BGP router discarding any route advertisement that contains its own AS number in the AS_PATH — since that would mean the route came from itself, indicating a loop. AS_PATH is also used for path selection (shorter AS_PATH is preferred). BGP uses bandwidth/delay metrics only indirectly through weight and local preference attributes. BGP does not use administrative distance internally, and it has nothing to do with OSPF areas.",
  },

  // ── IP Services (is-q) ────────────────────────────────────────────────────

  {
    id: "is-q001",
    domainId: "ip-services",
    topicId: "dhcp",
    type: "multiple-choice",
    question:
      "A client sends a DHCP Discover message. What are the source and destination IP addresses of this message?",
    options: [
      "A. Source: 0.0.0.0, Destination: 255.255.255.255",
      "B. Source: 169.254.1.1, Destination: 255.255.255.255",
      "C. Source: 0.0.0.0, Destination: the DHCP server's IP",
      "D. Source: the client's previously assigned IP, Destination: 255.255.255.255",
    ],
    correct: 0,
    explanation:
      "At the start of DHCP discovery, the client has no IP address, so the source IP is 0.0.0.0. The client does not know the DHCP server's address, so it sends to the limited broadcast address 255.255.255.255, which all hosts on the local segment receive. Options B and D are incorrect because the client has no valid IP address yet. Option C is incorrect because the client does not yet know the server's IP address.",
  },
  {
    id: "is-q002",
    domainId: "ip-services",
    topicId: "dhcp-relay",
    type: "multiple-choice",
    question:
      "A new VLAN 50 is created at a branch site. The DHCP server is centrally located on a different subnet. Clients in VLAN 50 receive 169.254.x.x addresses. What is the most likely cause?",
    options: [
      "A. VLAN 50 does not exist in the DHCP server's scope",
      "B. The `ip helper-address` command is missing from the VLAN 50 SVI",
      "C. The trunk port does not allow VLAN 50",
      "D. Both A and B could be the cause",
    ],
    correct: 3,
    explanation:
      "Both issues would prevent DHCP from working for VLAN 50 clients. Without `ip helper-address` on the VLAN 50 SVI, DHCP Discover broadcasts never reach the centralized server — clients get APIPA. Even if the relay is configured, if the DHCP server has no scope defined for the VLAN 50 subnet (identifiable by the giaddr set by the relay), the server will not respond with an Offer. A missing VLAN 50 on the trunk would cause an entirely different symptom (no connectivity at all, not APIPA). In practice, the engineer must verify both the relay configuration and the server scope.",
  },
  {
    id: "is-q003",
    domainId: "ip-services",
    topicId: "dns",
    type: "multiple-choice",
    question:
      "A user can ping a web server by IP address but cannot reach it by hostname. DNS queries to the configured server are timing out. Which command on a Cisco router would configure an additional DNS server at 8.8.4.4?",
    options: [
      "A. `ip domain-lookup 8.8.4.4`",
      "B. `ip name-server 8.8.4.4`",
      "C. `dns-server 8.8.4.4`",
      "D. `ip dns-server 8.8.4.4`",
    ],
    correct: 1,
    explanation:
      "`ip name-server <ip>` is the Cisco IOS command to configure DNS server addresses on a router. Multiple name servers can be configured and the router queries them in order. `ip domain-lookup` enables or disables DNS lookups on the router itself but does not specify the server. `dns-server` is a DHCP pool subcommand for distributing DNS servers to clients, not for configuring the router's own DNS resolution. `ip dns-server` is not a valid command.",
  },
  {
    id: "is-q004",
    domainId: "ip-services",
    topicId: "ntp-snmp-syslog",
    type: "multiple-choice",
    question:
      "A syslog server is receiving messages from network devices. The security team requests that only messages indicating errors and more critical events are forwarded. Which logging level should be configured?",
    options: [
      "A. Level 4 (Warning)",
      "B. Level 3 (Error)",
      "C. Level 6 (Informational)",
      "D. Level 7 (Debug)",
    ],
    correct: 1,
    explanation:
      "Syslog levels are cumulative downward — setting a level captures that level and all more severe levels below it. Level 3 (Error) captures: 0-Emergency, 1-Alert, 2-Critical, and 3-Error — exactly 'errors and more critical events.' Level 4 (Warning) would also include Warning messages, which are not errors. Level 6 (Informational) would include all messages including informational noise. Level 7 (Debug) is the most verbose, generating enormous log volume and including everything.",
  },
  {
    id: "is-q005",
    domainId: "ip-services",
    topicId: "ntp-snmp-syslog",
    type: "multiple-choice",
    question:
      "Which SNMP version provides both authentication and encryption for secure network management?",
    options: [
      "A. SNMPv1 with community string",
      "B. SNMPv2c with encrypted community string",
      "C. SNMPv3 with authPriv security level",
      "D. SNMPv2 with MD5 hashing",
    ],
    correct: 2,
    explanation:
      "SNMPv3 is the only version that provides full security features. The `authPriv` security level provides both authentication (using HMAC-MD5 or HMAC-SHA) and privacy/encryption (using DES or AES). SNMPv1 and SNMPv2c use community strings transmitted in cleartext — easily captured by a packet analyzer. There is no 'SNMPv2 with MD5 hashing' — SNMPv2c still uses cleartext community strings.",
  },
  {
    id: "is-q006",
    domainId: "ip-services",
    topicId: "ipv6-basics",
    type: "multiple-choice",
    question:
      "Which IPv6 address type is automatically configured on every IPv6-enabled interface and is required for Neighbor Discovery Protocol to function?",
    options: [
      "A. Global unicast address (2000::/3)",
      "B. Unique local address (fc00::/7)",
      "C. Link-local address (fe80::/10)",
      "D. Anycast address",
    ],
    correct: 2,
    explanation:
      "Link-local addresses (fe80::/10) are automatically generated on every IPv6-enabled interface using the EUI-64 format or a random interface ID. They are non-routable and scoped to the local link only. Link-local addresses are mandatory for NDP (Neighbor Discovery Protocol) operations including neighbor solicitation, router solicitation, and router advertisement. Without a link-local address, IPv6 cannot function on the interface even if a global unicast address is configured.",
  },
  {
    id: "is-q007",
    domainId: "ip-services",
    topicId: "ipv6-basics",
    type: "multiple-choice",
    question:
      "What is the abbreviated form of the IPv6 address 2001:0DB8:0000:0000:0001:0000:0000:0001?",
    options: [
      "A. 2001:DB8::1:0:0:1",
      "B. 2001:DB8:0:0:1::1",
      "C. 2001:DB8::1::1",
      "D. 2001:0DB8::1:1",
    ],
    correct: 1,
    explanation:
      "Applying the two abbreviation rules: Rule 1 — remove leading zeros in each group: 2001:DB8:0:0:1:0:0:1. Rule 2 — replace the longest consecutive run of all-zero groups with `::`. The two groups `0:0` in positions 3-4 can be replaced (the `0:0` in positions 6-7 is the same length — when tied, the first occurrence is conventionally chosen, but actually the second could also be chosen). `::` can only appear once. The standard abbreviated form is 2001:DB8:0:0:1::1. Option A is also a valid alternative abbreviation (replacing the last two zeros). Option C uses `::` twice, which is invalid. Option D does not correctly remove the two middle groups of zeros.",
  },
  {
    id: "is-q008",
    domainId: "ip-services",
    topicId: "dhcp",
    type: "multiple-choice",
    question:
      "A Cisco router is configured as a DHCP server. The pool is configured for the 192.168.10.0/24 network, but users report that they cannot get addresses 192.168.10.1 through 192.168.10.10. What is the correct configuration to reserve those addresses?",
    options: [
      "A. `ip dhcp excluded-address 192.168.10.1 192.168.10.10`",
      "B. `no ip dhcp address 192.168.10.1 192.168.10.10`",
      "C. `ip dhcp pool RESERVED 192.168.10.1 192.168.10.10`",
      "D. `ip dhcp lease-reserve 192.168.10.1 192.168.10.10`",
    ],
    correct: 0,
    explanation:
      "`ip dhcp excluded-address <start> <end>` is the correct Cisco IOS command to prevent a range of IP addresses from being assigned by the DHCP server. This is typically used to reserve addresses for statically configured devices like routers, switches, servers, and printers. Options B, C, and D are not valid Cisco IOS DHCP commands. The excluded-address command should be configured before defining the pool to ensure those addresses are never offered.",
  },
  {
    id: "is-q009",
    domainId: "ip-services",
    topicId: "ntp-snmp-syslog",
    type: "multiple-choice",
    question:
      "A router's clock must be synchronized to a campus NTP server at 10.0.0.5. Which command configures the router as an NTP client?",
    options: [
      "A. `ntp master 10.0.0.5`",
      "B. `ntp client 10.0.0.5`",
      "C. `ntp server 10.0.0.5`",
      "D. `clock source ntp 10.0.0.5`",
    ],
    correct: 2,
    explanation:
      "`ntp server <ip>` configures the device to synchronize its clock with the specified NTP server. The router becomes an NTP client of that server. `ntp master <stratum>` makes the device an NTP master clock source for other clients to sync to — it takes a stratum number as an argument, not an IP address. `ntp client` and `clock source ntp` are not valid Cisco IOS commands.",
  },
  {
    id: "is-q010",
    domainId: "ip-services",
    topicId: "dns",
    type: "multiple-choice",
    question:
      "Which DNS record type maps a hostname to an IPv6 address?",
    options: ["A. A record", "B. AAAA record", "C. PTR record", "D. CNAME record"],
    correct: 1,
    explanation:
      "The AAAA record (quad-A) maps a hostname to an IPv6 address. The A record maps a hostname to an IPv4 address. The PTR record is for reverse DNS lookups (IP address to hostname). The CNAME record is a canonical name alias that points one hostname to another hostname (not directly to an IP address).",
  },
  {
    id: "is-q011",
    domainId: "ip-services",
    topicId: "dhcp-relay",
    type: "multiple-choice",
    question:
      "On which interface is `ip helper-address` configured to enable DHCP relay for clients in VLAN 20?",
    options: [
      "A. On the physical uplink interface facing the DHCP server",
      "B. On the VLAN 20 SVI (interface vlan 20) facing the client subnet",
      "C. On the DHCP server's network interface",
      "D. On the physical downlink interface facing the client switch",
    ],
    correct: 1,
    explanation:
      "The `ip helper-address` command must be configured on the interface or SVI that faces the client subnet — i.e., the interface that first receives the DHCP broadcast from the client. For clients in VLAN 20, the relay is configured on the VLAN 20 SVI (`interface vlan 20`) on the distribution or core switch/router. The relay converts the local broadcast to a unicast directed to the DHCP server. Configuring it on the server-facing interface or on the DHCP server itself would not intercept the client broadcasts.",
  },
  {
    id: "is-q012",
    domainId: "ip-services",
    topicId: "ipv6-basics",
    type: "multiple-choice",
    question:
      "What command enables IPv6 routing on a Cisco router?",
    options: [
      "A. `ip routing ipv6`",
      "B. `ipv6 enable`",
      "C. `ipv6 unicast-routing`",
      "D. `ip ipv6 forwarding`",
    ],
    correct: 2,
    explanation:
      "`ipv6 unicast-routing` is the global configuration command that enables IPv6 routing (forwarding of IPv6 packets between interfaces) on a Cisco router. Without this command, a router with IPv6 addresses on its interfaces will not route IPv6 traffic between them. `ipv6 enable` is an interface-level command that enables IPv6 on a specific interface (creates a link-local address). `ip routing ipv6` and `ip ipv6 forwarding` are not valid Cisco IOS commands.",
  },
  {
    id: "is-q013",
    domainId: "ip-services",
    topicId: "dhcp",
    type: "multiple-choice",
    question:
      "A DHCP client sends a DHCPRELEASE message to the server. What is the purpose of this message?",
    options: [
      "A. To renew the existing DHCP lease before it expires",
      "B. To inform the server that the client is done with the IP address so it can be returned to the pool",
      "C. To request a new IP address when the client moves to a new network",
      "D. To reject an offered IP address and request a different one",
    ],
    correct: 1,
    explanation:
      "DHCPRELEASE is sent by the client (typically when the operating system shuts down or the interface is released) to voluntarily return the leased IP address to the DHCP server's available pool. This unicast message is sent to the server that provided the lease. Lease renewal uses DHCPREQUEST (unicast to the original server at 50% of lease time). A DHCPDECLINE is used to reject an offer when the client detects the offered IP is already in use (e.g., using ARP to check for conflicts).",
  },

  // ── Security Fundamentals (sf-q) ──────────────────────────────────────────

  {
    id: "sf-q001",
    domainId: "security",
    topicId: "acls",
    type: "multiple-choice",
    question:
      "An extended ACL is configured to permit HTTP traffic from the 10.1.0.0/24 subnet to any destination. Which command correctly defines this ACL entry?",
    options: [
      "A. `access-list 110 permit tcp 10.1.0.0 0.0.0.255 any eq 80`",
      "B. `access-list 10 permit tcp 10.1.0.0 255.255.255.0 any eq 80`",
      "C. `access-list 110 permit ip 10.1.0.0 0.0.0.255 any eq 80`",
      "D. `access-list 110 permit tcp 10.1.0.0 255.255.255.0 any eq 80`",
    ],
    correct: 0,
    explanation:
      "An extended ACL entry to permit HTTP (TCP port 80) from a specific source network must: use an extended ACL number (100–199), specify `tcp` as the protocol (HTTP runs over TCP), use a wildcard mask (not a subnet mask), specify `any` for destination, and use `eq 80` for the destination port. Option A correctly uses ACL 110 (extended), `tcp`, wildcard mask `0.0.0.255`, and `eq 80`. Option B uses ACL 10 (standard range — incorrect) and a subnet mask. Option C uses `ip` protocol which does not support port matching. Option D uses ACL 110 but the subnet mask instead of the wildcard.",
  },
  {
    id: "sf-q002",
    domainId: "security",
    topicId: "acls",
    type: "multiple-choice",
    question:
      "An ACL is applied inbound on Gi0/0. The ACL has: (1) `permit tcp 10.0.0.0 0.0.0.255 any eq 80`, (2) `deny ip 10.0.0.0 0.0.0.255 any`. A packet arrives from 10.0.0.50 destined for port 443. What happens?",
    options: [
      "A. The packet is permitted by rule 1 (HTTP port 80 matches)",
      "B. The packet is denied by rule 2 (explicit deny)",
      "C. The packet is denied by the implicit deny at the end of the ACL",
      "D. The packet is permitted because rule 2 only applies to port 80 traffic",
    ],
    correct: 1,
    explanation:
      "ACLs are processed top-to-bottom with first-match logic. The packet from 10.0.0.50 on port 443 (HTTPS) does not match rule 1 (which only permits TCP port 80). It then matches rule 2: `deny ip 10.0.0.0 0.0.0.255 any` — this denies all IP traffic from the 10.0.0.0/24 subnet. The packet is dropped at rule 2. The implicit deny at the end would also drop it, but rule 2 is the actual matching entry. Rule 2 applies to all IP traffic from that subnet (using the `ip` keyword, not a specific port).",
  },
  {
    id: "sf-q003",
    domainId: "security",
    topicId: "ssh-device-security",
    type: "multiple-choice",
    question:
      "After configuring SSH on a Cisco switch, the administrator tries to SSH in but receives a 'connection refused' error. The VTY lines are configured with `transport input ssh` and `login local`. What is the most likely missing step?",
    options: [
      "A. The `ip ssh version 2` command was not entered",
      "B. RSA keys were not generated with `crypto key generate rsa`",
      "C. The `enable secret` password was not configured",
      "D. A `service password-encryption` command was not applied",
    ],
    correct: 1,
    explanation:
      "SSH on Cisco IOS requires an RSA key pair to perform the cryptographic handshake. Without RSA keys generated via `crypto key generate rsa`, SSH has no encryption capability and the connection is refused. The hostname and domain name must also be set before generating the keys (since they form the key name). `ip ssh version 2` is important for security but SSH version 1 would still work without it. The `enable secret` and `service password-encryption` commands affect privilege access but not whether SSH connections are accepted.",
  },
  {
    id: "sf-q004",
    domainId: "security",
    topicId: "port-security",
    type: "multiple-choice",
    question:
      "A switch port has port security configured with `violation shutdown`. A second, unauthorized device is connected. The port goes into err-disabled state. Which sequence of commands restores the port to normal operation?",
    options: [
      "A. `no port-security violation shutdown` on the interface",
      "B. `shutdown` followed by `no shutdown` on the interface",
      "C. `clear port-security all` in privileged exec mode",
      "D. `errdisable recovery` in global config",
    ],
    correct: 1,
    explanation:
      "An err-disabled port due to a port security violation must be manually re-enabled by entering interface configuration mode and issuing `shutdown` followed by `no shutdown`. This clears the err-disabled state and reactivates the port. `errdisable recovery cause psecure-violation` can be configured to automatically recover after a timeout, but by default recovery is manual. `clear port-security all` clears the MAC address table entries but does not re-enable an err-disabled port. Removing the violation mode does not clear the err-disabled state.",
  },
  {
    id: "sf-q005",
    domainId: "security",
    topicId: "port-security",
    type: "multiple-choice",
    question:
      "Which port security command saves dynamically learned MAC addresses to the running configuration so they persist as static entries?",
    options: [
      "A. `switchport port-security mac-address static`",
      "B. `switchport port-security mac-address sticky`",
      "C. `switchport port-security save-mac`",
      "D. `ip arp inspection`",
    ],
    correct: 1,
    explanation:
      "`switchport port-security mac-address sticky` enables sticky learning, which causes the switch to dynamically learn the MAC address of the connected device and write it to the running configuration as a static entry. This combines the flexibility of dynamic learning with the persistence of static configuration. The running configuration must be saved with `write memory` or `copy running-config startup-config` for the entry to survive a reboot. Options A, C, and D are either invalid commands or unrelated features.",
  },
  {
    id: "sf-q006",
    domainId: "security",
    topicId: "dhcp-snooping-dai",
    type: "multiple-choice",
    question:
      "DHCP snooping is enabled on a switch. A legitimate DHCP server is connected to Gi0/1. After enabling snooping, clients cannot receive IP addresses. What is the likely cause?",
    options: [
      "A. The VLAN was not specified in the `ip dhcp snooping vlan` command",
      "B. The Gi0/1 interface was not configured as a trusted port",
      "C. The DHCP server's IP was not added to the snooping whitelist",
      "D. Port security is blocking the DHCP server's MAC address",
    ],
    correct: 1,
    explanation:
      "When DHCP snooping is enabled, all ports are untrusted by default. Untrusted ports drop DHCP server messages (DHCPOFFER and DHCPACK). The interface connecting to the legitimate DHCP server (Gi0/1) must be configured as a trusted port with `ip dhcp snooping trust`. Without this, even a legitimate server's responses are dropped. Option A would also prevent snooping from working on that VLAN, but Option B is the more likely cause when the server is reachable but clients get no response. There is no DHCP snooping whitelist for server IPs, and port security is a separate feature.",
  },
  {
    id: "sf-q007",
    domainId: "security",
    topicId: "dhcp-snooping-dai",
    type: "multiple-choice",
    question:
      "What attack does Dynamic ARP Inspection (DAI) primarily protect against?",
    options: [
      "A. DHCP starvation attacks that exhaust the DHCP address pool",
      "B. ARP spoofing attacks that redirect traffic through an attacker's device",
      "C. MAC flooding attacks that overflow the CAM table",
      "D. VLAN hopping attacks using double-tagged frames",
    ],
    correct: 1,
    explanation:
      "DAI validates ARP packets against the DHCP snooping binding table. If a device sends an ARP claiming to be a specific IP with an incorrect MAC address, DAI drops the ARP. This prevents ARP spoofing (poisoning) where an attacker poisons ARP caches to redirect traffic through their device for interception (man-in-the-middle). DHCP snooping addresses DHCP starvation. Port security addresses MAC flooding. Native VLAN changes and BPDU Guard address VLAN hopping.",
  },
  {
    id: "sf-q008",
    domainId: "security",
    topicId: "vtp",
    type: "multiple-choice",
    question:
      "A network engineer receives a used Cisco switch to add to the network. Before connecting it, what VTP-related action should they take to prevent a potential network outage?",
    options: [
      "A. Configure the switch to VTP server mode to ensure it wins the election",
      "B. Set the VTP domain to a non-existent name to reset its revision number, then set to transparent or off mode",
      "C. Enable VTP pruning to prevent unnecessary VLAN propagation",
      "D. Clear all VLANs from the switch before connecting it",
    ],
    correct: 1,
    explanation:
      "A used switch may have a VTP revision number higher than the production switches. If connected in VTP client or server mode, it could overwrite the VLAN database of the entire domain. The safe procedure is: change the VTP domain name (this resets the revision number to 0), then set VTP mode to transparent or off before connecting the switch to the production network. Clearing VLANs does not reset the VTP revision number. VTP pruning is for efficiency, not revision number management. Setting to server mode would make the risk worse, not better.",
  },
  {
    id: "sf-q009",
    domainId: "security",
    topicId: "acls",
    type: "multiple-choice",
    question:
      "Where should a standard ACL be placed relative to traffic flow to achieve the best result?",
    options: [
      "A. As close to the source as possible to stop traffic early",
      "B. As close to the destination as possible to avoid blocking unintended traffic",
      "C. At the Internet gateway for all ACLs, regardless of type",
      "D. On the core switches in inbound direction only",
    ],
    correct: 1,
    explanation:
      "Standard ACLs match only on source IP address and have no ability to distinguish traffic by destination. If placed close to the source, they could inadvertently block traffic from that source to other valid destinations. Placing a standard ACL close to the destination ensures that only traffic to that specific destination is filtered, minimizing collateral impact. Extended ACLs, in contrast, should be placed close to the source because they can specify both source and destination, avoiding unnecessary traffic traversal.",
  },
  {
    id: "sf-q010",
    domainId: "security",
    topicId: "ssh-device-security",
    type: "multiple-choice",
    question:
      "Which command prevents Telnet access while allowing only SSH on the VTY lines?",
    options: [
      "A. `no telnet vty 0 4`",
      "B. `transport input ssh`",
      "C. `transport output ssh`",
      "D. `ip ssh only vty 0 4`",
    ],
    correct: 1,
    explanation:
      "`transport input ssh` configured on the VTY lines restricts incoming remote management sessions to SSH only, preventing Telnet connections. `transport input all` (default on some IOS versions) permits both Telnet and SSH. `transport output ssh` controls outgoing connections initiated from the router (e.g., when the router SSHes to another device) — not incoming management sessions. `no telnet vty 0 4` and `ip ssh only vty 0 4` are not valid Cisco IOS commands.",
  },
  {
    id: "sf-q011",
    domainId: "security",
    topicId: "port-security",
    type: "multiple-choice",
    question:
      "A port security violation occurs on a port configured with `violation restrict`. What is the result?",
    options: [
      "A. The port is immediately err-disabled and requires manual recovery",
      "B. The unauthorized frames are dropped, the violation counter increments, and a Syslog message is generated",
      "C. The unauthorized frames are silently dropped with no notification",
      "D. The port blocks all traffic including traffic from the authorized MAC address",
    ],
    correct: 1,
    explanation:
      "The `restrict` violation mode drops frames from unauthorized MAC addresses, increments the violation counter on the port, and generates a Syslog message (and SNMP trap if configured). The port remains up — only the unauthorized traffic is dropped. The authorized device continues to communicate normally. `shutdown` (err-disable) is the shutdown violation mode. Silent drop with no log is the `protect` mode behavior. Blocking all traffic including authorized MACs is not how any violation mode works.",
  },
  {
    id: "sf-q012",
    domainId: "security",
    topicId: "vtp",
    type: "multiple-choice",
    question:
      "In VTP, what determines which switch's VLAN database 'wins' and is propagated to all clients in the domain?",
    options: [
      "A. The switch with the highest IP address on the management VLAN",
      "B. The switch with the highest VTP revision number",
      "C. The switch configured as VTP server mode regardless of revision number",
      "D. The switch with the most VLANs configured",
    ],
    correct: 1,
    explanation:
      "VTP uses a revision number to determine which VLAN database is most current. The switch with the highest VTP revision number in the same VTP domain wins — its VLAN database overwrites all others. This revision number increases by one each time a VLAN is added, modified, or deleted. This is why adding a switch with an unexpectedly high revision number is so dangerous — it can overwrite all VLANs on the production network. The management IP, server mode, and number of VLANs are not the deciding factor.",
  },
  {
    id: "sf-q013",
    domainId: "security",
    topicId: "ssh-device-security",
    type: "multiple-choice",
    question:
      "Which command encrypts all plaintext passwords stored in the running configuration with a reversible Type 7 encryption?",
    options: [
      "A. `enable secret`",
      "B. `service password-encryption`",
      "C. `crypto key generate rsa`",
      "D. `password encryption aes`",
    ],
    correct: 1,
    explanation:
      "`service password-encryption` applies weak Type 7 (XOR-based, reversible) encryption to plaintext passwords in the running configuration, such as VTY passwords, console passwords, and the `username` password field. This prevents casual over-the-shoulder viewing but is easily decoded with widely available tools. `enable secret` uses MD5 hashing (Type 5 — one-way, much stronger) for the privilege exec password. `crypto key generate rsa` generates RSA keys for SSH. `password encryption aes` (Type 6) is a stronger option but requires a master key and is a separate feature.",
  },

  // ── Automation & Programmability (ap-q) ───────────────────────────────────

  {
    id: "ap-q001",
    domainId: "automation",
    topicId: "rest-apis",
    type: "multiple-choice",
    question:
      "A network automation script sends an HTTP request to the DNA Center API to retrieve all network devices. Which HTTP verb should be used?",
    options: ["A. POST", "B. PUT", "C. GET", "D. DELETE"],
    correct: 2,
    explanation:
      "GET is the HTTP verb used to retrieve data from a REST API. It is read-only and should not modify any server state. POST is used to create new resources. PUT replaces an existing resource. DELETE removes a resource. For any read/query operation (listing devices, retrieving interface status, pulling inventory), GET is always the correct choice.",
  },
  {
    id: "ap-q002",
    domainId: "automation",
    topicId: "rest-apis",
    type: "multiple-choice",
    question:
      "A REST API call returns HTTP status code 401. What does this indicate?",
    options: [
      "A. The requested resource was not found on the server",
      "B. The server encountered an internal error processing the request",
      "C. The request requires authentication — the credentials are missing or invalid",
      "D. The client does not have permission to access this resource despite being authenticated",
    ],
    correct: 2,
    explanation:
      "HTTP 401 Unauthorized means the request requires authentication that has not been provided or the provided credentials are invalid. The common fix is to re-authenticate and obtain a fresh API token. HTTP 404 Not Found indicates the resource does not exist. HTTP 500 indicates a server-side processing error. HTTP 403 Forbidden means the client is authenticated but lacks authorization to access the resource — the distinction is subtle but important: 401 = not authenticated, 403 = authenticated but not permitted.",
  },
  {
    id: "ap-q003",
    domainId: "automation",
    topicId: "data-formats",
    type: "multiple-choice",
    question:
      "Which of the following is a valid JSON object representing a network device?",
    options: [
      "A. `{hostname: 'SW01', ip: '10.0.0.1'}`",
      "B. `{'hostname': 'SW01', 'ip': '10.0.0.1'}`",
      "C. `{\"hostname\": \"SW01\", \"ip\": \"10.0.0.1\"}`",
      "D. `hostname=SW01, ip=10.0.0.1`",
    ],
    correct: 2,
    explanation:
      "JSON requires keys and string values to be enclosed in double quotes (not single quotes). Option C uses proper double quotes and is valid JSON. Option A uses unquoted keys — invalid JSON. Option B uses single quotes — invalid JSON (JavaScript allows single quotes in objects, but JSON does not). Option D uses `=` assignment syntax — this is not JSON (it resembles an INI file or environment variable format).",
  },
  {
    id: "ap-q004",
    domainId: "automation",
    topicId: "data-formats",
    type: "multiple-choice",
    question:
      "An Ansible playbook fails with an indentation error. The engineer investigates and finds the task uses tab characters for indentation. What is the correct action?",
    options: [
      "A. Configure Ansible to accept tab characters with `allow_tabs: true`",
      "B. Replace all tab characters with spaces, as YAML requires space-based indentation",
      "C. Use 4-space indentation specifically, as YAML only supports 4-space blocks",
      "D. Convert the playbook to JSON format, which does not have indentation requirements",
    ],
    correct: 1,
    explanation:
      "YAML strictly prohibits tab characters for indentation — only spaces are valid. Most editors can be configured to convert tabs to spaces automatically (typically 2 spaces is the standard for YAML). There is no Ansible configuration to allow tabs. YAML supports any consistent number of spaces for indentation (commonly 2 or 4), not exclusively 4. While JSON does not have indentation requirements, converting to JSON defeats the purpose of using Ansible playbooks in YAML format.",
  },
  {
    id: "ap-q005",
    domainId: "automation",
    topicId: "ansible-automation",
    type: "multiple-choice",
    question:
      "Which Ansible module is used to push configuration lines to a Cisco IOS device?",
    options: [
      "A. `cisco.ios.ios_command`",
      "B. `cisco.ios.ios_config`",
      "C. `cisco.ios.ios_facts`",
      "D. `cisco.ios.ios_interface`",
    ],
    correct: 1,
    explanation:
      "`cisco.ios.ios_config` is used to push configuration lines to a Cisco IOS device — equivalent to entering configuration mode and typing commands. `cisco.ios.ios_command` executes show commands and other exec-level commands and captures their output. `cisco.ios.ios_facts` gathers device information (hostname, interfaces, OS version) without making changes. While `ios_interface` exists in some module collections, it is not the standard module for pushing arbitrary configuration lines.",
  },
  {
    id: "ap-q006",
    domainId: "automation",
    topicId: "cisco-apis",
    type: "multiple-choice",
    question:
      "What is the primary architectural difference between Cisco Meraki and Cisco DNA Center?",
    options: [
      "A. Meraki uses REST APIs; DNA Center uses SNMP for management",
      "B. Meraki is cloud-managed; DNA Center is an on-premises controller",
      "C. Meraki requires a YANG data model; DNA Center uses OpenFlow",
      "D. Meraki manages only wireless devices; DNA Center manages only wired devices",
    ],
    correct: 1,
    explanation:
      "Cisco Meraki is a cloud-managed platform — all configuration and management happens through the Meraki cloud dashboard, and there is no on-premises controller. Cisco DNA Center is an on-premises network controller appliance that manages campus network devices using intent-based networking. Both use REST APIs for programmability. Neither exclusively uses SNMP, YANG as described, or is limited to only wired or wireless devices.",
  },
  {
    id: "ap-q007",
    domainId: "automation",
    topicId: "sdn",
    type: "multiple-choice",
    question:
      "In a Software-Defined Networking architecture, what is the role of the southbound API?",
    options: [
      "A. It connects the SDN controller to external applications and orchestration systems",
      "B. It connects the SDN controller to the network devices it manages",
      "C. It provides the management interface for administrators to configure the controller",
      "D. It connects multiple SDN controllers together for redundancy",
    ],
    correct: 1,
    explanation:
      "In SDN architecture, the southbound API (interface) is the communication channel between the SDN controller and the network devices (data plane). Examples include OpenFlow, NETCONF, and RESTCONF. The northbound API connects the SDN controller to applications and orchestration systems (e.g., the REST API that Ansible or a custom script calls). The management interface for administrators is typically a web GUI, not classified as southbound. East-west interfaces connect controllers together.",
  },
  {
    id: "ap-q008",
    domainId: "automation",
    topicId: "sdn",
    type: "multiple-choice",
    question:
      "Which statement best describes Infrastructure as Code (IaC) in a networking context?",
    options: [
      "A. Using a simulator like GNS3 to test configurations before deploying them",
      "B. Storing network device configurations as version-controlled code files deployed through automated pipelines",
      "C. Replacing physical network infrastructure with virtual machines",
      "D. Using Python scripts to manually log into each device and push configuration changes",
    ],
    correct: 1,
    explanation:
      "Infrastructure as Code means treating network configuration the same way software engineers treat code: stored in version control (like Git), reviewed through pull requests, tested in CI/CD pipelines, and deployed automatically. This provides auditability, reproducibility, and rollback capability. Option A describes simulation/testing but not IaC. Option C describes virtualization. Option D describes scripted automation, which is a step toward IaC but is not IaC itself — IaC implies declarative config files in source control, not imperative scripts.",
  },
  {
    id: "ap-q009",
    domainId: "automation",
    topicId: "data-formats",
    type: "multiple-choice",
    question:
      "NETCONF uses which transport protocol and which data format?",
    options: [
      "A. HTTP, JSON",
      "B. SSH (port 830), XML",
      "C. Telnet, YAML",
      "D. HTTPS, YANG",
    ],
    correct: 1,
    explanation:
      "NETCONF (Network Configuration Protocol) uses SSH on port 830 as its transport and XML as its data format for encoding configuration and state data. RESTCONF uses HTTPS and supports both JSON and XML. YANG is a data modeling language that defines the structure of the data — it is not a transport format. Telnet is not used by NETCONF (SSH is required for security). The combination of SSH + XML on port 830 is a reliable exam fact for NETCONF.",
  },
  {
    id: "ap-q010",
    domainId: "automation",
    topicId: "rest-apis",
    type: "multiple-choice",
    question:
      "Which HTTP status code indicates that a REST API POST request successfully created a new resource?",
    options: ["A. 200 OK", "B. 201 Created", "C. 204 No Content", "D. 302 Found"],
    correct: 1,
    explanation:
      "HTTP 201 Created is the standard response to a successful POST request that created a new resource. The response typically includes the Location header pointing to the new resource and may include the new resource in the body. HTTP 200 OK indicates a successful request but is used for GET, PUT, and PATCH — not typically for resource creation. HTTP 204 No Content indicates success with no response body (used for DELETE or PUT when nothing is returned). HTTP 302 is a redirect.",
  },
  {
    id: "ap-q011",
    domainId: "automation",
    topicId: "ansible-automation",
    type: "multiple-choice",
    question:
      "What does it mean for an Ansible module to be idempotent?",
    options: [
      "A. The module runs simultaneously on all hosts in the inventory",
      "B. Running the module multiple times produces the same end state without duplicate changes",
      "C. The module requires no authentication to connect to managed devices",
      "D. The module automatically rolls back failed changes",
    ],
    correct: 1,
    explanation:
      "Idempotency means that applying the same operation multiple times yields the same result as applying it once. An idempotent Ansible module checks the current state of the device before making changes — if the desired configuration already exists, it reports 'ok' (no change) rather than making a duplicate change. This is critical for safe automation: you can run a playbook repeatedly in a CI/CD pipeline without risk of unintended configuration accumulation. Option A describes parallel execution. Options C and D are unrelated to idempotency.",
  },
  {
    id: "ap-q012",
    domainId: "automation",
    topicId: "cisco-apis",
    type: "multiple-choice",
    question:
      "A script needs to authenticate to Cisco DNA Center's API. What is the correct first step?",
    options: [
      "A. Include the username and password as query parameters in every API request",
      "B. Send a POST to the authentication endpoint to obtain an access token, then use the token in subsequent requests",
      "C. Configure a community string on DNA Center for API access",
      "D. Generate an API key in DNA Center and include it in the X-Auth-Token header of every request",
    ],
    correct: 1,
    explanation:
      "DNA Center's API uses token-based authentication. The correct flow is: POST credentials (username/password with Basic Auth) to `/dna/system/api/v1/auth/token` → receive a token in the response → include the token as `X-Auth-Token: <token>` in all subsequent API requests. Tokens have a limited lifetime and must be refreshed. Including credentials in every request (Option A) is the Basic Auth pattern but is not what DNA Center uses. Community strings are for SNMP. Option D describes the Meraki API pattern (API key in header), not DNA Center's token-based flow.",
  },
  {
    id: "ap-q013",
    domainId: "automation",
    topicId: "sdn",
    type: "multiple-choice",
    question:
      "In traditional networking, which plane is responsible for running routing protocols and building the routing table?",
    options: [
      "A. Data plane (forwarding plane)",
      "B. Management plane",
      "C. Control plane",
      "D. Application plane",
    ],
    correct: 2,
    explanation:
      "The control plane is responsible for making forwarding decisions — it runs routing protocols (OSPF, BGP, EIGRP), STP, and ARP, building the routing and MAC tables used by the data plane. The data plane (forwarding plane) uses the tables built by the control plane to actually move packets and frames at hardware speed. The management plane provides out-of-band management (SSH, SNMP, APIs). In SDN, the control plane is extracted from individual devices and centralized in a software controller.",
  },
];
