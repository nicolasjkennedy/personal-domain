import type { CLICommand } from "@/src/types/ccna";

export const ccnaCommands: CLICommand[] = [
  // ── Network Fundamentals ──────────────────────────────────────────────────

  {
    id: "cmd-nf-001",
    domainId: "net-fundamentals",
    command: "show ip interface brief",
    syntax: "show ip interface brief",
    description:
      "Displays a concise summary of all interfaces with their IP addresses, Layer 2 status, and Layer 3 protocol status. The most-used verification command on any Cisco router.",
    example:
      "Router# show ip interface brief\n" +
      "Interface              IP-Address      OK? Method Status                Protocol\n" +
      "GigabitEthernet0/0     192.168.1.1     YES manual up                    up\n" +
      "GigabitEthernet0/1     10.0.0.1        YES manual up                    up\n" +
      "GigabitEthernet0/2     unassigned      YES unset  administratively down down",
    mode: "privileged",
    tags: ["verification", "interfaces", "ip", "status"],
  },
  {
    id: "cmd-nf-002",
    domainId: "net-fundamentals",
    command: "show interfaces",
    syntax: "show interfaces [interface-id]",
    description:
      "Displays detailed statistics for all interfaces or a specific interface, including input/output errors, CRC errors, bandwidth, duplex settings, and MAC address. Useful for diagnosing physical and data link layer problems.",
    example:
      "Router# show interfaces GigabitEthernet0/0\n" +
      "GigabitEthernet0/0 is up, line protocol is up\n" +
      "  Hardware is iGbE, address is a8aa.aaaa.0001 (bia a8aa.aaaa.0001)\n" +
      "  Internet address is 192.168.1.1/24\n" +
      "  MTU 1500 bytes, BW 1000000 Kbit/sec, DLY 10 usec,\n" +
      "     5 minute input rate 0 bits/sec, 0 packets/sec\n" +
      "  0 input errors, 0 CRC, 0 frame",
    mode: "privileged",
    tags: ["verification", "interfaces", "errors", "layer1", "layer2"],
  },
  {
    id: "cmd-nf-003",
    domainId: "net-fundamentals",
    command: "show arp",
    syntax: "show arp",
    description:
      "Displays the ARP table — the mapping of IP addresses to MAC addresses known to the device. Useful for verifying Layer 3-to-Layer 2 address resolution.",
    example:
      "Router# show arp\n" +
      "Protocol  Address          Age (min)  Hardware Addr   Type   Interface\n" +
      "Internet  192.168.1.1             -   a8aa.aaaa.0001  ARPA   GigabitEthernet0/0\n" +
      "Internet  192.168.1.10            5   0050.56aa.0002  ARPA   GigabitEthernet0/0",
    mode: "privileged",
    tags: ["arp", "layer2", "layer3", "verification"],
  },
  {
    id: "cmd-nf-004",
    domainId: "net-fundamentals",
    command: "ping",
    syntax: "ping <destination-ip> [repeat <count>] [size <bytes>] [source <interface>]",
    description:
      "Sends ICMP Echo Request packets to a destination and reports success or failure. A basic Layer 3 connectivity test. Extended ping allows specifying source interface, repeat count, and packet size.",
    example:
      "Router# ping 10.0.0.1 repeat 5\n" +
      "Type escape sequence to abort.\n" +
      "Sending 5, 100-byte ICMP Echos to 10.0.0.1, timeout is 2 seconds:\n" +
      "!!!!!\n" +
      "Success rate is 100 percent (5/5), round-trip min/avg/max = 1/2/4 ms",
    mode: "privileged",
    tags: ["connectivity", "icmp", "troubleshooting", "layer3"],
  },
  {
    id: "cmd-nf-005",
    domainId: "net-fundamentals",
    command: "traceroute",
    syntax: "traceroute <destination-ip>",
    description:
      "Sends packets with incrementally increasing TTL values to discover each hop on the path to a destination. Identifies where routing failures occur by showing which hop stops responding.",
    example:
      "Router# traceroute 8.8.8.8\n" +
      "Type escape sequence to abort.\n" +
      "Tracing the route to 8.8.8.8\n" +
      "  1 192.168.1.254 1 msec 1 msec 1 msec\n" +
      "  2 10.0.0.1 2 msec 2 msec 2 msec\n" +
      "  3 203.0.113.1 15 msec 14 msec 15 msec",
    mode: "privileged",
    tags: ["troubleshooting", "routing", "icmp", "connectivity"],
  },
  {
    id: "cmd-nf-006",
    domainId: "net-fundamentals",
    command: "ip address",
    syntax: "ip address <ip-address> <subnet-mask>",
    description:
      "Assigns an IPv4 address and subnet mask to a router interface. Must be in interface configuration mode. Use `no ip address` to remove.",
    example:
      "Router(config)# interface GigabitEthernet0/0\n" +
      "Router(config-if)# ip address 192.168.1.1 255.255.255.0\n" +
      "Router(config-if)# no shutdown",
    mode: "interface-config",
    tags: ["ip", "addressing", "interface", "configuration"],
  },
  {
    id: "cmd-nf-007",
    domainId: "net-fundamentals",
    command: "no shutdown",
    syntax: "no shutdown",
    description:
      "Brings an interface out of administratively down state, activating it. Router interfaces default to shutdown; switch ports default to no shutdown. Nearly always the last command after configuring a new interface.",
    example:
      "Router(config)# interface GigabitEthernet0/0\n" +
      "Router(config-if)# no shutdown\n" +
      "%LINK-5-CHANGED: Interface GigabitEthernet0/0, changed state to up",
    mode: "interface-config",
    tags: ["interface", "activation", "configuration"],
  },
  {
    id: "cmd-nf-008",
    domainId: "net-fundamentals",
    command: "show version",
    syntax: "show version",
    description:
      "Displays IOS version, hardware model, serial number, uptime, memory, and configuration register. Used to confirm the IOS version running and how the device will boot.",
    example:
      "Router# show version\n" +
      "Cisco IOS Software, Version 15.2(4)M7, RELEASE SOFTWARE\n" +
      "Router uptime is 5 days, 4 hours, 32 minutes\n" +
      "cisco 2901 (revision 1.0) with 483328K/32768K bytes of memory\n" +
      "Configuration register is 0x2102",
    mode: "privileged",
    tags: ["ios", "hardware", "verification", "version"],
  },
  {
    id: "cmd-nf-009",
    domainId: "net-fundamentals",
    command: "show running-config",
    syntax: "show running-config [| section <keyword>]",
    description:
      "Displays the current active configuration in RAM. Pipe with `section` to filter to a specific config block (e.g., `| section ospf`). This is the primary way to review device configuration.",
    example:
      "Router# show running-config | section interface\n" +
      "interface GigabitEthernet0/0\n" +
      " ip address 192.168.1.1 255.255.255.0\n" +
      " no shutdown\n" +
      "interface GigabitEthernet0/1\n" +
      " ip address 10.0.0.1 255.255.255.0",
    mode: "privileged",
    tags: ["configuration", "verification", "troubleshooting"],
  },
  {
    id: "cmd-nf-010",
    domainId: "net-fundamentals",
    command: "copy running-config startup-config",
    syntax: "copy running-config startup-config",
    description:
      "Saves the current running configuration from RAM to NVRAM (startup-config). If this is not done, all configuration changes are lost on the next reload. Equivalent to `write memory` or `wr`.",
    example:
      "Router# copy running-config startup-config\n" +
      "Destination filename [startup-config]? \n" +
      "Building configuration...\n" +
      "[OK]",
    mode: "privileged",
    tags: ["configuration", "save", "nvram", "startup"],
  },
  {
    id: "cmd-nf-011",
    domainId: "net-fundamentals",
    command: "show mac address-table",
    syntax: "show mac address-table [dynamic | static] [vlan <vlan-id>]",
    description:
      "Displays the MAC address table (CAM table) on a switch, showing which MAC addresses are associated with which VLANs and switch ports. Used to verify Layer 2 forwarding and troubleshoot connectivity.",
    example:
      "Switch# show mac address-table\n" +
      "          Mac Address Table\n" +
      "-------------------------------------------\n" +
      "Vlan    Mac Address       Type        Ports\n" +
      "----    -----------       --------    -----\n" +
      "  10    0050.56aa.0001    DYNAMIC     Gi0/1\n" +
      "  20    a8bb.ccdd.0002    DYNAMIC     Gi0/2",
    mode: "privileged",
    tags: ["switching", "mac", "layer2", "verification"],
  },

  // ── Network Access ────────────────────────────────────────────────────────

  {
    id: "cmd-na-001",
    domainId: "net-access",
    command: "vlan",
    syntax: "vlan <vlan-id>",
    description:
      "Creates a VLAN in the VLAN database and enters VLAN configuration mode. Follow with `name <name>` to assign a descriptive name. Must be in global configuration mode.",
    example:
      "Switch(config)# vlan 10\n" +
      "Switch(config-vlan)# name Engineering\n" +
      "Switch(config-vlan)# vlan 20\n" +
      "Switch(config-vlan)# name Sales\n" +
      "Switch(config-vlan)# exit",
    mode: "global-config",
    tags: ["vlan", "configuration", "switching"],
  },
  {
    id: "cmd-na-002",
    domainId: "net-access",
    command: "switchport access vlan",
    syntax: "switchport access vlan <vlan-id>",
    description:
      "Assigns an access port to a specific VLAN. Must be preceded by `switchport mode access` to set the port type. This is the fundamental command for connecting end devices to a VLAN.",
    example:
      "Switch(config)# interface range GigabitEthernet0/1 - 5\n" +
      "Switch(config-if-range)# switchport mode access\n" +
      "Switch(config-if-range)# switchport access vlan 10\n" +
      "Switch(config-if-range)# exit",
    mode: "interface-config",
    tags: ["vlan", "access-port", "switching", "configuration"],
  },
  {
    id: "cmd-na-003",
    domainId: "net-access",
    command: "switchport mode trunk",
    syntax: "switchport mode trunk",
    description:
      "Forces a switch port into trunk mode, enabling it to carry multiple VLANs using 802.1Q tagging. On older Catalyst switches, `switchport trunk encapsulation dot1q` must be configured first.",
    example:
      "Switch(config)# interface GigabitEthernet0/24\n" +
      "Switch(config-if)# switchport trunk encapsulation dot1q\n" +
      "Switch(config-if)# switchport mode trunk\n" +
      "Switch(config-if)# switchport trunk allowed vlan 10,20,30\n" +
      "Switch(config-if)# switchport nonegotiate",
    mode: "interface-config",
    tags: ["trunk", "vlan", "802.1q", "switching"],
  },
  {
    id: "cmd-na-004",
    domainId: "net-access",
    command: "show interfaces trunk",
    syntax: "show interfaces trunk",
    description:
      "Displays all active trunk ports, showing the native VLAN, the allowed VLAN list, and which VLANs are actually forwarding. The most important verification command after configuring a trunk.",
    example:
      "Switch# show interfaces trunk\n" +
      "Port        Mode         Encapsulation  Status        Native vlan\n" +
      "Gi0/24      on           802.1q         trunking      1\n" +
      "\n" +
      "Port        Vlans allowed on trunk\n" +
      "Gi0/24      10,20,30\n" +
      "\n" +
      "Port        Vlans allowed and active in management domain\n" +
      "Gi0/24      10,20,30\n" +
      "\n" +
      "Port        Vlans in spanning tree forwarding state and not pruned\n" +
      "Gi0/24      10,20,30",
    mode: "privileged",
    tags: ["trunk", "vlan", "verification", "spanning-tree"],
  },
  {
    id: "cmd-na-005",
    domainId: "net-access",
    command: "show vlan brief",
    syntax: "show vlan brief",
    description:
      "Displays all VLANs in the VLAN database with their names and the access ports assigned to each VLAN. Trunk ports are not shown here — use `show interfaces trunk` for trunk information.",
    example:
      "Switch# show vlan brief\n" +
      "VLAN Name                             Status    Ports\n" +
      "---- -------------------------------- --------- -------------------------------\n" +
      "1    default                          active    Gi0/1, Gi0/2\n" +
      "10   Engineering                      active    Gi0/3, Gi0/4\n" +
      "20   Sales                            active    Gi0/5, Gi0/6\n" +
      "1002 fddi-default                     act/unsup\n" +
      "1003 token-ring-default               act/unsup",
    mode: "privileged",
    tags: ["vlan", "verification", "switching"],
  },
  {
    id: "cmd-na-006",
    domainId: "net-access",
    command: "show spanning-tree",
    syntax: "show spanning-tree [vlan <vlan-id>]",
    description:
      "Displays STP topology information — root bridge ID, local bridge ID, and the state and role of each port. Use `vlan <id>` to limit output to a specific VLAN instance.",
    example:
      "Switch# show spanning-tree vlan 10\n" +
      "VLAN0010\n" +
      "  Spanning tree enabled protocol ieee\n" +
      "  Root ID    Priority    32778\n" +
      "             Address     a8aa.aaaa.0001\n" +
      "             This bridge is the root\n" +
      "  Bridge ID  Priority    32778 (priority 32768 sys-id-ext 10)\n" +
      "\n" +
      "Interface           Role Sts Cost      Prio.Nbr Type\n" +
      "------------------- ---- --- --------- -------- --------------------------------\n" +
      "Gi0/1               Desg FWD 4         128.1    P2p\n" +
      "Gi0/24              Desg FWD 4         128.24   P2p",
    mode: "privileged",
    tags: ["spanning-tree", "stp", "verification", "layer2"],
  },
  {
    id: "cmd-na-007",
    domainId: "net-access",
    command: "spanning-tree portfast",
    syntax: "spanning-tree portfast",
    description:
      "Enables PortFast on an access port, causing it to skip STP's listening and learning states and immediately enter forwarding. Should only be enabled on ports connected to end devices, never to switches.",
    example:
      "Switch(config)# interface GigabitEthernet0/1\n" +
      "Switch(config-if)# spanning-tree portfast\n" +
      "%Warning: portfast should only be enabled on ports connected to a single host.\n" +
      "\n" +
      "Switch(config)# spanning-tree portfast bpduguard default  ! global BPDU Guard",
    mode: "interface-config",
    tags: ["spanning-tree", "portfast", "bpdu-guard", "security"],
  },
  {
    id: "cmd-na-008",
    domainId: "net-access",
    command: "spanning-tree vlan priority",
    syntax: "spanning-tree vlan <vlan-id> priority <priority>",
    description:
      "Sets the STP bridge priority for a specific VLAN. Priority must be a multiple of 4096 (0, 4096, 8192... 61440). Lower priority = higher chance of becoming root bridge. Default is 32768.",
    example:
      "Switch(config)# spanning-tree vlan 10 priority 4096\n" +
      "Switch(config)# spanning-tree vlan 20 root primary  ! shortcut macro\n" +
      "\n" +
      "! Verify\n" +
      "Switch# show spanning-tree vlan 10 | include Priority\n" +
      "  Bridge ID  Priority    4106  (priority 4096 sys-id-ext 10)",
    mode: "global-config",
    tags: ["spanning-tree", "stp", "root-bridge", "configuration"],
  },
  {
    id: "cmd-na-009",
    domainId: "net-access",
    command: "interface vlan",
    syntax: "interface vlan <vlan-id>",
    description:
      "Creates a Switched Virtual Interface (SVI) for a VLAN on a multilayer switch. Used to assign an IP address for management access to the switch or for inter-VLAN routing.",
    example:
      "Switch(config)# interface vlan 10\n" +
      "Switch(config-if)# ip address 10.10.10.1 255.255.255.0\n" +
      "Switch(config-if)# no shutdown\n" +
      "Switch(config-if)# description Engineering-Gateway\n" +
      "Switch(config-if)# ip helper-address 10.0.0.5",
    mode: "global-config",
    tags: ["vlan", "svi", "routing", "management"],
  },
  {
    id: "cmd-na-010",
    domainId: "net-access",
    command: "switchport port-security",
    syntax:
      "switchport port-security [maximum <count>] [mac-address {sticky | <MAC>}] [violation {shutdown | restrict | protect}]",
    description:
      "Enables and configures port security on a switch access port. Default: maximum 1 MAC, violation mode shutdown. Must have `switchport mode access` configured first.",
    example:
      "Switch(config)# interface GigabitEthernet0/5\n" +
      "Switch(config-if)# switchport mode access\n" +
      "Switch(config-if)# switchport port-security\n" +
      "Switch(config-if)# switchport port-security maximum 2\n" +
      "Switch(config-if)# switchport port-security mac-address sticky\n" +
      "Switch(config-if)# switchport port-security violation shutdown",
    mode: "interface-config",
    tags: ["port-security", "security", "mac", "switching"],
  },
  {
    id: "cmd-na-011",
    domainId: "net-access",
    command: "show port-security",
    syntax: "show port-security [interface <int>] | [address]",
    description:
      "Displays port security status. `show port-security interface <int>` shows violation count, mode, and learned MACs for a port. `show port-security address` shows all secured MAC addresses across all ports.",
    example:
      "Switch# show port-security interface GigabitEthernet0/5\n" +
      "Port Security              : Enabled\n" +
      "Port Status                : Secure-up\n" +
      "Violation Mode             : Shutdown\n" +
      "Aging Time                 : 0 mins\n" +
      "Maximum MAC Addresses      : 2\n" +
      "Total MAC Addresses        : 1\n" +
      "Security Violation Count   : 0",
    mode: "privileged",
    tags: ["port-security", "security", "verification", "switching"],
  },
  {
    id: "cmd-na-012",
    domainId: "net-access",
    command: "vtp mode",
    syntax: "vtp mode {server | client | transparent | off}",
    description:
      "Sets the VTP operating mode for the switch. Best practice is `vtp mode off` or `vtp mode transparent` in production environments to prevent accidental VLAN database overwrites.",
    example:
      "Switch(config)# vtp mode transparent\n" +
      "Setting device to VTP Transparent mode for VLANS.\n" +
      "\n" +
      "! Verify\n" +
      "Switch# show vtp status\n" +
      "VTP Version capable             : 1 to 3\n" +
      "VTP version running             : 1\n" +
      "VTP Domain Name                 : URI-CAMPUS\n" +
      "VTP Mode                        : Transparent",
    mode: "global-config",
    tags: ["vtp", "vlan", "security", "configuration"],
  },

  // ── IP Connectivity ───────────────────────────────────────────────────────

  {
    id: "cmd-ic-001",
    domainId: "ip-connectivity",
    command: "ip route",
    syntax:
      "ip route <network> <mask> {<next-hop-ip> | <exit-interface>} [<distance>]",
    description:
      "Configures a static route. Specify the destination network, subnet mask, and either a next-hop IP address or exit interface. The optional distance creates a floating static route with that administrative distance.",
    example:
      "! Default route\n" +
      "Router(config)# ip route 0.0.0.0 0.0.0.0 203.0.113.1\n" +
      "\n" +
      "! Specific static route\n" +
      "Router(config)# ip route 10.5.0.0 255.255.0.0 192.168.1.2\n" +
      "\n" +
      "! Floating static (backup to OSPF)\n" +
      "Router(config)# ip route 10.5.0.0 255.255.0.0 192.168.2.2 111",
    mode: "global-config",
    tags: ["routing", "static", "ip", "configuration"],
  },
  {
    id: "cmd-ic-002",
    domainId: "ip-connectivity",
    command: "show ip route",
    syntax: "show ip route [<network>] [static | ospf | eigrp | connected]",
    description:
      "Displays the routing table. Protocol codes: C = connected, S = static, O = OSPF, D = EIGRP, R = RIP, B = BGP. Format: `<protocol> <network> [AD/metric] via <next-hop>, <uptime>, <interface>`.",
    example:
      "Router# show ip route\n" +
      "Codes: C - connected, S - static, O - OSPF, D - EIGRP\n" +
      "Gateway of last resort is 203.0.113.1 to network 0.0.0.0\n" +
      "\n" +
      "C    192.168.1.0/24 is directly connected, GigabitEthernet0/0\n" +
      "O    10.0.0.0/24 [110/2] via 192.168.1.2, 00:15:23, GigabitEthernet0/0\n" +
      "D    172.16.0.0/16 [90/307200] via 192.168.1.3, 00:10:01, GigabitEthernet0/0\n" +
      "S*   0.0.0.0/0 [1/0] via 203.0.113.1",
    mode: "privileged",
    tags: ["routing", "verification", "troubleshooting", "ip"],
  },
  {
    id: "cmd-ic-003",
    domainId: "ip-connectivity",
    command: "router ospf",
    syntax: "router ospf <process-id>",
    description:
      "Enters OSPF routing configuration mode. The process ID is locally significant (does not need to match neighbors). Multiple OSPF processes can run simultaneously.",
    example:
      "Router(config)# router ospf 1\n" +
      "Router(config-router)# network 192.168.1.0 0.0.0.255 area 0\n" +
      "Router(config-router)# network 10.0.0.0 0.0.0.255 area 0\n" +
      "Router(config-router)# router-id 1.1.1.1\n" +
      "Router(config-router)# passive-interface GigabitEthernet0/1",
    mode: "global-config",
    tags: ["ospf", "routing", "configuration", "dynamic"],
  },
  {
    id: "cmd-ic-004",
    domainId: "ip-connectivity",
    command: "show ip ospf neighbor",
    syntax: "show ip ospf neighbor",
    description:
      "Displays OSPF neighbor table — shows neighbor router ID, priority, state (should be FULL), dead time, address, and interface. The most important OSPF verification command.",
    example:
      "Router# show ip ospf neighbor\n" +
      "Neighbor ID     Pri   State           Dead Time   Address         Interface\n" +
      "2.2.2.2           1   FULL/DR         00:00:35    192.168.1.2     GigabitEthernet0/0\n" +
      "3.3.3.3           1   FULL/BDR        00:00:38    192.168.1.3     GigabitEthernet0/0",
    mode: "privileged",
    tags: ["ospf", "verification", "troubleshooting", "routing"],
  },
  {
    id: "cmd-ic-005",
    domainId: "ip-connectivity",
    command: "show ip ospf",
    syntax: "show ip ospf [process-id]",
    description:
      "Displays OSPF process information including router ID, reference bandwidth, area information, and statistics. Useful for verifying the OSPF router ID and SPF algorithm execution count.",
    example:
      "Router# show ip ospf\n" +
      " Routing Process 'ospf 1' with ID 1.1.1.1\n" +
      " It is an area border router\n" +
      " Reference bandwidth unit is 100 mbps\n" +
      " Area BACKBONE(0)\n" +
      "    Number of interfaces in this area is 2\n" +
      "    SPF algorithm last executed 00:05:12 ago",
    mode: "privileged",
    tags: ["ospf", "verification", "routing"],
  },
  {
    id: "cmd-ic-006",
    domainId: "ip-connectivity",
    command: "router eigrp",
    syntax: "router eigrp <as-number>",
    description:
      "Enters EIGRP routing configuration mode. The AS number must match on all EIGRP neighbors. Follow with `network` statements and `no auto-summary`.",
    example:
      "Router(config)# router eigrp 100\n" +
      "Router(config-router)# network 192.168.1.0 0.0.0.255\n" +
      "Router(config-router)# network 10.0.0.0 0.0.0.255\n" +
      "Router(config-router)# no auto-summary\n" +
      "Router(config-router)# passive-interface GigabitEthernet0/2",
    mode: "global-config",
    tags: ["eigrp", "routing", "configuration", "dynamic"],
  },
  {
    id: "cmd-ic-007",
    domainId: "ip-connectivity",
    command: "show ip eigrp neighbors",
    syntax: "show ip eigrp neighbors",
    description:
      "Displays the EIGRP neighbor table — shows neighbor address, interface, hold time, uptime, and queue counts. All neighbors should show H (hold) time > 0 and an uptime.",
    example:
      "Router# show ip eigrp neighbors\n" +
      "EIGRP-IPv4 Neighbors for AS(100)\n" +
      "H   Address                 Interface         Hold Uptime   SRTT   RTO  Q  Seq\n" +
      "                                             (sec)           (ms)       Cnt Num\n" +
      "0   192.168.1.2             Gi0/0               14 00:12:05   10   100   0  15\n" +
      "1   192.168.1.3             Gi0/0               11 00:08:30   12   100   0   9",
    mode: "privileged",
    tags: ["eigrp", "verification", "troubleshooting", "routing"],
  },
  {
    id: "cmd-ic-008",
    domainId: "ip-connectivity",
    command: "ip nat inside source",
    syntax:
      "ip nat inside source list <acl-id> {interface <int> | pool <name>} [overload]",
    description:
      "Configures NAT translation. The `overload` keyword enables PAT (many-to-one mapping using port numbers). Requires corresponding `ip nat inside` and `ip nat outside` on interfaces.",
    example:
      "Router(config)# access-list 1 permit 10.0.0.0 0.0.0.255\n" +
      "Router(config)# ip nat inside source list 1 interface GigabitEthernet0/1 overload\n" +
      "Router(config)# interface GigabitEthernet0/0\n" +
      "Router(config-if)# ip nat inside\n" +
      "Router(config)# interface GigabitEthernet0/1\n" +
      "Router(config-if)# ip nat outside",
    mode: "global-config",
    tags: ["nat", "pat", "routing", "internet"],
  },
  {
    id: "cmd-ic-009",
    domainId: "ip-connectivity",
    command: "show ip nat translations",
    syntax: "show ip nat translations [verbose]",
    description:
      "Displays the active NAT translation table with inside local, inside global, outside local, and outside global addresses. Use `clear ip nat translation *` to clear all dynamic entries.",
    example:
      "Router# show ip nat translations\n" +
      "Pro Inside global      Inside local       Outside local      Outside global\n" +
      "tcp 203.0.113.1:1024   10.0.0.10:54321    8.8.8.8:53         8.8.8.8:53\n" +
      "tcp 203.0.113.1:1025   10.0.0.11:54322    93.184.216.34:443  93.184.216.34:443",
    mode: "privileged",
    tags: ["nat", "pat", "verification", "troubleshooting"],
  },
  {
    id: "cmd-ic-010",
    domainId: "ip-connectivity",
    command: "show ip protocols",
    syntax: "show ip protocols",
    description:
      "Displays information about all routing protocols running on the router, including their timers, networks being advertised, and neighbors. Use this to verify which routing protocols are active and what they are advertising.",
    example:
      "Router# show ip protocols\n" +
      "Routing Protocol is 'ospf 1'\n" +
      "  Outgoing update filter list for all interfaces is not set\n" +
      "  Router ID 1.1.1.1\n" +
      "  Number of areas in this router is 1. 1 normal 0 stub 0 nssa\n" +
      "  Routing for Networks:\n" +
      "    192.168.1.0 0.0.0.255 area 0\n" +
      "    10.0.0.0 0.0.0.255 area 0\n" +
      "  Administrative distance 110",
    mode: "privileged",
    tags: ["routing", "verification", "ospf", "eigrp"],
  },
  {
    id: "cmd-ic-011",
    domainId: "ip-connectivity",
    command: "passive-interface",
    syntax: "passive-interface <interface-id>",
    description:
      "Prevents a routing protocol from sending Hello packets on a specified interface while still advertising the connected network. Used on interfaces facing end hosts (no routing neighbors) to suppress unnecessary routing traffic.",
    example:
      "Router(config)# router ospf 1\n" +
      "Router(config-router)# passive-interface GigabitEthernet0/2\n" +
      "\n" +
      "! Or set all interfaces passive by default, then enable specific ones:\n" +
      "Router(config-router)# passive-interface default\n" +
      "Router(config-router)# no passive-interface GigabitEthernet0/0",
    mode: "global-config",
    tags: ["ospf", "eigrp", "routing", "security"],
  },

  // ── IP Services ───────────────────────────────────────────────────────────

  {
    id: "cmd-is-001",
    domainId: "ip-services",
    command: "ip dhcp pool",
    syntax: "ip dhcp pool <name>",
    description:
      "Creates a named DHCP pool and enters DHCP pool configuration mode. Configure the pool with `network`, `default-router`, `dns-server`, and `lease` subcommands.",
    example:
      "Router(config)# ip dhcp excluded-address 10.10.10.1 10.10.10.10\n" +
      "Router(config)# ip dhcp pool VLAN10-POOL\n" +
      "Router(dhcp-config)# network 10.10.10.0 255.255.255.0\n" +
      "Router(dhcp-config)# default-router 10.10.10.1\n" +
      "Router(dhcp-config)# dns-server 10.0.0.5 8.8.8.8\n" +
      "Router(dhcp-config)# lease 7",
    mode: "global-config",
    tags: ["dhcp", "ip-services", "configuration"],
  },
  {
    id: "cmd-is-002",
    domainId: "ip-services",
    command: "show ip dhcp binding",
    syntax: "show ip dhcp binding",
    description:
      "Displays all active DHCP leases — shows client IP, client hardware (MAC) address, lease expiration, and type. Use `clear ip dhcp binding *` to clear all dynamic bindings.",
    example:
      "Router# show ip dhcp binding\n" +
      "Bindings from all pools not associated with VRF:\n" +
      "IP address          Client-ID           Lease expiration        Type\n" +
      "10.10.10.11         0100.5056.aa00.01   Apr 26 2026 10:32 AM    Automatic\n" +
      "10.10.10.12         0100.5056.aa00.02   Apr 26 2026 11:15 AM    Automatic",
    mode: "privileged",
    tags: ["dhcp", "verification", "ip-services"],
  },
  {
    id: "cmd-is-003",
    domainId: "ip-services",
    command: "ip helper-address",
    syntax: "ip helper-address <dhcp-server-ip>",
    description:
      "Configures DHCP relay on a router or SVI interface. Converts DHCP broadcast packets from the connected subnet into unicast packets directed to the DHCP server. Configured on the interface facing the client subnet.",
    example:
      "Switch(config)# interface vlan 20\n" +
      "Switch(config-if)# ip address 10.20.0.1 255.255.255.0\n" +
      "Switch(config-if)# ip helper-address 10.0.0.5\n" +
      "Switch(config-if)# no shutdown\n" +
      "\n" +
      "! Verify DHCP is working after adding helper:\n" +
      "Switch# show ip dhcp binding",
    mode: "interface-config",
    tags: ["dhcp", "relay", "ip-services", "configuration"],
  },
  {
    id: "cmd-is-004",
    domainId: "ip-services",
    command: "ntp server",
    syntax: "ntp server <ip-address> [prefer]",
    description:
      "Configures the device to synchronize its system clock with the specified NTP server. The `prefer` keyword marks this server as the preferred source when multiple NTP servers are configured.",
    example:
      "Router(config)# ntp server 10.0.0.5 prefer\n" +
      "Router(config)# ntp server 10.0.0.6\n" +
      "\n" +
      "Router# show ntp status\n" +
      "Clock is synchronized, stratum 3, reference is 10.0.0.5\n" +
      "nominal freq is 250.0000 Hz, actual freq is 249.9995 Hz\n" +
      "reference time is E0A12345.ABCD1234 (10:32:15.671 UTC Mon Apr 19 2026)",
    mode: "global-config",
    tags: ["ntp", "ip-services", "clock", "configuration"],
  },
  {
    id: "cmd-is-005",
    domainId: "ip-services",
    command: "ip name-server",
    syntax: "ip name-server <ip-address> [<ip-address2>]",
    description:
      "Configures DNS server addresses on the Cisco device for hostname resolution. Multiple servers can be listed; they are queried in order. Requires `ip domain-lookup` (enabled by default) to be active.",
    example:
      "Router(config)# ip name-server 10.0.0.53 8.8.8.8\n" +
      "Router(config)# ip domain-lookup\n" +
      "\n" +
      "! Test DNS resolution\n" +
      "Router# ping www.cisco.com\n" +
      "Translating 'www.cisco.com'...domain server (10.0.0.53) [OK]\n" +
      "Type escape sequence to abort.\n" +
      "Sending 5, 100-byte ICMP Echos to 72.163.4.185:\n" +
      "!!!!!",
    mode: "global-config",
    tags: ["dns", "ip-services", "configuration"],
  },
  {
    id: "cmd-is-006",
    domainId: "ip-services",
    command: "snmp-server community",
    syntax:
      "snmp-server community <string> {RO | RW} [<acl>]",
    description:
      "Configures an SNMP v1/v2c community string. RO (read-only) allows the NMS to poll the device. RW (read-write) also allows SET operations. An ACL can restrict which NMS hosts can use the community string.",
    example:
      "Router(config)# snmp-server community PUBLIC_RO RO\n" +
      "Router(config)# snmp-server community SECRET_RW RW 10\n" +
      "Router(config)# access-list 10 permit 10.0.0.0 0.0.0.255\n" +
      "Router(config)# snmp-server location URI-MDF-Room-201\n" +
      "Router(config)# snmp-server contact noc@uri.edu",
    mode: "global-config",
    tags: ["snmp", "ip-services", "monitoring", "configuration"],
  },
  {
    id: "cmd-is-007",
    domainId: "ip-services",
    command: "logging host",
    syntax: "logging host <syslog-server-ip>",
    description:
      "Configures the device to send syslog messages to a remote syslog server. Combine with `logging trap <level>` to set the minimum severity and `logging buffered` for local storage.",
    example:
      "Router(config)# logging host 10.0.0.10\n" +
      "Router(config)# logging trap warnings\n" +
      "Router(config)# logging buffered 16384 informational\n" +
      "Router(config)# service timestamps log datetime msec\n" +
      "\n" +
      "! View local log buffer\n" +
      "Router# show logging | head 20",
    mode: "global-config",
    tags: ["syslog", "ip-services", "logging", "monitoring"],
  },
  {
    id: "cmd-is-008",
    domainId: "ip-services",
    command: "ipv6 address",
    syntax:
      "ipv6 address <ipv6-address>/<prefix-length> | ipv6 address autoconfig",
    description:
      "Assigns an IPv6 address to a router interface. Use `autoconfig` to enable SLAAC. The global command `ipv6 unicast-routing` must be enabled before IPv6 routing works.",
    example:
      "Router(config)# ipv6 unicast-routing\n" +
      "Router(config)# interface GigabitEthernet0/0\n" +
      "Router(config-if)# ipv6 address 2001:db8:acad:1::1/64\n" +
      "Router(config-if)# no shutdown\n" +
      "\n" +
      "Router# show ipv6 interface brief\n" +
      "GigabitEthernet0/0     [up/up]\n" +
      "    FE80::1             (link-local)\n" +
      "    2001:DB8:ACAD:1::1",
    mode: "interface-config",
    tags: ["ipv6", "ip-services", "addressing", "configuration"],
  },
  {
    id: "cmd-is-009",
    domainId: "ip-services",
    command: "show ipv6 neighbors",
    syntax: "show ipv6 neighbors [<interface>]",
    description:
      "Displays the IPv6 neighbor cache (the IPv6 equivalent of the ARP table). Shows IPv6 addresses mapped to MAC addresses, discovered via NDP (Neighbor Discovery Protocol).",
    example:
      "Router# show ipv6 neighbors\n" +
      "IPv6 Address                            Age Link-layer Addr State Interface\n" +
      "2001:DB8:ACAD:1::10                       0 0050.56aa.0001  REACH Gi0/0\n" +
      "FE80::250:56FF:FEAA:0001                   5 0050.56aa.0001  STALE Gi0/0",
    mode: "privileged",
    tags: ["ipv6", "ndp", "verification", "layer3"],
  },
  {
    id: "cmd-is-010",
    domainId: "ip-services",
    command: "show ip dhcp conflict",
    syntax: "show ip dhcp conflict",
    description:
      "Displays IP addresses that the DHCP server detected as conflicting (already in use when it tried to assign them). The server pings addresses before assigning them; conflicts are logged and excluded from future assignments.",
    example:
      "Router# show ip dhcp conflict\n" +
      "IP address        Detection method   Detection time\n" +
      "10.10.10.15       Ping               Apr 19 2026 09:12:00\n" +
      "10.10.10.22       Gratuitous ARP     Apr 19 2026 11:30:00\n" +
      "\n" +
      "! Clear the conflict table after resolving\n" +
      "Router# clear ip dhcp conflict *",
    mode: "privileged",
    tags: ["dhcp", "troubleshooting", "ip-services"],
  },
  {
    id: "cmd-is-011",
    domainId: "ip-services",
    command: "show ntp associations",
    syntax: "show ntp associations",
    description:
      "Displays configured NTP servers and peers with their synchronization status. A `*` indicates the currently synchronized source; `+` indicates a candidate; `-` indicates a non-candidate.",
    example:
      "Router# show ntp associations\n" +
      "  address         ref clock       st   when   poll reach  delay  offset   disp\n" +
      "*~10.0.0.5        132.163.96.1     2     23     64   377   1.234   0.002   0.015\n" +
      " ~10.0.0.6        132.163.96.1     2     45     64   377   2.112   0.118   0.032\n" +
      " * sys.peer, # selected, + candidate, - outlyer, x falseticker, ~ configured",
    mode: "privileged",
    tags: ["ntp", "verification", "ip-services"],
  },

  // ── Security Fundamentals ─────────────────────────────────────────────────

  {
    id: "cmd-sf-001",
    domainId: "security",
    command: "access-list",
    syntax:
      "access-list <1-99> {permit | deny} <source> [<wildcard>]  |  access-list <100-199> {permit | deny} <protocol> <src> <src-wild> <dst> <dst-wild> [eq <port>]",
    description:
      "Creates a numbered standard (1–99) or extended (100–199) ACL entry. Standard ACLs filter on source IP only. Extended ACLs can filter on protocol, source, destination, and port.",
    example:
      "! Standard ACL — permit 10.0.0.0/24\n" +
      "Router(config)# access-list 10 permit 10.0.0.0 0.0.0.255\n" +
      "\n" +
      "! Extended ACL — permit SSH from management network\n" +
      "Router(config)# access-list 110 permit tcp 10.0.1.0 0.0.0.255 any eq 22\n" +
      "Router(config)# access-list 110 deny ip any any log",
    mode: "global-config",
    tags: ["acl", "security", "filtering", "configuration"],
  },
  {
    id: "cmd-sf-002",
    domainId: "security",
    command: "ip access-list",
    syntax:
      "ip access-list {standard | extended} <name>",
    description:
      "Creates a named ACL and enters named ACL configuration mode. Named ACLs support individual entry deletion by sequence number, making them preferred over numbered ACLs in production.",
    example:
      "Router(config)# ip access-list extended ALLOW-MGMT\n" +
      "Router(config-ext-nacl)# 10 permit tcp 10.0.1.0 0.0.0.255 any eq 22\n" +
      "Router(config-ext-nacl)# 20 permit tcp 10.0.1.0 0.0.0.255 any eq 443\n" +
      "Router(config-ext-nacl)# 30 deny ip any any log\n" +
      "\n" +
      "! Delete a specific entry by sequence number\n" +
      "Router(config-ext-nacl)# no 20",
    mode: "global-config",
    tags: ["acl", "security", "filtering", "named"],
  },
  {
    id: "cmd-sf-003",
    domainId: "security",
    command: "ip access-group",
    syntax: "ip access-group <acl-name-or-number> {in | out}",
    description:
      "Applies an ACL to a router interface for inbound or outbound traffic filtering. `in` filters traffic entering the interface; `out` filters traffic leaving the interface.",
    example:
      "Router(config)# interface GigabitEthernet0/0\n" +
      "Router(config-if)# ip access-group ALLOW-MGMT in\n" +
      "\n" +
      "! Apply standard ACL outbound on WAN interface\n" +
      "Router(config)# interface GigabitEthernet0/1\n" +
      "Router(config-if)# ip access-group 10 out",
    mode: "interface-config",
    tags: ["acl", "security", "filtering", "interface"],
  },
  {
    id: "cmd-sf-004",
    domainId: "security",
    command: "show access-lists",
    syntax: "show access-lists [<acl-name-or-number>]",
    description:
      "Displays all configured ACLs with their entries and hit counters. The match count in parentheses shows how many packets matched each entry — useful for verifying ACL effectiveness.",
    example:
      "Router# show access-lists\n" +
      "Extended IP access list ALLOW-MGMT\n" +
      "    10 permit tcp 10.0.1.0 0.0.0.255 any eq 22 (247 matches)\n" +
      "    20 permit tcp 10.0.1.0 0.0.0.255 any eq 443 (1842 matches)\n" +
      "    30 deny ip any any log (0 matches)\n" +
      "Standard IP access list 10\n" +
      "    10 permit 10.0.0.0, wildcard bits 0.0.0.255 (504 matches)",
    mode: "privileged",
    tags: ["acl", "verification", "security", "troubleshooting"],
  },
  {
    id: "cmd-sf-005",
    domainId: "security",
    command: "crypto key generate rsa",
    syntax: "crypto key generate rsa modulus <bits>",
    description:
      "Generates the RSA key pair required for SSH operation. A minimum of 1024 bits is required for SSHv2; 2048 bits is recommended for production security. The hostname and domain name must be configured before this command.",
    example:
      "Switch(config)# hostname SW-ACCESS-01\n" +
      "SW-ACCESS-01(config)# ip domain-name uri.edu\n" +
      "SW-ACCESS-01(config)# crypto key generate rsa modulus 2048\n" +
      "The name for the keys will be: SW-ACCESS-01.uri.edu\n" +
      "% The key modulus size is 2048 bits\n" +
      "% Generating 2048 bit RSA keys, keys will be non-exportable...\n" +
      "[OK] (elapsed time was 3 seconds)\n" +
      "SW-ACCESS-01(config)# ip ssh version 2",
    mode: "global-config",
    tags: ["ssh", "security", "encryption", "configuration"],
  },
  {
    id: "cmd-sf-006",
    domainId: "security",
    command: "line vty",
    syntax: "line vty <start-line> <end-line>",
    description:
      "Enters VTY line configuration mode for configuring remote management access (SSH/Telnet). Typically configured for lines 0 through 4 (or 0 through 15 on some platforms). Follow with `transport input` and `login` subcommands.",
    example:
      "Switch(config)# line vty 0 15\n" +
      "Switch(config-line)# transport input ssh\n" +
      "Switch(config-line)# login local\n" +
      "Switch(config-line)# exec-timeout 5 0\n" +
      "Switch(config-line)# logging synchronous\n" +
      "Switch(config-line)# ip access-class MGMT-ONLY in",
    mode: "global-config",
    tags: ["ssh", "security", "vty", "configuration"],
  },
  {
    id: "cmd-sf-007",
    domainId: "security",
    command: "ip dhcp snooping",
    syntax: "ip dhcp snooping [vlan <vlan-range>]",
    description:
      "Enables DHCP snooping globally and per-VLAN. All ports are untrusted by default after enabling. Apply `ip dhcp snooping trust` on uplink ports facing legitimate DHCP servers.",
    example:
      "Switch(config)# ip dhcp snooping\n" +
      "Switch(config)# ip dhcp snooping vlan 10,20,30\n" +
      "Switch(config)# no ip dhcp snooping information option  ! disable option 82 if needed\n" +
      "\n" +
      "! Trust the uplink\n" +
      "Switch(config)# interface GigabitEthernet0/24\n" +
      "Switch(config-if)# ip dhcp snooping trust\n" +
      "\n" +
      "Switch# show ip dhcp snooping binding",
    mode: "global-config",
    tags: ["dhcp-snooping", "security", "configuration"],
  },
  {
    id: "cmd-sf-008",
    domainId: "security",
    command: "ip arp inspection",
    syntax: "ip arp inspection vlan <vlan-range>",
    description:
      "Enables Dynamic ARP Inspection (DAI) for specified VLANs. Validates ARP packets against the DHCP snooping binding table on untrusted ports. Requires DHCP snooping to be configured first.",
    example:
      "Switch(config)# ip arp inspection vlan 10,20,30\n" +
      "\n" +
      "! Trust uplinks (same ports as DHCP snooping trust)\n" +
      "Switch(config)# interface GigabitEthernet0/24\n" +
      "Switch(config-if)# ip arp inspection trust\n" +
      "\n" +
      "Switch# show ip arp inspection statistics vlan 10\n" +
      "Vlan      Forwarded        Dropped     DHCP Drops      ACL Drops\n" +
      "----      ---------        -------     ----------      ---------\n" +
      "  10             45              0              0              0",
    mode: "global-config",
    tags: ["dai", "arp", "security", "configuration"],
  },
  {
    id: "cmd-sf-009",
    domainId: "security",
    command: "enable secret",
    syntax: "enable secret <password>",
    description:
      "Sets the privileged exec mode password using MD5 hashing. Always use `enable secret` over `enable password` — the secret is stored as a one-way MD5 hash and is not reversible.",
    example:
      "Switch(config)# enable secret StrongPassword123!\n" +
      "Switch(config)# service password-encryption  ! apply weak Type-7 to other passwords\n" +
      "Switch(config)# no enable password  ! remove cleartext password if it exists\n" +
      "\n" +
      "! Verify that secret appears as hash in running config:\n" +
      "Switch# show running-config | include enable\n" +
      "enable secret 5 $1$mERr$hx5rVt7rPNoS4wqbXKX7m0",
    mode: "global-config",
    tags: ["security", "password", "authentication", "configuration"],
  },
  {
    id: "cmd-sf-010",
    domainId: "security",
    command: "ip access-class",
    syntax: "ip access-class <acl> {in | out}",
    description:
      "Applies an ACL to VTY lines to restrict which IP addresses can establish remote management sessions (SSH/Telnet). This is the VTY-line equivalent of `ip access-group` used on interfaces.",
    example:
      "Router(config)# ip access-list standard MGMT-HOSTS\n" +
      "Router(config-std-nacl)# permit 10.0.1.0 0.0.0.255\n" +
      "Router(config-std-nacl)# deny any log\n" +
      "Router(config)# line vty 0 15\n" +
      "Router(config-line)# ip access-class MGMT-HOSTS in\n" +
      "Router(config-line)# transport input ssh",
    mode: "global-config",
    tags: ["acl", "ssh", "security", "vty"],
  },
  {
    id: "cmd-sf-011",
    domainId: "security",
    command: "username",
    syntax:
      "username <name> privilege <level> secret <password>",
    description:
      "Creates a local user account on the device. Privilege level 15 grants full access (same as enable mode). Use `secret` (MD5 hash) rather than `password` (cleartext). Required for `login local` authentication on VTY and console lines.",
    example:
      "Switch(config)# username admin privilege 15 secret SecurePass456!\n" +
      "Switch(config)# username readonly privilege 1 secret ReadOnlyPass!\n" +
      "\n" +
      "! Verify local users\n" +
      "Switch# show running-config | section username\n" +
      "username admin privilege 15 secret 5 $1$abc...\n" +
      "username readonly privilege 1 secret 5 $1$xyz...",
    mode: "global-config",
    tags: ["security", "authentication", "user", "configuration"],
  },

  // ── Automation & Programmability ──────────────────────────────────────────

  {
    id: "cmd-ap-001",
    domainId: "automation",
    command: "show version (Python/API context)",
    syntax: "GET /dna/intent/api/v1/network-device",
    description:
      "DNA Center REST API endpoint to retrieve all network devices from inventory. Returns a JSON array of device objects including hostname, management IP, platform, software version, and reachability status.",
    example:
      "# Python example:\n" +
      "import requests\n" +
      "\n" +
      "headers = {\n" +
      "    'X-Auth-Token': '<token>',\n" +
      "    'Content-Type': 'application/json'\n" +
      "}\n" +
      "response = requests.get(\n" +
      "    'https://dnacenter.uri.edu/dna/intent/api/v1/network-device',\n" +
      "    headers=headers,\n" +
      "    verify=False\n" +
      ")\n" +
      "devices = response.json()['response']\n" +
      "for d in devices:\n" +
      "    print(d['hostname'], d['managementIpAddress'])",
    mode: "user",
    tags: ["api", "dna-center", "automation", "rest"],
  },
  {
    id: "cmd-ap-002",
    domainId: "automation",
    command: "DNA Center Auth Token",
    syntax: "POST /dna/system/api/v1/auth/token",
    description:
      "Authenticates to the Cisco DNA Center API and retrieves an access token. The token must be included in the X-Auth-Token header of all subsequent API requests. Tokens expire and must be refreshed.",
    example:
      "# Python example:\n" +
      "import requests\n" +
      "from requests.auth import HTTPBasicAuth\n" +
      "\n" +
      "response = requests.post(\n" +
      "    'https://dnacenter.uri.edu/dna/system/api/v1/auth/token',\n" +
      "    auth=HTTPBasicAuth('admin', 'password'),\n" +
      "    verify=False\n" +
      ")\n" +
      "token = response.json()['Token']\n" +
      "print(f'Token: {token[:20]}...')",
    mode: "user",
    tags: ["api", "dna-center", "authentication", "rest"],
  },
  {
    id: "cmd-ap-003",
    domainId: "automation",
    command: "Ansible ios_config",
    syntax:
      "cisco.ios.ios_config:\n  lines:\n    - <config-command>\n  parents: <parent-command>",
    description:
      "Ansible module for pushing configuration lines to Cisco IOS devices. The `lines` parameter accepts a list of configuration commands. The optional `parents` parameter specifies parent configuration context (e.g., `router ospf 1`).",
    example:
      "---\n" +
      "- name: Configure NTP on all switches\n" +
      "  hosts: switches\n" +
      "  gather_facts: no\n" +
      "  tasks:\n" +
      "    - name: Set NTP servers\n" +
      "      cisco.ios.ios_config:\n" +
      "        lines:\n" +
      "          - ntp server 10.0.0.5 prefer\n" +
      "          - ntp server 10.0.0.6\n" +
      "    - name: Save configuration\n" +
      "      cisco.ios.ios_config:\n" +
      "        save_when: always",
    mode: "user",
    tags: ["ansible", "automation", "ios", "configuration"],
  },
  {
    id: "cmd-ap-004",
    domainId: "automation",
    command: "Ansible ios_command",
    syntax:
      "cisco.ios.ios_command:\n  commands:\n    - <show-command>\n  register: result",
    description:
      "Ansible module for running exec-level commands on Cisco IOS devices and capturing their output. Results are stored in the variable specified by `register` and can be processed in subsequent tasks.",
    example:
      "---\n" +
      "- name: Gather interface status from all routers\n" +
      "  hosts: routers\n" +
      "  gather_facts: no\n" +
      "  tasks:\n" +
      "    - name: Get interface brief\n" +
      "      cisco.ios.ios_command:\n" +
      "        commands:\n" +
      "          - show ip interface brief\n" +
      "          - show ip route\n" +
      "      register: output\n" +
      "\n" +
      "    - name: Display output\n" +
      "      debug:\n" +
      "        var: output.stdout_lines[0]",
    mode: "user",
    tags: ["ansible", "automation", "ios", "verification"],
  },
  {
    id: "cmd-ap-005",
    domainId: "automation",
    command: "Ansible inventory file",
    syntax:
      "[group-name]\n<hostname-or-ip> ansible_user=<user> ansible_password=<pass> ansible_network_os=ios",
    description:
      "Defines the managed devices and their connection parameters for Ansible. Device groups allow targeting specific subsets in playbooks. Network device inventories typically include the `ansible_network_os` variable to select the correct connection plugin.",
    example:
      "# hosts.ini\n" +
      "[switches]\n" +
      "sw-access-01 ansible_host=10.0.0.11\n" +
      "sw-access-02 ansible_host=10.0.0.12\n" +
      "sw-core-01   ansible_host=10.0.0.1\n" +
      "\n" +
      "[routers]\n" +
      "rtr-edge-01  ansible_host=10.0.0.254\n" +
      "\n" +
      "[all:vars]\n" +
      "ansible_user=admin\n" +
      "ansible_password=vault_encrypted_pass\n" +
      "ansible_network_os=cisco.ios.ios\n" +
      "ansible_connection=network_cli",
    mode: "user",
    tags: ["ansible", "automation", "inventory", "configuration"],
  },
  {
    id: "cmd-ap-006",
    domainId: "automation",
    command: "curl — REST API call",
    syntax:
      "curl -X <METHOD> -H 'Content-Type: application/json' -H 'X-Auth-Token: <token>' https://<host>/<path>",
    description:
      "Makes HTTP requests to REST APIs from the command line. Used for quick API testing without writing a full script. The `-X` flag sets the HTTP method, `-H` adds headers, and `-d` adds a JSON request body.",
    example:
      "# Get all devices from DNA Center\n" +
      "curl -X GET \\\n" +
      "  -H 'X-Auth-Token: eyJhbGciOi...' \\\n" +
      "  -H 'Content-Type: application/json' \\\n" +
      "  --insecure \\\n" +
      "  'https://10.0.0.100/dna/intent/api/v1/network-device' \\\n" +
      "  | python3 -m json.tool",
    mode: "user",
    tags: ["api", "rest", "curl", "automation"],
  },
  {
    id: "cmd-ap-007",
    domainId: "automation",
    command: "Meraki API — List devices",
    syntax: "GET /api/v1/organizations/{organizationId}/devices",
    description:
      "Meraki Dashboard API endpoint to list all devices in an organization. Requires the API key in the X-Cisco-Meraki-API-Key header. All Meraki API calls go to api.meraki.com, not to local devices.",
    example:
      "import requests\n" +
      "\n" +
      "API_KEY = 'your-meraki-api-key'\n" +
      "ORG_ID  = '123456'\n" +
      "\n" +
      "headers = {\n" +
      "    'X-Cisco-Meraki-API-Key': API_KEY,\n" +
      "    'Content-Type': 'application/json'\n" +
      "}\n" +
      "url = f'https://api.meraki.com/api/v1/organizations/{ORG_ID}/devices'\n" +
      "response = requests.get(url, headers=headers)\n" +
      "for device in response.json():\n" +
      "    print(device['name'], device['model'], device['lanIp'])",
    mode: "user",
    tags: ["meraki", "api", "automation", "rest"],
  },
  {
    id: "cmd-ap-008",
    domainId: "automation",
    command: "show netconf-yang sessions",
    syntax: "show netconf-yang sessions",
    description:
      "Displays active NETCONF sessions on the device. Requires NETCONF to be enabled with `netconf-yang` in global configuration. NETCONF uses SSH on port 830.",
    example:
      "Router(config)# netconf-yang\n" +
      "\n" +
      "Router# show netconf-yang sessions\n" +
      "R  = NETCONF over RESTCONF\n" +
      "NC = NETCONF\n" +
      "\n" +
      "Number of sessions : 1\n" +
      "\n" +
      " id  transport  username  source-host            global-lock\n" +
      " --  ---------  --------  -----------            -----------\n" +
      "  1  NC         admin     10.0.1.5               None",
    mode: "privileged",
    tags: ["netconf", "automation", "yang", "verification"],
  },
  {
    id: "cmd-ap-009",
    domainId: "automation",
    command: "restconf (config enable)",
    syntax: "restconf",
    description:
      "Enables RESTCONF on the Cisco IOS-XE device. RESTCONF is a REST-based alternative to NETCONF that uses HTTP/HTTPS and JSON or XML formatted YANG data models. Requires the `ip http secure-server` to be enabled.",
    example:
      "Router(config)# ip http secure-server\n" +
      "Router(config)# restconf\n" +
      "\n" +
      "# RESTCONF GET request (from external client):\n" +
      "curl -k -u admin:password \\\n" +
      "  -H 'Accept: application/yang-data+json' \\\n" +
      "  'https://router1/restconf/data/ietf-interfaces:interfaces'",
    mode: "global-config",
    tags: ["restconf", "automation", "yang", "api"],
  },
  {
    id: "cmd-ap-010",
    domainId: "automation",
    command: "show platform software",
    syntax: "show platform software yang-management process state",
    description:
      "Displays the state of YANG management processes (NETCONF-YANG, RESTCONF) on IOS-XE devices. Useful for verifying that the model-driven programmability processes are running.",
    example:
      "Router# show platform software yang-management process state\n" +
      "confd             : Running\n" +
      "nesd              : Running\n" +
      "syncfd            : Running\n" +
      "ncsshd            : Running\n" +
      "dmiauthd          : Running\n" +
      "nginx             : Running\n" +
      "ndbmand           : Running\n" +
      "pubd              : Running",
    mode: "privileged",
    tags: ["netconf", "restconf", "yang", "verification"],
  },
  {
    id: "cmd-ap-011",
    domainId: "automation",
    command: "ansible-playbook",
    syntax:
      "ansible-playbook <playbook.yml> -i <inventory> [--check] [--diff] [-v]",
    description:
      "Runs an Ansible playbook against devices defined in the inventory. The `--check` flag performs a dry run without making changes. `-v` increases verbosity. `--diff` shows configuration differences.",
    example:
      "# Dry run first to verify what changes will be made\n" +
      "ansible-playbook ntp-config.yml -i hosts.ini --check --diff\n" +
      "\n" +
      "# Apply the changes\n" +
      "ansible-playbook ntp-config.yml -i hosts.ini -v\n" +
      "\n" +
      "# Target only the switches group\n" +
      "ansible-playbook ntp-config.yml -i hosts.ini --limit switches",
    mode: "user",
    tags: ["ansible", "automation", "playbook", "cli"],
  },
  {
    id: "cmd-ap-012",
    domainId: "automation",
    command: "Ansible Vault",
    syntax:
      "ansible-vault {create | encrypt | decrypt | edit} <file>",
    description:
      "Encrypts sensitive data files (passwords, API keys) used in Ansible playbooks. Encrypted files are decrypted at runtime using a vault password. Prevents credentials from being stored in plaintext in version control.",
    example:
      "# Create an encrypted variable file\n" +
      "ansible-vault create group_vars/all/vault.yml\n" +
      "# Enter vault password when prompted, then add:\n" +
      "# vault_ssh_password: SecurePassword123!\n" +
      "# vault_enable_secret: EnableSecret456!\n" +
      "\n" +
      "# Run playbook with vault\n" +
      "ansible-playbook site.yml -i hosts.ini --ask-vault-pass\n" +
      "\n" +
      "# Or use a vault password file\n" +
      "ansible-playbook site.yml -i hosts.ini --vault-password-file .vault_pass",
    mode: "user",
    tags: ["ansible", "security", "vault", "automation"],
  },
];
